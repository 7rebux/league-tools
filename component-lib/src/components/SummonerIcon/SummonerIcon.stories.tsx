import React from 'react';

import { Meta, Story } from '@storybook/react';

import SummonerIcon from './SummonerIcon';
import { SummonerIconProps } from './SummonerIcon.types';

export default {
  title: 'Library/SummonerIcon',
  component: SummonerIcon,
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
    size: {
      type: 'number',
    },
  },
} as Meta;

export const Default: Story<SummonerIconProps> = (args) => (
  <SummonerIcon {...args} />
);
Default.args = {
  iconId: 7,
  selected: true,
  favorite: false,
};

export const Profile: Story<SummonerIconProps> = (args) => (
  <SummonerIcon {...args} />
);
Profile.args = {
  iconId: 3899,
  availability: 'chat',
  selected: false,
  favorite: false,
};
