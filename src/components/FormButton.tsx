import * as React from 'react';

export default function FormButton(
  props: React.ComponentProps<'button'>
): JSX.Element {
  return <button {...props} />;
}
