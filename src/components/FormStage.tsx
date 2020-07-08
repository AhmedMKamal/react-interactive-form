import * as React from 'react';
import { FormContext } from '../internal/FormContext';
import styles from './FormStage.scss';

export interface StageProps {
  // The name of this stage, MUST be unique.
  readonly name: Readonly<string>;
  readonly children: React.ReactNode;
}

interface FormStageState {
  stepIndex: number;
  shouldUpdate: boolean;
}

export default function FormStage({ children }: StageProps): JSX.Element {
  const formContext = React.useContext(FormContext);
  const [state, setState] = React.useState<FormStageState>({
    stepIndex: 0,
    shouldUpdate: true
  });

  React.useEffect(() => {
    if (!state.shouldUpdate) return;
    if (Array.isArray(children)) {
      if (formContext.stepIndex >= children.length) {
        setState({ ...state, shouldUpdate: false });
        formContext.nextStage();
      } else {
        setState({
          stepIndex: formContext.stepIndex,
          shouldUpdate: true
        });
      }
    } else {
      if (formContext.stepIndex === 1) {
        setState({ ...state, shouldUpdate: false });
        formContext.nextStage();
      }
    }
  }, [children, formContext, setState]);

  return (
    <div className={`${styles.formStage} block my-16`}>
      {Array.isArray(children)
        ? children.slice(0, state.stepIndex + 1)
        : children}
    </div>
  );
}
