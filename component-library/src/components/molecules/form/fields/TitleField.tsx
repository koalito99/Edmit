import * as React from 'react';
import { FieldProps } from 'react-jsonschema-form';

const REQUIRED_FIELD_SYMBOL = '*';

export interface ITitleFieldProps extends FieldProps {
  id: string;
  title: string;
  required: boolean;
}

const TitleField: React.SFC<ITitleFieldProps> = props => {
  const { id, title, required } = props;
  return (
    <legend id={id}>
      {title}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </legend>
  );
};

export default TitleField;
