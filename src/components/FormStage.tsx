import * as React from 'react';
import FormInput from './FormInput';
import { FormContext } from '../internal/FormContext';
import styles from './FormStage.scss';

export interface StageProps {
  // The name of this stage, MUST be unique.
  readonly name: Readonly<string>;
  readonly children: React.ReactNode;
}

interface FormStageState {
  steps: JSX.Element[][];
  stepIndex: number;
  shouldUpdate: boolean;
}

export default function FormStage({
  children
}: StageProps): JSX.Element | null {
  const [state, setState] = React.useState<FormStageState>({
    steps: [],
    stepIndex: 0,
    shouldUpdate: true
  });
  const formContext = React.useContext(FormContext);

  React.useEffect(() => {
    if (children && Array.isArray(children)) {
      let stepIndex = 0;
      const steps: JSX.Element[][] = [];
      children.forEach((child: JSX.Element) => {
        if (
          child.type &&
          child.type.displayName &&
          child.type.displayName === FormInput.displayName
        ) {
          if (!Array.isArray(steps[stepIndex])) {
            steps[stepIndex] = [];
          }
          steps[stepIndex].push(child);
          ++stepIndex;
        } else {
          if (!Array.isArray(steps[stepIndex])) {
            steps[stepIndex] = [];
          }
          steps[stepIndex].push(child);
        }
      }, []);
      if (!state.shouldUpdate) {
        return;
      }
      if (formContext.stepIndex >= steps.length) {
        setState({ ...state, shouldUpdate: false });
        formContext.nextStage();
      } else {
        setState({
          steps,
          stepIndex: formContext.stepIndex,
          shouldUpdate: true
        });
      }
    }
  }, [setState, formContext]);

  return (
    <div className={`${styles.formStage} block my-16`}>
      {state.steps.slice(0, state.stepIndex + 1)}
    </div>
  );
}
