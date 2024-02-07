import { Button, Textbox, Switch, Select, Skeleton } from '../../components';
import React, { useEffect, useState, useMemo } from 'react';
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { toast } from 'react-hot-toast';
import './Challenges.scss';

const UPDATE_ENDPOINT = '/lol-challenges/v1/update-player-preferences';
const CHALLENGES_ENDPOINT = '/lol-challenges/v1/challenges/local-player';
const TOKEN_ICON_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/challenges/config';

type TokenTier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

const TOKEN_TIERS: { name: string; value: TokenTier | 'ALL' }[] = [
  { name: 'All', value: 'ALL' },
  { name: 'Iron', value: 'IRON' },
  { name: 'Bronze', value: 'BRONZE' },
  { name: 'Silver', value: 'SILVER' },
  { name: 'Gold', value: 'GOLD' },
  { name: 'Platinum', value: 'PLATINUM' },
  { name: 'Diamond', value: 'DIAMOND' },
  { name: 'Master', value: 'MASTER' },
  { name: 'Grandmaster', value: 'GRANDMASTER' },
  { name: 'Challenger', value: 'CHALLENGER' },
];

type Token = {
  id: number;
  name: string;
  tier: TokenTier;
  legacy: boolean;
};

const getTokenIcon = (id: number, tier: TokenTier) =>
  `${TOKEN_ICON_URL}/${id}/tokens/${tier.toLowerCase()}.png`;

const Challenges: React.FC = () => {
  const lcuData = useLcuData();
  const [loading, setLoading] = useState<boolean>(true);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'ALL' | TokenTier>('ALL');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);

  const filter1 = useMemo(
    () =>
      tokens.filter(({ name }) =>
        name.toLowerCase().includes(nameFilter.toLowerCase()),
      ),
    [tokens, nameFilter],
  );

  const filter2 = useMemo(() => {
    if (tierFilter === 'ALL') return filter1;
    return filter1.filter(({ tier }) => tier === tierFilter);
  }, [filter1, tierFilter]);

  const filter3 = useMemo(() => {
    if (legacyFilter) return filter2;
    return filter2.filter(({ legacy }) => legacy === false);
  }, [filter2, legacyFilter]);

  const updateTokens = (token?: Token) => {
    request('POST', UPDATE_ENDPOINT, {
      challengeIds: token ? [token.id, token.id, token.id] : [],
      title:
        lcuData.challenges.title === -1
          ? ''
          : lcuData.challenges.title.toString(),
    }).then(() => {
      if (token) {
        toast.success(`Updated tokens to "${token.name}"`);
        console.log('Set tokens to 3x', token.id);
      } else {
        toast.success('Cleared tokens');
        console.log('Cleared tokens');
      }
    });
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      const response = await request('GET', CHALLENGES_ENDPOINT);

      const tokens = Object.values(response)
        .filter((x: any) => x.currentLevel !== 'NONE')
        .map((x: any) => ({
          id: x.id,
          name: x.name,
          tier: x.currentLevel,
          legacy: x.retireTimestamp !== 0,
        }));

      console.log('Fetched %d tokens', tokens.length);

      setTokens(tokens);
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  return (
    <div className='challengesPage'>
      <div className='sidebar'>
        <div className='showcase'>
          <div className='activeTokens'>
            {lcuData.challenges.tokens.length > 0 &&
              lcuData.challenges.tokens.map((token) => (
                <img
                  src={getTokenIcon(token.id, token.tier)}
                  alt={`Token ${token.id}`}
                  title={token.name}
                />
              ))}
          </div>
          <Button title='Clear' onClick={() => updateTokens()} />
        </div>
        <div className='filter'>
          <Textbox
            placeholder='Search..'
            onInput={(event) =>
              setNameFilter((event.target as HTMLInputElement).value)
            }
          />
          <div className='settings'>
            <Select
              items={TOKEN_TIERS}
              initialItem={TOKEN_TIERS.find(
                ({ value }) => value === tierFilter,
              )}
              onValueChange={(value: TokenTier | 'ALL') => setTierFilter(value)}
            />
            <div className='wrapper'>
              <span>Legacy</span>
              <Switch
                initialValue={legacyFilter}
                onValueChange={setLegacyFilter}
              />
            </div>
          </div>
          <span className='info'>
            Showing <b>{filter3.length}</b> / {tokens.length} tokens
          </span>
        </div>
      </div>
      <div className='challenges'>
        {loading
          ? Array.from({ length: 300 }, () => (
              <Skeleton width={85} height={85} borderRadius={'100%'} />
            ))
          : filter3.map((x: Token) => (
              <img
                key={x.id}
                src={getTokenIcon(x.id, x.tier)}
                onClick={() => updateTokens(x)}
                alt={`Token ${x.id}`}
                title={x.name}
              />
            ))}
      </div>
    </div>
  );
};

export default Challenges;
