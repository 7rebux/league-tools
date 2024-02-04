import React from 'react';
import styles from './Skeleton.module.scss';

interface Props {
  width: number;
  height: number;
  borderRadius?: string | number;
}

const Skeleton: React.FC<React.PropsWithChildren<Props>> = ({
  width,
  height,
  borderRadius = 20,
  children,
}) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width, height: height, borderRadius: borderRadius }}
    >
      {children}
    </div>
  );
};

export default Skeleton;
