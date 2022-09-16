const { ipcRenderer } = window.require('electron');
import type { EventResponse } from 'league-connect';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { request } from './ipcBridge';

const default_value: State = {
  me: {
    availability: 'offline',
    icon: 29,
    name: 'Loading...',
    puuid: '',
    statusMessage: 'Loading...',
  },
};

type MeState = {
  icon: number;
  availability: string;
  name: string;
  puuid: string;
  statusMessage: string;
};
type State = { me: MeState };

const context = React.createContext<State>(default_value);

export const LcuContext = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>(default_value);
  const location = useLocation();

  useEffect(() => {
    if (state !== default_value || location.pathname === '/connect') return;

    console.log('start load');
    request('GET', '/lol-chat/v1/me').then((response) => {
      setState(
        (oldState) =>
          ({
            ...oldState,
            me: {
              icon: response.icon,
              availability: response.availability,
              name: response.name,
              puuid: response.puuid,
              statusMessage: response.statusMessage,
            },
          } as State)
      );
    });
  }, [location]);

  ipcRenderer.on('lcu-event', (_event, message: EventResponse) => {
    console.log(message);
    if (message.uri == '/lol-chat/v1/me') {
      setState((oldState) => ({
        ...oldState,
        me: {
          icon: message.data.icon,
          availability: message.data.availability,
          name: message.data.name,
          puuid: message.data.puuid,
          statusMessage: message.data.statusMessage,
        },
      }));
    }
  });

  return <context.Provider value={state}>{children}</context.Provider>;
};

export const useLcuData = () => React.useContext(context);
