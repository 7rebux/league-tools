import { Component } from 'react'

import { request } from '../Bridge'

import './Icon.sass'

class Icon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      icon: 29,
      availability: 'offline',
    }
  }

  componentDidMount() {
    Promise.all([
      request('/lol-summoner/v1/current-summoner', 'get'),
      request('/lol-chat/v1/me', 'get'),
    ]).then((responses) => {
      this.setState({
        icon: responses[0].profileIconId,
        availability: responses[1].availability,
      })
    })
  }

  render() {
    return (
      <div className='icon'>
        <img
          className='summoner-icon'
          src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${this.state.icon}.png`}
        />
        <div className={'availability ' + this.state.availability}></div>
      </div>
    )
  }
}

export default Icon
