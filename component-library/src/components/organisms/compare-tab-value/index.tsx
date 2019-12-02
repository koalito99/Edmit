import * as React from 'react';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import EarningsAnnualChart from '../../organisms/chart-earnings-annual';
import EarningsMidCareerChart from '../../organisms/chart-earnings-mid-career';
// import EdstimateChart from '../../organisms/chart-edstimate';
// import ValueChart from '../../organisms/chart-value';
// import DivergingChart from '../../organisms/chart-diverging';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
// import { getProseValues } from './prose';
import {
  dataLoadingEarningsAnnualGraph,
  dataLoadingEarningsMidCareerGraph
} from '../../atoms/loading/data';
import { EPersonType } from '../../../shared'

// import numeral from "numeral";

export interface IValueCompareTabViewModel {
  colleges: Array<{
    id: string;
    abbreviation: string;
    hasMyMajor: boolean;
    name: string;
    midCareerEarnings: {
      totalActualPrice: number | null;
      totalEdstimatePrice: number;
      totalEarnings: number;
    };
    annualEarnings: Array<{
      debtRemaining: number;
      medianEarnings: number;
      year: number;
    }>;
  }>;

  personType: EPersonType;

  majors: Array<{
    id: string;
    name: string;
  }>;

  highSchoolEarnings: number;

  majorForm?: JSX.Element;

  loading: boolean;
  isMobile?: boolean;
}

type IValueCompareTabProps = IValueCompareTabViewModel;

const ValueCompareTab: React.SFC<IValueCompareTabProps> = props => {
  const midCareerEarningsCopy = props.loading ? (
    <>
      <LoadingText size={ELoadingTextSize.P} width={90} />
      <LoadingText size={ELoadingTextSize.P} width={30} />
      <LoadingText width={0} />
      <LoadingText size={ELoadingTextSize.P} width={70} />
      <LoadingText width={0} />
    </>
  ) : (
    <Text>
      College is a financial investment that pays off over time. Edmit projects earnings over the
      first 14 years of {props.personType === EPersonType.STUDENT ? 'your' : "your student's"}{' '}
      career, and compares the total salary that graduates make in that time period to what{' '}
      {props.personType === EPersonType.STUDENT ? "you'll" : 'your student will'} pay for school (
      {props.personType === EPersonType.STUDENT ? 'your' : "your student's"} Edstimate® for 4
      years).
    </Text>
  );

  const growthInEarningsCopy = props.loading ? (
    <>
      <LoadingText size={ELoadingTextSize.P} width={100} />
      <LoadingText size={ELoadingTextSize.P} width={60} />
      <LoadingText width={0} />
    </>
  ) : (
    <Text>
      {props.personType === EPersonType.STUDENT ? 'Your' : "Your student's"} starting salary will
      depend on many factors, including major, industry, job, and geography; the rate of growth and
      career progression is just as important in calculating the payoff of{' '}
      {props.personType === EPersonType.STUDENT ? 'your' : "your student's"} degree.
    </Text>
  );

  if (props.loading) {
    return (
      <div>
        <LoadingText size={ELoadingTextSize.H2} width={40} />
        {!props.isMobile && midCareerEarningsCopy}
        <EarningsMidCareerChart
          colleges={dataLoadingEarningsMidCareerGraph}
          personType={props.personType}
          highSchoolEarnings={0}
          loading={props.loading}
        />
        {props.isMobile && midCareerEarningsCopy}
        {!props.isMobile && growthInEarningsCopy}
        <EarningsAnnualChart
          {...props}
          colleges={dataLoadingEarningsAnnualGraph.map(graphData => ({
            ...graphData,
            annualEarnings: graphData.annualEarnings.map(earnings => ({
              amount: earnings.medianEarnings,
              year: earnings.year
            }))
          }))}
          loading={props.loading}
        />
        {props.isMobile && growthInEarningsCopy}
        <LoadingText size={ELoadingTextSize.P} width={100} />
        <LoadingText size={ELoadingTextSize.P} width={100} />
        <LoadingText size={ELoadingTextSize.P} width={60} />
      </div>
    );
  }

  // const EarningsFiveYearsAfterProse =
  //   proseValues.highestSixYearTotalEarningsCollege &&
  //     proseValues.lowestSixYearTotalEarningsCollege
  //     ? [
  //       `${
  //       proseValues.highestSixYearTotalEarningsCollege.name
  //       } graduates have the highest earnings on average the
  //   first five years following graduation, $${proseValues.highestSixYearTotalEarningsCollege.sixthYearTotalEarnings.toLocaleString()}.
  //   This is $${(
  //         proseValues.highestSixYearTotalEarningsCollege.sixthYearTotalEarnings -
  //         proseValues.lowestSixYearTotalEarningsCollege.sixthYearTotalEarnings
  //       ).toLocaleString()} more than the lowest-earning school on your list, ${
  //       proseValues.lowestSixYearTotalEarningsCollege.name
  //       },
  //   whose graduates earn $${proseValues.lowestSixYearTotalEarningsCollege.sixthYearTotalEarnings.toLocaleString()} in that same period.
  //   `
  //     ]
  //     : [];

  // const EarningsMidCareerProse = [
  //   ...(proseValues.highestFourteenYearPayCollege && proseValues.lowestFourteenYearPayCollege && proseValues.highestFourteenYearPayGrowthRate
  //     ? [
  //       `${proseValues.highestFourteenYearPayCollege!.name} graduates' salary grows ${
  //       numeral(proseValues.highestFourteenYearPayGrowthRate).format('0%')
  //       }
  //   in years six through ten post-graduation and they earn $${proseValues.highestFourteenYearPayCollege!.fourteenYearPay.toLocaleString()} on average
  //   mid-career (14 years post-graduation). This mid-career salary is higher than the other schools on your list.
  //   Among the schools on your list, ${
  //       proseValues.lowestFourteenYearPayCollege.name
  //       } graduates earn the lowest by mid-career, $${proseValues.lowestFourteenYearPayCollege.fourteenYearPay.toLocaleString()}.`
  //     ]
  //     : []),
  //   ...(proseValues.lowestAverageDebtCollege
  //     ? [
  //       `The school with the lowest average debt on your list is ${
  //       proseValues.lowestAverageDebtCollege.name
  //       }. The repayment rate for graduates from that college is ${
  //       numeral(proseValues.lowestAverageDebtCollege.repaymentRate).format('0%')
  //       }.
  //   Repayment rates measure the percentage of students who have paid off at least some of their loan principle.`
  //     ]
  //     : []),
  //   proseValues.highestAverageDebtCollege
  //     ? [
  //       `${
  //       proseValues.highestAverageDebtCollege.name
  //       } has the highest average debt at graduation of the colleges on your list. The repayment rate for ${
  //       proseValues.highestAverageDebtCollege.name
  //       }
  //   students is ${numeral(proseValues.highestAverageDebtCollege.repaymentRate).format('0%')}.`
  //     ]
  //     : []
  // ];

  // const selectedMajorForProse = props.selectedMajorName || 'all';

  return (
    <div>
      <Heading size={EHeadingSize.H3} text={'Cumulative Mid-Career Earnings'} className="mt0 mb3" />
      {!props.isMobile && midCareerEarningsCopy}
      <div className="flex justify-end">{props.majorForm}</div>
      <EarningsMidCareerChart
        colleges={props.colleges}
        personType={props.personType}
        highSchoolEarnings={props.highSchoolEarnings}
        loading={props.loading}
      />
      {props.isMobile && <div className="mt4">{midCareerEarningsCopy}</div>}
      {/* {EarningsFiveYearsAfterProse.map((statement, i) => <Text key={i}>{statement}</Text>)} */}
      <Heading
        size={EHeadingSize.H3}
        text={'Growth in Earnings Post-Graduation'}
        className="mt5 mb3"
      />
      {!props.isMobile && growthInEarningsCopy}
      <EarningsAnnualChart {...props} colleges={props.colleges.map(college => ({
        ...college,
        annualEarnings: college.annualEarnings.map(earnings => ({
          amount: earnings.medianEarnings,
          year: earnings.year
        }))
      }))} />
      {props.isMobile && <div className="mt4">{growthInEarningsCopy}</div>}
      {/* EarningsMidCareerProse.map((statement, i) => <Text key={i}>{statement}</Text>) */}
    </div>
  );
};

export default ValueCompareTab;
