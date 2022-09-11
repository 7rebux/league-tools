import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Badge, SummonerIcon } from 'component-lib';

import { Backgrounds, Connect, Home, Icons, Status } from './pages';

interface NavItemProps {
  name: string;
}

const NavItem: React.FC<NavItemProps> = ({ name }) => {
  const navigate = useNavigate();
  const current = window.location.pathname.replace('/', '');

  return (
    <div
      className={'nav-item' + (current === name ? ' selected' : '')}
      onClick={() => navigate(`/${name}`)}
    >
      <img src={`assets/${name}.png`} />
      <span>{name}</span>
    </div>
  );
};

const NavBar: React.FC = () => {
  return (
    <div id='navbar'>
      <div className='nav'>
        <NavItem name='home' />
        <NavItem name='icons' />
        <NavItem name='backgrounds' />
        <NavItem name='status' />
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
};

const render = () => {
  ReactDOM.render(
    <div id='main'>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>,
    document.body
  );
};

render();
