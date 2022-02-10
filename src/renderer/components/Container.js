const { Component } = require('react')

import './Container.sass'

class Container extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='container'>
        <div className='header'>
          <div className='inner'>
            <span className='title'>{this.props.title}</span>
          </div>
        </div>
        <div className='contents'>{this.props.children}</div>
      </div>
    )
  }
}

export default Container
