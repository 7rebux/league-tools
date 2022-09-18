import React from 'react';
import { BadgeProps } from './Badge.types';
import styles from './Badge.module.scss';

const adjustColor = (color: string, anmount: number) => {
  return color.replace(/\w\w/g, (m) =>
    Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16)
  );
};

const Badge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & React.HTMLAttributes<HTMLDivElement>
>(({text, icon, backgroundColor = '#d86ada', color = '#fffbf4', ...props}, ref) => {
  const customStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    borderColor: adjustColor(backgroundColor, -20),
    color: color,
  };

  return (
    <div 
      {...props}
      ref={ref}
      style={customStyle}
      className={styles.badge}
    >
      {icon !== undefined && <img src={icon} />}
      {text !== undefined && <span>{text}</span>}
    </div>
  );
});

export default Badge;
