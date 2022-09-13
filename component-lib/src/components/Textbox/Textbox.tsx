import React, { useState } from 'react';

import { TextboxProps } from './Textbox.types';
import styles from './Textbox.module.scss';

const Textbox: React.FC<TextboxProps> = ({ placeholder, onInput }) => {
  const [input, setInput] = useState<string>('');

  function handleInput(e) {
    const value = (e.target as HTMLInputElement).value;

    setInput(value);
    onInput(value);
  }

  return (
    <input
      className={styles.textbox}
      value={input}
      onInput={(e) => handleInput(e)}
      placeholder={placeholder}
    />
  );
};

export default Textbox;
