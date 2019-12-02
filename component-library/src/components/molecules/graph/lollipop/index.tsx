import * as React from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import {
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGrayMuted,
  hexGreen,
  hexRed,
  hexYellow
} from '../../../atoms/colors';

// tslint:disable:jsx-no-lambda

export interface ILollipopGraphViewModel {
  measures: Array<{
    measure: string;
    value: number;
  }>;
  mini?: boolean;
  loading: boolean;
}

type LollipopGraphProps = ILollipopGraphViewModel;

const BarLabel: React.SFC<any> = props => {
  const { x, width, y, height } = props;
  const baseline = y + height;

  return (
    <text
      x={x + width / 2}
      // y={height > 0 ? baseline + 20 : baseline - 20}
      y={baseline + 45}
      fill={hexGrayDim}
      fontSize="0.875rem"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {props.value}
    </text>
  );
};

interface ILollipopBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const LollipopGraph: React.SFC<LollipopGraphProps> = props => {
  const LollipopBar: React.SFC<ILollipopBarProps> = barProps => {
    const { x, y, width, height } = barProps;
    const radius = 10;
    const baseline = y + height;
    const midPointLower = baseline * 0.53;
    const midPointHigher = baseline * 0.7;

    const fill = props.loading
      ? hexGrayLoading2
      : y > midPointHigher
        ? hexRed
        : y >= midPointLower && y <= midPointHigher
          ? hexYellow
          : hexGreen;

    return (
      <g stroke="none" stroke-width={2} fill="none" fill-rule="evenodd">
        <path
          d={`M${x + width / 2},${baseline} V${y}`}
          stroke={props.loading ? hexGrayLoading1 : hexGrayMuted}
          stroke-linecap="square"
          fill-rule="nonzero"
        />
        <circle cx={x + width / 2} cy={y} r={radius} fill={fill} fill-rule="nonzero" />
      </g>
    );
  };

  // const { max } = props.measures.reduce(
  //   (result: any, dataPoint: any) => ({
  //     max: dataPoint.value > result.max || result.max === 0 ? dataPoint.value : result.max
  //   }),
  //   { max: 0 }
  // );
  //
  // const { min } = props.measures.reduce(
  //   (result: any, dataPoint: any) => ({
  //     min: dataPoint.value < result.min || result.min=== 0 ? dataPoint.value : result.min
  //   }),
  //   { min: 0 }
  // );

  const TwentyFifth = -0.25;
  const Fiftieth = 1;
  const SeventyFifth = 2.25;

  return (
    <ResponsiveContainer width="100%" height={!props.mini ? 200 : 140}>
      <BarChart
        data={props.measures}
        margin={{ top: 20, right: 42, bottom: 20, left: 0 }}
        barCategoryGap="10%"
        layout="horizontal"
      >
        <YAxis
          type="number"
          yAxisId={0}
          orientation={'left'}
          domain={[TwentyFifth, SeventyFifth]}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickSize={4}
          tickLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tickMargin={6}
          width={42}
          ticks={[TwentyFifth, Fiftieth, SeventyFifth]}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : (value: any) => {
                  if (value === TwentyFifth) {
                    return '25%';
                  }
                  if (value === Fiftieth) {
                    return 'Avg.';
                  }
                  if (value === SeventyFifth) {
                    return '75%';
                  }

                  return '';
                }
          }
        />
        <YAxis
          type="number"
          yAxisId={1}
          domain={[TwentyFifth, SeventyFifth]}
          orientation={'right'}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          width={2}
          tickSize={4}
          tickLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tickMargin={6}
          ticks={[TwentyFifth, Fiftieth, SeventyFifth]}
          tickFormatter={(value: any) => ''}
        />
        <ReferenceLine
          y={SeventyFifth}
          stroke={hexGrayLight}
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        <ReferenceLine y={Fiftieth} stroke={hexGrayLight} strokeWidth={2} strokeDasharray="3 3" />
        <ReferenceLine y={0} stroke={hexGrayLight} strokeWidth={2} />
        <XAxis
          dataKey="measure"
          type="category"
          axisLine={false}
          width={8}
          tickSize={0}
          tickFormatter={() => ''}
        />
        <Bar dataKey="value" name="Value" shape={LollipopBar} isAnimationActive={false}>
          <LabelList dataKey="measure" position="top" content={BarLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LollipopGraph;
