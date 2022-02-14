const { request } = require('../Bridge')

import Container from '../components/Container'

import './Status.sass'

function Status() {
  function update() {
    request('/lol-chat/v1/me/', 'put', {
      statusMessage: document.getElementById('status-input').value,
    })
  }

  return (
    <div className='page status'>
      <Container title='Status'>
        <input id='status-input' type='text' />
        <button onClick={() => update()}>Update</button>
      </Container>
    </div>
  )
}

export default Status
