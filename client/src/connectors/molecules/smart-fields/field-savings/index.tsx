import * as React from 'react';
import { useSmartField } from '../shared'
import SavingsField, { SmartSavingsFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-savings'

const SmartSavingsField: React.FC<SmartSavingsFieldProps> = props => {
  const savingsField = useSmartField("savings")

  return (
    <SavingsField
      {...props}
      required={props.required || false}
      value={savingsField.value || undefined}
      onChange={newValue => {
        savingsField.onChange(newValue)
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        savingsField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={savingsField.loading}
    />
  );
};

export default SmartSavingsField;
