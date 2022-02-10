import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TitleBar from './renderer/components/TitleBar'

import Login from './renderer/pages/Login'
import Home from './renderer/pages/Home'
import Availability from './renderer/pages/Availability'

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
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
