const fs = require('node:fs/promises');
const Store = require('electron-store');

type Favorites = {
  icons: number[];
  backgrounds: number[];
};

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
    icons: {},
    backgrounds: {},
  },
};
const store = new Store(schema);

export const setBounds = (width: number, height: number) => {
  store.set('window.width', width);
  store.set('window.height', height);
};

export const getBounds = () => {
  return {
    width: store.get('window.width'),
    height: store.get('window.height'),
  };
};

export const addFavorite = (type: 'icon' | 'background', id: number) => {
  if (type === 'icon') {
    const icons = store.get('favorites.icons') ?? [];
    store.set('favorites.icons', icons.concat(id));
  } else {
    const backgrounds = store.get('favorites.backgrounds') ?? [];
    store.set('favorites.backgrounds', backgrounds.concat(id));
  }
};

export const removeFavorite = (type: 'icon' | 'background', id: number) => {
  if (type === 'icon') {
    store.set(
      'favorites.icons',
      store.get('favorites.icons').filter((n: number) => n !== id),
    );
  } else {
    store.set(
      'favorites.backgrounds',
      store.get('favorites.backgrounds').filter((n: number) => n !== id),
    );
  }
};

export const getFavorites = (): Favorites => {
  return {
    icons: store.get('favorites.icons') ?? [],
    backgrounds: store.get('favorites.backgrounds') ?? [],
  };
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
