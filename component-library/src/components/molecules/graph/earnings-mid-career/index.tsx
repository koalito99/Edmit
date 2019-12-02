import * as React from 'react';
import numeral from 'numeral';
import {
  Bar,
  BarChart,
  Label,
  LabelList,
  Legend,
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
  hexGreen,
  hexRed,
  hexTeal,
  hexWhite
} from '../../../atoms/colors';
import { SVGTooltip } from '../../tooltip';
import { EPersonType } from '../../../../shared'

// tslint:disable:jsx-no-lambda

export interface IEarningsMidCareerGraphViewModel {
  colleges: Array<{
    abbreviation: string;
    hasMyMajor?: boolean;
    name: string;
    midCareerEarnings: {
      totalActualPrice: number | null;
      totalEdstimatePrice: number;
      totalEarnings: number;
    };
  }>;
  personType: EPersonType;
  highSchoolEarnings: number;
  height?: number;
  loading: boolean;
}

type EarningsMidCareerGraphProps = IEarningsMidCareerGraphViewModel;

const StackedBarLabel: React.SFC<any> = props => {
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
      {(props.value < -1000 || props.value > 1000) &&
        numeral(props.value).format(`$0${props.value > 1000000 ? '[.]00' : ''}a`)}
    </text>
  );
};

const ReferenceLineLabel: React.SFC<any> = props => {
  return (
    <text
      className="recharts-text recharts-bar-label"
      x={props.x}
      y={props.y}
      fill={hexGrayDim}
      fontWeight="700"
      fontSize="0.75rem"
      textAnchor="middle"
      opacity="0.75"
    >
      H.S. EARNINGS
    </text>
  );
};

const EarningsMidCareerGraph: React.SFC<EarningsMidCareerGraphProps> = props => {
  const graphData = Object.keys(props.colleges).map(key => ({
    negativeActualPrice:
      props.colleges[key].midCareerEarnings.totalActualPrice &&
      props.colleges[key].midCareerEarnings.totalActualPrice * -1,
    negativeEdstimatePrice:
      !props.colleges[key].midCareerEarnings.totalActualPrice &&
      props.colleges[key].midCareerEarnings.totalEdstimatePrice * -1,
    ...props.colleges[key],
    midCareerEarnings: {
      ...props.colleges[key].midCareerEarnings,
      totalEdstimatePrice:
        !props.colleges[key].midCareerEarnings.totalActualPrice &&
        props.colleges[key].midCareerEarnings.totalEdstimatePrice
    }
  }));

  const Tick: React.SFC<any> = tickProps => {
    const { x, y, payload } = tickProps;

    const college = props.colleges.find(aColleges => aColleges.abbreviation === payload.value);

    return (
      <>
        <g transform={`translate(${x},${y})`}>
          {!props.loading && (
            <>
              <text x={0} y={0} dy={16} textAnchor="middle" fill={hexGrayDim} fontSize={'0.875rem'}>
                {payload.value}
              </text>
              {college &&
                college.hasMyMajor === false && (
                  <g transform="translate(12,1)">
                    <SVGTooltip
                      transform="translate(10,20)"
                      boxTransform={'translate(-20,0)'}
                      position={'bottom'}
                      width={300}
                      text={'This college does not have your desired major.'}
                    >
                      <g transform={`scale(0.75,0.75)`} cursor="pointer">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                          fill={hexRed}
                        />
                      </g>
                    </SVGTooltip>
                  </g>
                )}
            </>
          )}
        </g>
      </>
    );
  };

  return (
    <div style={{ marginBottom: -40 }}>
      <ResponsiveContainer width="100%" height={props.height || 360}>
        <BarChart
          data={graphData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          barCategoryGap="5%"
          maxBarSize={160}
          stackOffset="sign"
        >
          <ReferenceLine stroke={hexGrayLight} y={0} />
          {props.loading && (
            <ReferenceLine
              stroke={props.loading ? hexGrayLoading1 : hexGrayDim}
              strokeOpacity={0.4}
              strokeWidth={2}
              strokeDasharray="8 8"
              y={props.highSchoolEarnings}
            >
              <Label position="center" content={ReferenceLineLabel} />
            </ReferenceLine>
          )}
          <XAxis
            dataKey="abbreviation"
            height={80}
            padding={{ right: 24, left: 48 }}
            axisLine={false}
            tick={Tick}
            tickSize={0}
            tickMargin={8}
            tickFormatter={
              props.loading || props.colleges.length === 1
                ? (value: any) => ''
                : (value: any) => value
            }
          />
          <YAxis
            type="number"
            width={48}
            padding={{ top: 8, bottom: 0 }}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickFormatter={
              props.loading ? (value: any) => '' : (value: any) => numeral(value).format('$0a')
            }
            tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
            tickSize={4}
            tickLine={false}
            mirror={true}
            domain={['dataMin', 'dataMax']}
          />
          {/*
          <Tooltip
              separator=": "
              offset={8}
              wrapperStyle={{ borderColor: hexGrayLight, borderWidth: "1px", borderRadius: "0.25rem", boxShadow: "0 1px 4px 1px rgba(0, 0, 0, .025)"}}
              itemStyle={{ fontWeight: 700}}
              labelStyle={{ color: hexGrayDim, letterSpacing: "1px", fontSize: "0.8125rem", textTransform: "uppercase"}}
              cursor={{ fill: "none" }}
              formatter={ (value: any) => numeral(value).format('$0,0') }
          />
        */}
          {!props.loading && (
            <Legend
              iconSize={16}
              wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem' }}
              verticalAlign="top"
              height={48}
            />
          )}
          <Bar
            dataKey="midCareerEarnings.totalEarnings"
            name={`${
              props.personType === EPersonType.STUDENT ? 'Your' : "Your Student's"
            } Cumulative Mid-Career Earnings`}
            stackId="a"
            fill={props.loading ? hexGrayLoading1 : hexGreen}
          >
            {!props.loading && (
              <LabelList dataKey="midCareerEarnings.totalEarnings" content={StackedBarLabel} />
            )}
          </Bar>
          <Bar
            dataKey="negativeEdstimatePrice"
            name={`${
              props.personType === EPersonType.STUDENT ? 'Your' : "Your Student's"
            } Edstimate® (over 4 years)`}
            stackId="a"
            fill={props.loading ? hexGrayLoading2 : hexRed}
          >
            {!props.loading && (
              <LabelList
                dataKey="midCareerEarnings.totalEdstimatePrice"
                content={StackedBarLabel}
              />
            )}
          </Bar>
          <Bar
            dataKey="negativeActualPrice"
            name={`${
              props.personType === EPersonType.STUDENT ? 'Your' : "Your Student's"
            } Actual Cost of Attendance (over 4 years)`}
            stackId="a"
            fill={props.loading ? hexGrayLoading2 : hexTeal}
          >
            {!props.loading && (
              <LabelList dataKey="midCareerEarnings.totalActualPrice" content={StackedBarLabel} />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsMidCareerGraph;
