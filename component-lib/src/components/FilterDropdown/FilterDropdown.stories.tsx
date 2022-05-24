import React from 'react';

import { Meta, Story } from '@storybook/react';

import FilterDropdown from './FilterDropdown';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { FilterDropdownProps } from './FilterDropdown.types';

export default {
  title: 'Library/FilterDropdown',
  component: FilterDropdown,
} as Meta;

export const Default: Story<FilterDropdownProps> = (args) => (
  <FilterDropdown {...args}>
    <FilterCheckbox title='Test1' />
    <FilterCheckbox title='Test2' />
    <FilterCheckbox title='Test3' />
    <FilterCheckbox title='Test4' />
  </FilterDropdown>
);
Default.args = {
  title: 'Dropdown',
};
