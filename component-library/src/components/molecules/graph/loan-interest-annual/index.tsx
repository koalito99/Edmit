import * as React from 'react';
import numeral from 'numeral';
import {
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import {
  hexBlue,
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGreen
} from '../../../atoms/colors';
import withSizes from 'react-sizes';

// tslint:disable:jsx-no-lambda

export interface ILoanInterestAnnualGraphViewModel {
  years: Array<{
    year: number;
    principal: number;
    totalInterest: number;
  }>;
  principalColor?: string;
  interestColor?: string;
  height?: number;
  isMobile?: boolean;
  loading: boolean;
}

type LoanInterestAnnualGraphProps = ILoanInterestAnnualGraphViewModel;

// const XAxisLabel: React.SFC<any> = props => {
//   return (
//     <text x={props.x} y={props.y} fill={hexGrayDim}>
//       Years after Graduation
//     </text>
//   );
// };

const LoanInterestAnnualGraph: React.SFC<LoanInterestAnnualGraphProps> = props => {
  return (
    <ResponsiveContainer width="100%" height={props.height || 400}>
      <AreaChart data={props.years} margin={{ top: 16, right: -20, bottom: 0, left: -20 }}>
        <ReferenceLine y={0} stroke={hexGrayLight} strokeWidth={2} />
        <XAxis
          dataKey="year"
          height={72}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickLine={false}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : !props.isMobile
                ? (value: any) => {
                  if (value === 0) {
                    return '';
                  }

                  if (value === 14) {
                    return 'Mid-Career';
                  }

                  return value % 2 === 0 ? value : '';
                }
                : () => ''
          }
        >
          {!props.loading && (
            <Label
              value="Year"
              offset={20}
              position="insideBottom"
              fill={hexGrayDim}
            />
          )}
        </XAxis>
        <YAxis
          type="number"
          width={!props.loading ? 72 : 0}
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
        <CartesianGrid opacity={0.35} />
        <Legend
          iconSize={16}
          wrapperStyle={{
            color: hexGrayDim,
            fontSize: '0.875rem',
            opacity: props.loading ? 0 : 1,
            right: 50
          }}
          align={'right'}
          verticalAlign="top"
          height={48}
        />
        <Area
          name={'Principal'}
          dataKey={'principal'}
          fill={props.loading ? hexGrayLoading1 : props.principalColor || hexBlue}
          stroke={props.loading ? hexGrayLoading1 : props.principalColor || hexBlue}
          fillOpacity={1}
          stackId="1"
        />
        <Area
          name={'Total Interest'}
          dataKey={'totalInterest'}
          fill={props.loading ? hexGrayLoading2 : props.interestColor || hexGreen}
          stroke={props.loading ? hexGrayLoading2 : props.interestColor || hexGreen}
          fillOpacity={1}
          stackId="1"
        />
        <Tooltip
          formatter={value => numeral(value).format('$0a')}
          labelFormatter={value => `Year: ${value}`}
          wrapperStyle={{ opacity: !props.loading ? 1 : 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(
  LoanInterestAnnualGraph
) as typeof LoanInterestAnnualGraph;
