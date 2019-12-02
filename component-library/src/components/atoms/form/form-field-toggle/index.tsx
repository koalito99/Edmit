import * as React from 'react';
import Text, { ETextType } from '../../typography/text/index';

export interface IFormFieldToggleViewModel {
  name?: string;
  label: string | JSX.Element;
  disabled?: boolean;
  checked: boolean;
  optionLeftLabel: string | JSX.Element;
  optionRightLabel: string | JSX.Element;
  onClick?: any;
  className?: string;
  parentClassName?: string;
  tabIndex?: number;
  color?: string;

  testId?: string;
}

type FormFieldToggleProps = IFormFieldToggleViewModel;

const FormFieldToggle: React.SFC<FormFieldToggleProps> = props => (
  <span>
    {(typeof props.label === 'string') ?
      (<Text className="mt0 mb2 fw7 t-medium black">
        {props.label}
      </Text>) :
      props.label}

    <div className={'flex flex-row items-center ' + props.parentClassName}>
      {(typeof props.optionLeftLabel === 'string') ?
        (<Text type={ETextType.Label} className="mv0">
          {props.optionLeftLabel}
        </Text>) :
        props.optionLeftLabel}
      <label className={'input-toggle dib t-medium ' + (props.color ? props.color : 'bg-crimson') + ' mh2 pointer'}>
        <input
          name={props.name}
          checked={props.checked}
          type="checkbox"
          className={'absolute o-0 ' + props.className}
          disabled={props.disabled}
          onClick={props.onClick}
          tabIndex={props.tabIndex}
          data-testid={props.testId}
        />
        <div className="input-toggle-switch bg-white ba b--gray-light pointer" />
      </label>
      {(typeof props.optionRightLabel === 'string') ?
        (<Text type={ETextType.Label} className="mv0">
          {props.optionRightLabel}
        </Text>) :
        props.optionRightLabel}
    </div>
  </span>
);

export default FormFieldToggle;
