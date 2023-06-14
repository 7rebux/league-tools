import React from 'react';
import { Meta, Story } from '@storybook/react';
import Badge from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Library/Badge',
  component: Badge,
} as Meta;

const RANK_CREST_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/';
const ICON_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/3041_mage_t2_mejaissoulstealer.png';
const TEXT = 'Title';

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: TEXT,
};

export const Ranks = () => (
  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', backgroundColor: '#222222', padding: 15 }}>
    <Badge text='Unranked' backgroundColor='#404241' icon={`${RANK_CREST_URL}unranked.png`} />
    <Badge text='Iron' backgroundColor='#6b6b64' icon={`${RANK_CREST_URL}iron.png`} />
    <Badge text='Bronze' backgroundColor='#a46628' icon={`${RANK_CREST_URL}bronze.png`} />
    <Badge text='Silver' backgroundColor='#b5b5b5' icon={`${RANK_CREST_URL}silver.png`} />
    <Badge text='Gold' backgroundColor='#d6a738' icon={`${RANK_CREST_URL}gold.png`} />
    <Badge text='Platinum' backgroundColor='#80aba4' icon={`${RANK_CREST_URL}platinum.png`} />
    <Badge text='Diamond' backgroundColor='#71b0d1' icon={`${RANK_CREST_URL}diamond.png`} />
    <Badge text='Master' backgroundColor='#7840a3' icon={`${RANK_CREST_URL}master.png`} />
    <Badge text='Grandmaster' backgroundColor='#9e3342' icon={`${RANK_CREST_URL}grandmaster.png`} />
    <Badge text='Challenger' backgroundColor='#288fc7' icon={`${RANK_CREST_URL}challenger.png`} />
  </div>
);

export const Icon = Template.bind({});
Icon.args = {
  icon: ICON_URL,
};

export const Both = Template.bind({});
Both.args = {
  text: TEXT,
  icon: ICON_URL,
};
