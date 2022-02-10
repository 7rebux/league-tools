const { useNavigate } = require('react-router-dom')

import Profile from '../components/Profile'

import './Home.sass'

function Home() {
  const navigate = useNavigate()

  return (
    <div className='page home'>
      <Profile />
      <button onClick={() => navigate('../availability')}>Availability</button>
    </div>
  )
}

export default Home
