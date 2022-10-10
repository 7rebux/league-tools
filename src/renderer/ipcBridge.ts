const { ipcRenderer } = window.require('electron');
import { JsonObjectLike } from 'league-connect-v2';

export function connect() {
  return new Promise((resolve, _reject) => {
    ipcRenderer.on('lcu-connected', (_event, connected) => {
      resolve(connected);
    });

    ipcRenderer.send('lcu-connect');
  });
}

export function request(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: any
): Promise<JsonObjectLike> {
  return ipcRenderer.invoke('lcu-request', method, endpoint, body);
}

// STORE IMPORTANT VALUES HERE
// ENDPOINTS
// CURRENT ICON, NAME ETC
