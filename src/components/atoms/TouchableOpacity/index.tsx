import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

import styles from './styles.module.css';

type Props = {
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  customStyles?: string;
};

export const TouchableOpacity: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  customStyles,
}) => (
  <button
    onClick={onClick}
    className={classNames(styles.wrapper, customStyles, {
      [styles.disabled]: disabled,
    })}
  >
    {children}
  </button>
);
