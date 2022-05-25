import React from 'react';

import { Meta, Story } from '@storybook/react';

import FilterSearchBar from './FilterSearchBar';
import { FilterSearchBarProps } from './FilterSearchBar.types';
import FilterDropdownStories from '../FilterDropdown/FilterDropdown.stories';

export default {
  title: 'Library/Filter/SearchBar',
  component: FilterDropdownStories,
} as Meta;

export const Default: Story<FilterSearchBarProps> = (args) => (
  <FilterSearchBar {...args} />
);
Default.args = {
  placeholder: 'Search..',
};
