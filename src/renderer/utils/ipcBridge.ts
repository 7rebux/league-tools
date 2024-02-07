import { JsonObjectLike } from 'league-connect';
import { v4 as UUID } from 'uuid';

const { ipcRenderer } = window.require('electron');

type Favorites = {
  icons: number[];
  backgrounds: number[];
  statuses: string[];
};

type FavoriteType = 'icon' | 'background' | 'status';

export const connect = (navigate: any): Promise<undefined> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once('lcu-connected', (_event, reason) => {
      if (reason) {
        console.log(reason);
        return reject(reason);
      }

      console.log('Connected to league client');
      resolve(undefined);
    });

    ipcRenderer.once('lcu-disconnect', () => {
      console.log('Disconnected from league client');
      navigate('/connect');
    });

    ipcRenderer.send('lcu-connect');
    console.log('Connecting to league client..');
  });
};

export const request = (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: any,
): Promise<JsonObjectLike> => {
  return new Promise((resolve) => {
    const id = UUID();

    ipcRenderer.once(`lcu-response-${id}`, (_event, data) => {
      console.log('Received response for', id, data);
      resolve(data);
    });

    ipcRenderer.send('lcu-request', id, method, endpoint, body);
    console.log(`Sent ${method} request to ${endpoint} with id ${id}`);
  });
};

export const getFavorites = (): Promise<Favorites> => {
  return new Promise((resolve) => {
    ipcRenderer.once('store-favorites', (_event, favorites) => {
      resolve(favorites);
    });

    ipcRenderer.send('store-get-favorites');
  });
};

export const addFavorite = (type: FavoriteType, value: number | string) => {
  ipcRenderer.send('store-add-favorite', type, value);
};

export const removeFavorite = (type: FavoriteType, value: number | string) => {
  ipcRenderer.send('store-remove-favorite', type, value);
};

export const exportFavorites = (): Promise<boolean> => {
  return new Promise((resolve) => {
    ipcRenderer.once('store-export-response', (_event, success) => {
      resolve(success);
    });

    ipcRenderer.send('store-export');
  });
};

export const importFavorites = (): Promise<boolean> => {
  return new Promise((resolve) => {
    ipcRenderer.once('store-import-response', (_event, success) => {
      resolve(success);
    });

    ipcRenderer.send('store-import');
  });
};
