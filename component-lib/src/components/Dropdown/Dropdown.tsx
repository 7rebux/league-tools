import React, { useState, useMemo, Key } from 'react';

import { DropdownProps } from './Dropdown.types';
import styles from './Dropdown.module.scss';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Textbox } from '..';

const Dropdown: React.FC<DropdownProps> = ({
  items,
  initialItem = 'Select..',
  searchBar = false,
  onChange,
}) => {
  const [extended, setExtended] = useState<Boolean>(false);
  const [selected, setSelected] = useState<string>(initialItem);
  const [filter, setFilter] = useState<string>('');

  const filtered = useMemo(
    () =>
      items.filter((title) =>
        title.toLowerCase().includes(filter.toLowerCase())
      ),
    [items, filter]
  );

  const icon = extended ? (
    <AiFillCaretUp color='#fff' />
  ) : (
    <AiFillCaretDown color='#fff' />
  );

  const handleChange = (item: string) => {
    if (selected === item) return;

    setSelected(item);
    onChange(item);
    setExtended(false); // not working
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
          {searchBar && <Textbox onInput={(value) => setFilter(value)} />}
          {filtered.map((title) => (
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
