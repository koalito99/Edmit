import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';
import FormFieldToggle from '../../../../components/atoms/form/form-field-toggle';

interface IToggleWidgetProps extends WidgetProps {
  label: string;
  registry: any;
  options: {
    enumOptions: Array<{ label: string; value: any }>;
  };
}

const ToggleWidget: React.SFC<IToggleWidgetProps> = props => {
  const { schema, value, disabled, readonly, label, onChange, options } = props;
  const { DescriptionField } = props.registry.widgets;

  const leftOption =
    options.enumOptions.find(option => option.value === false) || options.enumOptions[0];
  const rightOption =
    options.enumOptions.find(option => option.value === true) || options.enumOptions[1];

  const currentOption = options.enumOptions.find(option => option.value === value);

  return (
    <div>
      {schema.description && <DescriptionField description={schema.description} />}
      <span>
        <FormFieldToggle
          optionLeftLabel={leftOption.label}
          optionRightLabel={rightOption.label}
          label={label}
          checked={typeof value === 'undefined' ? false : value}
          onClick={() =>
            onChange(currentOption === leftOption ? rightOption.value : leftOption.value)
          }
          disabled={disabled || readonly}
        />
      </span>
    </div>
  );
};

ToggleWidget.defaultProps = {
  autofocus: false
};

export default ToggleWidget;
