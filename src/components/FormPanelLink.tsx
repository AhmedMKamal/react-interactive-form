import * as React from 'react';

export interface FormPanelLinkProps {
  readonly children: Readonly<string>;
}

export default class FormPanelLink extends React.Component<
  React.ComponentProps<'a'>
> {
  public render(): React.ReactNode {
    return <a className='text-white font-semibold' {...this.props} />;
  }
}
