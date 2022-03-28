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
  icon: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3041_mage_t2_mejaissoulstealer.png',
};

export const Both = Template.bind({});
Both.args = {
  text: 'Title',
  icon: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3041_mage_t2_mejaissoulstealer.png',
};
