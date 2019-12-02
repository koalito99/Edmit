import * as React from 'react';
import EFCField, {
  SmartEFCFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-efc';
import { useSmartField } from '../shared'

const SmartEFCField: React.FC<SmartEFCFieldProps> = props => {
  const efcField = useSmartField("efc")

  return (
    <EFCField
      {...props}
      required={props.required || false}
      value={efcField.value || undefined}
      onChange={newValue => {
        efcField.onChange(newValue)
        props.onChange && props.onChange(newValue);
      }}
      onBlur={() => {
        efcField.onBlur()
        props.onBlur && props.onBlur()
      }}
      loading={efcField.loading}
    />
  );
};

export default SmartEFCField;
