import React from 'react';
import styles from './Textbox.module.scss';

const Textbox = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLInputElement> & { placeholder?: string }
>((props, ref) => {
  return <input {...props} ref={ref} className={styles.textbox} />;
});

export default Textbox;
