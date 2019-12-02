import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldCurrency from '../../../atoms/form/form-field-currency';

export interface ICurrencyWidgetProps extends WidgetProps {
  value: number;
  label: string;
}

const CurrencyWidget: React.SFC<ICurrencyWidgetProps> = props => {
  return (
    <FormFieldCurrency
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default CurrencyWidget;
