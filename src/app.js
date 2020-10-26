const remote = require('electron').remote;
const LCUConnector = require('lcu-connector');
const connector = new LCUConnector();

// load connect screen
loadFile("impl/connect.html");

function exit() {
  var window = remote.getCurrentWindow();
  window.close();
}

function connect() {
  document.getElementById('connect').innerHTML = "Listening.."
  connector.start();
  console.log("Listening for League Client..");
}

connector.on("connect", (data) => {
  console.log("Successfully connected to League Client!");
  loadFile("impl/home.html");
});

connector.on("disconnect", () => {
  console.log("Disconnected from League Client!")
  connector.stop(); // stop listening
  loadFile("impl/connect.html");
});

function loadFile(path) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", path, true)
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return;
    document.querySelector("#content").innerHTML = this.responseText;
    loadScript(path.replace(".html", ".js"));
  };
  xhr.send();
}

function loadScript(path) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = path;
  document.body.appendChild(script);
}
