import React from 'react';
import { SummonerIconProps } from './SummonerIcon.types';
import styles from './SummonerIcon.module.scss';

const ICONS_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons';

const SummonerIcon = React.forwardRef<
  HTMLDivElement, 
  SummonerIconProps & React.HTMLAttributes<HTMLDivElement>
>(({iconId, size = 128, selected, favorite, availability, ...props}, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={styles.profileIcon}
      style={{ width: size, height: size }}
      data-selected={selected}
      data-favorite={favorite}
    >
      <img
        loading='lazy'
        src={`${ICONS_URL}/${iconId}.jpg`}
      />
      {availability !== undefined && (
        <div
          className={styles.availability}
          data-availability={availability}
        />
      )}
    </div>
  );
});

export default SummonerIcon;
