import * as React from 'react';

export interface FormPanelCardProps {
  readonly children: React.ReactNode;
}

export default class FormPanelCard extends React.Component<FormPanelCardProps> {
  public render(): React.ReactNode {
    return (
      <div className='bg-gray-500 bg-opacity-25 rounded-lg px-6 py-3'>
        {this.props.children}
      </div>
    );
  }
}
