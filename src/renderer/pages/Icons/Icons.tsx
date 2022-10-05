import React, { useEffect, useState, useMemo } from 'react';
import { request, getFavorites, addFavorite, removeFavorite } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { Checkbox, Dropdown, Textbox, SummonerIcon } from 'component-lib';
import './Icons.scss';

const ICON_DATA_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json';
const ENDPOINT = '/lol-chat/v1/me';

type Icon = {
  id: number;
  title: string;
  isLegacy: boolean;
  isFavorite: boolean;
};

const Icons: React.FC = () => {
  const lcuData = useLcuData();
  const [iconData, setIconData] = useState<Icon[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);

  const filter1 = useMemo(
    () => {
      if (typeFilter === 'All') {
        return iconData;
      } else if (typeFilter === 'Favorites') {
        return iconData.filter((i) => i.isFavorite);
      };
    },
    [iconData, typeFilter]
  );
  const filter2 = useMemo(
    () =>
      filter1.filter((i) =>
        i.title.toLowerCase().includes(titleFilter.toLowerCase())
      ),
    [filter1, titleFilter]
  );
  const filter3 = useMemo(
    () =>
      legacyFilter ? filter2 : filter2.filter((i) => i.isLegacy === false),
    [filter2, legacyFilter]
  );

  const setIcon = (id: number) => {
    if (id === lcuData.me.icon) return;

    request('PUT', ENDPOINT, { icon: id })
      .then((data) => console.log('Set icon to', data.icon));
  };

  const toggleFavorite = (id: number) => {
    const icon = iconData.find((i) => i.id === id);

    if (icon.isFavorite)
      removeFavorite('icon', id) 
    else
      addFavorite('icon', id);

    setIconData(iconData.map((i) =>
      i === icon ? {...i, isFavorite: !i.isFavorite } : i
    ));
  };

  useEffect(() => {
    const fetchIconData = async () => {
      const response = await fetch(ICON_DATA_URL);
      const data = await response.json();
      const favorites = await getFavorites();

      const icons = data
        .filter((icon: any) => icon.imagePath) // filter out non existent icons
        .map((icon: any) => ({
          id: icon.id,
          title: icon.title,
          isLegacy: icon.isLegacy,
          isFavorite: favorites.icons.includes(icon.id),
        }
      ));

      console.log('Fetched %d icons', icons.length);

      setIconData(icons);
    };

    fetchIconData();
  }, []);

  return (
    <div className='icons-page'>
      <div className='filter'>
        <Textbox
          placeholder='Search..'
          onInput={(event) => setTitleFilter((event.target as HTMLInputElement).value)}
        />
        <div className='settings'>
          <Dropdown 
            items={['All', 'Favorites']} 
            initialItem={typeFilter}
            onChange={(value) => setTypeFilter(value)}
          />
          <Checkbox
            initialState={legacyFilter}
            title='Legacy'
            onChange={(value) => setLegacyFilter(value)}
          />
        </div>
        <span style={{ color: 'white' }}>
          Showing <b>{filter3.length}</b> / {iconData.length} icons
        </span>
      </div>
      <div className='icons'>
        {filter3.map((icon) => (
          <SummonerIcon
            key={icon.id}
            iconId={icon.id}
            size={85}
            selected={lcuData.me.icon === icon.id}
            favorite={icon.isFavorite}
            onClick={() => setIcon(icon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Icons;
