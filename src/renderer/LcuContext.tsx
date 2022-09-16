const { ipcRenderer } = window.require('electron');
import type { EventResponse } from 'league-connect';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { request } from './ipcBridge';

type State = { me: MeState; wallet: WalletState; profile: ProfileState };

const DEFAULT_STATE: State = {
  me: {
    availability: 'offline',
    icon: 29,
    name: 'Loading...',
    puuid: '',
    statusMessage: 'Loading...',
  },
  profile: {
    backgroundSkinId: 0,
  },
  wallet: {
    riotPoints: 0,
    blueEssence: 0,
  },
};

type MeState = {
  icon: number;
  availability: string;
  name: string;
  puuid: string;
  statusMessage: string;
};
type WalletState = {
  riotPoints: number;
  blueEssence: number;
};
type ProfileState = {
  backgroundSkinId: number;
};

const context = React.createContext<State>(DEFAULT_STATE);

export const LcuContext = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const location = useLocation();

  useEffect(() => {
    if (state !== DEFAULT_STATE || location.pathname === '/connect') return;

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
    request('GET', '/lol-summoner/v1/current-summoner/summoner-profile').then(
      (response) => {
        setState(
          (oldState) =>
            ({
              ...oldState,
              profile: {
                backgroundSkinId: response.backgroundSkinId,
              },
            } as State)
        );
      }
    );
    request('GET', '/lol-store/v1/wallet').then((response) => {
      setState(
        (oldState) =>
          ({
            ...oldState,
            wallet: {
              riotPoints: response.rp ?? 0,
              blueEssence: response.ip ?? 0,
            },
          } as State)
      );
    });
  }, [location]);

  useEffect(() => {
    const listener = (_event: never, message: EventResponse) => {
      switch (message.uri) {
        case '/lol-chat/v1/me': {
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
        case '/lol-summoner/v1/current-summoner/summoner-profile': {
          setState((oldState) => ({
            ...oldState,
            profile: {
              backgroundSkinId: message.data.backgroundSkinId,
            },
          }));
        }
        case '/lol-store/v1/wallet': {
          setState((oldState) => ({
            ...oldState,
            wallet: {
              riotPoints: message.data.rp ?? 0,
              blueEssence: message.data.ip ?? 0,
            },
          }));
        }
        default: {
          console.log(message);
        }
      }
    };

    ipcRenderer.on('lcu-event', listener);

    return () => {
      ipcRenderer.off('lcu-event', listener);
    };
  });

  return <context.Provider value={state}>{children}</context.Provider>;
};

export const useLcuData = () => React.useContext(context);
