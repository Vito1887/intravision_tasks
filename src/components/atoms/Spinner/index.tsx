import React from 'react';

import styles from './styles.module.css';

export const Spinner: React.FC = () => (
  <div className={styles.spinnerOverlay}>
    <div className={styles.spinner} />
  </div>
);
