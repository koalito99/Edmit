import * as React from 'react';
import numeral from 'numeral';
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  hexBlue,
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGrayLoading3,
  hexGrayLoading4,
  hexGrayLoading5,
  hexGreen,
  hexOrange,
  hexRed,
  hexWhite,
  hexYellow
} from '../../../atoms/colors';

const BarLabel: React.SFC<any> = props => {
  return (
    <text
      className="recharts-text recharts-bar-label"
      x={props.x + props.width / 2}
      y={props.y + props.height / 2}
      dy={2}
      fill={hexWhite}
      fontWeight="700"
      fontSize="0.875rem"
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {(props.value < -2000 || props.value > 2000) &&
        numeral(props.value).format(`$0${props.value > 1000000 ? '[.]0' : ''}a`)}
    </text>
  );
};

export interface IFinancialPlannerAnnualGraphViewModel {
  data: Array<{
    bar: string;
    discount: number;
    savings: number;
    cash: number;
    workStudy: number;
    loans: number;
  }>;
  loading: boolean;
}

type FinancialPlannerAnnualGraphProps = IFinancialPlannerAnnualGraphViewModel;

const StackedBarTotalLabel: React.SFC<any> = props => {
  const { cash, costOfAttendance, discount, loans, savings, workStudy } = props.barData[
    props.index
  ];
  const labelValue = costOfAttendance - cash - discount - loans - savings - workStudy;

  return (
    <text
      className="recharts-text recharts-bar-label"
      x={props.x + props.width / 2}
      y={props.y}
      dy={-14} // 0.5 * 0.875rem font-size
      fill={hexWhite}
      fontWeight="700"
      fontSize="0.875rem"
      textAnchor="middle"
      opacity="0.75"
    >
      {labelValue > 0 ? numeral(labelValue).format('$0,0') + ' Gap' : ''}
    </text>
  );
};

const FinancialPlannerAnnualGraph: React.SFC<FinancialPlannerAnnualGraphProps> = props => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={props.data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barCategoryGap="10%"
        maxBarSize={160}
        stackOffset={'sign'}
      >
        <XAxis
          dataKey="bar"
          height={24}
          padding={{ right: 24, left: 32 }}
          axisLine={false}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickSize={0}
          tickMargin={8}
          tickFormatter={props.loading ? (value: any) => '' : (value: any) => value}
        />
        <YAxis
          type="number"
          width={32}
          padding={{ top: 8, bottom: 0 }}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickLine={{ stroke: hexGrayLight }}
          tickSize={4}
          mirror={true}
          domain={['dataMin', 'dataMax']}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : (value: any) => {
                  if (value === 0) {
                    return '';
                  }
                  return numeral(Math.abs(value)).format('$0a');
                }
          }
        />
        <Legend
          iconSize={16}
          wrapperStyle={{
            color: hexGrayDim,
            fontSize: '0.875rem',
            opacity: !props.loading ? 1 : 0
          }}
          verticalAlign="top"
          height={40}
        />
        <Bar
          dataKey="discount"
          name="Aid & Scholarship"
          stackId="a"
          fill={props.loading ? hexGrayLoading1 : hexBlue}
          isAnimationActive={false}
        >
          {!props.loading && <LabelList dataKey="discount" content={BarLabel} />}
        </Bar>
        <Bar
          dataKey="savings"
          name="Savings"
          stackId="a"
          fill={props.loading ? hexGrayLoading2 : hexOrange}
          isAnimationActive={false}
        >
          {!props.loading && <LabelList dataKey="savings" content={BarLabel} />}
        </Bar>
        <Bar
          dataKey="cash"
          name="Cash"
          stackId="a"
          fill={props.loading ? hexGrayLoading3 : hexGreen}
          isAnimationActive={false}
        >
          {!props.loading && <LabelList dataKey="cash" content={BarLabel} />}
        </Bar>
        <Bar
          dataKey="workStudy"
          name="Student Wages"
          stackId="a"
          fill={props.loading ? hexGrayLoading4 : hexYellow}
          isAnimationActive={false}
        >
          {!props.loading && <LabelList dataKey="workStudy" content={BarLabel} />}
        </Bar>
        <defs>
          <pattern
            id="diagonalPattern"
            shape-rendering="crispEdges"
            patternUnits="userSpaceOnUse"
            width="30"
            height="30"
          >
            <rect width="30" height="30" fill={hexGrayLoading5} />
            <path
              d="M-5,5 l10,-10 M0,30 l30,-30 M25,35 l10,-10"
              style={{ stroke: hexGrayLoading2, strokeWidth: 11 }}
            />
          </pattern>
        </defs>
        <Bar
          dataKey="loans"
          name="Loans"
          stackId="a"
          fill={props.loading ? hexGrayLoading5 : hexRed}
          label={!props.loading && <StackedBarTotalLabel barData={props.data} />}
          isAnimationActive={false}
          // FIXME background={'url(#diagonalPattern)'}
        >
          {!props.loading && <LabelList dataKey="loans" content={BarLabel} />}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialPlannerAnnualGraph;
