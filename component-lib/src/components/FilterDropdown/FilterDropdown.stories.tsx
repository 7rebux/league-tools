import React from 'react';

import { Meta, Story } from '@storybook/react';

import FilterDropdown from './FilterDropdown';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { FilterDropdownProps } from './FilterDropdown.types';

export default {
  title: 'Library/Filter/Dropdown',
  component: FilterDropdown,
} as Meta;

const Template: Story<FilterDropdownProps> = (args) => (
  <FilterDropdown {...args}>
    <FilterCheckbox title='Test1' />
    <FilterCheckbox title='Test2' />
    <FilterCheckbox title='Test3' />
    <FilterCheckbox title='Test4' />
  </FilterDropdown>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Dropdown',
};

export const SearchBar = Template.bind({});
SearchBar.args = {
  title: 'Dropdown',
  searchBar: true,
};
