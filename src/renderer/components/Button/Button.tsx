import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

const Button = React.forwardRef<
  HTMLDivElement,
  ButtonProps & React.HTMLAttributes<HTMLDivElement>
>(({ title, variant = 'primary', ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={styles[variant]}>
      <span>{title}</span>
    </div>
  );
});

export default Button;
