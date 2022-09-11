import React from 'react';

import { Checkbox, Dropdown, SearchBar } from 'component-lib';

import './Backgrounds.scss';

const Backgrounds: React.FC = () => {
  return (
    <div className='backgrounds-page'>
      <div className='filter'>
        <SearchBar />
        <div className='settings'>
          <Dropdown items={['All', 'Favorites']} initialItem='All' />
          <Checkbox title='Legacy' />
        </div>
      </div>
      <div className='backgrounds'></div>
    </div>
  );
};

export default Backgrounds;
