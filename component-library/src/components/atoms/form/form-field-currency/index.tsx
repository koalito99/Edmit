import * as React from 'react';
import numeral from 'numeral';
import FormFieldText from '../form-field-text';

export interface IFormFieldCurrencyViewModel {
  name?: string;
  label: string | JSX.Element;
  min?: number;
  value?: number;
  placeholder?: number;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  clearDisabled?: boolean;
  tabIndex?: number;

  className?: string;
  style?: React.CSSProperties;

  testId?: string;
}

export interface IFormFieldCurrencyActions {
  onChange?: (value: number | null) => any | void;
  onBlur?: () => any | void;
}

type FormFieldCurrencyProps = IFormFieldCurrencyViewModel & IFormFieldCurrencyActions;

const FormFieldCurrency: React.SFC<FormFieldCurrencyProps> = props => (
  <FormFieldText
    {...props}
    value={numeral(props.value).format('$0,0')}
    placeholder={props.placeholder ? numeral(props.placeholder).format('$0,0') : '$'}
    onChange={value =>
      props.onChange && (value ? props.onChange(numeral(value).value()) : props.onChange(null))
    }
    testId={props.testId}
  />
);

export default FormFieldCurrency;
