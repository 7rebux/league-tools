import React from 'react';

import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox: React.FC<CheckboxProps> = ({
  title,
  initialState = false,
  onChange,
}) => {
  return (
    <div className={styles.checkbox}>
      <span className={styles.title}>{title}</span>
      <input
        className={styles.box}
        type='checkbox'
        defaultChecked={initialState}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
    </div>
  );
};

export default Checkbox;
