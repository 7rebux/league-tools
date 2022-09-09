import React from 'react';

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

export default {
  title: 'Library/Checkbox',
  component: Checkbox,
} as Meta;

export const Default: Story<CheckboxProps> = (args) => (
  <Checkbox
    {...args}
    onChange={(value) => action('onChange')({ value: value })}
  />
);
Default.args = {
  title: 'Checkbox',
};
