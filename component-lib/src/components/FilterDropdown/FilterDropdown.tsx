import React, { PropsWithChildren, useState } from 'react';

import { FilterDropdownProps } from './FilterDropdown.types';
import styles from './FilterDropdown.module.scss';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import FilterSearchBar from '../FilterSearchBar';

const FilterDropdown: React.FC<PropsWithChildren<FilterDropdownProps>> = ({
  title,
  searchBar = false,
  children,
}) => {
  const [extended, setExtended] = useState<Boolean>(false);

  const icon = extended ? (
    <AiFillCaretUp color='#fff' />
  ) : (
    <AiFillCaretDown color='#fff' />
  );

  return (
    <div className={styles.filterDropdown}>
      <div className={styles.head} onClick={() => setExtended(!extended)}>
        <span className={styles.title}>{title}</span>
        {icon}
      </div>
      {extended && (
        <div className={styles.items}>
          {searchBar && <FilterSearchBar />}
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
