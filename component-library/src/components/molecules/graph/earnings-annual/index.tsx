import * as React from 'react';
import numeral from 'numeral';
import {
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from 'recharts';
import {
  hexGrayDim,
  hexGrayLight,
  hexRed,
  hexBlue
} from '../../../atoms/colors';
import withSizes from 'react-sizes';

// tslint:disable:jsx-no-lambda

export interface IEarningsAnnualGraphViewModel {
  colleges: Array<{
    abbreviation: string;
    annualEarnings: Array<{
      amount: number;
      year: number;
      loanAmount?: number;
    }>;
  }>;

  showLoanAmount?: boolean;

  height?: number;
  isMobile?: boolean;
  loading: boolean;
}

type EarningsAnnualGraphProps = IEarningsAnnualGraphViewModel;

// const XAxisLabel: React.SFC<any> = props => {
//   return (
//     <text x={props.x} y={props.y} fill={hexGrayDim}>
//       Years after Graduation
//     </text>
//   );
// };

const EarningsAnnualGraph: React.SFC<EarningsAnnualGraphProps> = props => {
  const years = {};

  props.colleges.forEach(college => {
    college.annualEarnings.slice(0, 10).forEach(year => {
      years[year.year] = {
        ...years[year.year],
        year: year.year,
        [college.abbreviation]: year.amount - (props.showLoanAmount ? (year.loanAmount || 0) : 0),
        [college.abbreviation + "-loanAmount"]: year.loanAmount || 0
      };
    });
  });

  const graphData = Object.keys(years).map(key => ({
    year: key,
    ...years[key]
  }));

  return (
    <ResponsiveContainer width="100%" height={props.height || 400}>
      <BarChart data={graphData} margin={{ top: 16, right: 0, bottom: 0, left: -20 }}>
        <ReferenceLine y={props.colleges[0].annualEarnings[0].loanAmount || 0} stroke={hexGrayLight} strokeWidth={2} />
        <XAxis
          dataKey="year"
          height={72}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tickLine={false}
          tickFormatter={
            props.loading
              ? (value: any) => ''
              : !props.isMobile
                ? (value: any) => {
                  // if (value === 0) {
                  //   return 'Graduation';
                  // }
                  //
                  // if (value === 14) {
                  //   return 'Mid-Career';
                  // }

                  return (value + 1)
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
        {!props.loading &&
          props.colleges.length !== 1 && (
            <Legend
              iconSize={16}
              wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem', right: 50 }}
              align={'right'}
              verticalAlign="top"
              height={48}
            />
          )}
        {props.showLoanAmount && props.colleges.map((college, i) => (
          <Bar
            name={college.abbreviation + " Loan Amount"}
            dataKey={college.abbreviation + "-loanAmount"}
            fill={hexRed}
            stackId="a"
          />
        ))}
        {props.colleges.map((college, i) => (
          <Bar
            name={college.abbreviation}
            dataKey={college.abbreviation}
            fill={hexBlue}
            stackId="a"
          />
        ))}

      </BarChart>
    </ResponsiveContainer>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(EarningsAnnualGraph) as typeof EarningsAnnualGraph;
