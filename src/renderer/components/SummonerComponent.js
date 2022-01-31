import LeagueComponent from './LeagueComponent'
import SummonerIcon from './SummonerIcon'

import './SummonerComponent.sass'

function SummonerComponent() {
  return (
    <div className="summoner">
      <LeagueComponent 
        endpoint="/lol-summoner/v1/current-summoner"
        method="get"
        render={(res) => <SummonerIcon profileIconId={res.data['profileIconId']} /> }
      />
      <LeagueComponent
        endpoint="/lol-summoner/v1/current-summoner"
        method="get"
        render={(res) => <p className="name">{res.data['displayName']}</p>}
      />
    </div>
  )
}

export default SummonerComponent
