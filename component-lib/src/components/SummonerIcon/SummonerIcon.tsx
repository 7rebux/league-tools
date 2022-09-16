import React from 'react';

import { SummonerIconProps } from './SummonerIcon.types';
import styles from './SummonerIcon.module.scss';

const SummonerIcon = React.forwardRef<HTMLDivElement, SummonerIconProps & React.HTMLAttributes<HTMLDivElement>>(
  ({iconId, size = 128, selected, favorite, availability, ...props}, ref) => {
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
  }
);

export default SummonerIcon;
