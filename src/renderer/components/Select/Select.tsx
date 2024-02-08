import React, { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { AiOutlineCheck, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styles from './Select.module.scss';

type Item = {
  name: string;
  value: string;
};

interface Props {
  initialItem?: Item;
  placeholder?: string;
  items: Item[];
  onValueChange?(value: string): void;
}

const Select: React.FC<Props> = ({
  initialItem,
  items,
  onValueChange,
  placeholder = 'Select...',
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RadixSelect.Root
      defaultValue={initialItem?.value}
      onOpenChange={setOpen}
      onValueChange={onValueChange}
    >
      <RadixSelect.Trigger className={styles.trigger}>
        <RadixSelect.Value placeholder={placeholder} />
        {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position='popper'>
          <RadixSelect.Viewport>
            {items.map((item) => (
              <RadixSelect.Item
                key={item.value}
                className={styles.item}
                value={item.value}
              >
                <RadixSelect.ItemText>{item.name}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <AiOutlineCheck />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
