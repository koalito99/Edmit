import * as React from 'react';
import { useSmartField } from '../shared'
import ConnectedSearchHighSchools from '../../search-high-schools'
import { SmartHighSchoolFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-highschool'

const SmartHighSchoolField: React.FC<SmartHighSchoolFieldProps> = props => {
  const highSchoolField = useSmartField("highSchool")

  const [query, setQuery] = React.useState("")

  return (
    <ConnectedSearchHighSchools
      inputValue={query}
      onSearch={newQuery => {
        setQuery(newQuery)
        props.onSearch && props.onSearch(newQuery)
      }}
      selected={highSchoolField.value || undefined}
      onSelected={newValue => {
        highSchoolField.onChange(newValue);
        highSchoolField.onBlur(newValue);
        props.onSelected && props.onSelected(newValue);
      }}
      onClear={() => {
        highSchoolField.onChange(null);
        highSchoolField.onBlur(null);
        props.onClear && props.onClear()
      }}
   />
  );
};

export default SmartHighSchoolField;
