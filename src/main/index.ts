import { app, BrowserWindow, session, ipcMain } from 'electron';
import LCU from './lcu';

declare const MAIN_WEBPACK_ENTRY: string;

const leagueClient = new LCU();

if (require('electron-squirrel-startup')) app.quit();

const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    height: 650,
    width: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(MAIN_WEBPACK_ENTRY);

  return mainWindow;
};

app.on('ready', () => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['*'], // is this the best solution?
      },
    });
  });
});

ipcMain.once('lcu-connect', (event) => {
  leagueClient.connect().then(() => event.reply('lcu-connected'));
});

ipcMain.on('lcu-request', (event, id, method, endpoint, body?) => {
  leagueClient.request(method, endpoint, body).then((data) => {
    event.reply(`lcu-response-${id}`, data);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
