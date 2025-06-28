import React from 'react';
import styles from './Splashart.module.scss';

export interface SplashartProps {
  skinId: number;
  splashPath: string;
  favorite?: boolean;
  selected?: boolean;
}

const SPLASHART_BASE_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets';

const Splashart = React.forwardRef<
  HTMLDivElement,
  SplashartProps & React.HTMLAttributes<HTMLDivElement>
>(({ skinId, splashPath, selected, favorite, ...props }, ref) => {
  const championId: number = Math.floor(skinId / 1000);
  const normalizedSplashPath = splashPath
    .replace('/lol-game-data/assets/ASSETS/', '')
    .toLowerCase();

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
        src={`${SPLASHART_BASE_URL}/${normalizedSplashPath}`}
        alt={`Splashart ${championId}/${skinId}`}
      />
    </div>
  );
});

export default Splashart;
