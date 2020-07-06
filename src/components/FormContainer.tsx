import * as React from 'react';

export interface FormContainerProps {
  readonly children: React.ReactNode;
}

export default class FormContainer extends React.Component<FormContainerProps> {
  public render(): React.ReactNode {
    return (
      <div className='bg-white w-3/4 py-4 px-8'>{this.props.children}</div>
    );
  }
}
