import {
  authenticate,
  createHttp1Request,
  Credentials,
  EventResponse,
  JsonObjectLike,
  LeagueClient,
} from 'league-connect';
import { WebSocket } from 'ws';
import { BrowserWindow } from 'electron';
import https from 'https';

class LCU {
  private window: BrowserWindow;
  private credentials: Credentials;
  private webSocket: WebSocket;
  private connected: boolean;

  constructor(windowId: number) {
    this.window = BrowserWindow.fromId(windowId);
  }

  connect = async () => {
    this.credentials = await authenticate();

    if (this.webSocket) {
      this.webSocket.terminate();
      this.webSocket = undefined;
    }
    this.webSocket = this.createSocket();

    new LeagueClient(this.credentials)
      .on('disconnect', () => {
        this.connected = false;
        this.window.webContents.send('lcu-disconnect');
      })
      .start();

    this.connected = true;
  };

  request = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: JsonObjectLike,
  ): Promise<JsonObjectLike> => {
    if (!this.connected) return {};

    return new Promise((resolve, reject) => {
      createHttp1Request(
        { method: method, url: endpoint, body: body },
        this.credentials,
      )
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((reason) => reject(reason));
    });
  };

  private createSocket = () => {
    const url = `wss://riot:${this.credentials.password}@127.0.0.1:${this.credentials.port}`;
    let socket: WebSocket;

    do {
      socket = new WebSocket(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `riot:${this.credentials.password}`,
          ).toString('base64')}`,
        },
        agent: new https.Agent(
          typeof this.credentials?.certificate === 'undefined'
            ? { rejectUnauthorized: false }
            : { ca: this.credentials?.certificate },
        ),
      });
    } while (
      socket?.readyState !== WebSocket.OPEN &&
      socket?.readyState !== WebSocket.CONNECTING
    );

    // Handle incoming messages
    socket.on('message', (content: string) => {
      try {
        const json = JSON.parse(content);
        const [res]: [EventResponse] = json.slice(2);

        this.window.webContents.send('lcu-event', res);
      } catch {}
    });

    // Subscribe to Json API
    if (socket.readyState === WebSocket.OPEN)
      socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
    else {
      socket.on('open', () => {
        socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
      });
    }

    return socket;
  };
}

export default LCU;
