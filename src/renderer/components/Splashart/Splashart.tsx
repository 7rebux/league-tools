import React from 'react';
import styles from './Splashart.module.scss';

export interface SplashartProps {
  skinId: number;
  favorite?: boolean;
  selected?: boolean;
}

const SPLASHART_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes';

const Splashart = React.forwardRef<
  HTMLDivElement,
  SplashartProps & React.HTMLAttributes<HTMLDivElement>
>(({ skinId, selected, favorite, ...props }, ref) => {
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
        alt={`Splashart ${championId}/${skinId}`}
      />
    </div>
  );
});

export default Splashart;
