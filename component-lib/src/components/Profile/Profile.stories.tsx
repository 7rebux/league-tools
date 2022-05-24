import React from 'react';

import { Meta, Story } from '@storybook/react';

import Profile from './Profile';
import { ProfileProps } from './Profile.types';

export default {
  title: 'Library/Profile',
  component: Profile,
  argTypes: {
    iconId: {
      type: 'number',
    },
    availability: {
      control: {
        type: 'select',
      },
      options: ['chat', 'away', 'dnd', 'offline', 'mobile'],
    },
    level: {
      type: 'number',
    },
    region: {
      control: {
        type: 'select',
      },
      options: [
        'NA',
        'EUW',
        'EUNE',
        'KR',
        'BR',
        'JP',
        'RU',
        'OCE',
        'TR',
        'LAN',
        'LAS',
      ],
    },
  },
} as Meta;

export const Default: Story<ProfileProps> = (args) => <Profile {...args} />;
Default.args = {
  name: 'Summoner Name',
  riotId: '0000',
  iconId: 3231,
  availability: 'chat',
  level: 231,
  rank: 'Gold IV',
  region: 'EUW',
};
