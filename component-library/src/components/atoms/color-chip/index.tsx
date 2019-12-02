import * as React from 'react';
import { hexGrayLoading1, hexWhite } from '../colors';
import { withState } from 'recompose';
import Icon, { EIconName } from '../icon';

export interface IColorChipViewModel {
  color: string;
  opened: boolean;
  alternateContent?: JSX.Element;
  size?: number;
  loading: boolean;
  swapIconColor?: string;
  circular?: boolean;
  className?: string | null;
  style?: React.CSSProperties;
}

export interface IColorChipActions {
  setOpened: (opened: boolean) => boolean;
}

type ColorChipProps = IColorChipViewModel & IColorChipActions;

const RawColorChip: React.SFC<ColorChipProps> = props => {
  const size = props.size || 150;
  const compact = size < 75;

  return (
    <div
      className={"relative " + props.className || ""}
      style={{
        backgroundColor: props.loading ? hexGrayLoading1 : props.color,
        borderRadius: props.circular ? size / 2 : undefined,
        cursor: props.alternateContent ? 'pointer' : 'default',
        height: size,
        width: size,
        ...props.style
      }}
      onClick={() => props.setOpened(!props.opened)}
    >
      <div
        className="absolute"
        style={{
          backgroundColor: hexWhite,
          borderRadius: props.circular ? size / 2 : undefined,
          bottom: 10,
          left: 10,
          right: 10,
          top: 10,
          transform: `scale(${props.opened && props.alternateContent ? 1 : 0})`,
          transition: 'transform 300ms'
        }}
      >
        {props.alternateContent}
      </div>
      <div
        className="absolute flex flex-column justify-center items-center"
        style={{
          bottom: 0,
          left: 0,
          opacity: props.opened && props.alternateContent ? 0 : 1,
          right: 0,
          top: 0,
          transform: `scale(${props.opened && props.alternateContent ? 0 : 1})`,
          transition: 'transform 300ms, opacity 300ms'
        }}
      >
        <span
          style={{
            color: hexWhite,
            fontFamily: "'Merriweather', georgia, times, serif",
            fontSize: size * (!compact ? 2 / 5 : 1 / 2),
            fontVariantNumeric: 'lining-nums',
            fontWeight: 'bold'
          }}
        >
          {props.loading ? '--' : props.children}
        </span>
      </div>
      {props.alternateContent && (
        <span
          className="absolute"
          style={{
            color: props.swapIconColor || hexWhite,
            right: 5,
            top: 5,
            transform: `scale(${props.opened && props.alternateContent ? 0 : 1})`,
            transition: 'transform 300ms'
          }}
        >
          <Icon name={EIconName.Flip} />
        </span>
      )}
    </div>
  );
};

export const ColorChip = withState('opened', 'setOpened', false)(RawColorChip);
