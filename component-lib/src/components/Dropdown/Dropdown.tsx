import React, { useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styles from './Dropdown.module.scss';

const Dropdown = React.forwardRef<
  HTMLDivElement,
  DropdownProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
>(({items, initialItem, onChange, ...props}, ref) => {
  const [extended, setExtended] = useState<Boolean>(false);
  const [selected, setSelected] = useState<string>(initialItem);

  const iconColor = '#fff';
  const icon = extended ? (
    <AiFillCaretUp color={iconColor} />
  ) : (
    <AiFillCaretDown color={iconColor} />
  );

  const handleChange = (item: string) => {
    setExtended(false);

    if (selected === item) return;

    setSelected(item);
    onChange(item);
  };

  return (
    <div
      {...props}
      ref={ref}
      className={styles.dropdown} 
      data-extended={extended}
    >
      <div className={styles.head} onClick={() => setExtended(!extended)}>
        <span className={styles.title}>{selected}</span>
        {icon}
      </div>
      <div className={styles.items}>
        {items.map((title) => (
          <div
            className={styles.item}
            key={title}
            data-selected={selected === title}
            onClick={() => handleChange(title)}
          >
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Dropdown;
