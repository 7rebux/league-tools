const { Component } = require('react')
const { request } = require('../Bridge')

import Icon from './Icon'
import ProfileBadge from './ProfileBadge'

import './Profile.sass'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: 0,
      name: 'Name',
      rank: 'UNRANKED',
      division: '',
      tag: 'TAG',
      region: 'Region',
      rp: 0,
      be: 0,
    }
  }

  componentDidMount() {
    Promise.all([
      request('/lol-summoner/v1/current-summoner', 'get'),
      request('/lol-chat/v1/me', 'get'),
      request('/lol-inventory/v1/wallet/0'),
    ]).then((responses) => {
      this.setState({
        level: responses[0].summonerLevel,
        name: responses[0].displayName,
        rank: (responses[1].lol.rankedLeagueTier ?? 'UNRANKED').toLowerCase(),
        division: responses[1].lol.rankedLeagueDivision,
        tag: responses[1].gameTag,
        region: responses[1].platformId,
        rp: responses[2].RP ?? 0,
        be: responses[2].lol_blue_essence ?? 0,
      })
    })
  }

  render() {
    return (
      <div id='profile'>
        <Icon />
        <div className='info'>
          <div className='upper'>
            <span className='name'>{this.state.name}</span>
            <ProfileBadge
              color='default'
              text={this.state.level}
              icon='./assets/level.png'
            />
            <ProfileBadge
              color='default'
              text={this.state.region}
              icon='./assets/region.png'
            />
          </div>
          <div className='tag'>#{this.state.tag}</div>
          <div className='badges'>
            <ProfileBadge
              color={this.state.rank}
              text={
                this.state.rank.charAt(0).toUpperCase() +
                this.state.rank.slice(1) +
                ' ' +
                this.state.division
              }
              icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/${this.state.rank.toLowerCase()}.png`}
            />
            <ProfileBadge
              color='be'
              text={this.state.be}
              icon='./assets/be.png'
            />
            <ProfileBadge
              color='rp'
              text={this.state.rp}
              icon='./assets/rp.png'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
