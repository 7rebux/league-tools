import React from 'react';

import { SummonerIconProps } from './SummonerIcon.types';
import styles from './SummonerIcon.module.scss';

const ProfileIcon: React.FC<SummonerIconProps> = ({
  iconId,
  availability,
  width = 128,
  height = 128,
}) => {
  return (
    <div
      className={styles.profileIcon}
      style={{ width: width, height: height }}
    >
      <img
        src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${iconId}.png`}
      ></img>
      {availability !== undefined && (
        <div
          className={`${styles.availability}`}
          data-custom={availability}
        ></div>
      )}
    </div>
  );
};

export default ProfileIcon;
