import ConnectButton from '../components/ConnectButton'

import './Login.sass'

function Login() {
  return (
    <div className="page login">
      <div>
        <h1>
          Welcome to <span>League Tools</span>
        </h1>
        <p>Start by connecting to your League Client</p>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Login
