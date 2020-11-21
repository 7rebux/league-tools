const availability = document.querySelector('#availability');
var button = document.querySelector('#btn-availability');

var payload = { availability: '' };

async function requestStatus() {
  const res = await Client.put('/lol-chat/v1/me/', payload);
  console.log(res);
}

button.addEventListener('mousedown', function () {
  payload['availability'] = availability.value;
  requestStatus();
});
