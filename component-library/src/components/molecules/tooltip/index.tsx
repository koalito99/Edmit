import * as React from 'react';

import Icon, { EIconName } from '../../atoms/icon';
import Text from '../../atoms/typography/text';
import { hexRed, hexYellow } from '../../atoms/colors';
import { withState } from 'recompose';
import Tooltip from '@tippy.js/react'
import classNames from 'classnames'
import { css } from 'emotion'

interface ISVGTooltipViewModel {
  height?: number;
  width?: number;
  position?: 'top' | 'bottom';
  text: string;
  transform?: string;
  boxTransform?: string;
  open: boolean;
}

interface ISVGTooltipActions {
  setOpen: (open: boolean) => boolean;
}

type SVGTooltipProps = ISVGTooltipViewModel & ISVGTooltipActions;

const StatelessSVGTooltip: React.SFC<SVGTooltipProps> = tooltipProps => {
  const height = tooltipProps.height || 30;
  const width = tooltipProps.width || 50;
  const position = tooltipProps.position || 'top';

  return (
    <g onMouseLeave={() => tooltipProps.setOpen(false)}>
      <g onMouseEnter={() => tooltipProps.setOpen(true)}>{tooltipProps.children}</g>
      <g transform={tooltipProps.transform} opacity={tooltipProps.open ? 1 : 0}>
        <g transform={tooltipProps.boxTransform}>
          <rect
            x={-width / 2}
            y={position === 'top' ? -height - 7.5 : 7.5}
            width={width}
            height={height}
            fill="black"
            rx="5"
            ry="5"
          />
          <text
            x="0"
            y={position === 'top' ? -(height - 20) - 7.5 : 7.5 + 20}
            fill="#FFF"
            textAnchor="middle"
            fontSize={'0.875rem'}
          >
            {tooltipProps.text}
          </text>
        </g>
        <polygon
          points={`-7.5,${position === 'top' ? '-7.5' : '7.5'} 7.5,${
            position === 'top' ? '-7.5' : '7.5'
          } 0,0`}
          fill="#000"
        />
      </g>
    </g>
  );
};

export const SVGTooltip = withState('open', 'setOpen', false)(StatelessSVGTooltip);

export enum ETooltipType {
  Help = 'Help',
  Error = 'Error',
  AdmissibilityWarn = 'AdmissibilityWarn',
  Warn = 'Warn',
  Info = 'Info',
  Custom = 'Custom'
}

export interface IEdmitTooltipViewModel {
  text?: string;
  content?: JSX.Element;
  position?: 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
  type: ETooltipType;
  children?: any;
  className?: string;
  actionOnClick?: any;
  actionText?: any;
  disabled?: boolean;
  noArrow?: boolean;
  animation?: 'fade' | 'scale' | 'shift-toward' | 'perspective' | 'shift-away';
  backgroundColor?: string;
}

type EdmitTooltipProps = IEdmitTooltipViewModel;

const EdmitTooltip: React.SFC<EdmitTooltipProps> = props => {
  if (props.disabled && props.children) {
    return props.children;
  }

  return (
      <Tooltip
        animation={props.animation || 'fade'}
        animateFill={false}
        arrow={!props.noArrow}
        className={classNames(props.backgroundColor && css`
            background-color: ${props.backgroundColor};
            
            .tippy-backdrop {
              background-color: ${props.backgroundColor};
            }
            
            &[x-placement^='top'] .tippy-arrow {
              border-top-color: ${props.backgroundColor};
            }
            &[x-placement^='bottom'] .tippy-arrow {
              border-bottom-color: ${props.backgroundColor};
            }
            &[x-placement^='left'] .tippy-arrow {
              border-left-color: ${props.backgroundColor};
            }
            &[x-placement^='right'] .tippy-arrow {
              border-right-color: ${props.backgroundColor};
            }
        `, "shadow-card ba br2 b--gray-light", props.className)}
        placement={props.position ? props.position : 'bottom'}
        interactive={true}
        // theme={props.backgroundColor}
        content={
          props.content || (
            <Text className="mv0 lato tl t-small offwhite measure-narrow">
              {props.text}
              {props.actionOnClick && props.actionText && (
                <span className="white underline ml1 fw7 pointer dim" onClick={props.actionOnClick}>
                  {props.actionText}
                </span>
              )}
            </Text>
          )
        }
        popperOptions={{
          modifiers: {
            addZIndex: {
              enabled: true,
              fn: (data: any) => ({
                ...data,
                styles: {
                  ...data.styles,
                  zIndex: 2147483647
                }
              }),
              order: 810
            }
          }
        }}
      >
        <span>
        {props.type === ETooltipType.Error && (
          <Icon name={EIconName.Error} className="red-error" style={{ cursor: 'pointer' }} />
        )}

        {props.type === ETooltipType.AdmissibilityWarn && (
          <Icon name={EIconName.Warn} style={{ color: hexRed, cursor: 'pointer' }} />
        )}

        {props.type === ETooltipType.Warn && (
          <Icon name={EIconName.Warn} style={{ color: hexYellow, cursor: 'pointer' }} />
        )}

        {props.type === ETooltipType.Help && (
          <Icon name={EIconName.Help} className="gray-muted" style={{ cursor: 'pointer' }} />
        )}

        {props.type === ETooltipType.Info && (
          <Icon name={EIconName.Info} className="black-60" style={{ cursor: 'pointer' }} />
        )}

        {props.type === ETooltipType.Custom && props.children}
        </span>
      </Tooltip>
  );
};

export default EdmitTooltip;
