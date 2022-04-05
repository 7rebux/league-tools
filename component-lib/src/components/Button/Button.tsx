import React from 'react';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  onClick,
}) => {
  return (
    <div className={styles[variant]} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
};

export default Button;
