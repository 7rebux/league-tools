import React, { useState } from 'react';

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
    <div className={styles.dropdown} data-extended={extended}>
      <div className={styles.head} onClick={() => setExtended(!extended)}>
        <span className={styles.title}>{selected}</span>
        {icon}
      </div>
      <div className={styles.items}>
        {items.map((title) => (
          <div
            className={styles.item}
            data-selected={selected === title}
            onClick={() => handleChange(title)}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
