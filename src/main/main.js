const { app, ipcMain, BrowserWindow } = require('electron')
const LCUConnector = require('lcu-connector')
const fetch = require('electron-fetch').default

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'assets/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#121212',
      symbolColor: '#ffffff',
    },
  })

  window.loadURL('http://localhost:3000') // TODO differentiate between dev and build mode
}

app.whenReady().then(createWindow)

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const connector = new LCUConnector()
var url, auth

ipcMain.once('connect', (event) => {
  console.log('Connecting..')

  connector.on('connect', (data) => {
    url = `${data['protocol']}://${data['address']}:${data['port']}`
    auth = 'Basic ' + btoa(`${data['username']}:${data['password']}`)

    event.reply('connected', true)
  })

  connector.start()
})

// prevent net::ERR_CERT_AUTHORITY_INVALID
app.commandLine.appendSwitch('ignore-certificate-errors')

ipcMain.on('request', (event, id, endpoint, method, body) => {
  fetch(`${url}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    method: method,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      event.reply('response-' + id, res)
    })
})
