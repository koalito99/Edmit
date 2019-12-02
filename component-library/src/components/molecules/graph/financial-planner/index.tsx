import * as React from 'react';
import withSizes from 'react-sizes';
import { SizeMe } from 'react-sizeme';
import numeral from 'numeral';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import {
  hexBlue,
  hexGrayDim, hexGrayLight,
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
import { formatDollarsWhole } from '../../../../shared';
import { omitBy } from 'lodash-es';
import { SVGTooltip } from "../../tooltip";

export enum EVoidMode {
  Positive,
  Negative
}

export interface IFinancialPlannerGraphViewModel {
  data: {
    abbreviation: string;
    cash: number;
    collegeNameFull: string;
    edstimate: number;
    loans: number;
    savings: number;
    workStudy: number;
    otherScholarships?: number;
  };
  sectionLabels?: {
    cash?: string | null;
    savings?: string | null;
    workStudy?: string | null;
    otherScholarships?: string | null;
  };
  isMobile?: boolean;
  loading: boolean;
  tooltipPosition?: 'top' | 'bottom';
  voidMode: EVoidMode;
}

type FinancialPlannerGraphProps = IFinancialPlannerGraphViewModel;

const yearsInCollege = 4;

const FinancialPlannerGraph: React.SFC<FinancialPlannerGraphProps> = props => {
  return <SizeMe>
    {({ size }: { size: any }) => {

      const { edstimate } = props.data;

      const xAxisTicks = [0, edstimate * yearsInCollege];

      const CustomizedAxisTick: React.SFC<any> = tickProps => {
        const { x, y, payload, width } = tickProps;
        const label = "";

        return (
          <g>
            <text
              x={x > width - 30 ? x + 15 : x}
              y={y + 8}
              fill={hexGrayDim}
              fontSize={'0.6rem'}
              textAnchor={x > width / 2 ? 'end' : 'start'}
            >
              {!props.loading && label}
            </text>
            <text
              x={x > width - 30 ? x + 15 : x}
              y={y + 8 + (label ? 15 : 0)}
              fill={hexGrayDim}
              fontSize={'0.875rem'}
              textAnchor={x > width / 2 ? 'end' : 'start'}
            >
              {!props.loading && numeral(payload.value).format('$0,0')}
            </text>
          </g>
        );
      };

      const BarLabel = (labelProps: any) => {
        const {
          x, y, width, height, value, voidMode, barTitle
        } = labelProps;

        const tooltipPosition = props.tooltipPosition || 'bottom';

        return (
          <g transform={`translate(${x + width / 2} ${y + height / 2})`}>
            {width > 100 ? <text x={0} y={0}
                                 className="recharts-text recharts-bar-label"
                                 fill={hexWhite}
                                 fontWeight="700"
                                 fontSize="0.875rem"
                                 dominantBaseline="middle"
                                 textAnchor="middle"
            >
              {value > 0 && (!voidMode ? formatDollarsWhole(value) : '')}
            </text> : width > 0 ?
              <SVGTooltip position={tooltipPosition} transform={tooltipPosition === 'top' ? "translate(0,-29)" : "translate(0,29)"} boxTransform={`translate(${x <= (size.width * 1 / 3) ? '40' : x <= (size.width * 2 / 3) ? '0' : '-40'},0)`} width={100}
                          text={value > 0 && (!voidMode ? formatDollarsWhole(value) : '') || ''}>
                <g transform="translate(-12,-10)" cursor="pointer">
                  <g transform="scale(0.5,0.5)">
                    <path
                      d="M22,15 L22,11 L18,11 L18,15 L22,15 Z M22,29 L22,18 L18,18 L18,29 L22,29 Z M20,2 C24.9577699,2 29.1971678,3.76054806 32.7183126,7.28168744 C36.2394519,10.8028322 38,15.0422301 38,20 C38,24.9577699 36.2394519,29.1971678 32.7183126,32.7183099 C29.1971678,36.2394541 24.9577699,38 20,38 C15.0422301,38 10.8028322,36.2394541 7.28169014,32.7183099 C3.76054589,29.1971678 2,24.9577699 2,20 C2,15.0422301 3.76054589,10.8028322 7.28169014,7.28168744 C10.8028322,3.76054806 15.0422301,2 20,2 Z"
                      id="Fill-1" fill="white" />
                  </g>
                </g>
              </SVGTooltip> : null}
            {width > 150 && <text x={0} y={16}
                                  className="recharts-text recharts-bar-label"
                                  fill={hexWhite}
                                  fontWeight="700"
                                  fontSize="0.75rem"
                                  dominantBaseline="middle"
                                  textAnchor="middle"
            >
              {(barTitle && value > 0) && barTitle}
            </text>}
          </g>
        );
      };

      const data = omitBy(props.data, (value: number) => value && (value === 0));

      const sectionLabels: FinancialPlannerGraphProps["sectionLabels"] = {
        cash: "Cash contribution X 4 years",
        workStudy: "Student wages X 4 years",
        ...props.sectionLabels
      }

      // const anyInputsFilled = props.data.savings > 0 || props.data.cash > 0 || props.data.workStudy > 0 || (props.data.otherScholarships && props.data.otherScholarships > 0);

      return (
        <ResponsiveContainer width="99%" height={150}>
          <BarChart
            data={[data]}
            margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
            maxBarSize={96}
            layout="vertical"
          >
            <XAxis
              type="number"
              height={36}
              axisLine={false}
              domain={[0, edstimate * yearsInCollege]}
              tick={CustomizedAxisTick}
              tickLine={false}
              tickSize={0}
              interval={'preserveStartEnd'}
              ticks={xAxisTicks}
              allowDataOverflow={true}
            />
            <YAxis dataKey="abbreviation" type="category" hide={true} />
            <Legend
              iconSize={16}
              wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem', opacity: props.loading ? 0 : 1 }}
              verticalAlign="top"
              height={props.isMobile ? 36 : 18}
            />
            <Bar
              dataKey="savings"
              name="Savings"
              stackId="a"
              fill={props.loading ? hexGrayLoading2 : hexOrange}
              isAnimationActive={false}
            >
              {!props.loading && <LabelList dataKey="savings" content={<BarLabel barTitle={sectionLabels.savings} />} />}
            </Bar>
            <Bar
              dataKey="cash"
              name="Cash"
              stackId="a"
              fill={props.loading ? hexGrayLoading3 : hexGreen}
              isAnimationActive={false}
            >
              {!props.loading && <LabelList dataKey="cash" content={<BarLabel barTitle={sectionLabels.cash} />} />}
            </Bar>
            <Bar
              dataKey="workStudy"
              name="Student Wages"
              stackId="a"
              fill={props.loading ? hexGrayLoading4 : hexYellow}
              isAnimationActive={false}
            >
              {!props.loading && <LabelList dataKey="workStudy" content={<BarLabel barTitle={sectionLabels.workStudy} />} />}
            </Bar>
            <Bar
              dataKey="otherScholarships"
              name="Other Scholarships"
              stackId="a"
              fill={props.loading ? hexGrayLoading1 : hexBlue}
              isAnimationActive={false}
            >
              {!props.loading && <LabelList dataKey="otherScholarships" content={<BarLabel barTitle={sectionLabels.otherScholarships} />} />}
            </Bar>
            <Bar
              dataKey="loans"
              name="Loans"
              stackId="a"
              legendType={props.voidMode === EVoidMode.Negative ? undefined : "none"}
              fill={props.loading ? hexGrayLoading5 : (props.voidMode === EVoidMode.Negative ? hexRed : hexGrayLight)}
              isAnimationActive={false}
            >
              {(!props.loading && props.voidMode === EVoidMode.Negative) ? <LabelList dataKey="loans" content={BarLabel} /> : null}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
    }</SizeMe>;
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 960
});

export default withSizes(mapSizesToProps)(FinancialPlannerGraph) as typeof FinancialPlannerGraph;