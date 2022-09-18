import React from 'react';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = React.forwardRef<
  HTMLDivElement,
  ButtonProps & React.HTMLAttributes<HTMLDivElement>
>(({title, variant = 'primary', ...props}, ref) => {
  return (
    <div 
      {...props}
      ref={ref}
      className={styles[variant]}
    >
      <span>{title}</span>
    </div>
  );
});

export default Button;
