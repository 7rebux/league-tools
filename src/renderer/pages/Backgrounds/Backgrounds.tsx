import React, { useState, useEffect, useMemo } from 'react';
import {
  request,
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { Switch, Select, Splashart, Textbox, Skeleton } from '../../components';
import { toast } from 'react-hot-toast';
import './Backgrounds.scss';

const SPLASHART_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json';
const ENDPOINT = '/lol-summoner/v1/current-summoner/summoner-profile/';

type SplashartType = {
  id: number;
  name: string;
  isLegacy: boolean;
  isBase: boolean;
  isFavorite: boolean;
};

const ITEMS: { name: string; value: string }[] = [
  { name: 'All', value: 'all' },
  { name: 'Favorites', value: 'favorites' },
];

const Backgrounds: React.FC = () => {
  const lcuData = useLcuData();
  const [loading, setLoading] = useState<boolean>(true);
  const [splashartData, setSplashartData] = useState<SplashartType[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);
  const [baseFilter, setBaseFilter] = useState<boolean>(true);

  const filter1 = useMemo(() => {
    if (typeFilter === 'all') return splashartData;
    if (typeFilter === 'favorites')
      return splashartData.filter((i) => i.isFavorite);
  }, [splashartData, typeFilter]);

  const filter2 = useMemo(
    () =>
      filter1.filter((i) =>
        i.name.toLowerCase().includes(nameFilter.toLowerCase()),
      ),
    [filter1, nameFilter],
  );

  const filter3 = useMemo(() => {
    if (legacyFilter) return filter2;
    return filter2.filter((i) => i.isLegacy === false);
  }, [filter2, legacyFilter]);

  const filter4 = useMemo(() => {
    if (baseFilter) return filter3;
    return filter3.filter((i) => i.isBase === false);
  }, [filter3, baseFilter]);

  const setBackground = (background: SplashartType) => {
    if (background.id === lcuData.profile.backgroundSkinId) return;

    request('POST', ENDPOINT, {
      key: 'backgroundSkinId',
      value: background.id,
    }).then((data) => {
      toast.success(`Updated backgroud to "${background.name}"`);
      console.log('Set background to', data.backgroundSkinId);
    });
  };

  const toggleFavorite = (id: number) => {
    const background = splashartData.find((i) => i.id === id);

    if (background.isFavorite) removeFavorite('background', id);
    else addFavorite('background', id);

    console.log(
      `${background.isFavorite ? 'Removed' : 'Added'} favorite background:`,
      background.id,
    );

    setSplashartData(
      splashartData.map((i) =>
        i === background ? { ...i, isFavorite: !i.isFavorite } : i,
      ),
    );
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
      console.log(
        'Found %d favorite backgrounds:',
        favorites.backgrounds.length,
        favorites.backgrounds,
      );

      setSplashartData(splasharts);
      setLoading(false);
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
          <Select
            items={ITEMS}
            initialItem={ITEMS.find(({ value }) => typeFilter === value)}
            onValueChange={(value) => setTypeFilter(value)}
          />
          <div className='wrapper'>
            <span>Legacy</span>
            <Switch
              initialValue={legacyFilter}
              onValueChange={setLegacyFilter}
            />
          </div>
          <div className='wrapper'>
            <span>Base skins</span>
            <Switch initialValue={baseFilter} onValueChange={setBaseFilter} />
          </div>
        </div>
        <span className='info'>
          Showing <b>{filter4.length}</b> / {splashartData.length} splasharts
        </span>
        <span className='tip'>
          <b>💡Tip:</b> Right click on a splashart to add or remove it from your
          favorites
        </span>
      </div>
      <div className='backgrounds'>
        {loading
          ? Array.from({ length: 150 }, () => (
              <Skeleton width={160} height={90} />
            ))
          : filter4.map((splashart) => (
              <Splashart
                key={splashart.id}
                skinId={splashart.id}
                selected={lcuData.profile.backgroundSkinId === splashart.id}
                favorite={splashart.isFavorite}
                onClick={() => setBackground(splashart)}
                onContextMenu={() => toggleFavorite(splashart.id)}
                title={splashart.name}
              />
            ))}
      </div>
    </div>
  );
};

export default Backgrounds;
