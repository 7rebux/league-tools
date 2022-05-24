import React from 'react';

import { ProfileProps } from './Profile.types';
import styles from './Profile.module.scss';

import { Badge, SummonerIcon } from '..';

const Profile: React.FC<ProfileProps> = ({
  name,
  riotId,
  iconId,
  availability,
  level,
  rank,
  region,
}) => {
  return (
    <div className={styles.profile}>
      <SummonerIcon iconId={iconId} availability={availability} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.riotId}>#{riotId}</span>
        </div>
        <div className={styles.badges}>
          <Badge text={region} icon='' />
          <Badge text={level.toString()} icon='' />
          <Badge text={rank} icon='' />
        </div>
      </div>
    </div>
  );
};

export default Profile;
