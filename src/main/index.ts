import { app, BrowserWindow, session, ipcMain } from 'electron';
import { setBounds, getBounds, addFavorite, removeFavorite, getFavorites } from './settings';
import LCU from './lcu';

// electron forge entry point declared in package.json
declare const MAIN_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) app.quit();

const createWindow = (): BrowserWindow => {
  const bounds = getBounds();
  const mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.on('resize', () => {
    const size = mainWindow.getSize();

    setBounds(size[0], size[1]);
  });

  mainWindow.loadURL(MAIN_WEBPACK_ENTRY);

  return mainWindow;
};

app.on('ready', () => {
  const browserWindow = createWindow();
  const leagueClient = new LCU(browserWindow.id);

  ipcMain.on('lcu-connect', (event) => {
    leagueClient.connect().then(() => {
      event.reply('lcu-connected');
    });
  });

  ipcMain.on('lcu-request', (event, id, method, endpoint, body?) => {
    leagueClient.request(method, endpoint, body).then((data) => {
      event.reply(`lcu-response-${id}`, data);
    });
  });

  ipcMain.on('store-get-favorites', (event) => {
    event.reply('store-favorites', getFavorites());
  });

  ipcMain.on('store-add-favorite', (_event, type, id) => {
    addFavorite(type, id);
  });

  ipcMain.on('store-remove-favorite', (_event, type, id) => {
    removeFavorite(type, id);
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['*'], // TODO: is this the best solution?
      },
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
