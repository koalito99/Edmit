import * as React from 'react';
import FormFieldText from '../form-field-text';

export interface IFormFieldPasswordViewModel {
  name?: string;
  label: string | JSX.Element;
  value: string;
  placeholder?: string;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  className?: string;
  tabIndex?: number;

  testId?: string;
}

export interface IFormFieldPasswordActions {
  onChange?: (value: string) => any | void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => any | void;
}

type FormFieldPasswordProps = IFormFieldPasswordViewModel & IFormFieldPasswordActions;

const FormFieldPassword: React.SFC<FormFieldPasswordProps> = props => (
  <FormFieldText {...props} inputTypeOverride="password" clearDisabled />
);

export default FormFieldPassword;
