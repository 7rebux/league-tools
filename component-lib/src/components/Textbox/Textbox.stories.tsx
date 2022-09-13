import React from 'react';

import { Meta, Story } from '@storybook/react';

import Textbox from './Textbox';
import { TextboxProps } from './Textbox.types';

export default {
  title: 'Library/Textbox',
  component: Textbox,
} as Meta;

export const Default: Story<TextboxProps> = (args) => <Textbox {...args} />;
Default.args = {
  placeholder: 'Enter text..',
};
