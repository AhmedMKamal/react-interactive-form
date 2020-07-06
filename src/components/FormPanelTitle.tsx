import * as React from 'react';

export interface FormPanelTitleProps {
  readonly children: Readonly<string>;
}

export default class FormPanelTitle extends React.Component<
  FormPanelTitleProps
> {
  public render(): React.ReactNode {
    return (
      <h1 className='font-semibold text-2xl mb-6'>{this.props.children}</h1>
    );
  }
}
