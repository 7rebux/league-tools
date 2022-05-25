import React from 'react';

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FilterCheckbox from './FilterCheckbox';
import { FilterCheckboxProps } from './FilterCheckbox.types';

export default {
  title: 'Library/Filter/Checkbox',
  component: FilterCheckbox,
} as Meta;

// TODO working but shit
export const Default: Story<FilterCheckboxProps> = (args) => (
  <FilterCheckbox
    {...args}
    onChange={(event) =>
      action('onChange')({ event: event.currentTarget.checked })
    }
  />
);
Default.args = {
  title: 'Checkbox',
};
