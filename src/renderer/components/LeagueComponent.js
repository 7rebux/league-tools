const React = require('react')
const { request } = require('../Bridge')

class LeagueComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = { result: null }
    request(props.endpoint, props.method, props.body).then((res) => {
      this.setState({ result: res })
    })
  }

  render() {
    if (this.state.result === null) {
      return <div>Loading</div>
    } else {
      return <div>{this.props.render({ data: this.state.result })}</div>
    }
  }
}

export default LeagueComponent
