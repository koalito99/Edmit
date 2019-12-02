import * as React from 'react';
import FormFieldText from '../form-field-text';

export interface IFormFieldEmailViewModel {
  name?: string;
  label: string | JSX.Element;
  value: string;
  placeholder?: string;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  className?: string;
  clearDisabled?: boolean;
  tabIndex?: number;
  testId?: string;
}

export interface IFormFieldEmailActions {
  onChange?: (value: string) => any | void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => any | void;
}

type FormFieldEmailProps = IFormFieldEmailViewModel & IFormFieldEmailActions;

const FormFieldEmail: React.SFC<FormFieldEmailProps> = props => (
  <FormFieldText
    {...props}
    inputTypeOverride={'email'}
    className={
      'db w-100 input-reset bg-transparent gray-dim pv1 br0 bl-0 bt-0 br-0 bb bw1 shadow-none b--gray-light t-medium lato outline-0 ' +
      (props.disabled ? 'not-allowed ' : 'hover-b--crimson ') +
      props.className
    }
    testId={props.testId}
  />
);

export default FormFieldEmail;
