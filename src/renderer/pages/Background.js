const { request } = require('../Bridge')

import Container from '../components/Container'

import './Background.sass'

function Background() {
  return (
    <div className='page background'>
      <Container title='champions' />
      <Container title='splasharts' />
    </div>
  )
}

export default Background
