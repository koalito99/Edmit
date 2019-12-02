import * as React from 'react';
import Text from '../../typography/text';
import EdmitTooltip, { ETooltipType } from '../../../molecules/tooltip';
import { hexCrimson, hexGrayLight, hexOffwhite } from '../../colors'
import Icon, { EIconName } from '../../icon';

interface IFormFieldCheckboxViewModel {
  name?: string;
  label?: React.ReactChild;
  checked: boolean;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  color?: string;

  size?: number;

  style?: React.CSSProperties;
  className?: string;
}

interface IFormFieldCheckboxActions {
  onChange?: (value: boolean) => void;
}

type FormFieldCheckboxProps = IFormFieldCheckboxViewModel & IFormFieldCheckboxActions;

const FormFieldCheckbox: React.SFC<FormFieldCheckboxProps> = props => {
  const size = props.size || 20;

  return (
    <label style={{ ...props.style, cursor: !props.disabled ? 'pointer' : 'not-allowed' }} className={props.className}>
      <span
        style={{
          paddingLeft: 28
        }}
        className={'relative'}
      >
        <input
          name={props.name}
          type={'checkbox'}
          checked={props.checked}
          required={props.required}
          disabled={props.disabled}
          className={'absolute mr1 fw7 h-0 w-0'}
          style={{
            opacity: 0
          }}
          onChange={event => props.onChange && props.onChange(event.target.checked)}
          tabIndex={props.tabIndex}
        />
        <span
          style={{
            backgroundColor: props.checked ? (props.color || hexCrimson) : props.disabled ? hexOffwhite : hexGrayLight,
            height: size,
            left: 0,
            position: 'absolute',
            top: -2,
            transition: 'background-color 200ms',
            width: size,
          }}
          className={'br2 tc white flex justify-center items-center'}
        >
          <Icon
            name={EIconName.Check}
            style={{
              transform: props.checked ? 'scale(1)' : 'scale(0)',
              transition: 'transform 300ms 50ms',
              userSelect: "none",
              fontSize: size*0.75
            }}
          />
        </span>
      </span>
      <Text className="dib mv0 fw7 t-medium black" style={{ opacity: props.disabled ? 0.5 : 1 }}>
        {props.label}
        {props.required && !props.disabled && <span className="crimson">*</span>}
        {props.errorMessage &&
          props.errorInTooltip && (
            <EdmitTooltip type={ETooltipType.Error} text={props.errorMessage} />
          )}
      </Text>
    </label>
  );
};

export default FormFieldCheckbox;
