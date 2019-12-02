import * as React from 'react';
import Text, { ETextType } from '../../typography/text';
import EdmitTooltip, { ETooltipType } from '../../../molecules/tooltip';
import Icon, { EIconName } from '../../icon';

export interface IFormFieldTextViewModel {
  name?: string;
  label: string | JSX.Element;
  value: string;
  placeholder?: string;
  required: boolean;
  errorMessage?: string;
  errorInTooltip?: boolean;
  disabled?: boolean;
  inputTypeOverride?: string;
  clearDisabled?: boolean;
  tabIndex?: number;
  autocomplete?: string;

  className?: string;
  style?: React.CSSProperties;
  testId?: string;
}

export interface IFormFieldTextActions {
  onChange?: (value: string) => any | void;
  onKeyDown?: (key: string, keyCode: number) => void;
  onBlur?: () => any | void;
}

type FormFieldTextProps = IFormFieldTextViewModel & IFormFieldTextActions;

interface IFormFieldTextState {
  hovering: boolean;
  focused: boolean;
}

class FormFieldText extends React.Component<FormFieldTextProps, IFormFieldTextState> {
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
          {this.props.errorMessage &&
            this.props.errorInTooltip && (
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
            data-testid={this.props.testId}
            type={this.props.inputTypeOverride || 'text'}
            value={this.props.value}
            placeholder={this.props.placeholder}
            required={this.props.required}
            disabled={this.props.disabled}
            className={
              'db w-100 input-reset bg-transparent gray-dim pv1 br0 bl-0 bt-0 br-0 bb bw1 shadow-none b--gray-light t-medium lato outline-0 ' +
              (this.props.disabled ? 'not-allowed ' : 'hover-b--crimson ') +
              this.props.className
            }
            style={this.props.style}
            onChange={event => this.props.onChange && this.props.onChange(event.target.value)}
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
            this.props.value && (
              <Icon
                name={EIconName.Close}
                className={'gray-dim absolute'}
                style={{ top: '25%', right: 0 }}
                onClick={() => {
                  if (this.props.onChange) {
                    this.props.onChange('');
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

export default FormFieldText;
