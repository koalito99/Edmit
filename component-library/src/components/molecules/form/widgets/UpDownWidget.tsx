import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldNumber from '../../../atoms/form/form-field-number';

export interface IUpDownWidgetProps extends WidgetProps {
  value: number;
  label: string;
}

const UpDownWidget: React.SFC<IUpDownWidgetProps> = props => {
  return (
    <FormFieldNumber
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default UpDownWidget;
