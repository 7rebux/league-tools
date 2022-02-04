const { Component } = require('react')
const { request } = require('../Bridge')

import './Profile.sass'
import ProfileBadge from './ProfileBadge'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      level: null,
      name: null,
      icon: null,
      rank: null,
      division: null,
      tag: null,
      availability: null,
      region: null,
    }
  }

  componentDidMount() {
    request('/lol-summoner/v1/current-summoner', 'get').then(
      (summonerResult) => {
        request('/lol-chat/v1/me', 'get').then((chatResult) => {
          console.log(chatResult)

          this.setState({
            loaded: true,
            level: summonerResult.summonerLevel,
            name: summonerResult.displayName,
            icon: summonerResult.profileIconId,
            rank: chatResult.lol.rankedLeagueTier,
            division: chatResult.lol.rankedLeagueDivision,
            tag: chatResult.gameTag,
            region: chatResult.platformId,
          })
        })
      }
    )
  }

  render() {
    return (
      <div id="profile">
        <img
          className="summoner-icon"
          src={
            this.state.loaded
              ? `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${this.state.icon}.png`
              : `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon29.png`
          }
        />
        <div className="info">
          <div className="upper">
            <span className="name">
              {this.state.loaded ? this.state.name : 'Name'}
            </span>
            <ProfileBadge
              text={this.state.loaded ? this.state.level : '0'}
              icon="./assets/level.png"
            />
            <ProfileBadge
              text={this.state.loaded ? this.state.region : 'Region'}
              icon="./assets/region.png"
            />
          </div>
          <div className="tag">
            #{this.state.loaded ? this.state.tag : '0000'}
          </div>
          <div className="badges">
            <ProfileBadge
              text={
                this.state.loaded
                  ? this.state.rank.charAt(0) +
                    this.state.rank.substring(1).toLowerCase() +
                    ' ' +
                    this.state.division
                  : 'Rank'
              }
              icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/${(this
                .state.loaded
                ? this.state.rank
                : 'unranked'
              ).toLowerCase()}.png`}
            />
            <ProfileBadge text="Top 6%" icon="./assets/level.png" />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
