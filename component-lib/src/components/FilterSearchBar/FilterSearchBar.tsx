import React, { useState } from 'react';

import { FilterSearchBarProps } from './FilterSearchBar.types';
import styles from './FilterSearchBar.module.scss';

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  placeholder = 'Search..',
}) => {
  const [input, setInput] = useState<string>('');

  return (
    <input
      className={styles.filterSearchBar}
      value={input}
      onInput={(e) => setInput((e.target as HTMLInputElement).value)}
      placeholder={placeholder}
    />
  );
};

export default FilterSearchBar;
