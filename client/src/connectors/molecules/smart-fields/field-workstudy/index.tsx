import * as React from 'react';
import { useSmartField } from '../shared'
import WorkstudyField, { SmartWorkStudyFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-workstudy'

const SmartWorkstudyField: React.FC<SmartWorkStudyFieldProps> = props => {
  const savingsField = useSmartField("workstudy")

  return (
    <WorkstudyField
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

export default SmartWorkstudyField;
