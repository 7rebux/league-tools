import { app, BrowserWindow, session, ipcMain, Menu } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { setBounds, getBounds, addFavorite, removeFavorite, getFavorites } from './settings';
import LCU from './lcu';

// electron forge entry point declared in package.json
declare const MAIN_WEBPACK_ENTRY: string;

const isDevelopment = process.env.NODE_ENV !== 'production';

if (require('electron-squirrel-startup')) app.quit();

const createWindow = (): BrowserWindow => {
  const bounds = getBounds();
  const mainWindow = new BrowserWindow({
    show: false,
    width: bounds.width,
    height: bounds.height,
    webPreferences: {
      devTools: isDevelopment,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.on('resize', () => {
    const size = mainWindow.getSize();

    setBounds(size[0], size[1]);
  });

  mainWindow.loadURL(MAIN_WEBPACK_ENTRY);
  
  if (isDevelopment) 
    mainWindow.webContents.openDevTools();
  else
    Menu.setApplicationMenu(null);

  return mainWindow;
};

app.on('ready', () => {
  if (isDevelopment) installExtension(REACT_DEVELOPER_TOOLS)

  const browserWindow = createWindow();
  const leagueClient = new LCU(browserWindow.id);

  ipcMain.on('lcu-connect', (event) => {
    leagueClient.connect().then(
      () => event.reply('lcu-connected'),
      (reason) => event.reply('lcu-connected', reason)
    );
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

  browserWindow.once('ready-to-show', browserWindow.show);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
