import React, { useEffect, useState } from 'react';

import { BID_STATUS, Task } from 'src/types';

import styles from './styles.module.css';

type Props = {
  task?: Task;
  onSubmit: (taskData: Partial<Task>) => void;
  onChange?: () => void;
};

export const TaskForm: React.FC<Props> = ({ task, onSubmit, onChange }) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    name: '',
    description: '',
    statusId: 1,
    executorId: 0,
    priority: {
      id: 1,
      name: 'Низкий',
    },
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'priority' && e.target instanceof HTMLSelectElement) {
      const options = e.target as HTMLSelectElement;
      const selectedIndex = options[e.target.selectedIndex] as
        | HTMLOptionElement
        | HTMLOptGroupElement;
      const text: string = (selectedIndex as HTMLOptionElement).text;

      setFormData((prev) => ({
        ...prev,
        priority: {
          id: parseInt(value),
          name: text,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === 'statusId' || name === 'executorId'
            ? parseInt(value)
            : value,
      }));
    }

    onChange?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formMain}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="name">Название</label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="description">Описание</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          {task && (
            <>
              <div className={styles.formField}>
                <label htmlFor="status">Статус</label>

                <select
                  id="status"
                  name="statusId"
                  value={formData.statusId}
                  onChange={handleChange}
                >
                  <option value="1">{BID_STATUS.OPENED}</option>

                  <option value="2">{BID_STATUS.IN_PROGRESS}</option>

                  <option value="3">{BID_STATUS.COMPLETED}</option>

                  <option value="4">{BID_STATUS.REQUIRES_CLARIFICATION}</option>

                  <option value="5">{BID_STATUS.POSTPONED}</option>

                  <option value="6">{BID_STATUS.CLOSED}</option>
                </select>
              </div>

              <div className={styles.formField}>
                <label htmlFor="priority">Приоритет</label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority?.id}
                  onChange={handleChange}
                >
                  <option value="1">Не указан</option>

                  <option value="2">Низкий</option>

                  <option value="3">Средний</option>

                  <option value="4">Высокий</option>
                </select>
              </div>

              <div className={styles.formField}>
                <label htmlFor="executor">Исполнитель</label>

                <select
                  id="executor"
                  name="executorId"
                  value={formData.executorId}
                  onChange={handleChange}
                >
                  <option value="0">Не назначен</option>

                  <option value="1">Александр Волошин</option>

                  <option value="2">Менеджеров Сергей</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>
            {task ? 'Сохранить' : 'Создать'}
          </button>
        </form>
      </div>

      {task && (
        <div className={styles.formSidebar}>
          <div className={styles.sidebarSection}>
            <h3>Приоритет</h3>

            <span className={styles.priorityBadge}>
              {formData.priority?.name || 'Не указан'}
            </span>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Исполнитель</h3>

            <span>{formData.executorName || 'Не назначен'}</span>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Создана</h3>

            <span>
              {formData.createdAt
                ? new Date(formData.createdAt).toLocaleDateString()
                : '-'}
            </span>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Статус</h3>

            <span
              className={styles.statusBadge}
              style={{ backgroundColor: formData.statusRgb }}
            >
              {formData.statusName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
