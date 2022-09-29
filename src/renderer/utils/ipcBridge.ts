const { ipcRenderer } = window.require('electron');
import { JsonObjectLike } from 'league-connect';
import { v4 as uuidv4 } from 'uuid';

export function connect(navigate: any): Promise<undefined> {
  return new Promise((resolve) => {
    ipcRenderer.once('lcu-connected', () => {
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
}

export function request(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: any
): Promise<JsonObjectLike> {
  return new Promise((resolve, _reject) => {
    const id = uuidv4();

    ipcRenderer.once('lcu-response-' + id, (_event, data) => {
      console.log('Received response for', id, data);
      resolve(data);
    });

    ipcRenderer.send('lcu-request', id, method, endpoint, body);
    console.log(`Sent ${method} request to ${endpoint} with id ${id}`);
  });
}
