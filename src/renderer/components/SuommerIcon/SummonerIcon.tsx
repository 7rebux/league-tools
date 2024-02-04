import React from 'react';
import styles from './SummonerIcon.module.scss';

export interface SummonerIconProps {
  iconId: number;
  availability?: 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';
  favorite?: boolean;
  selected?: boolean;
  size?: number;
}

const ICONS_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons';

const SummonerIcon = React.forwardRef<
  HTMLDivElement,
  SummonerIconProps & React.HTMLAttributes<HTMLDivElement>
>(({ iconId, size = 128, selected, favorite, availability, ...props }, ref) => {
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
        alt={`Summoner Icon ${iconId}`}
      />
      {availability !== undefined && (
        <div className={styles.availability} data-availability={availability} />
      )}
    </div>
  );
});

export default SummonerIcon;
