import * as React from 'react';

export interface IRangePercentileGraphViewModel {
  percentile50Bottom: number;
  percentile50BottomLabel: string;
  percentile50Top: number;
  percentile50TopLabel: string;
  percentile75Bottom: number;
  percentile75Top: number;
  percentile75Label: string;
}

type IRangePercentileGraphProps = IRangePercentileGraphViewModel;

const RangePercentileGraph: React.SFC<IRangePercentileGraphProps> = props => {
  const {
    percentile50Bottom,
    percentile50BottomLabel,
    percentile50Top,
    percentile50TopLabel,
    percentile75Bottom,
    percentile75Top,
    percentile75Label
  } = props;

  return (
    <div className="relative w-100" style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}>
      <div className="bg-gray-light br1 relative overflow-hidden" style={{ height: 32 }}>
        <div
          className="bg-crimson absolute top-0 bottom-0"
          style={{
            left: `${percentile50Bottom}%`,
            width: `${percentile50Top - percentile50Bottom}%`
          }}
        />
        <div
          className="bg-crimson-dark absolute top-0 bottom-0"
          style={{
            left: `${percentile75Bottom}%`,
            width: `${percentile75Top - percentile75Bottom}%`
          }}
        />
      </div>
      <span
        className="t-small absolute bottom-0"
        style={{ left: `${percentile50Bottom}%`, transform: `translateX(-50%)` }}
      >
        {percentile50BottomLabel}
      </span>
      <span
        className="t-small absolute bottom-0"
        style={{ left: `${percentile50Top}%`, transform: `translateX(-50%)` }}
      >
        {percentile50TopLabel}
      </span>
      <span
        className="t-small fw7 absolute top-0"
        style={{
          left: `${percentile75Bottom + (percentile75Top - percentile75Bottom) / 2}%`,
          transform: `translateX(-50%)`
        }}
      >
        {percentile75Label}
      </span>
    </div>
  );
};

export default RangePercentileGraph;
