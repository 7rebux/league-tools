import React from 'react';
import { SplashartProps } from './Splashart.types';
import styles from './Splashart.module.scss';

const SPLASHART_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes';

const Splashart = React.forwardRef<
  HTMLDivElement, 
  SplashartProps & React.HTMLAttributes<HTMLDivElement>
>(({skinId, selected, favorite, ...props}, ref) => {
  const championId: number = Math.floor(skinId / 1000);

  return (
    <div
      {...props}
      ref={ref}
      className={styles.splashart}
      data-selected={selected}
      data-favorite={favorite}
    >
      <img
        loading='lazy'
        src={`${SPLASHART_URL}/${championId}/${skinId}.jpg`}
      />
    </div>
  );
});

export default Splashart;
