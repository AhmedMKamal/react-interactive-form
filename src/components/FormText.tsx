import * as React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './FormText.css';

interface FormTextProps {
  readonly children: Readonly<string>;
}

export default function FormText({ children }: FormTextProps): JSX.Element {
  return (
    <span
      className={`${styles.typewriter} text-gray-600 font-semibold text-xl`}
    >
      <Typewriter
        key={children}
        options={{ cursor: '', delay: 20 }}
        onInit={(w): void => {
          setTimeout(() => {
            w.typeString(children).start();
          }, 100);
        }}
      />
    </span>
  );
}
