import * as React from 'react';
import numeral from 'numeral';
import {
  Label,
  Legend,
  Bar,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip
} from 'recharts';
import {
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGreen,
  hexRed
} from '../../../atoms/colors';
import withSizes from 'react-sizes';

// tslint:disable:jsx-no-lambda

export interface ILoanRepaymentAnnualGraphViewModel {
  years: Array<{
    year: number;
    medianEarnings: number;
    loanAmountRemaining: number;
  }>;
  height?: number;
  isMobile?: boolean;
  loading: boolean;
}

type LoanRepaymentAnnualGraphProps = ILoanRepaymentAnnualGraphViewModel;

// const XAxisLabel: React.SFC<any> = props => {
//   return (
//     <text x={props.x} y={props.y} fill={hexGrayDim}>
//       Years after Graduation
//     </text>
//   );
// };

const LoanRepaymentAnnualGraph: React.SFC<LoanRepaymentAnnualGraphProps> = props => {
  return (
    <ResponsiveContainer width="100%" height={props.height || 400}>
      <ComposedChart data={props.years} margin={{ top: 16, right: 0, bottom: 0, left: -20 }}>
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
                    return 'Graduation';
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
              value="Years After Graduation"
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
            right: props.isMobile ? 0 : 50
          }}
          align={'right'}
          verticalAlign="top"
          height={48}
        />
        <Bar
          name={'Median Earnings'}
          dataKey={'medianEarnings'}
          fill={props.loading ? hexGrayLoading1 : hexGreen}
          maxBarSize={30}
        />
        {props.years.find(year => year.year === 0)!.loanAmountRemaining > 0 && (
          <Line
            name={'Remaining Loan Amount'}
            dataKey="loanAmountRemaining"
            stroke={props.loading ? hexGrayLoading2 : hexRed}
            strokeWidth={2}
          />
        )}
        <Tooltip
          formatter={value => numeral(value).format('$0a')}
          labelFormatter={value => `${value} years after Graduation`}
          wrapperStyle={{ opacity: !props.loading ? 1 : 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(
  LoanRepaymentAnnualGraph
) as typeof LoanRepaymentAnnualGraph;
