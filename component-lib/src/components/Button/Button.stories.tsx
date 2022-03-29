import React from 'react';

import { Meta, Story } from '@storybook/react';

import Button from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Library/Button',
  component: Button,
} as Meta;

export const Primary: Story<ButtonProps> = (args) => <Button {...args} />;
Primary.args = {
  title: 'Title',
};
