import React from 'react';

import { Meta, Story } from '@storybook/react';

import Badge from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Library/Badge',
  component: Badge,
  argTypes: {
    text: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: 'Title',
};

export const Icon = Template.bind({});
Icon.args = {
  icon: 'https://raw.githubusercontent.com/7rebux/League-Tools/main/public/assets/level.png',
};

export const Both = Template.bind({});
Both.args = {
  text: 'Title',
  icon: 'https://raw.githubusercontent.com/7rebux/League-Tools/main/public/assets/level.png',
};
