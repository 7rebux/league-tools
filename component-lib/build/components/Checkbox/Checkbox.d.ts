import React from 'react';
import { CheckboxProps } from './Checkbox.types';
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & React.RefAttributes<HTMLDivElement>>;
export default Checkbox;
