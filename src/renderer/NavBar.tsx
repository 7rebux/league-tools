import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Badge, SummonerIcon } from 'component-lib';

import { request } from './ipcBridge';

interface NavItemProps {
  title:  string;
  href:   string;
  icon:   string;
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

  // hide navbar on connect page
  if (location.pathname === '/connect') return <></>;

  const [summonerName, setSummonerName] = useState<string>('Loading..');
  const [summonerIcon, setSummonerIcon] = useState<number>(29);
  const [availability, setAvailability] = useState<string>('offline'); // das ist int
  const [blueEssence, setBlueEssence] = useState<number>(0);
  const [riotPoints, setRiotPoints] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const meData = await request('GET', '/lol-chat/v1/me/');
      const puuid = meData['ppuid'];
      const inventoryData = await request('GET', `/lol-inventory/v1/wallet/${puuid}`);

      setSummonerName(meData['name'] as string);
      setSummonerIcon(meData['icon'] as number);
      setAvailability(meData['availability'] as string);
      setBlueEssence(inventoryData['lol_blue_essence'] as number);
      setRiotPoints(inventoryData['RP'] as number);
    }

    fetchData();
  },[]);

  return (
    <div id='navbar'>
      <div className='nav'>
        <NavItem title='Home'         href='/home'        icon='assets/home.png' />
        <NavItem title='Icons'        href='/icons'       icon='assets/icons.png' />
        <NavItem title='Backgrounds'  href='/backgrounds' icon='assets/backgrounds.png' />
        <NavItem title='Status'       href='/status'      icon='assets/status.png' />
      </div>
      <div className='profile'>
        <SummonerIcon size={35} iconId={summonerIcon} availability={availability} />
        <span>{summonerName}</span>
        <Badge text={blueEssence.toString()} icon='assets/be.png' backgroundColor='#5098DA' />
        <Badge text={riotPoints.toString()} icon='assets/rp.png' backgroundColor='#EA5D5F' />
      </div>
    </div>
  );
};

export default NavBar;
