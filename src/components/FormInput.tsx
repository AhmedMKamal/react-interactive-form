import * as React from 'react';
import {
  withFormContext,
  ComponentWithInteractiveFormContext
} from '../internal/FormContext';

export type FormInputType = 'text' | 'email' | 'password';

interface FormInputProps {
  readonly type: Readonly<FormInputType>;
  readonly placeholder?: Readonly<string>;
  readonly value?: Readonly<string>;
  readonly required?: boolean;
  readonly validate?: RegExp | ((value: string) => boolean);
}

interface FormInputState {
  readonly value: Readonly<string>;
  readonly valid: boolean;
  readonly required: boolean;
  readonly nextButtonVisible: boolean;
}

class FormInput extends React.Component<
  Readonly<ComponentWithInteractiveFormContext<FormInputProps>>,
  Readonly<FormInputState>
> {
  constructor(
    props: Readonly<ComponentWithInteractiveFormContext<FormInputProps>>
  ) {
    super(props);
    this.state = {
      value: '',
      valid: false,
      required: false,
      nextButtonVisible: false
    };
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value,
      // valid: !this.state.required || !!(this.state.required && evt.target.value)
      nextButtonVisible: !!event.target.value
    });
  };

  public render(): JSX.Element {
    const { type, placeholder, required } = this.props;
    const { value, nextButtonVisible } = this.state;

    return (
      <div className='inline-flex items-center border-b border-gray-600 m-2'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={this.handleChange}
          className='outline-none focus:outline-none font-semibold text-xl'
        />
        {nextButtonVisible && (
          <button className='text-primary h-full' type='button'>
            <NextIcon />
          </button>
        )}
      </div>
    );
  }
}

function NextIcon(): JSX.Element {
  return (
    <svg
      viewBox='0 0 492.004 492.004'
      className='fill-current h-full w-4'
      x='0px'
      y='0px'
    >
      <path
        d='M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z'
      />
    </svg>
  );
}

export default withFormContext(FormInput);
