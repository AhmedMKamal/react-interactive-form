import * as React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './FormText.css';

interface FormTextProps {
  readonly children: React.ReactNode;
}

export default function FormText({ children }: FormTextProps): JSX.Element {
  const [renderNonTextElements, setRenderNonTextElements] = React.useState(
    false
  );

  if (Array.isArray(children)) {
    return (
      <React.Fragment>
        {children.map((child, index) => {
          if (typeof child === 'string') {
            return (
              <span
                key={index}
                className={`${styles.typewriter} text-gray-600 font-semibold text-xl`}
              >
                <Typewriter
                  options={{ cursor: '', delay: 20 }}
                  onInit={(w): void => {
                    setTimeout(() => {
                      w.typeString(child)
                        .start()
                        .callFunction(() => {
                          setRenderNonTextElements(true);
                        }, {});
                    }, 100);
                  }}
                />
              </span>
            );
          } else {
            return renderNonTextElements && child;
          }
        })}
      </React.Fragment>
    );
  }
  return <React.Fragment />;
}
