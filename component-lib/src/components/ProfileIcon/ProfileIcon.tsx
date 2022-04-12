import React from 'react';

import { ProfileIconProps } from './ProfileIcon.types';
import styles from './ProfileIcon.module.scss';

const ProfileIcon: React.FC<ProfileIconProps> = ({ id, availability }) => {
  return (
    <div className={styles.profileIcon}>
      <img
        src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${id}.png`}
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
