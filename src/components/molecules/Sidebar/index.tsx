import React from 'react';

import { Logo } from 'src/components/atoms/icons/Logo';

import styles from './styles.module.css';

import { MENU_ITEMS } from './data';

export const Sidebar: React.FC = () => (
  <div className={styles.sidebar}>
    <div className={styles.logo}>
      <Logo />
    </div>

    <div className={styles.nav}>
      {MENU_ITEMS.map((item) => (
        <div key={item.id} className={styles.menuItem}>
          <div className={styles.icon}>{item.icon}</div>

          <p className={styles.name}>{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);
