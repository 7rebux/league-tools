import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar, LcuContext } from './components';
import { Backgrounds, Connect, Home, Icons, Status } from './pages';

const App: React.FC = () => {
  return (
    <HashRouter>
      <LcuContext>
        <NavBar />
        <div id='content'>
          <Routes>
            {/* TODO if connected go to home else go to connect */}
            <Route path='/'             element={<Navigate to='/connect' />} />
            <Route path='/connect'      element={<Connect />} />
            <Route path='/home'         element={<Home />} />
            <Route path='/icons'        element={<Icons />} />
            <Route path='/backgrounds'  element={<Backgrounds />} />
            <Route path='/status'       element={<Status />} />
          </Routes>
        </div>
      </LcuContext>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
