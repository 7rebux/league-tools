import React from 'react';
import { Meta, Story } from '@storybook/react';
import Badge from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Library/Badge',
  component: Badge,
} as Meta;

const ICON_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3041_mage_t2_mejaissoulstealer.png';
const TEXT = 'Title';

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: TEXT,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: ICON_URL,
};

export const Both = Template.bind({});
Both.args = {
  text: TEXT,
  icon: ICON_URL,
};
