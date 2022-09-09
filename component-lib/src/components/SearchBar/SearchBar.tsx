import React, { useState } from 'react';

import { SearchBarProps } from './SearchBar.types';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC<SearchBarProps> = ({
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
      className={styles.searchBar}
      value={input}
      onInput={(e) => handleInput(e)}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
