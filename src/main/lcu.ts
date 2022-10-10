import {
  authenticate,
  createHttp1Request,
  Credentials,
  JsonObjectLike,
  LeagueClient,
} from 'league-connect-v2';

class LCU {
  private credentials: Credentials;
  private client: LeagueClient;
  connected: boolean;

  // shit code clean this up
  connect = async () => {
    if (this.client) {
      this.client.start();
      return this.connected;
    }

    this.credentials = await authenticate({
      awaitConnection: true,
    });
    this.client = new LeagueClient(this.credentials);

    this.connected = true;

    // fired on reconnects
    this.client.on('connect', (newCredentials) => {
      this.credentials = newCredentials;
      this.connected = true;

      console.log('Reconnected');
    });

    // fired on disconnects
    this.client.on('disconnect', () => {
      this.connected = false;

      console.log('Lost connection');
    });

    this.client.start();

    return this.connected;
  };

  request = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: any
  ): Promise<JsonObjectLike> => {
    if (!this.connected) throw 'not connected yet';
    const response = await createHttp1Request(
      {
        method: method,
        url: endpoint,
        body: body,
      },
      this.credentials
    );
    return await response.json();
  };
}

export default LCU;
