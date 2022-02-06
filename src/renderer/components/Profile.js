const { Component } = require('react')
const { request } = require('../Bridge')

import './Profile.sass'

import ProfileBadge from './ProfileBadge'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 0,
      name: 'Name',
      icon: 29,
      rank: 'UNRANKED',
      division: '',
      tag: 'TAG',
      availability: 'offline',
      region: 'Region',
    }
  }

  componentDidMount() {
    Promise.all([
      request('/lol-summoner/v1/current-summoner', 'get'),
      request('/lol-chat/v1/me', 'get'),
    ]).then((responses) => {
      this.setState({
        level: responses[0].summonerLevel,
        name: responses[0].displayName,
        icon: responses[0].profileIconId,
        rank: responses[1].lol.rankedLeagueTier,
        division: responses[1].lol.rankedLeagueDivision,
        tag: responses[1].gameTag,
        availability: responses[1].availability,
        region: responses[1].platformId,
      })
    })
  }

  render() {
    return (
      <div id="profile">
        <img
          className="summoner-icon"
          src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${this.state.icon}.png`}
        />
        <div className="info">
          <div className="upper">
            <span className="name">{this.state.name}</span>
            <ProfileBadge
              color="default"
              text={this.state.level}
              icon="./assets/level.png"
            />
            <ProfileBadge
              color="default"
              text={this.state.region}
              icon="./assets/region.png"
            />
          </div>
          <div className="tag">#{this.state.tag}</div>
          <div className="badges">
            <ProfileBadge
              color={this.state.rank.toLowerCase()}
              text={
                this.state.rank.charAt(0) +
                this.state.rank.substring(1).toLowerCase() +
                ' ' +
                this.state.division
              }
              icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/${this.state.rank.toLowerCase()}.png`}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
