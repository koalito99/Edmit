import * as React from 'react';
import { hexGrayLight } from '../colors';

export enum ESquareCorners {
  All = 'All',
  Top = 'Top',
  Bottom = 'Bottom'
}

interface IProgressBarProps {
  progressAmount: number;
  height: number;
  barColor: string;
  backgroundBarColor?: string;
  squareCorners?: ESquareCorners;
}

export const ProgressBar: React.SFC<IProgressBarProps> = props => {
  let cornerRadius = 'br1';

  switch (props.squareCorners) {
    case ESquareCorners.All:
      cornerRadius = 'br0';
      break;
    case ESquareCorners.Top:
      cornerRadius = 'br1 br--bottom';
      break;
    case ESquareCorners.Bottom:
      cornerRadius = 'br1 br--top';
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        backgroundColor: props.backgroundBarColor ? props.backgroundBarColor : hexGrayLight,
        height: props.height
      }}
      className={'shadow-progress-bar relative ' + cornerRadius}
    >
      <div
        style={{
          backgroundColor: props.barColor,
          height: props.height,
          transition: 'width 300ms',
          width: `${props.progressAmount}%`
        }}
        className={`absolute left-0 ${cornerRadius} ${
          props.progressAmount === 100 ? '' : 'br--left'
        }`}
      />
    </div>
  );
};

export default ProgressBar;
