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
import { hexCrimson, hexGrayDim, hexGrayLight, hexGrayLoading2 } from '../../../atoms/colors';
import numeral from 'numeral';

// tslint:disable:jsx-no-lambda

export interface IDivergingGraphViewModel {
  measures: Array<{
    measure: string;
    value: number;
  }>;
  loading: boolean;
}

type DivergingGraphProps = IDivergingGraphViewModel;

const BarLabel: React.SFC<any> = props => {
  return (
    <text
      x={props.value > 0 ? props.x + props.width + 16 : props.x - props.width - 16}
      y={props.y + props.height}
      dy={2}
      fill={hexGrayDim}
      fontWeight="700"
      fontSize="0.875rem"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {(props.value < -1000 || props.value > 1000) && numeral(props.value).format('$0.0a')}
    </text>
  );
};

const DivergingGraph: React.SFC<DivergingGraphProps> = props => {
  const graphData = props.measures || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={graphData}
        margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
        barCategoryGap="10%"
        layout="vertical"
      >
        <XAxis type="number" hide={true} />
        <YAxis
          dataKey="measure"
          type="category"
          axisLine={false}
          width={24}
          orientation="right"
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickSize={0}
          tickMargin={8}
          tickFormatter={props.loading ? (value: any) => '' : (value: any) => value}
        />
        <ReferenceLine x={0} stroke={hexGrayLight} strokeWidth={2} />
        <Bar dataKey="value" name="Value" fill={props.loading ? hexGrayLoading2 : hexCrimson}>
          {!props.loading && <LabelList dataKey="measure" content={BarLabel} />}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DivergingGraph;
