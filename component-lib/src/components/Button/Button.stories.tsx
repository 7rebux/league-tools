import React from 'react';

import { Meta, Story } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Button from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Library/Button',
  component: Button,
} as Meta;

export const Primary: Story<ButtonProps> = (args) => (
  <Button onClick={() => action('onClick')({})} {...args} />
);
Primary.args = {
  title: 'Title',
  variant: 'primary',
};

export const Secondary: Story<ButtonProps> = (args) => (
  <Button onClick={() => action('onClick')({})} {...args} />
);
Secondary.args = {
  title: 'Title',
  variant: 'secondary',
};
