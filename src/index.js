import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style.sass'

import TitleBar from './components/TitleBar'

import Login from './pages/Login'
import Home from './pages/Home'

ReactDOM.render(
  <Router>
    <div>
      <TitleBar />
      <main id="content">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  </Router>,
  document.getElementById('root')
)
