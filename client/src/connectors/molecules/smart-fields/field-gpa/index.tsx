import * as React from 'react';
import GPAField, {
  SmartGPAFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-gpa';
import { useSmartField } from '../shared'

const SmartGPAField: React.FC<SmartGPAFieldProps> = props => {
  const gpaField = useSmartField("gpa")

  return (
    <GPAField
      {...props}
      required={props.required || false}
      value={gpaField.value || ""}
      onChange={newValue => {
        gpaField.onChange(newValue);
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        gpaField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={gpaField.loading}
    />
  );
};

export default SmartGPAField;
