import * as React from 'react';
import { EOnboardingWizardStep, OnboardingProps } from '..';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import {
  hexBlue,
  hexGreen,
  hexGreenDark,
  hexGreenMuted,
  hexOffwhite,
  hexOrange,
  hexRed,
  hexRedDark,
  hexRedMuted,
  hexYellow,
  hexBlueMuted
} from '@edmit/component-library/src/components/atoms/colors';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import {
  EAffordabilityDetermination,
  formatDollarsWhole,
  lessThanGreaterThanEqualToValue,
} from '@edmit/component-library/src/shared'
import { SingleReportAffordabilityGraph, useContributionAmounts } from '../../report/affordability/shared';
import FinancialGoalDimension from '@edmit/component-library/src/components/organisms/dimension-financial-goal';
import { CenterNarrow, PageSection } from '../../report/shared';
import Header from '@edmit/component-library/src/components/molecules/header';
import FinancialPlannerGraph, { EVoidMode } from '@edmit/component-library/src/components/molecules/graph/financial-planner';
import DetailedIcon, { EDetailedIconName } from "@edmit/component-library/src/components/atoms/icon-detailed";

const getNextStep = (props: OnboardingProps) => {
  const { step } = props;

  switch (step) {
    case EOnboardingWizardStep.ContributionSliders:
      if (props.college.loansAmount > 0) {
        return EOnboardingWizardStep.GapAmount;
      } else {
        return EOnboardingWizardStep.Affordable;
      }
    case EOnboardingWizardStep.GapAmount:
      if (props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable) {
        return EOnboardingWizardStep.Affordable;
      } else {
        return EOnboardingWizardStep.NotAffordable;
      }
    case EOnboardingWizardStep.Affordable:
    case EOnboardingWizardStep.NotAffordable:
      return EOnboardingWizardStep.MajorSelectionAndEarnings;
    default:
      return null;
  }
};

export const AffordabilityOnboardingSteps: React.SFC<OnboardingProps> = props => {
  const isOnAffordabilitySteps = props.step === EOnboardingWizardStep.ContributionSliders ||
    props.step === EOnboardingWizardStep.GapAmount ||
    props.step === EOnboardingWizardStep.Affordable ||
    props.step === EOnboardingWizardStep.NotAffordable;


  React.useEffect(() => {
    if (isOnAffordabilitySteps) {
      const nextStep = getNextStep(props);

      if (nextStep) {
        props.setNextCallback(() => async () => {
          props.setStep(nextStep);
        });
      }
    }
  }, [props.step, props.college.loansAmount]);

  React.useEffect(() => {
    if (isOnAffordabilitySteps) {
      props.setNextEnabled(true);
    }
  }, [props.step]);

  const state = useContributionAmounts(props);

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
  } = state;

  const sliderProps = (value: number, maxValue: number, setter: (value: number) => void) => ({
    onBlur: () => onBlur(),
    onBlurSlider: () => onBlur(),
    onChange: setter,
    onChangeSlider: (v: number) => setter((v / 100) * maxValue),
    sliderValue: (value / maxValue) * 100,
    value
  });

  const header = {
    [EOnboardingWizardStep.ContributionSliders]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}
        >
          <Heading
            size={EHeadingSize.H4}
            text={`Let’s take your Edstimate® and how you plan to pay for college. We'll take a look at what loans you need to take for ${
              props.college.name
              } and how easy they will be to repay.`}
            noColor
          />
          <Text>
            To get a more accurate recommendation, update the numbers below.
            <br />
            (Don't worry if these aren't exact. You can change them later.)
          </Text>
          <div className={'mv4 flex justify-between items-stretch flex-wrap'}>
            <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
              <FinancialGoalDimension
                color={hexOrange}
                description={'Money set aside for college, including 529 plan.'}
                title={`Savings`}
                loading={false}
                {...sliderProps(savings, maxSavings, setSavings)}
                className={"h-100"}
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
              />
            </div>
          </div>
        </div>
      </>
    ),
    [EOnboardingWizardStep.GapAmount]: (
      <>
        <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexRedMuted, color: hexRedDark }}>
          <Heading size={EHeadingSize.H4} text={'Let\'s take a look at the gap between what you can pay before loans and the total cost.'} noColor />
          <Text>Unless you have another source of funds, you will need to take out a loan.</Text>
        </div>
      </>
    ),
    [EOnboardingWizardStep.Affordable]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{
            backgroundColor:
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? hexGreenMuted
                : hexRedMuted,
            color:
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? hexGreenDark
                : hexRed
          }}
        >
          <Heading size={EHeadingSize.H4} text={`${props.college.name} is`} noColor />
          <Heading
            size={EHeadingSize.H3}
            text={`${
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? 'affordable for you'
                : 'a stretch for you'
              }`}
            noColor
          />
          <Text>
            A good rule of thumb: don't take a loan greater than your earnings will be in the first year after college. That’s what you should be able to safely repay.
          </Text>
        </div>
      </>
    ),
    [EOnboardingWizardStep.NotAffordable]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{
            backgroundColor:
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? hexGreenMuted
                : hexBlueMuted,
            color:
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? hexGreenDark
                : hexBlue
          }}
        >
          <Heading size={EHeadingSize.H4} text={`${props.college.name} is`} noColor />
          <Heading
            size={EHeadingSize.H3}
            text={`${
              props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? 'affordable'
                : 'a stretch'
              } for you`}
            noColor
          />
          <div className={"flex ph1 ph6-ns"}>
            <div className={"dn db-ns"}>
              <DetailedIcon name={props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable
                ? EDetailedIconName.GreenRuleOfThumb
                : EDetailedIconName.RedRuleOfThumb} width={75} className={'mr5'} />
            </div>
            <div>
              <Text className={"tc tl-ns"}>
                A good rule of thumb: don't take a loan greater than your earnings will be in the first year after college. That’s what you should be able to safely repay.
              </Text>
            </div>
          </div>
        </div>
      </>
    )
  };

  const body = {
    [EOnboardingWizardStep.ContributionSliders]: (
      <PageSection>
        <Header
          size={EHeadingSize.H4}
          text={`Here's how you will pay for four years at ${props.college.name}`}
        />
        <FinancialPlannerGraph
          voidMode={EVoidMode.Positive}
          data={{
            abbreviation: props.college.abbreviation,
            cash: state.cash * 4,
            collegeNameFull: props.college.name,
            edstimate: props.college.edstimate,
            loans: state.gaps[props.college.id],
            otherScholarships: state.otherScholarships,
            savings: state.savings,
            workStudy: state.studentWages * 4
          }}
          loading={false}
        />
      </PageSection>
    ),
    [EOnboardingWizardStep.GapAmount]: (
      <>
        <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
          <Text className={'mb0'}>Your estimated loan amount for {props.college.name} is</Text>
          <div>
            <Heading
              size={EHeadingSize.H2}
              text={formatDollarsWhole(props.college.loanPrincipalAmount)}
              className={'mt0 mb0 dib mr2'}
              style={{ color: hexRed }}
            />
            <Text className="dib" style={{ color: hexRed }}>
              (four years)
            </Text>
          </div>
        </div>
        <PageSection>
          <Header
            size={EHeadingSize.H4}
            text={`Here's how you will pay for four years at ${props.college.name}`}
          />
          <FinancialPlannerGraph
            voidMode={EVoidMode.Negative}
            data={{
              abbreviation: props.college.abbreviation,
              cash: state.cash * 4,
              collegeNameFull: props.college.name,
              edstimate: props.college.edstimate,
              loans: state.gaps[props.college.id],
              otherScholarships: state.otherScholarships,
              savings: state.savings,
              workStudy: state.studentWages * 4
            }}
            loading={false}
          />
        </PageSection>
      </>
    ),
    [EOnboardingWizardStep.Affordable]: (
      <>
        <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
          <Text className={'mb0'}>Your estimated loan amount for {props.college.name} is</Text>
          <div>
            <Heading
              size={EHeadingSize.H2}
              text={formatDollarsWhole(Math.abs(props.college.affordabilityDelta))}
              className={'mt0 mb0 dib mr2'}
            />
            <Text className="dib">
              {lessThanGreaterThanEqualToValue(props.college.affordabilityDelta * -1)} than your
              estimated first year earnings.
            </Text>
            <Text style={{ color: hexGreen }}>
              See where we got that earnings number by clicking next.
            </Text>
          </div>
        </div>
        <PageSection>
          <CenterNarrow>
            <SingleReportAffordabilityGraph {...props} />
          </CenterNarrow>
        </PageSection>
      </>
    ),
    [EOnboardingWizardStep.NotAffordable]: (
      <>
        <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
          <Text className={'mb0'}>Your estimated loan amount for {props.college.name} is</Text>
          <div>
            <Heading
              size={EHeadingSize.H2}
              text={formatDollarsWhole(Math.abs(props.college.affordabilityDelta))}
              className={'mt0 mb0 dib mr2'}
            />
            <Text className="dib">
              {lessThanGreaterThanEqualToValue(props.college.affordabilityDelta * -1)} than your
              estimated first year earnings.
            </Text>
            <Text style={{ color: hexGreen }}>
              See where we got that earnings number by clicking next.
            </Text>
          </div>
        </div>
        <PageSection>
          <CenterNarrow>
            <SingleReportAffordabilityGraph {...props} />
          </CenterNarrow>
        </PageSection>
      </>
    )
  };

  return (
    <>
      {header[props.step]}
      {body[props.step]}
    </>
  );
};
