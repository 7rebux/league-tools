import React, { useState, useEffect, useMemo } from 'react';
import { request, getFavorites, addFavorite, removeFavorite } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { Checkbox, Dropdown, Splashart, Textbox } from 'component-lib';
import './Backgrounds.scss';

const SPLASHART_DATA_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json';
const ENDPOINT = '/lol-summoner/v1/current-summoner/summoner-profile/';

type Splashart = {
  id: number;
  name: string;
  isLegacy: boolean;
  isBase: boolean;
  isFavorite: boolean;
};

const Backgrounds: React.FC = () => {
  const lcuData = useLcuData();
  const [splashartData, setSplashartData] = useState<Splashart[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);
  const [baseFilter, setBaseFilter] = useState<boolean>(true);

  const filter1 = useMemo(
    () => {
      if (typeFilter === 'All') {
        return splashartData;
      } else if (typeFilter === 'Favorites') {
        return splashartData.filter((i) => i.isFavorite);
      };
    },
    [splashartData, typeFilter]
  );
  const filter2 = useMemo(
    () =>
      filter1.filter((i) =>
        i.name.toLowerCase().includes(nameFilter.toLowerCase())
      ),
    [filter1, nameFilter]
  );
  const filter3 = useMemo(
    () =>
      legacyFilter ? filter2 : filter2.filter((i) => i.isLegacy === false),
    [filter2, legacyFilter]
  );
  const filter4 = useMemo(
    () => (baseFilter ? filter3 : filter3.filter((i) => i.isBase === false)),
    [filter3, baseFilter]
  );

  const setBackground = (id: number) => {
    if (id === lcuData.profile.backgroundSkinId) return;

    request('POST', ENDPOINT, { key: 'backgroundSkinId', value: id })
      .then((data) => console.log('Set background to', data.backgroundSkinId));
  };

  const toggleFavorite = (id: number) => {
    const background = splashartData.find((i) => i.id === id);

    if (background.isFavorite)
      removeFavorite('background', id) 
    else
      addFavorite('background', id);

    console.log((background.isFavorite ? 'Removed' : 'Added') + ' favorite background:', background.id);

    setSplashartData(splashartData.map((i) =>
      i === background ? {...i, isFavorite: !i.isFavorite } : i
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(SPLASHART_DATA_URL);
      const data = await response.json();
      const favorites = await getFavorites();

      const splasharts = Object.values(data).map((splashart: any) => ({
        id: splashart.id,
        name: splashart.name,
        isLegacy: splashart.isLegacy,
        isBase: splashart.isBase,
        isFavorite: favorites.backgrounds.includes(splashart.id),
      }));

      console.log('Fetched %d backgrounds', splasharts.length);
      console.log('Found %d favorite backgrounds:', favorites.backgrounds.length, favorites.backgrounds);

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
          <Dropdown 
            items={['All', 'Favorites']} 
            initialItem={typeFilter} 
            onChange={(value) => setTypeFilter(value)}
          />
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
        <span className='info'>
          Showing <b>{filter4.length}</b> / {splashartData.length} splasharts
        </span>
      </div>
      <div className='backgrounds'>
        {filter4.map((splashart) => (
          <Splashart 
            key={splashart.id} 
            skinId={splashart.id} 
            selected={lcuData.profile.backgroundSkinId === splashart.id}
            favorite={splashart.isFavorite}
            onClick={() => setBackground(splashart.id)}
            onContextMenu={() => toggleFavorite(splashart.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Backgrounds;
