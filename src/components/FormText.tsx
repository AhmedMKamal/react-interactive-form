import * as React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './FormText.css';

interface FormTextProps {
  readonly children: Readonly<string>;
}

export default class FormText extends React.Component<FormTextProps> {
  public render(): JSX.Element {
    return (
      <span
        className={`${styles.typewriter} text-gray-600 font-semibold text-xl`}
      >
        <Typewriter
          options={{ cursor: '', delay: 25 }}
          onInit={(typewriter): void => {
            typewriter.typeString(this.props.children).start();
          }}
        />
      </span>
    );
  }
}
