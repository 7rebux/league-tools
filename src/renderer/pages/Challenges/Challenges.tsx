import { 
  Button, 
  Textbox, 
  Checkbox, 
  Dropdown 
} from 'component-lib';
import React, { 
  useEffect, 
  useState, 
  useMemo 
} from 'react';
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import './Challenges.scss';

const UPDATE_ENDPOINT = '/lol-challenges/v1/update-player-preferences';
const CHALLENGES_ENDPOINT = '/lol-challenges/v1/challenges/local-player';
const TOKEN_ICON_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/challenges/config';

const TOKEN_TIERS = [
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

type TokenTier = typeof TOKEN_TIERS[number];

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
  const [tokens, setTokens] = useState<Token[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'All' | TokenTier>('All');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);

  const filter1 = useMemo(() => tokens.filter(({ name }) => 
    name.toLowerCase().includes(nameFilter.toLowerCase())
  ), [tokens, nameFilter]);

  const filter2 = useMemo(() => {
    if (tierFilter === 'All')
      return filter1;
    else
      return filter1.filter(({ tier }) => tier === tierFilter);
  }, [filter1, tierFilter]);

  const filter3 = useMemo(() => {
    if (legacyFilter)
      return filter2;
    else
      return filter2.filter(({ legacy }) => legacy === false);
  }, [filter2, legacyFilter]);

  const updateTokens = (ids: number[]) => {
    request('POST', UPDATE_ENDPOINT, { 
      'challengeIds': ids,
      'title': lcuData.challenges.title === -1 ? '' : lcuData.challenges.title.toString(),
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
          legacy: x.retireTimestamp != 0
        }));

      console.log('Fetched %d tokens', tokens.length);

      setTokens(tokens);
    };

    fetchChallenges();
  }, []);

  return (
    <div className='challengesPage'>
      <div className='sidebar'>
        <div className='showcase'>
          <div className='activeTokens'>
            {lcuData.challenges.tokens.length > 0 &&
              lcuData.challenges.tokens.map((token, index) =>
                <img key={index} src={getTokenIcon(token.id, token.tier)} />
              )
            }
          </div>
          <Button 
            title='Clear' 
            onClick={() => updateTokens([])} 
          />
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
            src={getTokenIcon(x.id, x.tier)}
            onClick={() => updateTokens([x.id, x.id, x.id])}
          />
        )}
      </div>
    </div>
  );
};

export default Challenges;
