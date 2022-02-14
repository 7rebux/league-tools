const { useNavigate } = require('react-router-dom')

import Profile from '../components/Profile'

import './Home.sass'

function Home() {
  const navigate = useNavigate()

  return (
    <div className='page home'>
      <Profile />
      <div>
        <button onClick={() => navigate('../availability')}>
          Availability
        </button>
        <button onClick={() => navigate('../status')}>Status</button>
        <button onClick={() => navigate('../background')}>Background</button>
        <button onClick={() => navigate('../icons')}>Icon</button>
      </div>
    </div>
  )
}

export default Home
