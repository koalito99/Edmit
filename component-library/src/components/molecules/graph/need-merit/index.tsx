import * as React from 'react';
import { hexCrimson, hexGrayDim, hexGrayLight, hexGrayMuted } from '../../../atoms/colors';
import {
  ResponsiveContainer,
  YAxis,
  XAxis,
  ScatterChart,
  Scatter,
  LabelList,
  Label,
} from 'recharts'
import numeral from 'numeral';

interface IStudentData {
  efc: number;
  actScore?: number;
  satScore?: number;
  gpa?: string;
  edstimate: number;
}

interface INeedMeritGraphViewModel {
  otherStudents: IStudentData[];

  student: IStudentData;

  height?: number;

  style?: React.CSSProperties;
  className?: string;
}

interface INeedMeritGraphActions {}

type NeedMeritGraphProps = INeedMeritGraphViewModel & INeedMeritGraphActions;

const NeedMeritGraph: React.FC<NeedMeritGraphProps> = props => {
  const transformStudent = (aStudent: IStudentData) => ({
    ...aStudent,
    testScoreValue: aStudent.satScore ? aStudent.satScore/1600 : aStudent.actScore ? aStudent.actScore/36 : 0.5
  });

  const student = { ...transformStudent(props.student), id: 0 };
  const otherStudents = props.otherStudents.map(transformStudent).map((st, i) => ({ ...st, id: i + 1 }));

  const students = [props.student, ...props.otherStudents];

  const CustomLabel: React.SFC<any> = labelProps => {
    const currentStudent = students[labelProps.value];
    return (
      <g transform={`translate(${labelProps.x}, ${labelProps.y - 5})`}>
        <rect width={40} height={15} y={-15} fill="white" />
        <text
          className="recharts-text recharts-bar-label"

          fill={hexGrayDim}
          fontSize="0.6rem"
        >
          {labelProps.value === 0 ? <>
            <tspan>YOU ({numeral(currentStudent.edstimate).format("$0a")})</tspan>
          </> : <tspan>{numeral(currentStudent.edstimate).format("$0a")}</tspan>}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={props.height || 360} className={'bg--white'}>
      <ScatterChart margin={{ top: 0, right: 0, bottom: 10, left: 0 }}>
        <XAxis
          type={'number'}
          dataKey="testScoreValue"
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          padding={{ right: 25, left: 25 }}
          tickCount={2}
          tickFormatter={value => value === 0 ? "Low" : "High"}
          tickMargin={0}
          tick={{ fontSize: '0.75rem' }}
          tickLine={false}
        >
          <Label
            value={'Merit'}
            offset={0}
            position="insideBottom"
            fill={hexGrayDim}
            fontSize="0.875rem"
          />
        </XAxis>
        <YAxis
          type={'number'}
          dataKey="efc"
          padding={{ top: 25, bottom: 25 }}
          axisLine={{ stroke: hexGrayLight, strokeWidth: 2 }}
          tickCount={2}
          tickFormatter={value => value === 0 ? "Low" : "High"}
          tickMargin={0}
          tick={{ fontSize: '0.75rem' }}
          tickLine={false}
        >
          <Label
            value={'Need'}
            offset={0}
            position="insideLeft"
            textAnchor={'middle'}
            width={30}
            fill={hexGrayDim}
            fontSize="0.875rem"
          />
        </YAxis>
        <Scatter name="You" data={[student]} fill={hexCrimson}>
          <LabelList dataKey="id" content={CustomLabel} />
        </Scatter>
        <Scatter name="Other Students" data={otherStudents} fill={hexGrayMuted}>
          <LabelList dataKey="id" content={CustomLabel} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default NeedMeritGraph;
