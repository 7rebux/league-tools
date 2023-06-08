import React from 'react';
import { Meta } from '@storybook/react';
import Select from './Select';

export default {
  title: 'Library/Select',
  component: Select,
} as Meta;

const fruits = [
  { name: 'Banana', value: 'banana' },
  { name: 'Apple', value: 'apple' },
  { name: 'Carott', value: 'carott' },
  { name: 'Tomato', value: 'tomato' },
]

export const Default = () => (
  <Select
    title='Select fruit...'
    items={fruits}
    initialItem={fruits[1]} 
  />
);
