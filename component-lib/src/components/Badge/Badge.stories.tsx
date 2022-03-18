import React from 'react';

import { Meta, Story } from '@storybook/react';

import Badge from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Library/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});

export const Custom = Template.bind({});
Custom.args = {
  text: 'Custom text',
  icon: 'https://raw.githubusercontent.com/7rebux/League-Tools/main/public/assets/level.png',
};
