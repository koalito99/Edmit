import * as React from 'react';
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
    hexGrayDim,
    hexGrayLoading2,
    hexGrayLoading3,
    hexGrayLoading4,
    hexGrayLoading5,
    hexGreen,
    hexOrange,
    hexRed,
    hexWhite,
    hexYellow,
    hexBlue
} from '../../../atoms/colors';
import { omitBy } from 'lodash-es';

export enum EVoidMode {
    Positive,
    Negative
}

export interface IFinancialPlannerGraphViewModel {
    data: {
        abbreviation: string;
        cash: number;
        collegeNameFull: string;
        costOfAttendance: number;
        edstimate: number;
        discount: number;
        loans: number;
        savings: number;
        workStudy: number;
        otherScholarships?: number;
    };
    usingActualDiscount: boolean;
    isMobile?: boolean;
    loading: boolean;
    voidMode: EVoidMode;
}

type FinancialPlannerGraphProps = IFinancialPlannerGraphViewModel;

const LoanPlannerGraph: React.SFC<FinancialPlannerGraphProps> = props => {
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
                dominantBaseline="miAnyMxRecord"
                textAnchor="middle"
            >
                <>
                    {numeral(barLabelProps.value).format("$0a")}
                </>
            </text>
        );
    };

    const data = omitBy(props.data, (value: number) => value && (value === 0))

    return (
        <ResponsiveContainer width="99%" height={150}>
            <BarChart
                data={[data]}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                maxBarSize={96}
                layout="vertical"
            >
                <XAxis
                    type="number"
                    height={0}
                    axisLine={false}
                    tickLine={false}
                    tickSize={0}
                    interval={'preserveStartEnd'}
                />
                <YAxis dataKey="abbreviation" type="category" hide={true} />
                <Legend
                    iconSize={16}
                    wrapperStyle={{ color: hexGrayDim, fontSize: '0.875rem', opacity: props.loading ? 0 : 1 }}
                    verticalAlign="top"
                    height={props.isMobile ? 36 : 18}
                    align={'left'}
                />
                <Bar
                    dataKey="savings"
                    name="Savings"
                    stackId="a"
                    fill={props.loading ? hexGrayLoading2 : hexOrange}
                    isAnimationActive={false}
                >
                    <LabelList dataKey="savings" content={BarLabel} />
                </Bar>
                <Bar
                    dataKey="cash"
                    name="Cash"
                    stackId="a"
                    fill={props.loading ? hexGrayLoading3 : hexBlue}
                    isAnimationActive={false}
                >
                    <LabelList dataKey="cash" content={BarLabel} />
                </Bar>
                <Bar
                    dataKey="workStudy"
                    name="Student Wages"
                    stackId="a"
                    fill={props.loading ? hexGrayLoading4 : hexYellow}
                    isAnimationActive={false}
                >
                    <LabelList dataKey="workStudy" content={BarLabel} />
                </Bar>

                <Bar
                    dataKey="loans"
                    name="Loans"
                    stackId="a"
                    legendType={props.voidMode === EVoidMode.Negative ? undefined : "none"}
                    fill={props.loading ? hexGrayLoading5 : (props.voidMode === EVoidMode.Negative ? hexRed : hexGreen)}
                    isAnimationActive={false}
                >
                    <LabelList dataKey="loans" content={BarLabel} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default LoanPlannerGraph;