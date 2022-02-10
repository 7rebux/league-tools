const { connect } = require('../Bridge')
const { useNavigate } = require('react-router-dom')

import './Login.sass'

function Login() {
  const navigate = useNavigate()

  return (
    <div className='page login'>
      <div>
        <h1>
          Welcome to <span>League Tools</span>
        </h1>
        <p>Start by connecting to your League Client</p>
      </div>
      <div>
        <button onClick={() => connect().then(() => navigate('../home'))}>Connect</button>
      </div>
    </div>
  )
}

export default Login
