import * as React from 'react';
import numeral from 'numeral';
import Card from '../../atoms/card';
import Text from '../../atoms/typography/text';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import { EPersonType } from '../../../shared'

export interface IFinancialPlannerSummaryCardViewModel {
  college: {
    name: string;
    abbreviation: string;
    netCost: number;
  };
  status: string;
  statusColor: string;
  difference: number;
  projectedFirstYearEarnings: number;
  affordabilityBenchmark: number;

  personType: EPersonType;
  loading: boolean;
}

type FinancialPlannerSummaryCardProps = IFinancialPlannerSummaryCardViewModel;

const FinancialPlannerSummaryCard: React.SFC<FinancialPlannerSummaryCardProps> = props => (
  <Card className="pa3">
    {props.loading ? (
      <span>
        <LoadingText size={ELoadingTextSize.P} width={60} />
        <LoadingText size={ELoadingTextSize.H2} width={40} />
        <LoadingText width={0} />
        <LoadingText size={ELoadingTextSize.P} width={80} />
        <LoadingText size={ELoadingTextSize.P} width={100} />
        <LoadingText size={ELoadingTextSize.P} width={90} />
        <LoadingText size={ELoadingTextSize.P} width={40} />
      </span>
    ) : (
      <span>
        <Text className="mv0 t-medium">{props.college.name} is:</Text>
        <span>
          <Text className="mv0 merriweather fw7">
            <span style={{ color: props.statusColor }}>{props.status}</span>
          </Text>
          <Text className="mv2 t-medium">
            {props.college.abbreviation} costs{' '}
            {props.college.netCost > props.affordabilityBenchmark
              ? `${numeral(props.college.netCost - props.affordabilityBenchmark).format(
                  '$0[,]0'
                )} more`
              : `${numeral(props.affordabilityBenchmark - props.college.netCost).format(
                  '$0[,]0'
                )} less`}{' '}
            than {props.personType === EPersonType.STUDENT ? 'your' : "your student's"} benchmark
            and the loan amount you are expected to borrow is{' '}
            {props.difference > props.projectedFirstYearEarnings
              ? `${numeral(props.difference - props.projectedFirstYearEarnings).format(
                  '$0[,]0'
                )} more`
              : `${numeral(
                  Math.min(
                    props.projectedFirstYearEarnings - props.difference,
                    props.projectedFirstYearEarnings
                  )
                ).format('$0[,]0')} less`}{' '}
            than {props.personType === EPersonType.STUDENT ? 'your' : "your student's"} projected
            first year earnings.
          </Text>
        </span>
      </span>
    )}
  </Card>
);

export default FinancialPlannerSummaryCard;
