import * as React from 'react';
import SATField, {
  SmartSATFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-sat';
import { useSmartField } from '../shared'

const SmartSATField: React.FC<SmartSATFieldProps> = props => {
  const satField = useSmartField("sat")

  return (
    <SATField
      {...props}
      required={props.required || false}
      value={satField.value || undefined}
      onChange={newValue => {
        satField.onChange(newValue);
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        satField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={satField.loading}
    />
  );
};

export default SmartSATField;
