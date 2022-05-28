import React, { useState, useMemo, Key } from 'react';

import { FilterDropdownProps } from './FilterDropdown.types';
import styles from './FilterDropdown.module.scss';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FilterCheckbox, FilterSearchBar } from '..';

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  searchBar = false,
  items,
  onChange,
}) => {
  const [extended, setExtended] = useState<Boolean>(false);
  const [filter, setFilter] = useState<string>('');

  const filtered = useMemo(
    () =>
      items.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
      ),
    [items, filter]
  );

  const handleChange = (itemKey: Key, value: boolean) => {
    const item = items.find(({ key }) => key === itemKey);
    item.value = value;

    onChange(items);
  };

  const icon = extended ? (
    <AiFillCaretUp color='#fff' />
  ) : (
    <AiFillCaretDown color='#fff' />
  );

  return (
    <div className={styles.filterDropdown}>
      <div
        className={styles.head}
        data-custom={extended}
        onClick={() => setExtended(!extended)}
      >
        <span className={styles.title}>{title}</span>
        {icon}
      </div>
      {extended && (
        <div className={styles.items}>
          {searchBar && (
            <FilterSearchBar onInput={(value) => setFilter(value)} />
          )}
          {filtered.map(({ title, key, value }) => (
            <FilterCheckbox
              onChange={(value) => handleChange(key, value)}
              title={title}
              key={key}
              initialState={value}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
