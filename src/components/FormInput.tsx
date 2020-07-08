import * as React from 'react';
import {
  withFormContext,
  ComponentWithInteractiveFormContext
} from '../internal/FormContext';
import styles from './FormInput.scss';
import NextIcon from '../internal/NextIcon';

export type FormInputType = 'text' | 'email' | 'password';

interface FormInputProps {
  readonly name: Readonly<string>;
  readonly type: Readonly<FormInputType>;
  readonly placeholder?: Readonly<string>;
  readonly value?: Readonly<string>;
  readonly required?: boolean;
  readonly validate?: RegExp | ((value: string) => boolean);
  readonly shouldRender?: boolean;
}

interface FormInputState {
  readonly value: Readonly<string>;
  readonly valid: boolean;
  readonly required: boolean;
  readonly nextButtonVisible: boolean;
  readonly inputWidth?: string;
  readonly shouldRender: boolean;
}

class FormInput extends React.Component<
  Readonly<ComponentWithInteractiveFormContext<FormInputProps>>,
  Readonly<FormInputState>
> {
  public static readonly displayName = 'ReactInteractiveFormInput';

  constructor(
    props: Readonly<ComponentWithInteractiveFormContext<FormInputProps>>
  ) {
    super(props);
    this.state = {
      value: '',
      valid: false,
      required: false,
      nextButtonVisible: false,
      shouldRender:
        typeof props.shouldRender === 'boolean' ? props.shouldRender : true
    };
  }

  private handleEnterKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value,
      // valid: !this.state.required || !!(this.state.required && evt.target.value)
      nextButtonVisible: !!event.target.value
    });
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { parentElement } = event.target;
    if (parentElement) {
      parentElement.classList.remove(styles.inputGroupBlur);
      parentElement.classList.add(styles.inputGroupFocus);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { parentElement } = event.target;
    if (parentElement) {
      parentElement.classList.add(styles.inputGroupBlur);
      parentElement.classList.remove(styles.inputGroupFus);
    }
    if (this.state.value.length) {
      this.setState({ inputWidth: this.state.value.length + 'ch' }, () => {
        this.handleNextStep();
      });
    }
  };

  private handleNextStep = (): void => {
    this.setState({ nextButtonVisible: false }, () => {
      this.props.riform.setValue(this.props.name, this.state.value);
      this.props.riform.nextStep();
    });
  };

  public render(): JSX.Element | null {
    const { type, placeholder, required } = this.props;
    const { value, nextButtonVisible, inputWidth, shouldRender } = this.state;

    if (!shouldRender) {
      return null;
    }

    return (
      <div
        className={`${styles.inputGroup} inline-flex items-center border-b border-gray-400 m-2 relative`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={this.handleChange}
          onKeyDown={this.handleEnterKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className={`${styles.input} outline-none focus:outline-none font-semibold text-xl`}
          style={{ width: inputWidth }}
          autoFocus
        />
        {nextButtonVisible && (
          <button
            className='text-primary h-full'
            onClick={this.handleNextStep}
            type='button'
          >
            <NextIcon />
          </button>
        )}
      </div>
    );
  }
}

export default withFormContext(FormInput);
