import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LcuContext } from './LcuContext';

import NavBar from './NavBar';

import { Backgrounds, Connect, Home, Icons, Status } from './pages';

const render = () => {
  ReactDOM.render(
    <div id='main'>
      <BrowserRouter>
        <LcuContext>
          <NavBar />
          <div id='content'>
            <Routes>
              <Route path='/connect' element={<Connect />} />
              <Route path='/home' element={<Home />} />
              <Route path='/icons' element={<Icons />} />
              <Route path='/backgrounds' element={<Backgrounds />} />
              <Route path='/status' element={<Status />} />
            </Routes>
          </div>
        </LcuContext>
      </BrowserRouter>
    </div>,
    document.body
  );
};

render();
