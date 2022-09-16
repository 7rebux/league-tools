import React from 'react';

import { Button, Dropdown, Textbox, SummonerIcon } from 'component-lib';

import { request } from '../../ipcBridge';

import './Status.scss';
import { useLcuData } from '../../LcuContext';

type Availability = 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';
const availabilites = new Map<Availability, string>([
  ['chat', 'Online'],
  ['away', 'Away'],
  ['dnd', 'Ingame'],
  ['mobile', 'Mobile'],
  ['offline', 'Offline'],
]);

const Status: React.FC = () => {
  const lcuData = useLcuData();

  const textbox = React.createRef<HTMLInputElement>();
  const setStatus = (status: string) => {
    textbox.current.value = '';
    textbox.current.disabled = true;

    const body = { statusMessage: status };

    request('PUT', '/lol-chat/v1/me/', body).then(
      (_response) => {
        textbox.current.disabled = false;
      },
      (reason) => {}
    );
  };

  const setAvailabilty = (availability: Availability) => {
    const body = { availability: availability };

    if (availability === lcuData.me.availability) return;

    request('PUT', '/lol-chat/v1/me/', body).then(
      (_response) => {},
      (reason) => {}
    );
  };

  const updateStatus = () => {
    const status = textbox.current.value;

    if (status === '' || status === lcuData.me.statusMessage) return;

    setStatus(status);
  };

  const clearStatus = () => {
    setStatus('');
  };

  return (
    <div className='status-page'>
      <div className='wrapper'>
        <div className='left'>
          <SummonerIcon iconId={3333} availability='chat' size={50} />
          <Textbox
            placeholder={
              lcuData.me.statusMessage === ''
                ? 'Empty status'
                : lcuData.me.statusMessage
            }
            ref={textbox}
          />
          <Dropdown
            items={Array.from(availabilites.values())}
            initialItem={availabilites.get(
              lcuData.me.availability as Availability
            )}
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
