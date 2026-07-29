import { BrowserWindow } from 'electron';
import { EventResponse, JsonObjectLike } from 'league-connect';
import https from 'https';

/**
 * A fake LCU which serves canned data instead of talking to the League client.
 */

const CHALLENGE_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/challenges.json';

const TOKEN_TIERS = [
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
] as const;

type Challenge = {
  id: number;
  name: string;
  currentLevel: string;
  retireTimestamp: number;
};

// Subset of the CommunityDragon challenge data we care about
type ChallengeData = {
  challenges: Record<
    string,
    { name: string; levelToIconPath?: Record<string, string> }
  >;
};

type Me = {
  puuid: string;
  icon: number;
  availability: string;
  name: string;
  statusMessage: string;
  gameTag: string;
  lol: {
    level: number;
    rankedLeagueQueue: string;
    rankedLeagueTier: string;
    rankedLeagueDivision: string;
    challengeCrystalLevel: string;
    challengePoints: number;
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Strip the query string, endpoints are matched by path only
const path = (endpoint: string) => endpoint.split('?')[0];

const fetchJson = <T>(url: string): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const request = https.get(url, { timeout: 10000 }, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error(`Unexpected status ${response.statusCode}`));
      }

      let body = '';
      response.setEncoding('utf-8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (reason) {
          reject(reason);
        }
      });
    });

    request.on('timeout', () => request.destroy(new Error('Timed out')));
    request.on('error', reject);
  });

/**
 * Real challenge ids so the token icons actually resolve. Tier and legacy flag
 * are derived from the id to keep the list stable between runs. Falls back to
 * a synthetic list when offline (icons will 404, the layout still works).
 */
const loadChallenges = async (): Promise<Record<string, Challenge>> => {
  let entries: { id: number; name: string }[];

  try {
    const data = await fetchJson<ChallengeData>(CHALLENGE_DATA_URL);

    // Challenges are keyed by their id, categories have no token icons
    entries = Object.entries(data.challenges)
      .filter(
        ([, value]) => Object.keys(value.levelToIconPath ?? {}).length > 0,
      )
      .map(([id, value]) => ({ id: Number(id), name: value.name }))
      .filter(({ id }) => Number.isFinite(id) && id > 0);

    console.log(
      '[mock] Loaded %d challenges from CommunityDragon',
      entries.length,
    );
  } catch (reason) {
    console.warn('[mock] Falling back to synthetic challenges:', reason);

    entries = Array.from({ length: 60 }, (_value, index) => ({
      id: 101100 + index,
      name: `Mock Challenge ${index + 1}`,
    }));
  }

  return Object.fromEntries(
    entries.map((entry) => [
      entry.id.toString(),
      {
        id: entry.id,
        name: entry.name,
        currentLevel: TOKEN_TIERS[entry.id % TOKEN_TIERS.length],
        retireTimestamp: entry.id % 7 === 0 ? 1700000000000 : 0,
      },
    ]),
  );
};

class MockLCU {
  private window: BrowserWindow;
  private challengesPromise: Promise<Record<string, Challenge>>;

  private me: Me = {
    puuid: '00000000-0000-0000-0000-000000000000',
    icon: 5678,
    availability: 'chat',
    name: 'MockSummoner',
    statusMessage: 'Running without a League client',
    gameTag: 'DEV1',
    lol: {
      level: 420,
      rankedLeagueQueue: 'RANKED_SOLO_5x5',
      rankedLeagueTier: 'DIAMOND',
      rankedLeagueDivision: 'II',
      challengeCrystalLevel: 'PLATINUM',
      challengePoints: 12345,
    },
  };

  private profile = {
    backgroundSkinId: 103001,
  };

  private wallet = {
    RP: 5240,
    lol_blue_essence: 87310,
  };

  private topChallengeIds: number[] = [];
  private title = -1;

  constructor(windowId: number) {
    this.window = BrowserWindow.fromId(windowId);
  }

  connect = async () => {
    await this.getChallenges();
    console.log('[mock] Connected to fake league client');
  };

  request = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: JsonObjectLike,
  ): Promise<JsonObjectLike> => {
    // Fake some latency so loading states are visible
    await delay(150);

    console.log('[mock] %s %s', method, endpoint, body ?? '');

    switch (path(endpoint)) {
      case '/lol-chat/v1/me': {
        if (method === 'GET') return this.me as JsonObjectLike;

        const update = (body ?? {}) as Partial<Me> & {
          lol?: Partial<Me['lol']>;
        };

        this.me = {
          ...this.me,
          ...update,
          lol: { ...this.me.lol, ...(update.lol ?? {}) },
        };
        this.emit('/lol-chat/v1/me', this.me);

        return this.me as JsonObjectLike;
      }

      case '/lol-summoner/v1/current-summoner/summoner-profile': {
        if (method === 'GET') return this.profile as JsonObjectLike;

        // The client takes { key, value } pairs on this endpoint
        const { key, value } = (body ?? {}) as { key?: string; value?: number };
        if (key) this.profile = { ...this.profile, [key]: value };

        this.emit(
          '/lol-summoner/v1/current-summoner/summoner-profile',
          this.profile,
        );

        return this.profile as JsonObjectLike;
      }

      case '/lol-inventory/v1/wallet':
        return this.wallet as JsonObjectLike;

      case '/lol-challenges/v1/challenges/local-player':
        return (await this.getChallenges()) as JsonObjectLike;

      case '/lol-challenges/v1/summary-player-data/local-player':
        return (await this.getSummary()) as JsonObjectLike;

      case '/lol-challenges/v1/update-player-preferences': {
        const { challengeIds, title } = (body ?? {}) as {
          challengeIds?: number[];
          title?: string;
        };

        this.topChallengeIds = (challengeIds ?? []).map(Number);
        this.title = title ? Number(title) : -1;

        this.emit(
          `/lol-challenges/v1/summary-player-data/player/${this.me.puuid}`,
          await this.getSummary(),
        );

        return {};
      }

      default:
        console.warn('[mock] Unhandled endpoint:', endpoint);
        return {};
    }
  };

  private getChallenges = () => {
    if (!this.challengesPromise) this.challengesPromise = loadChallenges();

    return this.challengesPromise;
  };

  private getSummary = async () => {
    const challenges = await this.getChallenges();

    return {
      topChallenges: this.topChallengeIds
        .map((id) => challenges[id.toString()])
        .filter(Boolean),
      title: { itemId: this.title },
    };
  };

  private emit = (uri: string, data: unknown) => {
    this.window.webContents.send('lcu-event', {
      uri: uri,
      eventType: 'Update',
      data: data,
    } as EventResponse);
  };
}

export default MockLCU;
