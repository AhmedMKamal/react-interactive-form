import * as React from 'react';

export interface FormFieldsOptions {
  readonly children: React.ReactNode;
}

class FormField extends React.PureComponent<Readonly<FormFieldsOptions>> {
  constructor(props: Readonly<FormFieldsOptions>) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default FormField;
