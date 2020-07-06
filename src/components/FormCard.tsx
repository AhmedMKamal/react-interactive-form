import * as React from 'react';

export interface FormCardProps {
  readonly children: React.ReactNode;
}

export default class FormCard extends React.Component<FormCardProps> {
  public render(): React.ReactNode {
    return (
      <div className='flex w-full bg-white lg:rounded-lg overflow-hidden shadow-xl flex-row p-3'>
        {this.props.children}
      </div>
    );
  }
}
