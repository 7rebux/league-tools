import React from 'react';

import { BadgeProps } from './Badge.types';
import styles from './Badge.module.scss';

export function adjustColor(color: string, anmount: number) {
  return color.replace(/\w\w/g, (m) =>
    Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16)
  );
}

const Badge: React.FC<BadgeProps> = ({
  text,
  icon,
  backgroundColor = '#d86ada',
  color = '#fffbf4',
}) => {
  const badgeStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    borderColor: adjustColor(backgroundColor, -20),
  };
  const textStyle: React.CSSProperties = {
    color: color,
  };

  return (
    <div style={badgeStyle} className={styles.badge}>
      {icon !== undefined && <img src={icon} />}
      {text !== undefined && <span style={textStyle}>{text}</span>}
    </div>
  );
};

export default Badge;
