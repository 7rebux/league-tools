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
  private credentials: Credentials;
  private ws: WebSocket;
  connected: boolean;

  createSocket = () => {
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
        this.handle_message(res);
      } catch {}
    });

    if (socket.readyState == WebSocket.OPEN)
      socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
    else
      socket.on('open', () => {
        socket.send(JSON.stringify([5, 'OnJsonApiEvent']));
      });

    console.log('done with creation');
    return socket;
  };

  onConnect = () => {
    console.log('onConnect');
    this.connected = true;

    if (this.ws) {
      this.ws.terminate();
      this.ws = undefined;
    }

    console.log('creating WS');
    this.ws = this.createSocket();
    console.log('success creating WS');

    console.log('Reconnected');
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

        console.log('Lost connection');
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

  handle_message = (message: EventResponse) => {
    BrowserWindow.getAllWindows().forEach(
      (
        win // shit code
      ) => win.webContents.send('lcu-event', message)
    );
  };
}

export default LCU;
