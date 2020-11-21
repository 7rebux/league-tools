const path = require('path');
const fs = require('fs');
const remote = require('electron').remote;
const LCUConnector = require('lcu-connector');
const fetch = require('node-fetch');

const connector = new LCUConnector();
let Client;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const FILES = {
  connect: 'impl/connect.html',
home: 'impl/home.html',
  background: 'impl/background.html',
  icon: 'impl/icon.html',
  status: 'impl/status.html'
};

appendContent(FILES.connect);

connector.on('connect', (data) => {
  console.log('Successfully connected to League Client!');

  const url = `${data['protocol']}://${data['address']}:${data['port']}`;
  const auth = 'Basic ' + btoa(`${data['username']}:${data['password']}`);
  Client = new LeagueClient(url, auth);

  appendContent(FILES.home);
  document.querySelector('#home').style.visibility = 'visible';
});

connector.on('disconnect', () => {
  console.log('Disconnected from League Client!')
  connector.stop();

  appendContent(FILES.connect);
  document.querySelector('#home').style.visibility = 'hidden';
});

class LeagueClient {
  #url;
  #auth;

  constructor(url, auth) {
    this.#url = url;
    this.#auth = auth;
  }

  get = (endpoint) => {
    console.log('Starting GET %s', endpoint);

    return fetch(`${this.#url}${endpoint}`, {
      headers: {
        Accept: 'application/json',
        Authorization: this.#auth
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log('GET request finished for: %s', endpoint);
      return res;
    });
  }

  post = (endpoint, body) => {
    console.log('Starting POST %s', endpoint);

    return fetch(`${this.#url}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.#auth
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      console.log('POST request finished for: %s', endpoint);
      return res;
    });
  }

  put = (endpoint, body) => {
    console.log('Starting PUT %s', endpoint);

    return fetch(`${this.#url}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.#auth
      },
      method: 'put',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      console.log('PUT request finished for: %s', endpoint);
      return res;
    });
  }
}

function appendContent(file) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file, true)

  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return;

    document.querySelector('#content').innerHTML = this.responseText;

    // load javascript file if it exists
    const jsFile = path.join(__dirname, file.replace(path.extname(file), '.js'));
    if (fs.existsSync(jsFile)) loadScript(path.relative(__dirname, jsFile));
  };
  xhr.send();
}

function loadScript(file) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = file;

  document.body.appendChild(script);
}

function exit() {
  remote.getCurrentWindow().close();
}

function minimize() {
  remote.getCurrentWindow().minimize();
}

function connect() {
  document.getElementById('connect').innerHTML = 'Listening..';
  connector.start();
  console.log('Listening for League Client..');
}
