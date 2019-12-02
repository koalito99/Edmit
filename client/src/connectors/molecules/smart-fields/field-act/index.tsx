import * as React from 'react';
import ACTField, {
  SmartACTFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-act';
import { useSmartField } from '../shared'

const SmartACTField: React.FC<SmartACTFieldProps> = props => {
  const actField = useSmartField("act")

  return (
    <ACTField
      {...props}
      required={props.required || false}
      value={actField.value || undefined}
      onChange={newValue => {
        actField.onChange(newValue);
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        actField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={actField.loading}
    />
  );
};

export default SmartACTField;
