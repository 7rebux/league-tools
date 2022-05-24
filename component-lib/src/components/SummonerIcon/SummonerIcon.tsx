import React from 'react';

import { SummonerIconProps } from './SummonerIcon.types';
import styles from './SummonerIcon.module.scss';

const ProfileIcon: React.FC<SummonerIconProps> = ({ iconId, availability }) => {
  return (
    <div className={styles.profileIcon}>
      <img
        src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${iconId}.png`}
      ></img>
      {availability !== undefined && (
        <div
          className={`${styles.availability}`}
          availability={availability}
        ></div>
      )}
    </div>
  );
};

export default ProfileIcon;
