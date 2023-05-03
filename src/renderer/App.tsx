import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar, LcuContext } from './components';
import { Backgrounds, Challenges, Connect, Home, Icons, Status } from './pages';

const App: React.FC = () => {
  return (
    <HashRouter>
      <LcuContext>
        <NavBar />
        <div id='content'>
          <Routes>
            <Route path='/'             element={<Navigate to='/connect' />} />
            <Route path='/connect'      element={<Connect />} />
            <Route path='/home'         element={<Home />} />
            <Route path='/icons'        element={<Icons />} />
            <Route path='/backgrounds'  element={<Backgrounds />} />
            <Route path='/status'       element={<Status />} />
            <Route path='/challenges'   element={<Challenges />} />
          </Routes>
        </div>
      </LcuContext>
    </HashRouter>
  );
};

const container = document.getElementById('main');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
