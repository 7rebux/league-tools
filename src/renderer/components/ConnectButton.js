const { useState } = require('react')
const { useNavigate } = require('react-router-dom')
const { connect } = require('../Bridge')

import './ConnectButton.sass'

function ConnectButton() {
  const [status, setStatus] = useState('Connect')
  const navigate = useNavigate()

  return (
    <button
      id="connect-button"
      onClick={() => {
        setStatus('Connecting..')
        connect().then(() => navigate('../home'))
      }}
    >
      {status}
    </button>
  )
}

export default ConnectButton
