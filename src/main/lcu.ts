import {
  authenticate,
  AuthenticationOptions,
  createHttp1Request,
  Credentials,
  EventResponse,
  JsonObjectLike,
  LeagueClient,
} from 'league-connect';
import { WebSocket } from 'ws';
import https from 'https';

class LCU {
  private credentials: Credentials;
  connected: boolean;
  ws: WebSocket;

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
      console.log(content);
      try {
        const json = JSON.parse(content);
        const [res]: [EventResponse] = json.slice(2);
        console.log(res);
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
    // this.credentials = await authenticate(authOptions);
    this.credentials = {
      password: '3LR2XAMzuaT9L8yICdETEA',
      port: 36779,
      pid: 1608,
    };
    console.log(this.credentials);
    this.onConnect();
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

    console.log('starting client');
    client.credentials = this.credentials;
    client.start();
  };

  request = (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: any
  ): Promise<JsonObjectLike> => {
    return new Promise((resolve, _reject) => {
      createHttp1Request(
        {
          method: method,
          url: endpoint,
          body: body,
        },
        this.credentials
      )
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        });
    });
  };
}

export default LCU;
