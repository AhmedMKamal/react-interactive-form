import * as React from 'react';

export interface FormPanelProps {
  readonly children: React.ReactNode;
}

export default class FormPanel extends React.Component<FormPanelProps> {
  public render(): React.ReactNode {
    return (
      <div className='hidden lg:block w-1/4 rounded-lg bg-primary text-white p-6'>
        <div className='flex flex-col h-full'>{this.props.children}</div>
      </div>
    );
  }
}
