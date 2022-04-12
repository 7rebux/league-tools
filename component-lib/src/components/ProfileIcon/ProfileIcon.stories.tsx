import React from 'react';

import { Meta, Story } from '@storybook/react';

import ProfileIcon from './ProfileIcon';
import { ProfileIconProps } from './ProfileIcon.types';

export default {
  title: 'Library/ProfileIcon',
  component: ProfileIcon,
  argTypes: {
    id: {
      type: 'number',
    },
    availability: {
      control: {
        type: 'select',
      },
      options: ['chat', 'away', 'dnd', 'offline', 'mobile'],
    },
  },
} as Meta;

export const Default: Story<ProfileIconProps> = (args) => (
  <ProfileIcon {...args} />
);
Default.args = {
  id: 7,
};

export const Availability: Story<ProfileIconProps> = (args) => (
  <ProfileIcon {...args} />
);
Availability.args = {
  id: 3899,
  availability: 'chat',
};
