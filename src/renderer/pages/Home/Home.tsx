import { Badge, SummonerIcon } from 'component-lib';
import React from 'react';
import { useLcuData } from '../../components/LcuContext';
import './Home.scss';

const RANK_CREST_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/';
const COLORS = new Map<string, string>([
    ['UNRANKED',    '#404241'],
    ['IRON',        '#6b6b64'],
    ['BRONZE',      '#a46628'],
    ['SILVER',      '#b5b5b5'],
    ['GOLD',        '#d6a738'],
    ['PLATINUM',    '#80aba4'],
    ['DIAMOND',     '#71b0d1'],
    ['MASTER',      '#7840a3'],
    ['GRANDMASTER', '#9e3342'],
    ['CHALLENGER',  '#1298e0'],
]);

const Home: React.FC = () => {
  const lcuData = useLcuData();

  const getRankText = () => {
    const rank = lcuData.me.lol.rankedLeagueTier;
    const division = lcuData.me.lol.rankedLeagueDivision;

    return `${rank.charAt(0) + rank.substring(1).toLowerCase()} ${division}`;
  };

  return (
    <div className='home-page'>
      <div className='profile'>
        <SummonerIcon 
          iconId={lcuData.me.icon} 
          availability={lcuData.me.availability}
          size={90} 
        />
        <div className='info'>
          <div>{lcuData.me.name} <span className='id'>#{lcuData.me.gameTag}</span></div>
          <div className='badges'>
            <Badge 
              text={lcuData.me.lol.level.toString()}
              icon='assets/level.png'
            />
            <Badge 
              text={getRankText()} 
              icon={`${RANK_CREST_URL}${lcuData.me.lol.rankedLeagueTier.toLowerCase()}.png`}
              backgroundColor={COLORS.get(lcuData.me.lol.rankedLeagueTier)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
