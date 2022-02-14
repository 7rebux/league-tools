const { request } = require('../Bridge')

import Container from '../components/Container'
import Icon from '../components/Icon'

import './Availability.sass'

function Availability() {
  function update() {
    request('/lol-chat/v1/me/', 'put', {
      availability: document.getElementById('availability-dropdown').value,
    })
  }

  return (
    <div className='page availability'>
      <Container title='Availability'>
        <Icon />
        <select id='availability-dropdown'>
          <option value='chat'>Online</option>
          <option value='away'>Away</option>
          <option value='mobile'>League+</option>
          <option value='offline'>Offline</option>
        </select>
        <button onClick={() => update()}>Update</button>
      </Container>
    </div>
  )
}

export default Availability
