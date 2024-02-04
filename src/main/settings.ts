const Store = require('electron-store');

type Favorites = {
  icons: number[];
  backgrounds: number[];
};

const schema = {
  window: {
    default: {}, // https://github.com/ajv-validator/ajv/issues/1710
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

const setBounds = (width: number, height: number) => {
  store.set('window.width', width);
  store.set('window.height', height);
};

const getBounds = () => {
  return {
    width: store.get('window.width'),
    height: store.get('window.height'),
  };
};

const addFavorite = (type: 'icon' | 'background', id: number) => {
  if (type === 'icon') {
    const icons = store.get('favorites.icons');

    if (icons) {
      store.set('favorites.icons', icons.concat(id));
    } else {
      store.set('favorites.icons', [id]);
    }
  } else {
    const backgrounds = store.get('favorites.backgrounds');

    if (backgrounds) {
      store.set('favorites.backgrounds', backgrounds.concat(id));
    } else {
      store.set('favorites.backgrounds', [id]);
    }
  }
};

const removeFavorite = (type: 'icon' | 'background', id: number) => {
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

const getFavorites = (): Favorites => {
  return {
    icons: store.get('favorites.icons') ?? [],
    backgrounds: store.get('favorites.backgrounds') ?? [],
  };
};

export { setBounds, getBounds, addFavorite, removeFavorite, getFavorites };
