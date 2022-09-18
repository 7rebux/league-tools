import React from 'react';
import { Meta, Story } from '@storybook/react';
import SummonerIcon from './SummonerIcon';
import { SummonerIconProps } from './SummonerIcon.types';

export default {
  title: 'Library/SummonerIcon',
  component: SummonerIcon,
} as Meta;

const Template: Story<SummonerIconProps> = (args) => <SummonerIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconId: 7,
};

export const Profile = Template.bind({});
Profile.args = {
  iconId: 3899,
  availability: 'dnd',
};
