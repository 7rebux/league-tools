const { Component } = require('react')
const { request } = require('../Bridge')

const defaultIconId = 29

class SummonerIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      icon: null,
    }
  }

  componentDidMount() {
    request('/lol-summoner/v1/current-summoner', 'get').then((result) => {
      this.setState({
        loaded: true,
        icon: result.profileIconId,
      })
    })
  }

  render() {
    return (
      <img
        className="summoner-icon"
        src={
          this.state.loaded
            ? this.getIconUrl(this.state.icon)
            : this.getIconUrl(defaultIconId)
        }
      />
    )
  }

  getIconUrl(iconId) {
    return `https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${iconId}.png`
  }
}

export default SummonerIcon
