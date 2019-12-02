import * as React from 'react';
import Text, { ETextType } from '../../typography/text';
import EdmitTooltip, { ETooltipType } from '../../../molecules/tooltip';
import Icon, { EIconName } from '../../icon';

export interface IFormFieldSelectViewModel {
  name?: string;
  label?: string | JSX.Element;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  children: any;
  value?: string;
  id?: string;
  onSelect?: (value: string) => void;
  tabIndex?: number;
  barStyle?: boolean;

  className?: string;
  style?: React.CSSProperties;

  testId?: string;
}

type FormFieldSelectProps = IFormFieldSelectViewModel;

const FormFieldSelect: React.SFC<FormFieldSelectProps> = props => (
  <div className={'relative dib'}>
    {(props.label || props.required || (props.errorMessage && props.errorInTooltip)) && (
      <span data-testid={props.testId}>
        <Text className="mv0 fw7 t-medium black">
          {props.label}
          {props.required && !props.disabled && props.label && <span className="crimson">*</span>}
          {props.errorMessage && props.errorInTooltip && (
            <EdmitTooltip type={ETooltipType.Error} text={props.errorMessage} />
          )}
        </Text>
      </span>
    )}
    <div className={props.barStyle ? 'dib bg-white br2 pv1 ph2' : ''}>
      <div className={'relative dib'}>
        <select
          name={props.name}
          id={props.id}
          required={props.required}
          disabled={props.disabled}
          onChange={e => (props.onSelect ? props.onSelect(e.target.value) : null)}
          className={
            'dib w-100 input-reset bg-transparent gray-dim pv1 br0 bl-0 bt-0 br-0 bb bw1 shadow-none b--gray-light t-medium lato outline-0 ' +
            (props.disabled ? 'not-allowed ' : 'hover-b--crimson pointer ') +
            props.className
          }
          value={props.value}
          style={props.style}
          tabIndex={props.tabIndex}
        >
          {props.children}
        </select>
        <div className={'absolute'} style={{ top: '25%', right: 0, pointerEvents: 'none' }}>
          <Icon name={EIconName.ChevronDown} />
        </div>
        {props.required && !props.disabled && !props.label && <span className="crimson">*</span>}
        <Text
          type={ETextType.Error}
          className={'mt2 mb0 ' + (props.errorMessage && !props.errorInTooltip ? 'db' : 'dn')}
        >
          {props.errorMessage}
        </Text>
      </div>
    </div>
  </div>
);

export default FormFieldSelect;
