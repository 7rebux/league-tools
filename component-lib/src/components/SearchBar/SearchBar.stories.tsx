import React from 'react';

import { Meta, Story } from '@storybook/react';

import SearchBar from './SearchBar';
import { SearchBarProps } from './SearchBar.types';

export default {
  title: 'Library/SearchBar',
  component: SearchBar,
} as Meta;

export const Default: Story<SearchBarProps> = (args) => <SearchBar {...args} />;
Default.args = {
  placeholder: 'Search..',
};
