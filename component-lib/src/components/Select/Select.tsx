import React, { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { AiOutlineCheck, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styles from './Select.module.scss';

type Item = {
  name: string;
  value: string;
};

interface Props {
  title?: string;
  initialItem: Item;
  items: Item[];
  onValueChange?(value: string): void;
};

const Select: React.FC<Props> = ({ initialItem, items, title, onValueChange }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RadixSelect.Root 
      defaultValue={initialItem.value} 
      onOpenChange={setOpen}
      onValueChange={onValueChange}
    >
      <RadixSelect.Trigger className={styles.trigger}>
        <RadixSelect.Value />
        {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content}>
          <RadixSelect.Group>
            {title && <RadixSelect.Label className={styles.label}>{title}</RadixSelect.Label>}
            {items.map(item =>
              <RadixSelect.Item className={styles.item} value={item.value}>
                <RadixSelect.ItemText>{item.name}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <AiOutlineCheck />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            )}
          </RadixSelect.Group>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
