import React from 'react';
import { Meta, Story } from '@storybook/react';
import Textbox from './Textbox';

export default {
  title: 'Library/Textbox',
  component: Textbox,
} as Meta;

export const Default: Story = (args) => <Textbox {...args} />;
Default.args = {
  placeholder: 'Placeholder'
};
