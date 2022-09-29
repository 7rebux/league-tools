import React, { useState } from 'react';
import { request } from '../../utils/ipcBridge';
import { useLcuData } from '../../components/LcuContext';
import { Button, Dropdown, Textbox, SummonerIcon } from 'component-lib';
import './Status.scss';

const AVAILABILITES = ['chat', 'away', 'dnd', 'mobile', 'offline'] as const;
const ENDPOINT = '/lol-chat/v1/me/';

type Availability = typeof AVAILABILITES[number];

const Status: React.FC = () => {
  const lcuData = useLcuData();
  const [availability, setAvailabilty] = useState<Availability>(lcuData.me.availability);
  const statusBox = React.createRef<HTMLInputElement>();

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

    updateStatus()
      .then((data) => { if (data) console.log('Update status to', data.statusMessage) });
    updateAvailability()
      .then((data) => { if (data) console.log('Set availability to', data.availability) });
  };

  const clear = () => {
    request('PUT', ENDPOINT, { statusMessage: '' })
      .then(() => console.log('Cleared status'));
  };

  return (
    <div className='status-page'>
      <div className='wrapper'>
        <div className='left'>
          <SummonerIcon 
            iconId={lcuData.me.icon} 
            availability={lcuData.me.availability}
            size={50} 
          />
          <Textbox
            ref={statusBox}
            placeholder={lcuData.me.statusMessage === '' ? 'Empty status' : lcuData.me.statusMessage}
          />
          <Dropdown
            items={Array.from(AVAILABILITES)}
            initialItem={lcuData.me.availability}
            onChange={(item) => {setAvailabilty(item as Availability)}}
          />
        </div>
        <div className='right'>
          <Button title='Apply' onClick={apply} />
          <Button title='Clear' onClick={clear} />
        </div>
      </div>
    </div>
  );
};

export default Status;
