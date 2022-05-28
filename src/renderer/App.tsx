import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Connect from './pages/Connect';
import Icons from './pages/Icons';

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/main_window' element={<Icons />} />
      </Routes>
    </BrowserRouter>,
    document.body
  );
}

render();
