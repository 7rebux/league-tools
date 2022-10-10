const { ipcRenderer } = window.require('electron');
import type { EventResponse } from 'league-connect-v2';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { request } from '../utils/ipcBridge';

type State = { me: MeState; wallet: WalletState; profile: ProfileState };

const DEFAULT_STATE: State = {
  me: {
    availability: 'offline',
    icon: 29,
    name: 'Loading...',
    statusMessage: 'Loading...',
    gameTag: '0000',
    lol: {
      level: 0,
      rankedLeagueTier: 'UNRANKED',
      rankedLeagueDivision: '',
    },
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
  availability: 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';
  name: string;
  statusMessage: string;
  gameTag: string;
  lol: {
    level: number;
    rankedLeagueTier: string;
    rankedLeagueDivision: string;
  };
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
    // reset state on reconnects
    if (location.pathname === '/connect') setState(DEFAULT_STATE);

    // only fetch if connected and if not already fetched
    if (
      state !== DEFAULT_STATE ||
      location.pathname === '/connect' ||
      location.pathname === '/'
    )
      return;

    request('GET', '/lol-chat/v1/me').then((response: any) => {
      setState(
        (oldState) =>
          ({
            ...oldState,
            me: {
              icon: response.icon,
              availability: response.availability,
              name: response.name,
              statusMessage: response.statusMessage,
              gameTag: response.gameTag,
              lol: {
                level: response.lol.level,
                rankedLeagueTier: response.lol.rankedLeagueTier ?? 'UNRANKED',
                rankedLeagueDivision: response.lol.rankedLeagueDivision ?? '',
              },
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
              statusMessage: message.data.statusMessage,
              gameTag: message.data.gameTag,
              lol: {
                level: message.data.lol.level,
                rankedLeagueTier:
                  message.data.lol.rankedLeagueTier ?? 'UNRANKED',
                rankedLeagueDivision:
                  message.data.lol.rankedLeagueDivision ?? '',
              },
            },
          }));
          break;
        }
        case '/lol-summoner/v1/current-summoner/summoner-profile': {
          setState((oldState) => ({
            ...oldState,
            profile: {
              backgroundSkinId: message.data.backgroundSkinId,
            },
          }));
          break;
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
