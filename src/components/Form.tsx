import * as React from 'react';
import { FormContextProvider } from '../internal/FormContext';
import styles from './Form.scss';

export interface FormOptions {
  readonly children: ReadonlyArray<JSX.Element>;
  readonly activeStageName?: Readonly<string>;
  readonly onSubmit: (values: {
    [name: string]: string;
  }) => void | Promise<void>;
}

interface FormState {
  readonly activeStageName: Readonly<string>;
  readonly values: { [name: string]: string };
  readonly errors: { [name: string]: string | undefined | null } | null;
  readonly disabled: boolean;
  readonly currentStepIndex: number;
}

export default class Form extends React.Component<
  Readonly<FormOptions>,
  Readonly<FormState>
> {
  private _scrollAreaRef: HTMLDivElement | null;

  constructor(props: Readonly<FormOptions>) {
    super(props);
    this._scrollAreaRef = null;
    const firstChild = Array.isArray(props.children) && props.children[0];
    const firstChildName = firstChild && firstChild.props.name;
    this.state = {
      values: {},
      activeStageName: props.activeStageName || firstChildName || '',
      disabled: true,
      errors: null,
      currentStepIndex: 0
    };
  }

  private scrollToBottom = (): void => {
    setTimeout(() => {
      if (this._scrollAreaRef) {
        this._scrollAreaRef.scroll({
          top: this._scrollAreaRef.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 250);
  };

  private setStage = (name: string): void => {
    this.setState({ activeStageName: name });
  };

  private nextStage = (): void => {
    const stages = this.props.children;
    if (Array.isArray(stages)) {
      const index = stages.findIndex(this.isCurrentStage);
      if (index > -1) {
        const stage = stages[index + 1];
        if (stage) {
          this.setState({
            activeStageName: stage.props.name,
            currentStepIndex: 0
          });
        }
      }
    }
    this.scrollToBottom();
  };

  private previousStage = (): void => {
    //
  };

  private disable = (): void => {
    this.setState({ disabled: true });
  };

  private enable = (): void => {
    this.setState({ disabled: false });
  };

  private setError = (name: string, error?: string | null): void => {
    this.setState({
      errors: this.state.errors ? { ...this.state.errors, [name]: error } : null
    });
  };

  private setValue = (name: string, value: string): void => {
    this.setState({ values: { ...this.state.values, [name]: value } });
  };

  private setValues = (values: { [name: string]: string }): void => {
    this.setState({ values });
  };

  private setCurrentStepIndex = (index: number): void => {
    this.setState({ currentStepIndex: index });
  };

  private nextStep = (): void => {
    this.setState({ currentStepIndex: this.state.currentStepIndex + 1 });
  };

  private previousStep = (): void => {
    this.setState({ currentStepIndex: this.state.currentStepIndex - 1 });
  };

  private isCurrentStage = (stage: JSX.Element): boolean => {
    return (
      stage && stage.props && stage.props.name === this.state.activeStageName
    );
  };

  /*
  private isVisibleStage = (stage: JSX.Element): boolean => {
    const currentIndex = this.props.children.findIndex(this.isCurrentStage);
    const targetIndex = this.props.children.findIndex((child) => {
      return child && child.props && child.props.name === stage.props.name;
    });
    return targetIndex <= currentIndex;
  };
  */

  private onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await this.props.onSubmit(this.state.values);
  };

  public render(): React.ReactNode {
    const { values, errors, currentStepIndex } = this.state;
    const { children } = this.props;

    return (
      <FormContextProvider
        value={{
          setStage: this.setStage,
          nextStage: this.nextStage,
          previousStage: this.previousStage,
          disable: this.disable,
          enable: this.enable,
          setValue: this.setValue,
          setValues: this.setValues,
          setError: this.setError,
          values: values,
          errors: errors,
          stepIndex: currentStepIndex,
          setStepIndex: this.setCurrentStepIndex,
          nextStep: this.nextStep,
          previousStep: this.previousStep
        }}
      >
        <div className='flex w-full h-full items-center overflow-hidden'>
          <div
            className={`${styles.scrollArea} overflow-y-scroll w-full`}
            style={{ height: '20rem' }}
            ref={(el): void => {
              this._scrollAreaRef = el;
            }}
          >
            <form onSubmit={this.onSubmit}>
              {children.slice(0, children.findIndex(this.isCurrentStage) + 1)}
            </form>
          </div>
        </div>
      </FormContextProvider>
    );
  }
}
