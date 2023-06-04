import { Button, Textbox, Checkbox, Dropdown } from 'component-lib';
import React, { useEffect, useState, useMemo } from 'react'
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import './Challenges.scss';

const TOKEN_TIERS = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'] as const;

type TokenTier = typeof TOKEN_TIERS[number];

type Token = {
  id: number;
  name: string;
  level: TokenTier;
  legacy: boolean;
};

const getTokenIcon = (id: number, level: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/challenges/config/${id}/tokens/${level.toLowerCase()}.png`;

const updateTokens = (ids: number[]) => request('POST', '/lol-challenges/v1/update-player-preferences', { 'challengeIds': ids });

const Challenges: React.FC = () => {
  const lcuData = useLcuData();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'All' | TokenTier>('All');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);

  const filter1 = useMemo(
    () => tokens.filter((x) =>
      x.name.toLowerCase().includes(nameFilter.toLowerCase())
    ),
    [tokens, nameFilter]
  );
  const filter2 = useMemo(
    () => {
      if (tierFilter === 'All')
        return filter1
      else
        return filter1.filter((x) => x.level === tierFilter)
    },
    [filter1, tierFilter]
  );
  const filter3 = useMemo(
    () =>
      legacyFilter ? filter2 : filter2.filter((x) => x.legacy === false),
    [filter2, legacyFilter]
  );

  useEffect(() => {
    const fetchChallenges = async () => {
      const response = await request('GET', '/lol-challenges/v1/challenges/local-player');

      const challenges = Object.values(response)
        .filter((x: any) => x.currentLevel !== 'NONE')
        .map((x: any) => ({
          id: x.id,
          name: x.name,
          level: x.currentLevel,
          legacy: x.retireTimestamp != 0
        }));

      console.log('Fetched %d tokens', challenges.length);

      setTokens(challenges);
    }

    fetchChallenges();
  }, []);

  return (
    <div className='challengesPage'>
      <div className='sidebar'>
        <div className='showcase'>
          <div className='activeTokens'>
            {lcuData.challenges.tokens.length > 0 &&
              lcuData.challenges.tokens.map((token, index) =>
                <img key={index} src={getTokenIcon(token.id, token.level)} />
              )
            }
          </div>
          <Button title='Clear' onClick={() => updateTokens([])} />
        </div>
        <div className='filter'>
          <Textbox
            placeholder='Search..'
            onInput={(event) => setNameFilter((event.target as HTMLInputElement).value)}
          />
          <div className='settings'>
            <Dropdown
              items={['All', ...TOKEN_TIERS]}
              initialItem={tierFilter}
              onChange={(value: 'All' | TokenTier) => setTierFilter(value)}
            />
            <Checkbox
              initialState={legacyFilter}
              title='Legacy'
              onChange={(value) => setLegacyFilter(value)}
            />
          </div>
          <span className='info'>
            Showing <b>{filter3.length}</b> / {tokens.length} tokens
          </span>
        </div>
      </div>
      <div className='challenges'>
        {filter3.map((x: any) =>
          <img
            key={x.id}
            src={getTokenIcon(x.id, x.level)}
            onClick={() => updateTokens([x.id, x.id, x.id])}
          />
        )}
      </div>
    </div>
  );
};

export default Challenges;
