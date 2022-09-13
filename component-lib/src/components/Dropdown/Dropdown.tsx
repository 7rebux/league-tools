import React, { useState, useMemo, Key } from 'react';

import { DropdownProps } from './Dropdown.types';
import styles from './Dropdown.module.scss';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Dropdown: React.FC<DropdownProps> = ({
  items,
  initialItem = 'Select..',
  onChange,
}) => {
  const [extended, setExtended] = useState<Boolean>(false);
  const [selected, setSelected] = useState<string>(initialItem);

  const icon = extended ? (
    <AiFillCaretUp color='#fff' />
  ) : (
    <AiFillCaretDown color='#fff' />
  );

  const handleChange = (item: string) => {
    setExtended(false);

    if (selected === item) return;

    setSelected(item);
    onChange(item);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.head}
        data-custom={extended}
        onClick={() => setExtended(!extended)}
      >
        <span className={styles.title}>{selected}</span>
        {icon}
      </div>
      {extended && (
        <div className={styles.items}>
          {items.map((title) => (
            <div
              className={styles.item}
              data-custom={selected === title}
              onClick={() => handleChange(title)}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
