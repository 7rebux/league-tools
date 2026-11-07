const fs = require('node:fs/promises');
const Store = require('electron-store');

type Bounds = {
  width: number;
  height: number;
};

type Favorites = {
  icons: number[];
  backgrounds: number[];
  statuses: string[];
};

type FavoriteType = 'icon' | 'background' | 'status';

type History = {
  icons: number[];
  backgrounds: number[];
};

type HistoryType = 'icon' | 'background';

const HISTORY_LIMIT = 30;

const schema = {
  window: {
    // https://github.com/ajv-validator/ajv/issues/1710
    default: {},
    width: {
      type: 'number',
      default: 900,
    },
    height: {
      type: 'number',
      default: 650,
    },
  },
  favorites: {
    default: {},
    icons: {
      type: 'number[]',
      default: [] as number[],
    },
    backgrounds: {
      type: 'number[]',
      default: [] as number[],
    },
    statuses: {
      type: 'string[]',
      default: [] as string[],
    },
  },
  history: {
    default: {},
    icons: {
      type: 'number[]',
      default: [] as number[],
    },
    backgrounds: {
      type: 'number[]',
      default: [] as number[],
    },
  },
};
const store = new Store(schema);

export const setBounds = (bounds: Bounds) => {
  store.set('window', bounds);
};

export const getBounds = (): Bounds => {
  return {
    width: store.get('window.width') ?? 900,
    height: store.get('window.height') ?? 659,
  };
};

export const getFavorites = (): Favorites => {
  return {
    icons: store.get('favorites.icons') ?? [],
    backgrounds: store.get('favorites.backgrounds') ?? [],
    statuses: store.get('favorites.statuses') ?? [],
  };
};

export const addFavorite = (type: FavoriteType, value: unknown) => {
  const favorites = getFavorites();

  switch (type) {
    case 'icon':
      store.set('favorites.icons', favorites.icons.concat(value as number));
      break;
    case 'background':
      store.set(
        'favorites.backgrounds',
        favorites.backgrounds.concat(value as number),
      );
      break;
    case 'status':
      store.set(
        'favorites.statuses',
        favorites.statuses.concat(value as string),
      );
  }
};

export const removeFavorite = (type: FavoriteType, value: unknown) => {
  const favorites = getFavorites();

  switch (type) {
    case 'icon':
      store.set(
        'favorites.icons',
        favorites.icons.filter((x) => x !== (value as number)),
      );
      break;
    case 'background':
      store.set(
        'favorites.backgrounds',
        favorites.backgrounds.filter((x) => x !== (value as number)),
      );
      break;
    case 'status':
      store.set(
        'favorites.statuses',
        favorites.statuses.filter((x) => x !== (value as string)),
      );
  }
};

export const getHistory = (): History => {
  return {
    icons: store.get('history.icons') ?? [],
    backgrounds: store.get('history.backgrounds') ?? [],
  };
};

/**
 * Moves the given id to the front of the history, so the list stays ordered
 * from most to least recently applied without duplicates.
 */
export const addToHistory = (type: HistoryType, id: number) => {
  const key = type === 'icon' ? 'icons' : 'backgrounds';
  const history = getHistory()[key];

  store.set(
    `history.${key}`,
    [id, ...history.filter((x) => x !== id)].slice(0, HISTORY_LIMIT),
  );
};

export const exportFavorites = async (path: string) => {
  const favorites = getFavorites();
  await fs.writeFile(path, JSON.stringify(favorites));
};

export const importFavorites = async (path: string) => {
  const content = await fs.readFile(path);
  const favorites = JSON.parse(content);
  store.set('favorites', favorites);
};
