import React from 'react';

import { ButtonProps } from './Button.types';

import { Font, Color } from '../../Constants';

import styles from './Button.module.scss';

function Button({ title }: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    background: `linear-gradient(72deg, ${Color.primary}, ${Color.secondary})`,
  };
  const textStyle: React.CSSProperties = {
    color: Color.textPrimary,
    fontFamily: Font.text,
  };

  return (
    <div className={styles.button} style={buttonStyle}>
      <span style={textStyle}>{title}</span>
    </div>
  );
}

export default Button;
