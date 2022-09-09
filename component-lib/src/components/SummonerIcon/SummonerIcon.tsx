import React from 'react';

import { SummonerIconProps } from './SummonerIcon.types';
import styles from './SummonerIcon.module.scss';

const ProfileIcon: React.FC<SummonerIconProps> = ({
  iconId,
  availability,
  selected = false,
  favorite = false,
  size = 128,
}) => {
  return (
    <div
      className={styles.profileIcon}
      style={{ width: size, height: size }}
      data-selected={selected}
      data-favorite={favorite}
    >
      <img
        src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${iconId}.png`}
      ></img>
      {availability !== undefined && (
        <div
          className={`${styles.availability}`}
          data-availability={availability}
        ></div>
      )}
    </div>
  );
};

export default ProfileIcon;
