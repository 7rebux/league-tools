import React, { useEffect, useState } from 'react';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  request,
} from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { Button, Textbox, SummonerIcon, Select } from '../../components';
import { toast } from 'react-hot-toast';
import './Status.scss';

const ENDPOINT = '/lol-chat/v1/me';

type Availability = 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';

const ITEMS: { name: string; value: Availability }[] = [
  { name: 'Online', value: 'chat' },
  { name: 'Away', value: 'away' },
  { name: 'Playing', value: 'dnd' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'Offline', value: 'offline' },
];

const Status: React.FC = () => {
  const lcuData = useLcuData();
  const [availability, setAvailabilty] = useState<Availability>(
    lcuData.me.availability,
  );
  const statusBox = React.createRef<HTMLInputElement>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<string>(null);

  useEffect(() => {
    getFavorites().then((res) => {
      setFavorites(res.statuses);
      console.log(
        'Found %d favorite statuses:',
        res.statuses.length,
        res.statuses,
      );
    });
  }, []);

  function saveCurrent() {
    const value = lcuData.me.statusMessage;

    if (value === '') {
      return;
    }

    if (favorites.includes(value)) {
      toast.error('Status already exists');
      return;
    }

    addFavorite('status', value);
    setFavorites((prev) => prev.concat(value));
    toast.success('Saved as favorite');
    console.log('Added favorite status', value);
    setSelectedFavorite(value);
  }

  function deleteCurrent() {
    if (selectedFavorite === null) {
      toast.error('No favorite selected');
      return;
    }

    removeFavorite('status', selectedFavorite);
    setFavorites((prev) => prev.filter((x) => x !== selectedFavorite));
    toast.success('Deleted favorite');
    console.log('Deleted favorite status', selectedFavorite);
    setSelectedFavorite(null);
  }

  function insertCurrent() {
    if (selectedFavorite === null) {
      toast.error('No favorite selected');
      return;
    }

    statusBox.current.value = selectedFavorite;
  }

  const apply = () => {
    const updateStatus = async () => {
      const status = statusBox.current.value;

      if (status === '' || status === lcuData.me.statusMessage) return;

      statusBox.current.value = '';
      return request('PUT', ENDPOINT, { statusMessage: status });
    };

    const updateAvailability = async () => {
      if (availability === lcuData.me.availability) return;

      return request('PUT', ENDPOINT, { availability: availability });
    };

    updateStatus().then((data) => {
      if (!data) return;

      toast.success('Updated status');
      console.log('Set status to', data.statusMessage);
    });

    updateAvailability().then((data) => {
      if (!data) return;

      toast.success('Updated availability');
      console.log('Set availability to', data.availability);
    });
  };

  const clear = () => {
    request('PUT', ENDPOINT, { statusMessage: '' }).then(() => {
      toast.success('Cleared status');
      console.log('Cleared status');
    });
  };

  return (
    <div className='status-page'>
      <div className='wrapper'>
        <div className='section'>
          <SummonerIcon
            iconId={lcuData.me.icon}
            availability={lcuData.me.availability}
            size={50}
          />
          <Textbox
            ref={statusBox}
            placeholder={
              lcuData.me.statusMessage === ''
                ? 'Empty status'
                : lcuData.me.statusMessage
            }
          />
          <Select
            items={ITEMS}
            initialItem={ITEMS.find(({ value }) => value === availability)}
            onValueChange={(value: Availability) => setAvailabilty(value)}
          />
        </div>
        <div className='section'>
          <Button title='Apply' onClick={apply} />
          <Button title='Clear' onClick={clear} />
        </div>
      </div>
      <div className='wrapper'>
        <div className='section'>
          <p>Favorites:</p>
          <Select
            items={favorites.map((x) => ({ name: x, value: x }))}
            initialItem={{ name: '', value: '' }}
            onValueChange={setSelectedFavorite}
          />
        </div>
        <Button title='Save Current' onClick={saveCurrent} />
        <div className='section'>
          <Button title='Insert' onClick={insertCurrent} />
          <Button title='Delete' onClick={deleteCurrent} />
        </div>
      </div>
    </div>
  );
};

export default Status;
