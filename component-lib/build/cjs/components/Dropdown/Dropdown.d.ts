import React from 'react';
import { DropdownProps } from './Dropdown.types';
declare const Dropdown: React.ForwardRefExoticComponent<DropdownProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & React.RefAttributes<HTMLDivElement>>;
export default Dropdown;
