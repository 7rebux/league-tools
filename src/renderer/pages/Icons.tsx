import React, { useState, useEffect, useMemo, Key } from 'react';

import {
  FilterCheckbox,
  FilterDropdown,
  FilterDropdownItem,
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
  // data
  const [iconData, setIconData] = useState<Icon[]>([]);
  const [rarityData, setRarityData] = useState<FilterDropdownItem[]>([]);
  const [releaseYearData, setReleaseYearData] = useState<FilterDropdownItem[]>(
    []
  );
  const [eSportsEventData, setESportsEventData] = useState<
    FilterDropdownItem[]
  >([]);
  const [eSportsTeamData, setESportsTeamData] = useState<FilterDropdownItem[]>(
    []
  );

  // filter states
  const [legacyFilter, setLegacyFilter] = useState<boolean>(false);
  const [rarityFilter, setRarityFilter] = useState<FilterDropdownItem[]>();
  const [releaseYearFilter, setReleaseYearFilter] =
    useState<FilterDropdownItem[]>();
  const [eSportsEventFilter, setESportsEventFilter] =
    useState<FilterDropdownItem[]>();
  const [eSportsTeamFilter, setESportsTeamFilter] =
    useState<FilterDropdownItem[]>();
  const [titleFilter, setTitleFilter] = useState<string>('');

  // filter chain
  const filter1 = useMemo(
    () =>
      legacyFilter
        ? iconData.filter((i) => i.isLegacy === legacyFilter)
        : iconData,
    [iconData, legacyFilter]
  );
  // const filter2 = useMemo(
  //   () => filter1.filter((i) => rarityFilter.includes(i.rarity)),
  //   [filter1, rarityFilter]
  // );
  const filter3 = useMemo(
    () =>
      filter1.filter((i) =>
        releaseYearFilter.map((i) => i.key).includes(i.yearReleased)
      ),
    [filter1, releaseYearFilter]
  );
  const filter4 = useMemo(
    () =>
      filter3.filter((i) =>
        eSportsEventFilter.map((i) => i.key).includes(i.eSportsEvent)
      ),
    [filter3, eSportsEventFilter]
  );
  const filter5 = useMemo(
    () =>
      filter4.filter((i) =>
        eSportsTeamFilter.map((i) => i.key).includes(i.eSportsTeam)
      ),
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

      const releaseYears = new Set(data.map((x: any) => x.yearReleased).sort());
      const eSportsEvents = new Set(
        data.map((x: any) => x.esportsEvent).sort()
      );
      const eSportsTeams = new Set(data.map((x: any) => x.esportsTeam).sort());

      setReleaseYearData(
        Array.from(releaseYears).map(
          (x) =>
            ({ title: String(x), key: x, value: true } as FilterDropdownItem)
        )
      );
      setReleaseYearFilter(releaseYearData);
      setESportsEventData(
        Array.from(eSportsEvents)
          .filter((x) => x !== undefined)
          .map((x) => ({ title: x, key: x, value: true } as FilterDropdownItem))
      );
      setESportsEventFilter(eSportsEventData);
      setESportsTeamData(
        Array.from(eSportsTeams)
          .filter((x) => x !== undefined)
          .map((x) => ({ title: x, key: x, value: true } as FilterDropdownItem))
      );
      setESportsTeamFilter(eSportsTeamData);

      const icons = data.map((icon: any) => ({
        id: icon.id,
        title: icon.title,
        yearReleased: icon.yearReleased,
        rarity: 1,
        isLegacy: icon.isLegacy,
        eSportsEvent: icon.esportsEvent,
        eSportsTeam: icon.esportsTeam,
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
          items={rarityData}
          onChange={(items) =>
            setRarityFilter(items.filter((i) => i.value === true))
          }
        />
        <FilterDropdown
          title='Release Year'
          items={releaseYearData}
          onChange={(items) =>
            setReleaseYearFilter(items.filter((i) => i.value === true))
          }
        />
        <FilterDropdown
          title='eSports Event'
          items={eSportsEventData}
          onChange={(items) =>
            setESportsEventFilter(items.filter((i) => i.value === true))
          }
          searchBar
        />
        <FilterDropdown
          title='eSports Team'
          items={eSportsTeamData}
          onChange={(items) =>
            setESportsTeamFilter(items.filter((i) => i.value === true))
          }
          searchBar
        />
        <FilterSearchBar
          placeholder='Filter by Name...'
          onInput={(value) => setTitleFilter(value)}
        />
      </div>
      <div style={{ background: 'gray', width: '100vw', height: '150px' }}>
        {/*<h4>{`${filter1.length} | ${filter2.length} | ${filter3.length} | ${filter4.length} | ${filter5.length} | ${filter6.length}`}</h4>*/}
        <h4>{`${filter1.length} | ${filter3.length} | ${filter4.length} | ${filter5.length} | ${filter6.length}`}</h4>
      </div>
      <div className='icons-container'>
        {filter6?.map(({ id }) => (
          <SummonerIcon key={id} iconId={id} />
        ))}
      </div>
    </div>
  );
};

export default Icons;
