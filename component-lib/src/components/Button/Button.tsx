import React from 'react';

import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';

function Button({ title, onClick }: ButtonProps) {
  return (
    <div className={styles.button} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
}

export default Button;
