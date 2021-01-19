const status = document.querySelector('#status');
var button = document.querySelector('#btn-status');

var payload = { statusMessage: '' };

async function requestStatus() {
  const res = await Client.put('/lol-chat/v1/me/', payload);
  console.log(res);
}

button.addEventListener('mousedown', function () {
  payload['statusMessage'] = status.value;
  requestStatus();
});
