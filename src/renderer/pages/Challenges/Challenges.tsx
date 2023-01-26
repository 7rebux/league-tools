import { Button } from 'component-lib';
import React from 'react'
import { request } from '../../utils/ipcBridge';
import './Challenges.scss';

const ENDPOINT = '/lol-challenges/v1/update-player-preferences/'

const Challenges: React.FC = () => {
  const clearTokens = () => {
    request('POST', ENDPOINT, { "challengeIds": [] })
  }

  return (
    <div className='challengesPage'>
      <Button title="Clear Tokens" onClick={() => clearTokens()} />
    </div>
  )
}

export default Challenges;
