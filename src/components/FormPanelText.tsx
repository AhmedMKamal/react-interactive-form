import * as React from 'react';

export interface FormPanelTextProps {
  readonly children: Readonly<string>;
}

export default class FormPanelText extends React.Component<FormPanelTextProps> {
  public render(): React.ReactNode {
    return (
      <p className='text-gray-100 font-normal text-sm'>{this.props.children}</p>
    );
  }
}
