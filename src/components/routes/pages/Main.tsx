import React from 'react';

import { TaskList } from 'src/components/TaskList';
import { Sidebar } from 'src/components/molecules/Sidebar';
import { Page } from 'src/components/organisms/Page';

import styles from './styles.module.css';

const Main: React.FC = () => (
  <Page template="entry">
    <Sidebar />

    <div className={styles.main}>
      <TaskList />
    </div>
  </Page>
);

export default Main;
