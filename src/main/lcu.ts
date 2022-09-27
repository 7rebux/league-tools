import {
  authenticate,
  createHttp1Request,
  Credentials,
  EventResponse,
  JsonObjectLike,
  LeagueClient
} from 'league-connect';
import { WebSocket } from 'ws';
import { BrowserWindow } from 'electron';
import https from 'https';

class LCU {
  private credentials: Credentials;
  private ws: WebSocket;
  connected: boolean;

  private handleMessage = (message: EventResponse) => {
    BrowserWindow.getAllWindows().forEach((win) =>
      win.webContents.send('lcu-event', message) // bad code
    );
  };

  private createSocket = () => {
    const url = `wss://riot:${this.credentials.password}@127.0.0.1:${this.credentials.port}`;

    let socket: WebSocket | null = null;
    do {
      socket = new WebSocket(url, {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`riot:${this.credentials.password}`).toString('base64'),
        },
        agent: new https.Agent(
          typeof this.credentials?.certificate === 'undefined'
            ? {
                rejectUnauthorized: false,
              }
            : {
                ca: this.credentials?.certificate,
              }
        ),
      });
    } while (
      socket?.readyState !== WebSocket.OPEN &&
      socket?.readyState !== WebSocket.CONNECTING
    );

    socket.on('message', (content: string) => {
      // Attempt to parse into JSON and dispatch events
      try {
        const json = JSON.parse(content);
        const [res]: [EventResponse] = json.slice(2);
        this.handleMessage(res);
      } catch {}
    });

    if (socket.readyState == WebSocket.OPEN)
      socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
    else
      socket.on('open', () => {
        socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
      });

    return socket;
  };

  private onConnect = () => {
    this.connected = true;

    if (this.ws) {
      this.ws.terminate();
      this.ws = undefined;
    }

    this.ws = this.createSocket();
  };

  connect = async () => {
    this.credentials = await authenticate();

    this.onConnect();

    try {
      const client = new LeagueClient(this.credentials);

      // fired on reconnects
      client.on('connect', (newCredentials) => {
        this.credentials = newCredentials;
        this.onConnect();
      });

      // fired on disconnects
      client.on('disconnect', () => {
        this.connected = false;
      });

      client.credentials = this.credentials;
      client.start();
    } catch (e) {
      console.log(e);
    }
  };
  
  request = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: any
  ): Promise<JsonObjectLike> => {
    if (!this.connected) return { };

    const response = await createHttp1Request(
      {
        method: method,
        url: endpoint,
        body: body,
      },
      this.credentials
    );
    const json = await response.json();
    return json;
  };
}

export default LCU;
