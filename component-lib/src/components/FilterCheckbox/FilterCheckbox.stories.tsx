import React from 'react';

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FilterCheckbox from './FilterCheckbox';
import { FilterCheckboxProps } from './FilterCheckbox.types';

export default {
  title: 'Library/Filter/Checkbox',
  component: FilterCheckbox,
} as Meta;

export const Default: Story<FilterCheckboxProps> = (args) => (
  <FilterCheckbox
    {...args}
    onChange={(value) => action('onChange')({ value: value })}
  />
);
Default.args = {
  title: 'Checkbox',
};
