import * as React from 'react';
import { FormContextProvider } from '../internal/FormContext';

export interface FormOptions {
  readonly children: React.ReactNode;
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
}

export default class Form extends React.Component<
  Readonly<FormOptions>,
  Readonly<FormState>
> {
  constructor(props: Readonly<FormOptions>) {
    super(props);
    this.state = {
      values: {},
      activeStageName: '',
      disabled: true,
      errors: null
    };
  }

  private setStage(name: string): void {
    this.setState({ activeStageName: name });
  }

  private nextStage(): void {
    //
  }

  private previousStage(): void {
    //
  }

  private disable(): void {
    this.setState({ disabled: true });
  }

  private enable(): void {
    this.setState({ disabled: false });
  }

  private setError(name: string, error?: string | null): void {
    this.setState({
      errors: this.state.errors ? { ...this.state.errors, [name]: error } : null
    });
  }

  private setValue(name: string, value: string): void {
    this.setState({ values: { ...this.state.values, [name]: value } });
  }

  private setValues(values: { [name: string]: string }): void {
    this.setState({ values });
  }

  private onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await this.props.onSubmit(this.state.values);
  };

  public render(): React.ReactNode {
    const { values, errors } = this.state;
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
          errors: errors
        }}
      >
        <div className='flex w-full h-full items-center'>
          <div>
            <form onSubmit={this.onSubmit}>{children && children[0]}</form>
          </div>
        </div>
      </FormContextProvider>
    );
  }
}
