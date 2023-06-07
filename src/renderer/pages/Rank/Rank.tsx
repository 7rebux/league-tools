import React, { useState } from 'react';
import { 
  Button,
  Dropdown,
  Textbox,
} from 'component-lib';
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import './Rank.scss';

const ENDPOINT = '/lol-chat/v1/me'

const QUEUES = [
  'RANKED_SOLO_5x5',
  'RANKED_FLEX_SR',
  'RANKED_FLEX_TT',
  'RANKED_TFT',
  'RANKED_TFT_TURBO',
  'RANKED_TFT_PAIRS',
  'RANKED_TFT_DOUBLE_UP',
] as const;

const TIERS = [
  'UNRANKED',
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
] as const;

const DIVISIONS = [
  'NA',
  'I',
  'II',
  'III',
  'IV',
] as const;

type Queue = typeof QUEUES[number];
type Tier = typeof TIERS[number];
type Division = typeof DIVISIONS[number];

const Rank: React.FC = () => {
  const lcuData = useLcuData();

  const [queue, setQueue] = useState<Queue>(lcuData.me.lol.rankedLeagueQueue);
  const [rankedTier, setRankedTier] = useState<Tier>(lcuData.me.lol.rankedLeagueTier);
  const [divisison, setDivision] = useState<Division>(lcuData.me.lol.rankedLeagueDivision);

  const [challengesTier, setChallengesTier] = useState<Tier>(lcuData.me.lol.challengeCrystalLevel);
  const points = React.createRef<HTMLInputElement>();

  const updateRank = (
    queue: Queue, 
    tier: Tier, 
    division: Division
  ) => {
    request('PUT', ENDPOINT, {
      lol: {
        rankedLeagueQueue: queue,
        rankedLeagueTier: tier,
        rankedLeagueDivision: division,
      },
    });
  };

  const updateChallengesRank = (
    tier: Tier, 
    points: string
  ) => {
    request('PUT', ENDPOINT, {
      lol: {
        challengeCrystalLevel: tier,
        challengePoints: points,
      },
    });
  };

  return (
    <div className='rank-page'>
      <div className='wrapper'>
        <div className='section'>
          <Dropdown 
            initialItem={queue}
            items={Array.from(QUEUES)}
            onChange={(value: Queue) => setQueue(value)}
          />
          <Dropdown 
            initialItem={rankedTier}
            items={Array.from(TIERS)}
            onChange={(value: Tier) => setRankedTier(value)}
          />
          <Dropdown 
            initialItem={divisison}
            items={Array.from(DIVISIONS)}
            onChange={(value: Division) => setDivision(value)}
          />
        </div>
          <div className='section'>
          <Button 
            title='Apply'
            onClick={() => { updateRank(queue, rankedTier, divisison) }}
          />
        </div>
      </div>
      <div className='wrapper'>
        <div className='section'>
          <Dropdown 
            initialItem={challengesTier}
            items={Array.from(TIERS)}
            onChange={(value: Tier) => setChallengesTier(value)}
          />
          <Textbox 
            defaultValue={lcuData.me.lol.challengePoints.toString()}
            ref={points}
          />
        </div>
        <div className='section'>
          <Button 
            title='Apply'
            onClick={() => updateChallengesRank(challengesTier, points.current.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Rank;
