import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  text?: string;
  icon?: React.ReactElement;
  color?: string;
  backgroundColor?: string;
}

const adjustColor = (color: string, anmount: number) => {
  return color.replace(/\w\w/g, (m) =>
    Math.min(255, Math.max(0, parseInt(m, 16) + anmount)).toString(16),
  );
};

const Badge = React.forwardRef<
  HTMLDivElement,
  BadgeProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      text,
      icon,
      backgroundColor = '#d86ada',
      color = '#fffbf4',
      style,
      ...props
    },
    ref,
  ) => {
    const customStyle: React.CSSProperties = {
      backgroundColor: backgroundColor,
      borderColor: adjustColor(backgroundColor, -20),
      color: color,
    };

    return (
      <div
        ref={ref}
        style={{ ...customStyle, ...style }}
        className={styles.root}
        {...props}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        {text && <span className={styles.text}>{text}</span>}
      </div>
    );
  },
);

export default Badge;
