import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { TitleBar } from './renderer/components'
import { Login, Home, Availability, Status, Background, Icons } from './renderer/pages'

import './renderer/style.sass'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TitleBar />
      <main id='content'>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/availability' element={<Availability />} />
          <Route path='/status' element={<Status />} />
          <Route path='/background' element={<Background />} />
          <Route path='/icons' element={<Icons />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
