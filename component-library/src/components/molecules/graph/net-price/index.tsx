import * as React from 'react';
import withSizes from 'react-sizes';
import numeral from 'numeral';
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import {
  hexBlue,
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGrayLoading3,
  hexGreen,
  hexTeal,
  hexWhite
} from '../../../atoms/colors';
import { Subtract } from '../../../../lib/typescript';
import { EPersonType } from '../../../../shared'

// tslint:disable:jsx-no-lambda

export interface INetPriceGraphViewModel {
  colleges: Array<{
    abbreviation: string;
    name: string;
    netPrice: {
      stickerPrice: number;
      costOfAttendance: number;
      actualCostOfAttendance: number | null;
    };
  }>;
  height?: number;
  personType: EPersonType;

  affordabilityBenchmark?: number;

  loading: boolean;
  isMobile: boolean;
}

type NetPriceGraphProps = INetPriceGraphViewModel;

const NetPriceGraph: React.SFC<NetPriceGraphProps> = props => {
  const BarLabel: React.SFC<any> = barLabelProps => {
    return (
      <text
        className="recharts-text recharts-bar-label"
        x={barLabelProps.x + barLabelProps.width / 2}
        y={barLabelProps.y + barLabelProps.height / 2}
        dy={2}
        fill={hexWhite}
        fontWeight="700"
        fontSize="0.875rem"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {(barLabelProps.value < -1000 || barLabelProps.value > 1000) &&
          numeral(barLabelProps.value).format('$0a')}
      </text>
    );
  };

  const AffordabilityBenchmarkLabel: React.SFC<any> = benchmarkLabelProps => {
    return (
      <g
        transform={`translate(20,${benchmarkLabelProps.viewBox.y + 12.5})`}
        className={'hide-child pointer'}
      >
        <defs>
          <filter id="f3" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
            <feOffset dx="2" dy="2" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(${props.isMobile ? benchmarkLabelProps.viewBox.x - 20 : 12.5},0)`}>
          <rect
            width={props.isMobile ? 25 : benchmarkLabelProps.viewBox.width}
            height={props.isMobile ? benchmarkLabelProps.viewBox.height : 25}
            x={-12.5}
            y={-25}
            opacity="0"
          />
          <rect
            width={25}
            height={25}
            y={-25}
            fill={hexGrayLight}
            x={-12.5}
            rx="12.5"
            ry="12.5"
            filter="url(#f3)"
          />
          <text
            x={-4}
            y={-12}
            fontSize="0.875rem"
            fontWeight={700}
            fontFamily="sans-serif"
            fill={hexGrayDim}
            dominantBaseline="central"
            textAnchor="left"
          >
            {'?'}
          </text>
        </g>
        <g
          className="child"
          transform={`translate(${props.isMobile ? benchmarkLabelProps.viewBox.x / 4 : 0},0)`}
        >
          <rect
            width={props.isMobile ? 175 : 330}
            height={props.isMobile ? 45 : 25}
            y={-25}
            fill={hexGrayLight}
            rx="12.5"
            ry="12.5"
            filter="url(#f3)"
          />
          {!props.isMobile ? (
            <text
              x={10}
              y={-12}
              fontSize="0.875rem"
              fontFamily="sans-serif"
              fill={hexGrayDim}
              dominantBaseline="central"
              textAnchor="left"
            >
              Affordability Benchmark. Edit in Financial Planner
            </text>
          ) : (
            <g>
              <text
                x={10}
                y={-12}
                fontSize="0.875rem"
                fontFamily="sans-serif"
                fill={hexGrayDim}
                dominantBaseline="central"
                textAnchor="left"
              >
                Affordability Benchmark.
              </text>
              <text
                x={10}
                y={5}
                fontSize="0.875rem"
                fontFamily="sans-serif"
                fill={hexGrayDim}
                dominantBaseline="central"
                textAnchor="left"
              >
                Edit in Financial Planner
              </text>
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={props.isMobile ? 420 : props.height || 360}>
      <BarChart
        layout={props.isMobile ? 'vertical' : 'horizontal'}
        data={props.colleges}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barCategoryGap={'10%'}
        barGap={0}
        maxBarSize={160}
      >
        <ReferenceLine stroke={hexGrayLight} y={0} />
        {props.isMobile ? (
          <XAxis
            type={'number'}
            height={24}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            padding={{ right: 24, left: 0 }}
            tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
            tickSize={0}
            tickMargin={8}
            tickFormatter={
              props.loading
                ? (value: any) => ''
                : (value: any) => {
                    if (value === 0) {
                      return '';
                    } else {
                      return numeral(value).format('$0a');
                    }
                  }
            }
            domain={[0, 'dataMax']}
          />
        ) : (
          <XAxis
            dataKey="abbreviation"
            height={24}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            padding={{ right: 24, left: 48 }}
            tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
            tickSize={0}
            tickMargin={8}
            tickFormatter={
              props.loading || props.colleges.length === 1
                ? (value: any) => ''
                : (value: any) => value
            }
          />
        )}
        {props.isMobile ? (
          <YAxis
            type={'category'}
            dataKey="abbreviation"
            width={32}
            padding={{ top: 8, bottom: 0 }}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickFormatter={
              props.loading || props.colleges.length === 1
                ? (value: any) => ''
                : (value: any) => value
            }
            tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
            tickSize={4}
            tickLine={false}
            mirror={false}
          />
        ) : (
          <YAxis
            type={'number'}
            width={48}
            padding={{ top: 8, bottom: 0 }}
            axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
            tickFormatter={
              props.loading
                ? (value: any) => ''
                : (value: any) => {
                    if (value === 0) {
                      return '';
                    } else {
                      return numeral(value).format('$0a');
                    }
                  }
            }
            tick={{ fill: hexGrayDim, fontSize: '0.875rem' }}
            tickSize={4}
            tickLine={false}
            mirror={true}
            domain={[0, 'dataMax']}
          />
        )}
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
          dataKey="netPrice.stickerPrice"
          name="Cost of Attendance"
          fill={props.loading ? hexGrayLoading1 : hexBlue}
          isAnimationActive={props.loading}
        >
          {!props.loading && <LabelList dataKey="netPrice.stickerPrice" content={BarLabel} />}
        </Bar>
        <Bar
          dataKey="netPrice.costOfAttendance"
          name={`${
            props.personType === EPersonType.STUDENT ? 'Your' : "Your Student's"
          } Edstimate®`}
          fill={props.loading ? hexGrayLoading2 : hexGreen}
          isAnimationActive={props.loading}
        >
          {!props.loading && <LabelList dataKey="netPrice.costOfAttendance" content={BarLabel} />}
        </Bar>
        <Bar
          dataKey="netPrice.actualCostOfAttendance"
          name={`${
            props.personType === EPersonType.STUDENT ? 'Your' : "Your Student's"
          } Actual Cost of Attendance`}
          fill={props.loading ? hexGrayLoading3 : hexTeal}
          isAnimationActive={props.loading}
          hide={!props.colleges.some(college => Boolean(college.netPrice.actualCostOfAttendance))}
        >
          {!props.loading && (
            <LabelList dataKey="netPrice.actualCostOfAttendance" content={BarLabel} />
          )}
        </Bar>
        {!props.loading &&
          props.affordabilityBenchmark &&
          (!props.isMobile ? (
            <ReferenceLine
              stroke={hexGrayLight}
              y={props.affordabilityBenchmark}
              strokeWidth={2}
              strokeDasharray="9 3"
              isFront
              label={AffordabilityBenchmarkLabel}
            />
          ) : (
            <ReferenceLine
              stroke={hexGrayLight}
              x={props.affordabilityBenchmark}
              strokeWidth={2}
              strokeDasharray="9 3"
              isFront
              label={AffordabilityBenchmarkLabel}
            />
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(NetPriceGraph) as React.SFC<
  Subtract<NetPriceGraphProps, { isMobile: any }>
>;
