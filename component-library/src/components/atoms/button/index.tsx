import * as React from 'react';
import { css } from "emotion";
import Color from 'color';
import Icon, { EIconName } from '../icon';

export enum EButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export enum EButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large'
}

export enum EButtonIconPosition {
  Left = 'Left',
  Right = 'Right'
}

export interface IButtonViewModel {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: {
    text: string;
  };

  testId?: string;

  text: JSX.Element | string;
  size: EButtonSize;
  type: EButtonType;
  spacing?: boolean;

  color?: string;

  icon?: {
    name: EIconName;
    position?: EButtonIconPosition;
    className?: string;
  };

  style?: React.CSSProperties;
  className?: string;
}

export type ButtonProps = IButtonViewModel;

const Button: React.SFC<ButtonProps> = props => (
  <button
    data-testid={props.testId}
    className={
      'lato fw7 no-underline outline-0 dib ba br1 pv0 nowrap hover-shadow-button ' +
      (props.spacing ? 'mh2 ' : '') +
      (props.type === EButtonType.Secondary ? 'black bg-white b--gray-light hover-gray-dim ' : '') +
      (props.type === EButtonType.Primary
        ? 'white bg-crimson hover-bg-crimson-dark b--crimson hover-b--crimson-dark '
        : '') +
      (props.size === EButtonSize.Small ? 't-button-s ph2  ' : '') +
      (props.size === EButtonSize.Medium ? 't-button-m ph3 ' : '') +
      (props.size === EButtonSize.Large ? 't-button-l ph4 ' : '') +
      (props.disabled ? 'not-allowed o-20 ' : 'pointer ') +
      (props.color ? css({
        ':hover, :active': {
          backgroundColor: new Color(props.color).darken(0.1).hsl().toString(),
          borderColor: new Color(props.color).darken(0.1).hsl().toString(),
        },
        backgroundColor: props.color,
        borderColor: props.color
      }) : '') + ' ' +
      props.className
    }
    onClick={props.onClick}
    disabled={props.disabled}
    style={props.style}
  >
    {props.loading && (
      <span>
        {props.loading.text}
        <Icon name={EIconName.Loading} className="icon-animated-loading ml1" />
      </span>
    )}

    {!props.loading && (
      <span>
        {props.icon &&
          props.icon.position === EButtonIconPosition.Left && (
            <Icon name={props.icon.name} className={'mr1 ' + props.icon.className} />
          )}
        {props.text}
        {props.icon &&
          props.icon.position === EButtonIconPosition.Right && (
            <Icon name={props.icon.name} className={'ml1 ' + props.icon.className} />
          )}
      </span>
    )}
  </button>
);

export default Button;
