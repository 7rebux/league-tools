import React from 'react';

import { Button, Dropdown, SearchBar, SummonerIcon } from 'component-lib';

import './Status.scss';

const Status: React.FC = () => {
  return (
    <div className='status-page'>
      <div className='wrapper'>
        <div className='left'>
          <SummonerIcon iconId={3333} availability='chat' size={50} />
          <SearchBar /> {/* replace with textbox */}
          <Dropdown
            items={['Online', 'Away', 'Ingame', 'Mobile', 'Offline']}
            initialItem='Online'
          />
        </div>
        <Button title='Apply' />
      </div>
    </div>
  );
};

export default Status;