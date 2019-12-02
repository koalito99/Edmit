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
import { hexGrayDim, hexGrayLight, hexGrayLoading1, hexGreen } from '../../../atoms/colors';

// tslint:disable:jsx-no-lambda

export interface IEarningsNetGraphViewModel {
  data: Array<{
    debtRemaining: number;
    medianEarnings: number;
    netEarnings: number;
    year: number;
  }>;
  loading: boolean;
}

type EarningsNetGraphProps = IEarningsNetGraphViewModel;

const XAxisLabel: React.SFC<any> = props => {
  return (
    <text x={props.x} y={props.y} fill={hexGrayDim}>
      Years After Graduation
    </text>
  );
};

const EarningsNetGraph: React.SFC<EarningsNetGraphProps> = props => {
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
          ticks={Array(14 + 1)
            .fill(null)
            .map((value, i) => i)
            .filter(n => n !== null)}
          tickFormatter={
            props.loading
              ? () => ''
              : (value: any) => {
                if (value === 0) {
                  return 'Graduation';
                }

                if (value === 14) {
                  return 'Mid-Career';
                }

                return '';
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
              ? () => ''
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
          name="Median Earnings"
          dataKey="medianEarnings"
          stroke={props.loading ? hexGrayLoading1 : hexGreen}
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 4 }}
        />
        {/* <Line
          type="monotone"
          name={'Average debt'}
          dataKey="debtRemaining"
          stroke={props.loading ? hexGrayLoading2 : hexRed}
          strokeWidth={2}
          dot={{ r: 0 }}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          name="Net Earnings"
          dataKey="netEarnings"
          stroke={props.loading ? hexGrayLoading3 : hexBlue}
          strokeWidth={4}
          dot={{ r: 0 }}
          activeDot={{ r: 4 }}
        /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default EarningsNetGraph;
