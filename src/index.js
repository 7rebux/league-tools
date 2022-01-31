import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './renderer/style.sass'

import TitleBar from './renderer/components/TitleBar'

import Login from './renderer/pages/Login'
import Home from './renderer/pages/Home'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TitleBar />
      <main className="content">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
