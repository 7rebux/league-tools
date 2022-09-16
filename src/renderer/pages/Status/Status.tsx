import React, { useEffect, useState } from 'react';

import { Button, Dropdown, Textbox, SummonerIcon } from 'component-lib';

import { request } from '../../ipcBridge';

import './Status.scss';

const ENDPOINT = '/lol-chat/v1/me/';

type Availability = 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';
const availabilites = new Map<Availability, string>([
  ['chat', 'Online'],
  ['away', 'Away'],
  ['dnd', 'Ingame'],
  ['mobile', 'Mobile'],
  ['offline', 'Offline'],
]);

const Status: React.FC = () => {
  const [currentStatus, setCurrentStatus] =
    useState<string>('Fetching status..');
  const [currentAvailability, setCurrentAvailability] =
    useState<Availability>('offline');

  const textbox = React.createRef<HTMLInputElement>();

  const fetchStatus = async () => {
    const data = await request('GET', ENDPOINT);
    const status = data['statusMessage'] as string;
    const availability = data['availability'] as Availability;

    setCurrentStatus(status);
    setCurrentAvailability(availability);
    // also fetch icon
  };

  const setStatus = (status: string) => {
    textbox.current.value = '';
    textbox.current.disabled = true;

    const body = { statusMessage: status };

    request('PUT', ENDPOINT, body).then(
      (_response) => {
        textbox.current.disabled = false;
        return fetchStatus(); // why return? @Kai
      },
      (reason) => {}
    );
  };

  const setAvailabilty = (availability: Availability) => {
    const body = { availability: availability };

    if (availability === currentAvailability) return;

    request('PUT', ENDPOINT, body).then(
      (_response) => {},
      (reason) => {}
    );
  };

  const updateStatus = () => {
    const status = textbox.current.value;

    if (status === '' || status === currentStatus) return;

    setStatus(status);
  };

  const clearStatus = () => {
    setStatus('');
  };

  useEffect(() => {
    fetchStatus();
  }, []); // is the array needed

  return (
    <div className='status-page'>
      <div className='wrapper'>
        <div className='left'>
          <SummonerIcon iconId={3333} availability='chat' size={50} />
          <Textbox
            placeholder={currentStatus === '' ? 'Empty status' : currentStatus}
            ref={textbox}
          />
          <Dropdown
            items={Array.from(availabilites.values())}
            initialItem={availabilites.get(currentAvailability)}
          />
        </div>
        <div className='right'>
          <Button title='Apply' onClick={updateStatus} />
          <Button title='Clear' onClick={clearStatus} />
        </div>
      </div>
    </div>
  );
};

export default Status;
