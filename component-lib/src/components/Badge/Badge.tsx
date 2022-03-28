import React from 'react';

import { BadgeProps } from './Badge.types';

import { Font, Color } from '../../Constants';
import { adjustColor } from '../../Utils';

import styles from './Badge.module.scss';

function Badge({
  text,
  icon,
  backgroundColor = Color.primary,
  color = Color.textPrimary,
}: BadgeProps) {
  const badgeStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    borderColor: adjustColor(backgroundColor, -20),
  };
  const textStyle: React.CSSProperties = {
    color: color,
    fontFamily: Font.text,
  };

  return (
    <div className={styles.badge} style={badgeStyle}>
      {icon !== undefined && <img src={icon} />}
      {text !== undefined && <span style={textStyle}>{text}</span>}
    </div>
  );
}

export default Badge;
