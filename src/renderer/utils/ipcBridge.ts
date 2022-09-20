const { ipcRenderer } = window.require('electron');
import { JsonObjectLike } from 'league-connect';
import { v4 as uuidv4 } from 'uuid';

export function connect() {
  return new Promise((resolve, _reject) => {
    ipcRenderer.once('lcu-connected', (_event) => {
      resolve(null);
    });

    ipcRenderer.send('lcu-connect');
  });
}

export function request(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: any
): Promise<JsonObjectLike> {
  return new Promise((resolve, _reject) => {
    const id = uuidv4();
    ipcRenderer.send('lcu-request', id, method, endpoint, body);

    ipcRenderer.once('lcu-response-' + id, (_event, data) => {
      resolve(data);
    });
  });
}
