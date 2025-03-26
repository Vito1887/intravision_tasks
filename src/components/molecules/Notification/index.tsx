import React, { useEffect } from 'react';

import styles from './styles.module.css';

type NotificationProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>

      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
  );
};
