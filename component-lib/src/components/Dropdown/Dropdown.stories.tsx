import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from './Dropdown';
import { DropdownProps } from './Dropdown.types';

export default {
  title: 'Library/Dropdown',
  component: Dropdown,
} as Meta;

export const Default: Story<DropdownProps> = (args) => (
  <Dropdown 
    {...args} 
    onChange={(value) => action('onChange')({ value: value })} 
  />
);
Default.args = {
  items: ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6'],
  initialItem: 'Test4',
};
