import React, { useState } from 'react';

import { FilterSearchBarProps } from './FilterSearchBar.types';
import styles from './FilterSearchBar.module.scss';

const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  placeholder = 'Search..',
  onInput,
}) => {
  const [input, setInput] = useState<string>('');

  function handleInput(e) {
    const value = (e.target as HTMLInputElement).value;

    setInput(value);
    onInput(value);
  }

  return (
    <input
      className={styles.filterSearchBar}
      value={input}
      onInput={(e) => handleInput(e)}
      placeholder={placeholder}
    />
  );
};

export default FilterSearchBar;
