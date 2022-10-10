import React from 'react';
import { Meta, Story } from '@storybook/react';
import Splashart from './Splashart';
import { SplashartProps } from './Splashart.types';

export default {
  title: 'Library/Splashart',
  component: Splashart,
} as Meta;

export const Default: Story<SplashartProps> = (args) => <Splashart {...args} />;
Default.args = {
  skinId: 55012,
};
