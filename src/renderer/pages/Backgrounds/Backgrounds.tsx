import React, { useState, useEffect, useMemo } from 'react';

import { Checkbox, Dropdown, Splashart, Textbox } from 'component-lib';

import './Backgrounds.scss';

const SPLASHART_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json';

type Splashart = {
  id: number;
  name: string;
  isLegacy: boolean;
  isBase: boolean;
};

const Backgrounds: React.FC = () => {
  const [splashartData, setSplashartData] = useState<Splashart[]>([]);

  const [nameFilter, setNameFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);
  const [baseFilter, setBaseFilter] = useState<boolean>(true);

  const filter1 = useMemo(
    () =>
      splashartData.filter((i) =>
        i.name.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [splashartData, nameFilter]
  );
  const filter2 = useMemo(
    () =>
      legacyFilter ? filter1 : filter1.filter((i) => i.isLegacy === false),
    [filter1, legacyFilter]
  );
  const filter3 = useMemo(
    () => (baseFilter ? filter2 : filter2.filter((i) => i.isBase === false)),
    [filter2, baseFilter]
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(SPLASHART_DATA_URL);
      const data = await response.json();

      const splasharts = Object.values(data).map((splashart: any) => ({
        id: splashart.id,
        name: splashart.name,
        isLegacy: splashart.isLegacy,
        isBase: splashart.isBase,
      }));

      setSplashartData(splasharts);
    };

    fetchData();
  }, []);

  return (
    <div className='backgrounds-page'>
      <div className='filter'>
        <Textbox
          placeholder='Search..'
          onInput={(event) =>
            setNameFilter((event.target as HTMLInputElement).value)
          }
        />
        <div className='settings'>
          <Dropdown items={['All', 'Favorites']} initialItem='All' />
          <Checkbox
            title='Legacy'
            initialState={legacyFilter}
            onChange={(value) => setLegacyFilter(value)}
          />
          <Checkbox
            title='Base skins'
            initialState={baseFilter}
            onChange={(value) => setBaseFilter(value)}
          />
        </div>
        <span style={{ color: 'white' }}>
          Showing <b>{filter3.length}</b> / {splashartData.length} splasharts
        </span>
      </div>
      <div className='backgrounds'>
        {filter3.map((splashart) => (
          <Splashart key={splashart.id} skinId={splashart.id} />
        ))}
      </div>
    </div>
  );
};

export default Backgrounds;
