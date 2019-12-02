import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import {
  conceptColor,
  hexBlue,
  hexGreen,
  hexGreenDark,
  hexGreenMuted,
  hexOrange,
  hexRedMuted,
  hexYellow,
  hexBlueMuted
} from '@edmit/component-library/src/components/atoms/colors';
import {
  EAffordabilityDetermination,
  edstimateCopy,
  formatDollarsShort,
  lessThanGreaterThanEqualToValue,
} from '@edmit/component-library/src/shared'
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import FinancialGoalDimension from '@edmit/component-library/src/components/organisms/dimension-financial-goal';
import {
  EReportType,
  IReportCollege,
  ISingleCollegeReportProps,
  LoadedReportProps,
  MultiReportProps
} from '../shared';
import classnames from 'classnames';
import { getLoanGap } from '../../onboarding-wizard/affordability';
import GenericHorizontalBarGraph from '@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import Header from '@edmit/component-library/src/components/molecules/header';
import { useMultiReportSorts } from '..';
import DetailedIcon, { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import { useSmartValue } from '../../../../connectors/molecules/smart-values/shared'
import { LoanSavingsSlider, LoanACCSlider, LoanASWSlider, LoanScholarshipsSlider } from '../../../../testIds/ids';

interface IContributionAmountHeroProps {
  savings: number;
  cash: number;
  studentWages: number;
  otherScholarships: number;
  maxSavings: number;
  maxCash: number;
  maxStudentWages: number;
  maxOtherScholarships: number;
  setSavings: (value: number) => void;
  setStudentWages: (value: number) => void;
  setOtherScholarships: (value: number) => void;
  setCash: (value: number) => void;
  onBlur: () => void;
}

type ContributionAmountHeroProps = IContributionAmountHeroProps;

export const useContributionAmounts = (props: LoadedReportProps) => {
  const smartValue = useSmartValue()

  const { student } = props;

  let colleges: IReportCollege[] = [];

  if (props.type === EReportType.Single) {
    colleges = [props.college];
  } else if (props.type === EReportType.Multi) {
    colleges = props.colleges;
  }

  const [cash, setCash] = React.useState(student.annualCash || 0);
  React.useEffect(() => {
    setCash(student.annualCash);
  }, [props.student.annualCash])

  const [savings, setSavings] = React.useState(student.savings || 0);
  React.useEffect(() => {
    setSavings(student.savings);
  }, [props.student.savings])

  const [studentWages, setStudentWages] = React.useState(student.annualWorkStudy || 0);
  React.useEffect(() => {
    setStudentWages(student.annualWorkStudy);
  }, [props.student.annualWorkStudy])

  const [otherScholarships, setOtherScholarships] = React.useState(student.otherScholarships || 0);
  React.useEffect(() => {
    setOtherScholarships(student.otherScholarships || 0);
  }, [props.student.otherScholarships])

  const [refetching, setRefetching] = React.useState(false);

  const maxAmounts = {
    maxCash: Math.max(50000, student.annualCash),
    maxOtherScholarships: Math.max(50000, student.otherScholarships || 50000),
    maxSavings: Math.max(250000, student.savings),
    maxStudentWages: Math.max(50000, student.annualWorkStudy)
  };

  const gaps = {};

  colleges.forEach(college => {
    gaps[college.id] = getLoanGap(
      college.effectiveCost,
      cash,
      savings,
      studentWages,
      otherScholarships
    );
  });

  const onBlur = async () => {
    setRefetching(true);
    await props.updateProfile({
      cashContributionAmount: { value: cash },
      collegeSavingsPlanAmount: { value: savings },
      otherScholarshipsAmount: { value: otherScholarships },
      workStudyAmount: { value: studentWages }
    });
    if (smartValue) smartValue.refetch()
    setRefetching(false);
  };

  return {
    ...maxAmounts,
    cash,
    gaps,
    onBlur,
    otherScholarships,
    savings,
    setCash,
    setOtherScholarships,
    setSavings,
    setStudentWages,
    studentWages,
    refetching
  };
};

export const ContributionAmountHero: React.FC<ContributionAmountHeroProps> = props => {
  return (
    <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
      <Heading
        size={EHeadingSize.H4}
        text={`Let’s take your ${edstimateCopy} and see how you plan to pay for college. We'll look at what loans you'll need to take and how easy they will be to repay.`}
        noColor
      />
      <Text>To get a more accurate recommendation, update the numbers below.</Text>
      <FinancialPlannerSliders {...props} />
    </div>
  );
};

export const FinancialPlannerSliders: React.FC<ContributionAmountHeroProps> = props => {
  const {
    savings,
    cash,
    studentWages,
    otherScholarships,
    setSavings,
    setCash,
    setStudentWages,
    setOtherScholarships,
    maxCash,
    maxStudentWages,
    maxOtherScholarships,
    maxSavings,
    onBlur
  } = props;

  const sliderProps = (value: number, maxValue: number, setter: (value: number) => void) => ({
    onBlur: () => onBlur(),
    onBlurSlider: () => onBlur(),
    onChange: setter,
    onChangeSlider: (v: number) => setter((v / 100) * maxValue),
    sliderValue: (value / maxValue) * 100,
    value
  });

  return <div className={'mv4 flex justify-between items-stretch flex-wrap'}>
    <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
      <FinancialGoalDimension
        color={hexOrange}
        description={'Money set aside for college, including 529 plan.'}
        title={`Savings`}
        loading={false}
        {...sliderProps(savings, maxSavings, setSavings)}
        className={"h-100"}
        testId={LoanSavingsSlider}
      />
    </div>
    <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
      <FinancialGoalDimension
        color={hexGreen}
        description={'What you plan on contributing to pay for college each year. Default is 10% of income.'}
        title={`Annual Cash Contributions`}
        loading={false}
        {...sliderProps(cash, maxCash, setCash)}
        className={"h-100"}
        testId={LoanACCSlider}
      />
    </div>
    <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
      <FinancialGoalDimension
        color={hexYellow}
        description={'Income earned by the student including work study.  Our default assumes 10 hours per week.'}
        title={`Annual Student Wages`}
        loading={false}
        {...sliderProps(studentWages, maxStudentWages, setStudentWages)}
        className={"h-100"}
        testId={LoanASWSlider}
      />
    </div>
    <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
      <FinancialGoalDimension
        color={hexBlue}
        description={'Any private scholarships or grants that are not college-specific.'}
        title={`Other Scholarships`}
        loading={false}
        {...sliderProps(otherScholarships, maxOtherScholarships, setOtherScholarships)}
        className={"h-100"}
        testId={LoanScholarshipsSlider}
      />
    </div>
  </div>
};

export const AffordabilityDeltaMetricCard: React.SFC<ISingleCollegeReportProps> = ({ college }) => {
  const deltaText = `${
    college.affordabilityDelta ? `${formatDollarsShort(college.affordabilityDelta, true)} ` : ''
    }${lessThanGreaterThanEqualToValue(college.affordabilityDelta)}`;
  return (
    <div className={' mr4'}>
      <Text>{college.name} is</Text>
      <Heading
        size={EHeadingSize.H3}
        text={deltaText}
        className={classnames(
          {
            'brown-color-1': college.affordabilityDelta < 0,
            green: college.affordabilityDelta > 0
          },
          'm-auto'
        )}
      />
      <Text>your estimated first year earnings</Text>
    </div>
  );
};

export const LoanEducationModule: React.SFC = () => {
  return (
    <div className={'pv3 ph4 tc mt4'} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
      <Heading size={EHeadingSize.H4} text={'Just so you know:'} noColor />
      <div className={'flex ph1 ph6-ns'}>
        <div className={'dn db-ns'}>
          <DetailedIcon name={EDetailedIconName.RedRuleOfThumb} width={75} className={'mr5'} />
        </div>
        <div>
          <Text className={'tc tl-ns'}>
            A good rule of thumb is to not take a loan greater
            than your first year earnings, as that's what you should be able to safely repay.
          </Text>
        </div>
      </div>
    </div>
  );
};

export const AffordabilitySectionHeader: React.SFC = () => {
  return <Text className={'black t-large pt-3 tc'}>Your Affordability</Text>;
};

export const SingleReportAffordabilityGraph: React.FC<{ college: IReportCollege }> = props => {
  return (
    <GenericHorizontalBarGraph
      data={[
        {
          color: conceptColor.loan,
          label: 'Your Loan',
          value: props.college.loanPrincipalAmount
        },
        {
          color: conceptColor.earnings,
          label: 'First-Year Earnings',
          value: props.college.annualEarnings[0].medianEarnings
        }
      ]}
    />
  );
};

export const AffordabilityDeterminationHero: React.FC<ISingleCollegeReportProps> = props => {
  const { affordabilityDetermination, name } = props.college;

  let affordabilityText: JSX.Element | null = null;

  switch (affordabilityDetermination) {
    case EAffordabilityDetermination.Affordable:
      affordabilityText = (
        <p>
          affordable for you <Icon name={EIconName.Check} className={'t-large'} />
        </p>
      );
      break;
    case EAffordabilityDetermination.NotAffordable:
      affordabilityText = (
        <p>
          a stretch for you <Icon name={EIconName.Error} className={'t-large'} />
        </p>
      );
      break;
    default:
      throw Error('unexpected - an affordability determination should be set');
  }

  const backgroundColor =
    affordabilityDetermination === EAffordabilityDetermination.Affordable
      ? hexGreenMuted
      : hexRedMuted;

  return (
    <div className={'pv3 ph4 tc'} style={{ backgroundColor, color: hexGreenDark }}>
      <Heading size={EHeadingSize.H4} text={`${name} is`} noColor />
      <Heading size={EHeadingSize.H4} text={affordabilityText} noColor />
    </div>
  );
};

export const MultiReportAffordabilityGraph: React.FC<MultiReportProps> = props => {
  const sorts = useMultiReportSorts(props);

  const series = sorts.collegesSortedByAlpha.map(college => ({
    name: college.name,
    values: [
      {
        color: conceptColor.loan,
        label: 'Your Loan',
        value: college.loanPrincipalAmount
      },
      {
        color: conceptColor.earnings,
        label: 'Your Earnings',
        value: college.annualEarnings[0].medianEarnings
      }
    ]
  }));

  const values = [...series.map(s => s.values[0].value), ...series.map(s => s.values[1].value)]

  const maxValue = Math.max(...values)

  return (
    <>
      {series.map((s, index) => {
        return (
          <div key={index} className="mb5">
            <Header size={EHeadingSize.H4} text={s.name} />
            <GenericHorizontalBarGraph maxValue={maxValue || 0} data={s.values} />
          </div>
        );
      })}
    </>
  );
};
