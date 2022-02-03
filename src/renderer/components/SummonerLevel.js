const { Component } = require('react')
const { request } = require('../Bridge')

class SummonerLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      level: null,
    }
  }

  componentDidMount() {
    request('/lol-summoner/v1/current-summoner', 'get').then((result) => {
      this.setState({
        loaded: true,
        level: result.summonerLevel,
      })
    })
  }

  render() {
    return (
      <span className="summoner-level">
        {this.state.loaded ? this.state.level : '{ Loading }'}
      </span>
    )
  }
}

export default SummonerLevel
