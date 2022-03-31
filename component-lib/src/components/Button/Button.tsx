import React from 'react';

import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';

function Button({ title, variant = 'primary', onClick }: ButtonProps) {
  return (
    <div className={styles[variant]} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
}

export default Button;
