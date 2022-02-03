import SummonerIcon from '../components/SummonerIcon'
import SummonerLevel from '../components/SummonerLevel'
import SummonerName from '../components/SummonerName'

import './Home.sass'

function Home() {
  return (
    <div className="page home">
      <h1>Home</h1>
      <p>Logged in as <SummonerName /></p>
      <SummonerIcon />
      <SummonerLevel />
    </div>
  )
}

export default Home
