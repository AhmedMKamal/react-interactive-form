import * as React from 'react';

export interface FormContextProps {
  setStage: (name: string) => void;
  nextStage: () => void;
  previousStage: () => void;
  disable: () => void;
  enable: () => void;
  setValues: (values: { [name: string]: string }) => void;
  setValue: (name: string, value: string) => void;
  values: { [name: string]: string };
  setError: (name: string, error?: string | null) => void;
  errors: { [name: string]: string | undefined | null } | null;

  stepIndex: number;
  setStepIndex: (index: number) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const FormContext = React.createContext<FormContextProps>({
  setStage: () => -1,
  nextStage: () => -1,
  previousStage: () => -1,
  disable: () => -1,
  enable: () => -1,
  setValues: () => -1,
  setValue: () => -1,
  values: {},
  setError: () => -1,
  errors: null,
  stepIndex: 0,
  setStepIndex: () => -1,
  nextStep: () => -1,
  previousStep: () => -1
});

export const FormContextProvider = FormContext.Provider;

const InteractiveFormContextPropName = 'riform';

export type ComponentWithInteractiveFormContext<
  OwnProps extends {} = {}
> = OwnProps & { [InteractiveFormContextPropName]: FormContextProps };

export function withFormContext<OwnProps extends {}>(
  Component: React.ComponentType<ComponentWithInteractiveFormContext<OwnProps>>
): React.ComponentType<Omit<OwnProps, typeof InteractiveFormContextPropName>> {
  return class WithContext extends React.Component<
    OwnProps & FormContextProps
  > {
    public static readonly displayName =
      Component.displayName || 'ComponentWithInteractiveFormContext';

    public render(): React.ReactNode {
      return (
        <FormContext.Consumer>
          {(context: FormContextProps): React.ReactNode => (
            <Component {...this.props} riform={context} />
          )}
        </FormContext.Consumer>
      );
    }
  };
}
