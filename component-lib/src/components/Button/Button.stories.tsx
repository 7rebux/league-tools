import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Library/Button',
  component: Button,
} as Meta;

const TITLE = 'Title';

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: TITLE,
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: TITLE,
  variant: 'secondary',
};
