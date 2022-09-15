import {
  authenticate,
  createHttp1Request,
  Credentials,
  JsonObjectLike,
  LeagueClient,
} from 'league-connect';

class LCU {
  private credentials: Credentials;
  connected: boolean;

  // shit code clean this up
  connect = async () => {
    this.credentials = await authenticate();
    const client = new LeagueClient(this.credentials);

    this.connected = true;

    // fired on reconnects
    client.on('connect', (newCredentials) => {
      this.credentials = newCredentials;
      this.connected = true;

      console.log('Reconnected');
    });

    // fired on disconnects
    client.on('disconnect', () => {
      this.connected = false;

      console.log('Lost connection');
    });

    client.start();

    return this.connected;
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
