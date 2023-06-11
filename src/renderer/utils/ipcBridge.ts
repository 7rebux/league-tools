import { JsonObjectLike } from 'league-connect';
import { v4 as UUID } from 'uuid';

const { ipcRenderer } = window.require('electron');

type Favorites = {
  icons: number[];
  backgrounds: number[];
};

const connect = (navigate: any): Promise<undefined> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.once('lcu-connected', (_event, reason) => {
      if (reason) {
        console.log(reason);
        return reject(reason);
      };

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

const request = (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: any,
): Promise<JsonObjectLike> => {
  return new Promise((resolve) => {
    const id = UUID();

    ipcRenderer.once('lcu-response-' + id, (_event, data) => {
      console.log('Received response for', id, data);
      resolve(data);
    });

    ipcRenderer.send('lcu-request', id, method, endpoint, body);
    console.log(`Sent ${method} request to ${endpoint} with id ${id}`);
  });
};

const getFavorites = (): Promise<Favorites> => {
  return new Promise((resolve) => {
    ipcRenderer.once('store-favorites', (_event, favorites) => {
      resolve(favorites);
    });

    ipcRenderer.send('store-get-favorites');
  });
};

const addFavorite = (type: 'icon' | 'background', id: number) => {
  ipcRenderer.send('store-add-favorite', type, id);
};

const removeFavorite = (type: 'icon' | 'background', id: number) => {
  ipcRenderer.send('store-remove-favorite', type, id);
};

export { 
  connect,
  request,
  getFavorites,
  addFavorite,
  removeFavorite,
};
