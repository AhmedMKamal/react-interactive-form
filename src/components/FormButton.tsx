import * as React from 'react';
import styles from './FormButton.scss';

export default function FormButton(
  props: React.ComponentProps<'button'>
): JSX.Element {
  return (
    <button
      className={`${styles.formButton} block bg-primary hover:bg-opacity-75 text-white font-bold py-3 px-6 my-6 shadow-lg rounded outline-none focus:outline-none`}
      autoFocus
      {...props}
    />
  );
}
