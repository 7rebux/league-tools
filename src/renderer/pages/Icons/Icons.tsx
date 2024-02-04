import React, { useEffect, useState, useMemo } from 'react';
import {
  request,
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import {
  Select,
  Textbox,
  SummonerIcon,
  Switch,
  Skeleton,
} from '../../components';
import { toast } from 'react-hot-toast';
import './Icons.scss';

const ICON_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json';
const ENDPOINT = '/lol-chat/v1/me';

type Icon = {
  id: number;
  title: string;
  isLegacy: boolean;
  isFavorite: boolean;
};

const ITEMS: { name: string; value: string }[] = [
  { name: 'All', value: 'all' },
  { name: 'Favorites', value: 'favorites' },
];

const Icons: React.FC = () => {
  const lcuData = useLcuData();
  const [loading, setLoading] = useState<boolean>(true);
  const [iconData, setIconData] = useState<Icon[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);

  const filter1 = useMemo(() => {
    if (typeFilter === 'all') return iconData;
    if (typeFilter === 'favorites') return iconData.filter((i) => i.isFavorite);
  }, [iconData, typeFilter]);

  const filter2 = useMemo(
    () =>
      filter1.filter((i) =>
        i.title.toLowerCase().includes(titleFilter.toLowerCase()),
      ),
    [filter1, titleFilter],
  );

  const filter3 = useMemo(() => {
    if (legacyFilter) return filter2;
    return filter2.filter((i) => i.isLegacy === false);
  }, [filter2, legacyFilter]);

  const setIcon = (icon: Icon) => {
    if (icon.id === lcuData.me.icon) return;

    request('PUT', ENDPOINT, { icon: icon.id }).then((data) => {
      toast.success(`Updated icon to "${icon.title}"`);
      console.log('Set icon to', data.icon);
    });
  };

  const toggleFavorite = (id: number) => {
    const icon = iconData.find((i) => i.id === id);

    if (icon.isFavorite) removeFavorite('icon', id);
    else addFavorite('icon', id);

    console.log(
      `${icon.isFavorite ? 'Removed' : 'Added'} favorite icon:`,
      icon.id,
    );

    setIconData(
      iconData.map((i) =>
        i === icon ? { ...i, isFavorite: !i.isFavorite } : i,
      ),
    );
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
        }));

      console.log('Fetched %d icons', icons.length);
      console.log(
        'Found %d favorite icons:',
        favorites.icons.length,
        favorites.icons,
      );

      setIconData(icons);
      setLoading(false);
    };

    fetchIconData();
  }, []);

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
        </div>
        <span className='info'>
          Showing <b>{filter3.length}</b> / {iconData.length} icons
        </span>
        <span className='tip'>
          <b>💡Tip:</b> Right click on an icon to add or remove it from your favorites
        </span>
      </div>
      <div className='icons'>
        {loading
          ? Array.from({ length: 300 }, (_, i) => (
              <Skeleton key={i} width={85} height={85} />
            ))
          : filter3.map((icon) => (
              <SummonerIcon
                key={icon.id}
                iconId={icon.id}
                size={85}
                selected={lcuData.me.icon === icon.id}
                favorite={icon.isFavorite}
                onClick={() => setIcon(icon)}
                onContextMenu={() => toggleFavorite(icon.id)}
                title={icon.title}
              />
            ))}
      </div>
    </div>
  );
};

export default Icons;
