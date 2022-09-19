import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = React.forwardRef<
  HTMLDivElement,
  CheckboxProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
>(({title, initialState = false, onChange, ...props}, ref) => {
  return (
    <div 
      {...props}
      ref={ref}
      className={styles.checkbox}
    >
      <span>{title}</span>
      <input
        type='checkbox'
        defaultChecked={initialState}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
    </div>
  );
});

export default Checkbox;
