import * as React from 'react';

/**
 * @interface StageOptions
 * @description Represents the stage options used to build a form stage.
 */
export interface StageOptions {
  // The name of this stage, MUST be unique.
  readonly name: Readonly<string>;
  readonly children: React.ReactNode;
}

export default class FormStage extends React.Component<Readonly<StageOptions>> {
  public render(): React.ReactNode {
    return this.props.children;
  }
}
