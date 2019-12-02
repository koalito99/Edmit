import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

interface IProgressCircleProps {
  progressPercentage: number; // 0 - 100
  height: number;
}

export const ProgressCircle: React.SFC<IProgressCircleProps> = props => (
  <span
    style={{
      flex: `0 0 ${props.height}px`,
      maxHeight: `${props.height}px`,
      maxWidth: `${props.height}px`
    }}
  >
    <CircularProgressbar percentage={props.progressPercentage} strokeWidth={12} />
  </span>
);

export default ProgressCircle;
