import React, { useState } from 'react';
import { request } from '../../ipcBridge';
import { useLcuData } from '../../LcuContext';
import { Button, Dropdown, Textbox, SummonerIcon } from 'component-lib';
import './Status.scss';

type Availability = 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';

const AVAILABILITES = ['chat', 'away', 'dnd', 'mobile', 'offline'];
const ENDPOINT = '/lol-chat/v1/me/';

const Status: React.FC = () => {
  const lcuData = useLcuData();
  const [availability, setAvailabilty] = useState<Availability>(lcuData.me.availability);
  const statusBox = React.createRef<HTMLInputElement>();

  const apply = () => {
    const updateStatus = async () => {
      const status = statusBox.current.value;

      if (status === '' || status === lcuData.me.statusMessage) return;

      statusBox.current.value = '';
      request('PUT', ENDPOINT, { statusMessage: status });
    };

    const updateAvailability = async () => {
      if (availability === lcuData.me.availability) return;

      return request('PUT', ENDPOINT, { availability: availability });
    };

    updateStatus().then(updateAvailability);
  };

  const clear = () => {
    request('PUT', ENDPOINT, { statusMessage: '' });
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
            items={AVAILABILITES}
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
