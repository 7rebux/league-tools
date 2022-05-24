import React, { useState } from 'react';

import { FilterCheckboxProps } from './FilterCheckbox.types';
import styles from './FilterCheckbox.module.scss';

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  title,
  initialState = false,
  onChange,
}) => {
  return (
    <div className={styles.filterCheckbox}>
      <span className={styles.title}>{title}</span>
      <input
        className={styles.box}
        type='checkbox'
        defaultChecked={initialState}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterCheckbox;
