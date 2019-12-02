import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldPassword from '../../../atoms/form/form-field-password';

export interface IPasswordWidgetProps extends WidgetProps {
  label: string;
}

const PasswordWidget: React.SFC<IPasswordWidgetProps> = props => {
  return (
    <FormFieldPassword
      label={props.label}
      value={props.value}
      required={props.required}
      onChange={props.onChange}
    />
  );
};

export default PasswordWidget;
