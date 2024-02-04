import React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import styles from './Switch.module.scss';

interface Props {
  initialValue?: boolean;
  onValueChange?(value: boolean): void;
}

const Switch: React.FC<Props> = ({ initialValue = false, onValueChange }) => {
  return (
    <RadixSwitch.Root
      className={styles.root}
      defaultChecked={initialValue}
      onCheckedChange={onValueChange}
    >
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );
};

export default Switch;
