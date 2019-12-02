import * as React from 'react';
import numeral from 'numeral';
import {
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import { hexGrayDim, hexGrayLight, hexGrayLoading2, hexTeal } from '../../../atoms/colors';

// tslint:disable:jsx-no-lambda

export interface ITuitionGraphViewModel {
  data: Array<{
    tuition: number;
    year: number;
  }>;
  loading: boolean;
}

type TuitionGraphProps = ITuitionGraphViewModel;

const XAxisLabel: React.SFC<any> = props => {
  return (
    <text x={props.x} y={props.y} fill={hexGrayDim}>
      Years ago
    </text>
  );
};

const TuitionGraph: React.SFC<TuitionGraphProps> = props => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={props.data} margin={{ top: 16, right: 0, bottom: 0, left: 0 }}>
        <ReferenceLine y={0} stroke={hexGrayLight} strokeWidth={2} />
        <XAxis
          dataKey="year"
          height={48}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickLine={{ stroke: hexGrayLight }}
          ticks={props.data.map(element => element.year)}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : (value: any) => {
                  if (value === 0) {
                    return 'Now';
                  }

                  return value;
                }
          }
        >
          {!props.loading && <Label position={'insideBottom'} content={XAxisLabel} />}
        </XAxis>
        <YAxis
          type="number"
          width={72}
          padding={{ top: 8, bottom: 0 }}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tickLine={false}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickSize={4}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : (value: any) => {
                  if (value === 0) {
                    return '';
                  }
                  return numeral(value).format('$0a');
                }
          }
        />
        {!props.loading && (
          <Legend
            iconSize={16}
            wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem' }}
            verticalAlign="top"
            height={48}
          />
        )}
        <Line
          type="monotone"
          name={'Tuition'}
          dataKey="tuition"
          stroke={props.loading ? hexGrayLoading2 : hexTeal}
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default TuitionGraph;
