const { ipcRenderer } = window.require('electron')
const { v4: uuidv4 } = require('uuid')

export function connect() {
  return new Promise((resolve, _reject) => {
    ipcRenderer.on('connected', (_event, arg) => {
      resolve(arg)
    })

    ipcRenderer.send('connect')
  })
}

export function request(endpoint, method, body) {
  return new Promise((resolve, _reject) => {
    const id = uuidv4()
    ipcRenderer.send('request', id, endpoint, method, body)

    ipcRenderer.once('response-' + id, (_event, res) => {
      resolve(res)
    })
  })
}
