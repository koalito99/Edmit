import * as React from 'react';
import { useSmartField } from '../shared'
import HHIField, { SmartHHIFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-hhi'

const SmartHHIField: React.FC<SmartHHIFieldProps> = props => {
  const hhiField = useSmartField("hhi")

  return (
    <HHIField
      {...props}
      required={props.required || false}
      value={hhiField.value || undefined}
      onChange={newValue => {
        hhiField.onChange(newValue)
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        hhiField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={hhiField.loading}
    />
  );
};

export default SmartHHIField;
