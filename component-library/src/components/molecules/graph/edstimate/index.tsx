import * as React from 'react';
import {
  Label,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts';
import {
  hexBlue,
  hexGrayDim,
  hexGrayLight,
  hexGrayLoading1,
  hexGrayLoading2,
  hexYellow
} from '../../../atoms/colors';

// tslint:disable:jsx-no-lambda

export interface IEdstimateGraphViewModel {
  college: {
    name: string;
    edstimate: {
      total: number;
      breakdown: Array<{
        label: string;
        value: number;
      }>;
    };
  };
  loading: boolean;
}

type EdstimateGraphProps = IEdstimateGraphViewModel;

const PolarRadiusAxisLabel: React.SFC<any> = props => {
  return (
    <text x={props.x} y={props.y} fill={hexGrayDim} fontSize="11px" opacity="0.75">
      (%)
    </text>
  );
};

const EdstimateGraph: React.SFC<EdstimateGraphProps> = props => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart
        data={props.college.edstimate.breakdown}
        margin={{ top: 0, right: 16, bottom: 0, left: 16 }}
        outerRadius="75%"
      >
        <PolarAngleAxis
          dataKey="label"
          stroke={hexGrayDim}
          axisLine={false}
          axisLineType="circle"
          tick={false}
          tickLine={false}
          tickFormatter={(value: any) => value}
        />
        <PolarGrid stroke={hexGrayLight} strokeWidth={2} gridType="circle" />
        <PolarRadiusAxis
          angle={90}
          stroke={hexGrayDim}
          fontSize="12px"
          dx={-2}
          dy={-2}
          opacity={0.75}
          domain={[0, 100]}
          axisLine={false}
          orientation="left"
          tickFormatter={props.loading ? (value: any) => '' : (value: any) => value}
        >
          {!props.loading && <Label position={'inside'} content={PolarRadiusAxisLabel} />}
        </PolarRadiusAxis>
        {!props.loading && (
          <Legend
            iconSize={16}
            iconType="diamond"
            wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem' }}
            verticalAlign="top"
            height={32}
          />
        )}
        <Radar
          // FIXME name="Student"
          dataKey="student"
          stroke={props.loading ? hexGrayLoading1 : hexYellow}
          strokeWidth={2}
          fill={props.loading ? hexGrayLoading1 : hexYellow}
          fillOpacity={0.5}
        />
        <Radar
          // FIXME name={ props.collegeName }
          dataKey="school"
          stroke={props.loading ? hexGrayLoading2 : hexBlue}
          strokeWidth={2}
          fill={props.loading ? hexGrayLoading2 : hexBlue}
          fillOpacity={0.25}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default EdstimateGraph;
