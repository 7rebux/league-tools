import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Badge, SummonerIcon } from 'component-lib';

import { useLcuData } from './LcuContext';

interface NavItemProps {
  title: string;
  href: string;
  icon: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, href, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location.pathname === href;

  return (
    <div
      className={'nav-item' + (selected ? ' selected' : '')}
      onClick={() => navigate(href)}
    >
      <img src={icon} />
      <span>{title}</span>
    </div>
  );
};

const NavBar: React.FC = () => {
  const location = useLocation();
  const lcuData = useLcuData();

  // hide navbar on connect page
  if (location.pathname === '/connect') return <></>;

  return (
    <div id='navbar'>
      <div className='nav'>
        <NavItem title='Home' href='/home' icon='assets/home.png' />
        <NavItem title='Icons' href='/icons' icon='assets/icons.png' />
        <NavItem
          title='Backgrounds'
          href='/backgrounds'
          icon='assets/backgrounds.png'
        />
        <NavItem title='Status' href='/status' icon='assets/status.png' />
      </div>
      <div className='profile'>
        <SummonerIcon
          size={35}
          iconId={lcuData.me.icon}
          availability={lcuData.me.availability}
        />
        <span>{lcuData.me.name}</span>
        <Badge
          text={lcuData.wallet.blueEssence.toString()}
          icon='assets/be.png'
          backgroundColor='#5098DA'
        />
        <Badge
          text={lcuData.wallet.riotPoints.toString()}
          icon='assets/rp.png'
          backgroundColor='#EA5D5F'
        />
      </div>
    </div>
  );
};

export default NavBar;
