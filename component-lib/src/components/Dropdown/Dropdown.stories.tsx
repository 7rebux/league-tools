import React from 'react';

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dropdown from './Dropdown';
import { DropdownProps } from './Dropdown.types';

export default {
  title: 'Library/Dropdown',
  component: Dropdown,
} as Meta;

const items = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6'];

const Template: Story<DropdownProps> = (args) => (
  <Dropdown {...args} onChange={(item) => action('onChange')({ item: item })} />
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
  initialItem: 'Test2',
  searchBar: true,
};
