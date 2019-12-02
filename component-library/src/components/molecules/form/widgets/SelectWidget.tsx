import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldSelect from '../../../atoms/form/form-field-select';

export interface ISelectWidgetProps extends WidgetProps {
  label: string;
  multiple: boolean;
}

const SelectWidget: React.SFC<ISelectWidgetProps> = props => {
  const {
    schema,
    label,
    options,
    value,
    required,
    // readonly,
    multiple,
    onChange,
    // onBlur,
    // onFocus,
    placeholder
  } = props;
  const { enumOptions, enumDisabled } = options as any;
  const emptyValue = multiple ? [] : '';

  return (
    <FormFieldSelect
      label={label}
      value={typeof value === 'undefined' ? emptyValue : value}
      required={required}
      onSelect={onChange}
    >
      {!multiple && !schema.default && <option value="">{placeholder}</option>}
      {enumOptions.map((option: any, i: number) => {
        const optDisabled = enumDisabled && enumDisabled.indexOf(option.value) !== -1;
        return (
          <option key={i} value={option.value} disabled={optDisabled}>
            {option.label}
          </option>
        );
      })}
    </FormFieldSelect>
  );
};

SelectWidget.defaultProps = {
  autofocus: false
};

export default SelectWidget;
