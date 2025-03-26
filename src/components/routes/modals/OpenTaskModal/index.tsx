import React from 'react';

import { TouchableOpacity } from 'src/components/atoms/TouchableOpacity';
import { ButtonTransparent } from 'src/components/atoms/buttons/ButtonTransparent';
import { Close } from 'src/components/atoms/icons/iteractions/Close';

import styles from './styles.module.css';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const OpenTaskModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <TouchableOpacity customStyles={styles.overlay} onClick={onClose}>
      <TouchableOpacity
        customStyles={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{title}</h2>

          <ButtonTransparent
            customStyles={styles.closeButton}
            onClick={onClose}
          >
            <Close />
          </ButtonTransparent>
        </div>

        <div className={styles.content}>{children}</div>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
