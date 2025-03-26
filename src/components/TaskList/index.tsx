import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { Spinner } from 'src/components/atoms/Spinner';
import { TouchableOpacity } from 'src/components/atoms/TouchableOpacity';
import { Button } from 'src/components/atoms/buttons/Button';
import { Notification } from 'src/components/molecules/Notification';
import { TaskForm } from 'src/components/organisms/forms/TaskForm';
import { OpenTaskModal } from 'src/components/routes/modals/OpenTaskModal';
import { BASE_URL, ODATA_URL, TENANTGUID } from 'src/constants/env';
import { BID_STATUS, Task } from 'src/types';

import styles from './styles.module.css';

type NotificationState = {
  message: string;
  type: 'success' | 'error';
};

interface ODataResponse<T> {
  value: T[];
}

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setError(null);

      const response = await fetch(
        `${ODATA_URL}/tasks?tenantguid=${TENANTGUID}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ODataResponse<Task> = await response.json();

      if (!data.value || !Array.isArray(data.value)) {
        throw new Error('Получены некорректные данные от сервера');
      }

      setTasks(data.value);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при загрузке заявок';

      setError(errorMessage);

      showNotification(errorMessage, 'error');

      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Partial<Task>) => {
    setSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/${TENANTGUID}/Tasks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTasks();

      setIsModalOpen(false);

      showNotification('Заявка успешно создана', 'success');

      setHasUnsavedChanges(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка при создании заявки';

      showNotification(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTask = async (taskData: Partial<Task>) => {
    setSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/${TENANTGUID}/Tasks`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTasks();

      setIsModalOpen(false);

      setSelectedTask(undefined);

      showNotification('Заявка успешно обновлена', 'success');

      setHasUnsavedChanges(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка при обновлении заявки';

      showNotification(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);

    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTask(undefined);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          'У вас есть несохранённые изменения. Вы уверены, что хотите закрыть?'
        )
      ) {
        setIsModalOpen(false);

        setSelectedTask(undefined);

        setHasUnsavedChanges(false);
      }
    } else {
      setIsModalOpen(false);

      setSelectedTask(undefined);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id?.toString().includes(searchQuery)
  );

  useEffect(() => {
    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.taskList}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по заявкам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.createButton}>
        <Button
          type="button"
          variant="sapphirine"
          label={{ id: 'base.buttons.createRequest' }}
          onClick={handleCreateClick}
        />
      </div>

      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <p>ID</p>

          <p>Название</p>

          <p>Статус</p>

          <p>Исполнитель</p>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.list}>
            {filteredTasks?.map((task) => (
              <TouchableOpacity
                customStyles={styles.itemWrapper}
                onClick={() => handleTaskClick(task)}
              >
                <div key={task.id} className={styles.taskItem}>
                  <div className={styles.taskId}>{task.id}</div>

                  <div
                    className={classNames(styles.taskName, {
                      [styles.taskNameOpenModal]: isModalOpen,
                    })}
                    style={{ whiteSpace: 'normal' }}
                  >
                    {task.name}
                  </div>

                  <div
                    className={classNames(styles.taskStatus, {
                      [styles.taskStatusOpened]:
                        task.statusName === BID_STATUS.OPENED,
                      [styles.taskStatusInProgress]:
                        task.statusName === BID_STATUS.IN_PROGRESS,
                      [styles.taskStatusCompleted]:
                        task.statusName === BID_STATUS.COMPLETED,
                      [styles.taskStatusRequiresClarification]:
                        task.statusName === BID_STATUS.REQUIRES_CLARIFICATION,
                      [styles.taskStatusPostponed]:
                        task.statusName === BID_STATUS.POSTPONED,
                      [styles.taskStatusClosed]:
                        task.statusName === BID_STATUS.CLOSED,
                    })}
                  >
                    {task.statusName}
                  </div>

                  <div className={styles.taskExecutor}>{task.executorName}</div>
                </div>
              </TouchableOpacity>
            ))}
          </div>
        )}
      </div>

      <OpenTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTask ? `№ ${selectedTask.id}` : 'Новая заявка'}
      >
        {submitting ? (
          <Spinner />
        ) : (
          <TaskForm
            task={selectedTask}
            onSubmit={selectedTask ? handleEditTask : handleCreateTask}
            onChange={() => setHasUnsavedChanges(true)}
          />
        )}
      </OpenTaskModal>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};
