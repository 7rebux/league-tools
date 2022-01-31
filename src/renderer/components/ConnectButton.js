const { connect } = require('../Bridge')
const { useState } = require('react')
const { useNavigate } = require('react-router-dom')

import './ConnectButton.sass'

function ConnectButton() {
  const [status, setStatus] = useState('Connect')
  let navigate = useNavigate()

  return (
    <button
      id="connect"
      onClick={() => {
        setStatus('Connecting..')
        connect().then((success) => navigate('../home'))
      }}
    >
      {status}
    </button>
  )
}

export default ConnectButton
