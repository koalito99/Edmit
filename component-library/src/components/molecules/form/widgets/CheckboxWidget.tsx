import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldCheckbox from '../../../atoms/form/form-field-checkbox';

export interface ICheckboxWidgetProps extends WidgetProps {
  label: string;
  registry: any;
}

const CheckboxWidget: React.SFC<ICheckboxWidgetProps> = props => {
  const { schema, value, required, disabled, readonly, label, onChange } = props;

  const { DescriptionField } = props.registry.widgets;

  return (
    <div>
      {schema.description && <DescriptionField description={schema.description} />}
      <span>
        <FormFieldCheckbox
          label={label}
          checked={typeof value === 'undefined' ? false : value}
          onChange={onChange}
          required={required}
          disabled={disabled || readonly}
        />
      </span>
    </div>
  );
};

CheckboxWidget.defaultProps = {
  autofocus: false
};

export default CheckboxWidget;
