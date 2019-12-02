import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';

export interface IRadioWidgetProps extends WidgetProps {
  id: string;
  options: {
    enumOptions: any[];
    enumDisabled?: string;
    inline: boolean;
  };
}

const RadioWidget: React.SFC<IRadioWidgetProps> = props => {
  const { options, value, required, disabled, readonly, autofocus, onChange } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, enumDisabled, inline } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <div className="field-radio-group">
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) !== -1;
        const disabledCls = disabled || itemDisabled || readonly ? 'disabled' : '';
        const radio = (
          <span>
            <input
              type="radio"
              checked={checked}
              name={name}
              required={required}
              value={option.value}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && i === 0}
              onChange={_ => onChange(option.value)}
            />
            <span>{option.label}</span>
          </span>
        );

        return inline ? (
          <label key={i} className={`radio-inline ${disabledCls}`}>
            {radio}
          </label>
        ) : (
          <div key={i} className={`radio ${disabledCls}`}>
            <label>{radio}</label>
          </div>
        );
      })}
    </div>
  );
};

RadioWidget.defaultProps = {
  autofocus: false
};

export default RadioWidget;
