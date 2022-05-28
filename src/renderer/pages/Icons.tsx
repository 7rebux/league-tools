import React, { useState, useEffect, useMemo, Key } from 'react';

import {
  FilterCheckbox,
  FilterDropdown,
  FilterSearchBar,
  SummonerIcon,
} from 'component-lib';

import './Icons.scss';

// if an icon is legacy it has no rarity
type Icon = {
  id: number;
  title: string;
  yearReleased: number;
  isLegacy: boolean;
  rarity?: number;
  eSportsEvent?: string;
  eSportsTeam?: string;
};

const ICON_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json';

const Icons: React.FC = () => {
  const [iconData, setIconData] = useState<Icon[]>();

  // filter data
  const rarities = [{ title: 'Test', key: 1, value: true }];
  const releaseYears = [{ title: 'Test', key: 2016, value: true }];
  const eSportsEvents = [
    { title: 'Test', key: 'League of Legends Masters Series', value: true },
  ];
  const eSportsTeams = [
    { title: 'Test', key: 'Hong Kong Esports', value: true },
  ];

  // filter states
  const [legacyFilter, setLegacyFilter] = useState<boolean>(false);
  const [rarityFilter, setRarityFilter] = useState<Key[]>(
    rarities.map((i) => i.key)
  );
  const [releaseYearFilter, setReleaseYearFilter] = useState<Key[]>(
    releaseYears.map((i) => i.key)
  );
  const [eSportsEventFilter, setESportsEventFilter] = useState<Key[]>(
    eSportsEvents.map((i) => i.key)
  );
  const [eSportsTeamFilter, setESportsTeamFilter] = useState<Key[]>(
    eSportsTeams.map((i) => i.key)
  );
  const [titleFilter, setTitleFilter] = useState<string>('');

  // filter chain
  const filter1 = useMemo(
    () =>
      legacyFilter
        ? iconData.filter((i) => i.isLegacy === legacyFilter)
        : iconData,
    [iconData, legacyFilter]
  );
  const filter2 = useMemo(
    () => filter1.filter((i) => rarityFilter.includes(i.rarity)),
    [filter1, rarityFilter]
  );
  const filter3 = useMemo(
    () => filter2.filter((i) => releaseYearFilter.includes(i.yearReleased)),
    [filter2, releaseYearFilter]
  );
  const filter4 = useMemo(
    () => filter3.filter((i) => eSportsEventFilter.includes(i.eSportsEvent)),
    [filter3, eSportsEventFilter]
  );
  const filter5 = useMemo(
    () => filter4.filter((i) => eSportsTeamFilter.includes(i.eSportsTeam)),
    [filter4, eSportsTeamFilter]
  );
  const filter6 = useMemo(
    () => filter5.filter((i) => i.title.includes(titleFilter)),
    [filter5, titleFilter]
  );

  const applyIcon = (id: number) => {
    // TODO send request to lcu here
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ICON_DATA_URL);
      const data = await response.json();
      const icons = data.map((icon: any) => ({
        id: icon.id,
        title: icon.title,
        yearReleased: icon.yearReleased,
        isLegacy: icon.isLegacy,
        eSportsEvent: icon.eSportsEvent,
        eSportsTeam: icon.eSportsTeam,
      }));

      setIconData(icons);
    };

    fetchData();
  }, []);

  return (
    <div className='icons-page'>
      <div className='filter'>
        <FilterCheckbox
          title='Legacy'
          onChange={(value) => setLegacyFilter(value)}
        />
        <FilterDropdown
          title='Rarity'
          items={rarities}
          onChange={(items) => setRarityFilter(items.map(({ key }) => key))}
        />
        <FilterDropdown
          title='Release Year'
          items={releaseYears}
          onChange={(items) =>
            setReleaseYearFilter(items.map(({ key }) => key))
          }
        />
        <FilterDropdown
          title='eSports Event'
          items={eSportsEvents}
          onChange={(items) =>
            setESportsEventFilter(items.map(({ key }) => key))
          }
          searchBar
        />
        <FilterDropdown
          title='eSports Team'
          items={eSportsTeams}
          onChange={(items) =>
            setESportsTeamFilter(items.map(({ key }) => key))
          }
          searchBar
        />
        <FilterSearchBar
          placeholder='Filter by Name...'
          onInput={(value) => setTitleFilter(value)}
        />
      </div>
      <div className='icons-container'>
        {filter6?.map(({ id }) => (
          <SummonerIcon iconId={id} />
        ))}
      </div>
    </div>
  );
};

export default Icons;
