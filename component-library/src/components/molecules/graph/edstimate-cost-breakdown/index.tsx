import * as React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import {
  hexBlue,
  hexGrayDim,
  hexGrayLoading1,
  hexGrayLoading2,
  hexGrayLoading3,
  hexGrayLoading4,
  hexGrayLoading5,
  hexGreen,
  hexOrange,
  hexRed,
  hexYellow
} from '../../../atoms/colors';

export interface IEdstimateCostBreakdownGraphViewModel {
  data: Array<{
    label: string;
    value: number;
  }>;
  height?: number;
  loading: boolean;
}

type EdstimateCostBreakdownGraphProps = IEdstimateCostBreakdownGraphViewModel;

// interface IPieSegmentLabelViewModel {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   startAngle: number;
//   endAngle: number;
//   fill: string;
//   label: string;
// }

// type PieSegmentLabelProps = IPieSegmentLabelViewModel;

// const PieSegmentLabel: React.SFC<PieSegmentLabelProps> = props => {
//   const RADIAN = Math.PI / 180;
//   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, label } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + outerRadius * cos;
//   const sy = cy + outerRadius * sin;
//   const mx = cx + (outerRadius + 24) * cos;
//   const my = cy + (outerRadius + 24) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={hexGrayLight}
//         strokeWidth={3}
//         fill="none"
//       />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 8}
//         y={ey + 6}
//         textAnchor={textAnchor}
//         fill={hexGrayDim}
//         fontSize={12}
//       >
//         {label}
//       </text>
//     </g>
//   );
// };

const EdstimateCostBreakdownGraph: React.SFC<EdstimateCostBreakdownGraphProps> = props => {
  const colorsLoading = [
    hexGrayLoading1,
    hexGrayLoading2,
    hexGrayLoading3,
    hexGrayLoading4,
    hexGrayLoading5
  ];
  const colors = [hexBlue, hexGreen, hexRed, hexOrange, hexYellow];

  const height = props.height || 300;

  const dataWithoutDiscount = props.data.filter(entry => entry.label !== 'Discount');

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={dataWithoutDiscount}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={(height / 3) * 0.75}
          outerRadius={height / 3}
          paddingAngle={2}
          startAngle={-269}
          endAngle={91}
        >
          {props.loading
            ? dataWithoutDiscount.map((entry, index) => {
                return <Cell key={entry.label} fill={colorsLoading[index]} strokeWidth={0} />;
              })
            : dataWithoutDiscount.map((entry, index) => {
                return <Cell key={entry.label} fill={colors[index]} strokeWidth={0} />;
              })}
        </Pie>
        {!props.loading && (
          <Legend
            iconSize={8}
            iconType="circle"
            wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem' }}
            verticalAlign="top"
            height={32}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EdstimateCostBreakdownGraph;
