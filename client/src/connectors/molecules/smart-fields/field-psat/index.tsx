import * as React from 'react';
import PSATField, {
  SmartPSATFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-psat';
import { useSmartField } from '../shared'

const SmartPSATField: React.FC<SmartPSATFieldProps> = props => {
  const psatField = useSmartField("psat")

  return (
    <PSATField
      {...props}
      required={props.required || false}
      value={psatField.value || undefined}
      onChange={newValue => {
        psatField.onChange(newValue);
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        psatField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={psatField.loading}
    />
  );
};

export default SmartPSATField;
