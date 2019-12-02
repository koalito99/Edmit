import * as React from 'react';
import Text, { ETextType } from '../../typography/text';
import EdmitTooltip, { ETooltipType } from '../../../molecules/tooltip';
import { EIconName } from '../../icon';
import Icon from '../../icon';

export interface IFormFieldNumberViewModel {
  name?: string;
  label: string | JSX.Element;
  min?: number;
  value?: number;
  placeholder?: number;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  className?: string;
  clearDisabled?: boolean;
  tabIndex?: number;
  style?: React.CSSProperties;

  testId?: string;
}

export interface IFormFieldNumberActions {
  onChange?: (value: number | null) => any | void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => any | void;
}

type FormFieldNumberProps = IFormFieldNumberViewModel & IFormFieldNumberActions;

interface IFormFieldNumberState {
  hovering: boolean;
  focused: boolean;
}

class FormFieldNumber extends React.Component<FormFieldNumberProps, IFormFieldNumberState> {
  readonly state = {
    focused: false,
    hovering: false
  };

  render() {
    return (
      <span>
        <Text className="mv0 fw7 t-medium black">
          {this.props.label}
          {this.props.required && !this.props.disabled && <span className="crimson">*</span>}
          {this.props.errorMessage && this.props.errorInTooltip && (
            <EdmitTooltip type={ETooltipType.Error} text={this.props.errorMessage} />
          )}
        </Text>
        <div
          className={'relative'}
          onMouseOver={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          <input
            name={this.props.name}
            min={this.props.min ? this.props.min : 0}
            value={this.props.value || ''}
            placeholder={this.props.placeholder ? '' + this.props.placeholder : undefined}
            required={this.props.required}
            disabled={this.props.disabled}
            data-testid={this.props.testId}
            type="number"
            className={
              'db w-100 input-reset bg-transparent gray-dim pv1 br0 bl-0 bt-0 br-0 bb bw1 shadow-none b--gray-light t-medium lato outline-0 ' +
              (this.props.disabled ? 'not-allowed ' : 'hover-b--crimson ') +
              this.props.className
            }
            style={this.props.style}
            onChange={event => {
              if (this.props.onChange) {
                this.props.onChange(parseFloat(event.target.value));
              }
            }}
            onWheelCapture={e => {
              (e.target as HTMLInputElement).blur();
            }}
            onKeyDown={e => this.props.onKeyDown && this.props.onKeyDown(e.key, e.keyCode)}
            onBlur={() => {
              if (this.props.onBlur) {
                this.props.onBlur();
              }
              this.setState({ focused: false });
            }}
            onFocus={() => this.setState({ focused: true })}
            tabIndex={this.props.tabIndex}
          />
          {(this.state.focused || this.state.hovering) &&
            !this.props.clearDisabled &&
            this.props.value != null && (
              <Icon
                name={EIconName.Close}
                className={'gray-dim absolute'}
                style={{ top: '25%', right: 20 }}
                onClick={() => {
                  if (this.props.onChange) {
                    this.props.onChange(null);
                  }
                }}
              />
            )}
        </div>
        <Text
          type={ETextType.Error}
          className={
            'mt2 mb0 ' + (this.props.errorMessage && !this.props.errorInTooltip ? 'db' : 'dn')
          }
        >
          {this.props.errorMessage}
        </Text>
      </span>
    );
  }
}

export default FormFieldNumber;
