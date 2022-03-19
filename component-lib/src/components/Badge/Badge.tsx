import React from 'react';

import { BadgeProps } from './Badge.types';

import { Font, Color } from '../../Constants';
import { adjustColor } from '../../Utils';

function Badge({
  text,
  icon,
  backgroundColor = Color.primary,
  color = Color.textPrimary,
}: BadgeProps) {
  const badgeStyle: React.CSSProperties = {
    minWidth: '4rem',
    width: 'fit-content',
    minHeight: '1.3rem',
    padding: '.3rem .8rem .3rem .8rem',
    backgroundColor: backgroundColor,
    border: `.4rem solid ${adjustColor(backgroundColor, -20)}`,
    borderRadius: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '.3rem',
    userSelect: 'none',
    pointerEvents: 'none',
  };
  const textStyle: React.CSSProperties = {
    color: color,
    fontSize: '15px',
    fontWeight: '300',
    fontFamily: Font.text,
  };
  const iconStyle: React.CSSProperties = {
    width: '1.3rem',
    height: '1.3rem',
  };

  return (
    <div style={badgeStyle}>
      {icon !== undefined && <img src={icon} style={iconStyle} />}
      {text !== undefined && <span style={textStyle}>{text}</span>}
    </div>
  );
}

export default Badge;
