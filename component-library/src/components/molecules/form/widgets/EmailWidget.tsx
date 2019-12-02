import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldEmail from '../../../atoms/form/form-field-email';

export interface IEmailWidgetProps extends WidgetProps {
  value: string;
  label: string;
}

const EmailWidget: React.SFC<IEmailWidgetProps> = props => {
  return (
    <FormFieldEmail
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default EmailWidget;
