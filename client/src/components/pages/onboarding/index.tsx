import * as React from 'react';
import { Element as ScrollElement } from "react-scroll";

import { EReportType, LoadedReportProps, SingleReportProps, useReportPage } from '../report/shared';
import { CostOnboardingSteps } from './step/cost';
import { OnboardingArea } from '../onboarding-wizard/onboardingArea';
import Card from '@edmit/component-library/src/components/atoms/card';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import { EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { AffordabilityOnboardingSteps } from './step/affordability';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import ProgressNav from '@edmit/component-library/src/components/molecules/progress-nav';
import { ValueOnboardingSteps } from './step/value';
import { FinancialGradeOnboardingSteps } from './step/grade';
import { CollegeSelectionSteps } from './step/selection';
// import LoadingSpinner from "@edmit/component-library/src/components/atoms/loading/spinner";
import { useScroll } from "@edmit/component-library/src/lib/react-helper";
import { Nullable, StudentId } from "@edmit/component-library/src/lib/models";
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';

interface IOnboardingProps {
  saving: boolean;
  step: EOnboardingWizardStep;
  nextShown: boolean;
  nextCopy: string;
  nextEnabled: boolean;
  nextCallback: () => void;
  setNextShown: (v: boolean) => void;
  setNextCopy: (v: string) => void;
  setNextCallback: (v: () => void) => void;
  setNextEnabled: (v: boolean) => void;
  setStep: (v: EOnboardingWizardStep) => void;
}

export enum EOnboardingWizardStep {
  CollegeSelection,
  HouseholdIncome,
  AverageVsPublishedTuition,
  EdstimateVsAverageVsPublishedTuition,
  ContributionSliders,
  GapAmount,
  Affordable,
  NotAffordable,
  MajorSelectionAndEarnings,
  EarningsAndLoans,
  GoodValue,
  NotAGoodValue,
  FinancialGrade,
  LoanData
}

const getEndOfFlow = () => null;

const getValueSection = () => EOnboardingWizardStep.MajorSelectionAndEarnings;

export const nextStep = (
  current: EOnboardingWizardStep
) => {
  switch (current) {
    /*case EOnboardingWizardStep.CollegeSelection:
      return EOnboardingWizardStep.HouseholdIncome*/
    case EOnboardingWizardStep.HouseholdIncome:
      return EOnboardingWizardStep.AverageVsPublishedTuition;
    case EOnboardingWizardStep.AverageVsPublishedTuition:
      return EOnboardingWizardStep.ContributionSliders;
    case EOnboardingWizardStep.ContributionSliders:
      return EOnboardingWizardStep.GapAmount;
    case EOnboardingWizardStep.GapAmount:
      return EOnboardingWizardStep.Affordable;
    case EOnboardingWizardStep.NotAffordable:
    case EOnboardingWizardStep.Affordable:
      return getValueSection();
    case EOnboardingWizardStep.GoodValue:
    case EOnboardingWizardStep.NotAGoodValue:
    case EOnboardingWizardStep.FinancialGrade:
      return getEndOfFlow();
    case EOnboardingWizardStep.CollegeSelection:
      return EOnboardingWizardStep.LoanData
    default:
      return current;
  }
};

export type OnboardingProps = IOnboardingProps & SingleReportProps;

export interface IOnboardingOwnProps {
  studentId: Nullable<StudentId>;
  children: (props: OnboardingProps) => React.ReactNode;
}

export type OnboardingOwnProps = IOnboardingOwnProps;

const defaultNextCallback = () => console.log('Next');

const useOnboardingState = () => {
  const [step, setStep] = React.useState(EOnboardingWizardStep.CollegeSelection);
  const [nextShown, setNextShown] = React.useState(true);
  const [nextCopy, setNextCopy] = React.useState('Continue');
  const [nextEnabled, setNextEnabled] = React.useState(false);
  const [nextCallback, setNextCallback] = React.useState<() => void>(() => defaultNextCallback);
  const [saving, setSaving] = React.useState(false);

  return {
    nextCallback,
    nextCopy,
    nextEnabled,
    nextShown,
    saving,
    setNextCallback,
    setNextCopy,
    setNextEnabled: (v: boolean) => {
      setNextEnabled(v);
    },
    setNextShown,
    setSaving,
    setStep,
    step
  };
};

const transformedReport = (report: LoadedReportProps): SingleReportProps | false => {
  if (report.type === EReportType.Multi) {
    return {
      ...report,
      college: report.colleges[0],
      type: EReportType.Single
    };
  } else if (report.type === EReportType.Single) {
    return {
      ...report
    };
  } else {
    window.location.href = "/onboarded?returnTo=/report"
    return false;
  }
};

export const OnboardingWithData: React.SFC<OnboardingOwnProps> = props => {
  const report = useReportPage(props.studentId, { uploadAidLetter: () => null }, true);
  const state = useOnboardingState();

  if (report.loading) {
    return <LoadingSpinner />;
  } else {
    const transformed = transformedReport(report);
    if (transformed) {
      return <Onboarding {...state} {...transformed} />;
    }
  }

  return null;
};

const OnboardingNavigation: React.SFC<OnboardingProps> = props => {
  return (
    <div className="tr mt3 pa3">
      <FormSubmit
        buttonSize={EButtonSize.Large}
        disabled={!props.nextEnabled || props.saving}
        defaultText={props.nextCopy}
        submitState={props.saving ? ESubmitState.Submitted : ESubmitState.Default}
        submittedText={'Saving'}
        succeededText={'Saved'}
        failedText={'Saving Failed'}
        onClick={() => props.nextCallback()}
      />
    </div>
  );
};

export const Onboarding: React.SFC<OnboardingProps> = props => {
  const { scroller } = useScroll();

  React.useEffect(() => {
    var mainDiv = document.getElementById('mainDiv');
    if (mainDiv != null) {
      mainDiv.scrollTop = 0;
    }
    scroller.scrollTo("onboardingStep", {
      duration: 1500,
      offset: -75, // Scrolls to element + 50 pixels down the page
      smooth: true,
    });
  }, [props.step]);

  if (props.step === EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition) {
    window.analytics.track('onboarding_cost_completed', {
      college: props.college.name,
      studentId: props.student.id
    });
  }
  else if (props.step === EOnboardingWizardStep.ContributionSliders) {
    window.analytics.track('onboarding_affordability_start', {
      college: props.college.name,
      studentId: props.student.id
    });
  }
  else if (props.step === EOnboardingWizardStep.Affordable ||
    props.step === EOnboardingWizardStep.NotAffordable) {
    window.analytics.track('onboarding_affordability_completed', {
      college: props.college.name,
      studentId: props.student.id
    });
  }
  else if (props.step === EOnboardingWizardStep.MajorSelectionAndEarnings) {
    window.analytics.track('onboarding_value_start', {
      college: props.college.name,
      studentId: props.student.id
    });
  }
  else if (props.step === EOnboardingWizardStep.GoodValue ||
    props.step === EOnboardingWizardStep.NotAGoodValue) {
    window.analytics.track('onboarding_value_completed', {
      college: props.college.name,
      studentId: props.student.id
    });
  }
  else if (props.step === EOnboardingWizardStep.FinancialGrade) {
    window.analytics.track('onboarding_financial_grade_start', {
      college: props.college.name,
      studentId: props.student.id
    });
  }

  return (
    <PageContainer>
      {props.step === EOnboardingWizardStep.CollegeSelection && (
        <>
          <CollegeSelectionSteps {...props} />
          <OnboardingNavigation {...props} />
        </>
      )}
      {props.step !== EOnboardingWizardStep.CollegeSelection && (
        <>
          <Heading
            size={EHeadingSize.H4}
            text={`Report for ${props.college.name}`}
            className={'tc'}
          />
          <span className="dn db-ns">
            <ProgressNav<EOnboardingWizardStep>
              steps={[
                {
                  label: 'Cost',
                  step: [
                    EOnboardingWizardStep.LoanData,
                    EOnboardingWizardStep.HouseholdIncome,
                    EOnboardingWizardStep.AverageVsPublishedTuition,
                    EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition
                  ]
                },
                {
                  label: 'Affordability',
                  step: [
                    EOnboardingWizardStep.ContributionSliders,
                    EOnboardingWizardStep.GapAmount,
                    EOnboardingWizardStep.Affordable,
                    EOnboardingWizardStep.NotAffordable
                  ]
                },
                {
                  label: 'Value',
                  step: [
                    EOnboardingWizardStep.MajorSelectionAndEarnings,
                    EOnboardingWizardStep.EarningsAndLoans,
                    EOnboardingWizardStep.GoodValue,
                    EOnboardingWizardStep.NotAGoodValue
                  ]
                },
                {
                  label: 'Financial Grade',
                  step: [EOnboardingWizardStep.FinancialGrade]
                }
              ]}
              activeStep={props.step}
            />
          </span>
          <ScrollElement name="onboardingStep">
            <Card key="card" style={{ overflowX: 'hidden' }}>
              <OnboardingArea
                content={
                  <>
                    <div className="pa3">
                      <CostOnboardingSteps {...props} />
                      <AffordabilityOnboardingSteps {...props} />
                      <ValueOnboardingSteps {...props} />
                      <FinancialGradeOnboardingSteps {...props} />
                    </div>
                  </>
                }
              />
              <OnboardingNavigation {...props} />
            </Card>
          </ScrollElement>
        </>
      )}
    </PageContainer>
  );
};
