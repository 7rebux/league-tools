import React from 'react';

import { Meta, Story } from '@storybook/react';

import FilterDropdown from './FilterDropdown';
import { FilterDropdownProps } from './FilterDropdown.types';

export default {
  title: 'Library/Filter/Dropdown',
  component: FilterDropdown,
} as Meta;

const items = [
  { title: 'Test1', key: 1, value: false },
  { title: 'Test2', key: 2, value: false },
  { title: 'Test3', key: 3, value: true },
  { title: 'Test4', key: 4, value: false },
];

const Template: Story<FilterDropdownProps> = (args) => (
  <FilterDropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Dropdown',
  items: items,
};

export const SearchBar = Template.bind({});
SearchBar.args = {
  title: 'Dropdown',
  items: items,
  searchBar: true,
};
