import React, { useState } from 'react';
import { Button, Select, Textbox } from '../../components';
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { toast } from 'react-hot-toast';
import './Rank.scss';

const ENDPOINT = '/lol-chat/v1/me';

type Queue =
  | 'RANKED_SOLO_5x5'
  | 'RANKED_FLEX_SR'
  | 'RANKED_FLEX_TT'
  | 'RANKED_TFT'
  | 'RANKED_TFT_TURBO'
  | 'RANKED_TFT_PAIRS'
  | 'RANKED_TFT_DOUBLE_UP';

const QUEUES: { name: string; value: Queue }[] = [
  { name: 'Solo/Duo', value: 'RANKED_SOLO_5x5' },
  { name: 'Flex 5v5', value: 'RANKED_FLEX_SR' },
  { name: 'Flex 3v3', value: 'RANKED_FLEX_TT' },
  { name: 'TFT', value: 'RANKED_TFT' },
  { name: 'TFT Hyper Roll', value: 'RANKED_TFT_TURBO' },
  { name: 'TFT Pairs', value: 'RANKED_TFT_PAIRS' },
  { name: 'TFT Double Up', value: 'RANKED_TFT_DOUBLE_UP' },
];

type Tier =
  | 'UNRANKED'
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

const TIERS: { name: string; value: Tier }[] = [
  { name: 'Unranked', value: 'UNRANKED' },
  { name: 'Iron', value: 'IRON' },
  { name: 'Bronze', value: 'BRONZE' },
  { name: 'Silver', value: 'SILVER' },
  { name: 'Gold', value: 'GOLD' },
  { name: 'Platinum', value: 'PLATINUM' },
  { name: 'Emerald', value: 'EMERALD' },
  { name: 'Diamond', value: 'DIAMOND' },
  { name: 'Master', value: 'MASTER' },
  { name: 'Grandmaster', value: 'GRANDMASTER' },
  { name: 'Challenger', value: 'CHALLENGER' },
];

type Division = 'NA' | 'I' | 'II' | 'III' | 'IV';

const DIVISIONS: { name: string; value: Division }[] = [
  { name: 'None', value: 'NA' },
  { name: 'I', value: 'I' },
  { name: 'II', value: 'II' },
  { name: 'III', value: 'III' },
  { name: 'IV', value: 'IV' },
];

const Rank: React.FC = () => {
  const lcuData = useLcuData();

  const [queue, setQueue] = useState<Queue>(lcuData.me.lol.rankedLeagueQueue);
  const [rankedTier, setRankedTier] = useState<Tier>(
    lcuData.me.lol.rankedLeagueTier,
  );
  const [divisison, setDivision] = useState<Division>(
    lcuData.me.lol.rankedLeagueDivision,
  );

  const [challengesTier, setChallengesTier] = useState<Tier>(
    lcuData.me.lol.challengeCrystalLevel,
  );
  const points = React.createRef<HTMLInputElement>();

  const updateRank = (queue: Queue, tier: Tier, division: Division) => {
    request('PUT', ENDPOINT, {
      lol: {
        rankedLeagueQueue: queue,
        rankedLeagueTier: tier,
        rankedLeagueDivision: division,
      },
    }).then(() => {
      toast.success('Updated chat rank');
      console.log('Set chat rank to', {
        queue: queue,
        tier: tier,
        division: division,
      });
    });
  };

  const updateChallengesRank = (tier: Tier, points: string) => {
    request('PUT', ENDPOINT, {
      lol: {
        challengeCrystalLevel: tier,
        challengePoints: points,
      },
    }).then(() => {
      toast.success('Updated challenges rank');
      console.log('Set challenges rank to', { tier: tier, points: points });
    });
  };

  return (
    <div className='rank-page'>
      <div className='wrapper'>
        <div className='section'>
          <Select
            items={QUEUES}
            initialItem={QUEUES.find(({ value }) => value === queue)}
            onValueChange={(value: Queue) => setQueue(value)}
          />
          <Select
            items={TIERS}
            initialItem={TIERS.find(({ value }) => value === rankedTier)}
            onValueChange={(value: Tier) => setRankedTier(value)}
          />
          <Select
            items={DIVISIONS}
            initialItem={DIVISIONS.find(({ value }) => divisison === value)}
            onValueChange={(value: Division) => setDivision(value)}
          />
        </div>
        <div className='section'>
          <Button
            title='Apply'
            onClick={() => {
              updateRank(queue, rankedTier, divisison);
            }}
          />
        </div>
      </div>
      <div className='wrapper'>
        <div className='section'>
          <Select
            items={TIERS}
            initialItem={TIERS.find(({ value }) => value === challengesTier)}
            onValueChange={(value: Tier) => setChallengesTier(value)}
          />
          <Textbox
            defaultValue={lcuData.me.lol.challengePoints.toString()}
            ref={points}
          />
        </div>
        <div className='section'>
          <Button
            title='Apply'
            onClick={() =>
              updateChallengesRank(challengesTier, points.current.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Rank;
