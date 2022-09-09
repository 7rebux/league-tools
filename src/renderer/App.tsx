import { Badge, SummonerIcon } from 'component-lib';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Connect, Home, Icons } from './pages';

function NavBar() {
  return (
    <div id='navbar'>
      <div className='nav'>
        <div className='nav-item selected'>
          <img src='assets/home.png' />
          <span>Home</span>
        </div>
        <div className='nav-item'>
          <img src='assets/icon.png' />
          <span>Icon</span>
        </div>
        <div className='nav-item'>
          <img src='assets/background.png' />
          <span>Background</span>
        </div>
        <div className='nav-item'>
          <img src='assets/status.png' />
          <span>Status</span>
        </div>
      </div>
      <div className='profile'>
        <div className='icon'>
          <SummonerIcon size={35} iconId={3333} availability='chat' />
        </div>
        <span>Summoner Name</span>
        <Badge text='34231' icon='assets/be.png' backgroundColor='#5098DA' />
        <Badge text='2109' icon='assets/rp.png' backgroundColor='#EA5D5F' />
      </div>
    </div>
  );
}

function render() {
  ReactDOM.render(
    <div id='main'>
      <NavBar />
      <div id='content'>
        <BrowserRouter>
          <Routes>
            <Route path='/connect' element={<Connect />} />
            <Route path='/home' element={<Home />} />
            <Route path='/icons' element={<Icons />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>,
    document.body
  );
}

render();
