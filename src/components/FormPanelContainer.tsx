import * as React from 'react';

export interface FormPanelContainerProps {
  readonly children: React.ReactNode;
}

export default class FormPanelContainer extends React.Component<
  FormPanelContainerProps
> {
  public render(): React.ReactNode {
    return (
      <div className='flex-1'>
        <div className='flex w-full h-full items-center'>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
