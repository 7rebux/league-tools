const { Component } = require('react')
const { request } = require('../Bridge')

class SummonerName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      name: null,
    }
  }

  componentDidMount() {
    request('/lol-summoner/v1/current-summoner', 'get').then((result) => {
      this.setState({
        loaded: true,
        name: result.displayName,
      })
    })
  }

  render() {
    return (
      <span className="summoner-name">
        {this.state.loaded ? this.state.name : '{ Loading }'}
      </span>
    )
  }
}

export default SummonerName
