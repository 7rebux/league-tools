var icons = document.querySelector('#icon-container');

var version = 0;

var payload = { icon: 0 };

async function load() {
  let url = 'https://ddragon.leagueoflegends.com/api/versions.json';
  let obj = await (await fetch(url)).json();
  version = obj[0];
}

async function requestIcon() {
  const res = await Client.put('/lol-chat/v1/me/', payload);
  console.log(res);
}

load().then(function () {
  async function load() {
    let url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/profileicon.json`;
    let obj = await (await fetch(url)).json();
    return obj['data'];
  }
  load().then(function (keys) {
    try {
      for (const id in keys) {
        var node = document.createElement('IMG');

        node.src = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`;
        node.classList.add('container-element');
        node.classList.add('size-icon')

        node.addEventListener('mousedown', function () {
          payload['icon'] = id;
          requestIcon();
        });

        icons.appendChild(node);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
