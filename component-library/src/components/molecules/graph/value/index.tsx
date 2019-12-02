import * as React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading2,
  hexGreen,
  hexRed,
  hexYellow
} from '../../../atoms/colors';

// tslint:disable:jsx-no-lambda

export interface IValueGraphViewModel {
  colleges: Array<{
    abbreviation: string;
    value: number;
  }>;
  loading: boolean;
}

type ValueGraphProps = IValueGraphViewModel;

const ValueGraph: React.SFC<ValueGraphProps> = props => {
  const graphData = props.colleges || [];

  const { max } = graphData.reduce(
    (result: any, dataPoint: any) => ({
      max: dataPoint.value > result.max || result.max === 0 ? dataPoint.value : result.max
    }),
    { max: 0 }
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={graphData}
        margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
        barCategoryGap="10%"
        layout="vertical"
      >
        <XAxis
          type="number"
          height={48}
          tickMargin={0}
          axisLine={false}
          domain={[0, max]}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickLine={false}
          tickCount={4}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : (value: any) => {
                  const maxTickValue = max;
                  const oneThird = maxTickValue / 3;
                  const twoThirds = (maxTickValue / 3) * 2;

                  if (value === 0) {
                    return 'Lowest value';
                  }
                  if (value === oneThird) {
                    return '';
                  }
                  if (value === twoThirds) {
                    return '';
                  }
                  if (value === maxTickValue) {
                    return 'Highest value';
                  } else {
                    return '';
                  }
                }
          }
        />
        <YAxis
          dataKey="abbreviation"
          type="category"
          width={64}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
          tickSize={0}
          tickMargin={8}
          tickFormatter={props.loading ? (value: any) => '' : (value: any) => value}
        />
        <Bar
          dataKey="value"
          name="Value Index Score"
          // FIXME background={{ fill: hexGrayLight }}
        >
          {props.loading
            ? graphData.map((entry: any, index: any) => {
                return <Cell key={index} fill={hexGrayLoading2} />;
              })
            : graphData.map((entry: any, index: any) => {
                const value = graphData[index].value;
                const oneThird = max / 3;
                const twoThirds = (max / 3) * 2;

                if (value < oneThird) {
                  return <Cell fill={hexRed} />;
                }
                if (value > twoThirds) {
                  return <Cell fill={hexGreen} />;
                } else {
                  return <Cell fill={hexYellow} />;
                }
              })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ValueGraph;
