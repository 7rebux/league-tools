import React from 'react';
import { Meta } from '@storybook/react';
import Skeleton from './Skeleton';

export default {
  title: 'Library/Skeleton',
  component: Skeleton,
} as Meta;

export const Default = () => (
  <Skeleton width={200} height={200} />
);
