var champions = document.querySelector("#champion-container");
var splasharts = document.querySelector("#skin-container");

var version = 0;

var payload = { key: "backgroundSkinId",  value: 0 };

async function load() {
  let url = "https://ddragon.leagueoflegends.com/api/versions.json";
  let obj = await (await fetch(url)).json();
  version = obj[0];
}

async function requestBackground() {
  const res = await Client.post('/lol-summoner/v1/current-summoner/summoner-profile/', payload);
  console.log(res);
}

load().then(function () {
  async function load() {
    let url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
    let obj = await (await fetch(url)).json();
    return obj["data"];
  }
  load().then(function (keys) {
    try {
      for (const property in keys) {
        var node = document.createElement("IMG");

        node.classList.add("champion-icon");
        node.src = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${property}.png`;

        node.addEventListener("mousedown", function () {
          load().then(function (skins) {
            // clear container
            splasharts.style.display = "flex";
            splasharts.innerHTML = "";

            for (var i = 0; i < skins.length; i++) {
              var node = document.createElement("IMG");

              node.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${property}_${skins[i]['num']}.jpg`;
              node.classList.add("champion-skin");
              node.alt = skins[i]['id'];

              node.addEventListener("mousedown", function () {
                payload["value"] = parseInt(this.alt);
                requestBackground();
              });

              splasharts.appendChild(node);
            }
          });
          async function load() {
            let url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${property}.json`;
            let obj = await (await fetch(url)).json();
            return obj["data"][property]["skins"];
          }
        });
        champions.appendChild(node);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
