import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldText from '../../../atoms/form/form-field-text';

export interface ITextWidgetProps extends WidgetProps {
  label: string;
}

const TextWidget: React.SFC<ITextWidgetProps> = props => {
  return (
    <FormFieldText
      label={props.label}
      value={props.value}
      required={props.required}
      onChange={props.onChange}
    />
  );
};

export default TextWidget;
