import React, { ReactText, useEffect, useState } from 'react';

import { Button, Dropdown, Textbox, SummonerIcon } from 'component-lib';

import { request } from '../../ipcBridge';

import './Status.scss';

const ENDPOINT = '/lol-chat/v1/me/';

const Status: React.FC = () => {
  const [currentStatus, setCurrentStatus] =
    useState<string>('Fetching status..');

  const textbox = React.createRef<HTMLInputElement>();

  const fetchStatus = async () => {
    const data = await request('GET', ENDPOINT);
    const status = data['statusMessage'] as string;

    setCurrentStatus(status);
  };

  const setStatus = (status: string) => {
    textbox.current.value = '';
    textbox.current.disabled = true;

    const body = { statusMessage: status };

    request('PUT', ENDPOINT, body).then(
      (_response) => {
        textbox.current.disabled = false;
        return fetchStatus();
      },
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
  }, []);

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
            items={['Online', 'Away', 'Ingame', 'Mobile', 'Offline']}
            initialItem='Online'
          />
        </div>
        <Button title='Apply' onClick={updateStatus} />
        <Button title='Clear' onClick={clearStatus} />
      </div>
    </div>
  );
};

export default Status;
