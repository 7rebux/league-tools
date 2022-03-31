import React from 'react';

import { Button } from 'component-lib';

import './Connect.scss';

function Connect() {
  return (
    <div className='connect-page'>
      <div className='content'>
        <div className='wrapper'>
          <div>
            <p className='title'>
              Welcome to <span className='name'>League Tools</span>
            </p>
            <p className='subtitle'>
              Start by connecting to your League of Legends client
            </p>
          </div>
          <div className='button-wrapper'>
            <Button variant='primary' title='Connect' />
            <Button variant='secondary' title='Functions' />
          </div>
        </div>
        <div className='preview'></div>
      </div>
      <span className='version'>v.2.0.0</span>
    </div>
  );
}

export default Connect;
