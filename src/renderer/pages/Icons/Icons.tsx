import React, { useEffect, useState, useMemo } from 'react';

import { Checkbox, Dropdown, Textbox, SummonerIcon } from 'component-lib';

import { request } from '../../ipcBridge';

import './Icons.scss';

// some icons end on 404???
const ICON_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json';

type Icon = {
  id: number;
  title: string;
  isLegacy: boolean;
};

const ENDPOINT = '/lol-chat/v1/me/';

const Icons: React.FC = () => {
  const [iconData, setIconData] = useState<Icon[]>([]);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);
  const [currentIcon, setCurrentIcon] = useState<number>(29);

  const filter1 = useMemo(
    () =>
      iconData.filter((i) =>
        i.title.toLowerCase().includes(titleFilter.toLowerCase())
      ),
    [iconData, titleFilter]
  );
  const filter2 = useMemo(
    () =>
      legacyFilter ? filter1 : filter1.filter((i) => i.isLegacy === false),
    [filter1, legacyFilter]
  );

  const fetchIcon = () => {
    return request('GET', ENDPOINT).then((data) => {
      const icon = data['icon'] as number;

      setCurrentIcon(icon);
      console.log('test');
    });
  }

  const setIcon = (id: number) => {
    const body = { icon: id };

    if (id === currentIcon) return;

    request('PUT', ENDPOINT, body).then(
      (response) => {
        console.log(response);
        fetchIcon();
      },
      (reason) => {}
    )
  }

  useEffect(() => {
    const fetchIconData = async () => {
      const response = await fetch(ICON_DATA_URL);
      const data = await response.json();

      const icons = data.map((icon: any) => ({
        id: icon.id,
        title: icon.title,
        isLegacy: icon.isLegacy,
      }));

      setIconData(icons);
    };

    fetchIconData();
    fetchIcon();
  }, []);

  useEffect(() => {
    console.log('Hallo Welt');
  }, [currentIcon]);

  return (
    <div className='icons-page'>
      <div className='filter'>
        <Textbox
          placeholder='Search..'
          onInput={(event) =>
            setTitleFilter((event.target as HTMLInputElement).value)
          }
        />
        <div className='settings'>
          <Dropdown items={['All', 'Favorites']} initialItem='All' />
          <Checkbox
            initialState={legacyFilter}
            title='Legacy'
            onChange={(value) => setLegacyFilter(value)}
          />
        </div>
        <span style={{ color: 'white' }}>
          Showing <b>{filter2.length}</b> / {iconData.length} icons
        </span>
      </div>
      <div className='icons'>
        {filter2.map((icon) => (
          <SummonerIcon
            key={icon.id}
            iconId={icon.id}
            size={80}
            selected={currentIcon === icon.id}
            onClick={() => setIcon(icon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Icons;
