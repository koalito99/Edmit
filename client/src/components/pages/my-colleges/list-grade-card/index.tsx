import * as React from 'react'
import ListGradeGraph from './list-grade-graph'
import { MyCollegesCard } from '../shared'
import { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed'
import { EFinancialGrade } from '@edmit/component-library/src/shared'

interface IListGradeCardViewModel {
  overallListFinancialGrade: EFinancialGrade | null;
  collegeFinancialGrades: EFinancialGrade[];

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IListGradeCardActions {}

type ListGradeCardProps = IListGradeCardViewModel & IListGradeCardActions;

const ListGradeCard: React.FC<ListGradeCardProps> = props => {
  return (
    <MyCollegesCard
      iconName={EDetailedIconName.OverallGrade}
      heading={"Your Overall List Grade"}

      loading={props.loading}
      style={props.style}
      className={props.className}
    >
        <div className={'w-100 flex justify-center mt5'}>
          <ListGradeGraph
            financialGrade={props.overallListFinancialGrade}
            collegeFinancialGrades={props.collegeFinancialGrades}
            loading={props.loading}
          />
        </div>
    </MyCollegesCard>
  );
}

export default ListGradeCard;
