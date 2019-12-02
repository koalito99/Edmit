import * as React from 'react';
import MajorField, {
  SmartMajorFieldProps
} from '@edmit/component-library/src/components/molecules/smart-fields/field-major';
import { useSmartField } from '../shared'
import { sortBy } from 'lodash-es'

const SmartMajorField: React.FC<SmartMajorFieldProps> = props => {
  const majorField = useSmartField("major")

  return (
    <MajorField
      {...props}
      required={props.required || false}
      value={(majorField.value && majorField.value.selectedMajorId) || undefined}
      onSelect={newValue => {
        majorField.onChange({
          ...majorField.value!,
          selectedMajorId: newValue
        });
        majorField.onBlur({
          ...majorField.value!,
          selectedMajorId: newValue
        });
        props.onSelect && props.onSelect(newValue);
      }}
      loading={majorField.loading}
    >
      {sortBy((majorField.value && majorField.value.majors) || [], m => m.name).map(
        (m: { id: string; name: string }) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        )
      )}
    </MajorField>
  );
};

export default SmartMajorField;
