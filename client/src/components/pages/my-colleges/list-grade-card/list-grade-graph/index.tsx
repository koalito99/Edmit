import * as React from 'react';
import withSizes from 'react-sizes';
import { Cell, Pie, PieChart } from 'recharts';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import classNames from 'classnames';
import {
  colorForFinancialGrade,
} from '@edmit/component-library/src/components/molecules/graph/fit'
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import { groupBy } from 'lodash-es';
import { hexGrayLight } from '@edmit/component-library/src/components/atoms/colors';
import EdmitTooltip, { ETooltipType } from '@edmit/component-library/src/components/molecules/tooltip'
import {
  EFinancialGrade,
  financialGradeSortIncreasing,
} from '@edmit/component-library/src/shared'

export interface IListGradeGraphViewModel {
  financialGrade: EFinancialGrade | null;
  collegeFinancialGrades: EFinancialGrade[];

  isMobile?: boolean;
  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

type ListGradeGraphProps = IListGradeGraphViewModel;

const ListGradeGraph: React.SFC<ListGradeGraphProps> = props => {
  let collegeFitGroups = groupBy(props.collegeFinancialGrades.sort(financialGradeSortIncreasing));

  let remainingCollegesForGrade =
    5 - props.collegeFinancialGrades.length;

  let data: Array<{ value: number; fill: string | null }> = [
    ...Object.keys(collegeFitGroups).map((finGrade, i) => ({
      value: collegeFitGroups[finGrade].length,
      fill: colorForFinancialGrade(finGrade as EFinancialGrade)
    })),
    ...(remainingCollegesForGrade > 0
      ? [{
        value: remainingCollegesForGrade,
        fill: null
      }]
      : [])
  ];

  return (
    <div
      style={{ width: 300, height: 160, ...props.style }}
      className={classNames('relative', props.className)}
    >
      <PieChart width={300} height={160} margin={{ top: 150 }}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={100}
          outerRadius={150}
          fill={hexGrayLight}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill || hexGrayLight} />
          ))}
        </Pie>
      </PieChart>
      <div className={'absolute left-0 right-0 bottom-0 flex justify-center'}>
        <div className={'tc'} style={{ maxWidth: 100 * 2 }}>
          {!props.loading &&
            (props.financialGrade ? (
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={<span className={'lato b'}>{props.financialGrade}</span>}
                  className={'mt0 mb1'}
                />
                <Text className={'mv0'}>Overall Grade</Text>
              </div>
            ) : (
                <div>
                  <Text className={'mt0 mb2'}>Incomplete<br />Grade <EdmitTooltip
                    content={
                      <div>
                        Add {remainingCollegesForGrade} more college{remainingCollegesForGrade > 1 ? 's' : ''} to complete the financial grade
                    </div>
                    }
                    type={ETooltipType.Help}
                    position={'top'}
                  /></Text>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 960
});

export default withSizes(mapSizesToProps)(ListGradeGraph) as typeof ListGradeGraph;
