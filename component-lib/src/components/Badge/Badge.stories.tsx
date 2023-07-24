import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

type Story = StoryObj<typeof Badge>;

const rankColors = {
  'Unranked': '#404241',
  'Iron': '#6b6b64',
  'Bronze': '#a46628',
  'Silver': '#b5b5b5',
  'Gold': '#d6a738',
  'Platinum': '#80aba4',
  'Emerald': '#43ab3e',
  'Diamond': '#71b0d1',
  'Master': '#7840a3', 
  'Grandmaster': '#9e3342',
  'Challenger': '#288fc7',
};

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta<typeof Badge>;

export const Default: Story = {
  args: {
    text: 'Text',
  },
};

export const Icon: Story = {
  args: {
    icon: <img src='https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png' />,
    backgroundColor: '#c6c1c1'
  },
};

export const TextAndIcon: Story = {
  args: {
    text: 'Riot Games',
    icon: <img src='https://api.nuget.org/v3-flatcontainer/mikaeldui.riotgames.client/12.1.1.162/icon' />,
    backgroundColor: '#ce3535'
  },
};

export const Ranks: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {Object.entries(rankColors).map(([ rank, color ]) => (
        <Badge
          text={rank}
          icon={<img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${rank.toLowerCase()}.svg`} />}
          backgroundColor={color}
        />
      ))}
    </div>
  ),
};
