const { Component } = require('react')

import './ProfileBadge.sass'

class ProfileBadge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={'badge ' + this.props.color}>
        <div className="outer">
          <div className="inner">
            <img className="icon" src={this.props.icon} />
            <span className="text">{this.props.text}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileBadge
