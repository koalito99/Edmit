import * as React from 'react';
import withSizes from 'react-sizes';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';
import { Formik } from 'formik';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import SteppedWizardWrapper from '@edmit/component-library/src/components/organisms/wrapper-stepped-wizard';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import { composeValidators } from '@edmit/component-library/src/lib/forms';
import Card from '@edmit/component-library/src/components/atoms/card';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { OnboardingArea } from './onboardingArea';
import CostSection, { ICostSectionFields } from './cost';
import AffordabilitySection, {
  IAffordabilitySectionFields, getLoanGap
} from './affordability';
import ValueSection, { IValueSectionFields } from './value';
import { DeepPartial } from '@edmit/component-library/src/lib/typescript';
import FinancialGradeSection from "./financialGrade";
import { UpdateProfile, UpdateProfileVariables } from '../../../graphql/generated';
import { MutationFn } from 'react-apollo';
import { EAffordabilityDetermination, EFinancialGrade, EValueDetermination } from '@edmit/component-library/src/shared'

export interface ICurrentStepState {
  buttons: {
    back: {
      shown: boolean;
      disabled: boolean;
      text: string;
      onClick: (doDefault: () => void) => void;
    };
    next: {
      shown: boolean;
      disabled: boolean;
      text: string;
      onClick: (doDefault: () => void) => void;
    };
  };
}

export type ICurrentStepStateInput = DeepPartial<ICurrentStepState>;

export enum EOnboardingStep {
  Cost,
  Affordability,
  Value,
  FinancialGrade
}

export type OnboardingFields = ICostSectionFields &
  IAffordabilitySectionFields &
  IValueSectionFields;

const stepOrder = [
  EOnboardingStep.Cost,
  EOnboardingStep.Affordability,
  EOnboardingStep.Value,
  EOnboardingStep.FinancialGrade
];

export interface IOnboardingPageViewModel {
  activeStep: EOnboardingStep;

  college: {
    abbreviation: string;
    name: string;

    edstimate: number;
    averageCost: number;
    publishedCost: number;
    annualEarnings: Array<{
      amount: number;
      year: number;
    }>;
    estimatedAnnualLoanPayments: number;

    financialGrade: EFinancialGrade;
    isAffordable: EAffordabilityDetermination;
    isAGoodValue: EValueDetermination;

    valueDelta: number;
    valueBenchmark: number;
  };

  majors: Array<{
    id: string;
    name: string;
  }>;

  initialValues: OnboardingFields;

  initialLoading?: boolean;

  studentId: string;
  isMobile?: boolean;
}

export interface IOnboardingPageActions {
  goToStep: (step: EOnboardingStep) => void;
  onCompletedOnboarding: () => void;
  refetchProfile: () => void;
  updateProfile: MutationFn<UpdateProfile, UpdateProfileVariables>
}

type OnboardingPageProps = IOnboardingPageViewModel & IOnboardingPageActions;

export const nextItem = <S extends {}>(currentStep: S, order: S[]): S | null => {
  const index = order.indexOf(currentStep);
  if (index < stepOrder.length - 1) {
    return order[index + 1];
  } else {
    return null;
  }
};

export const previousItem = <S extends {}>(currentStep: S, order: S[]): S | null => {
  const index = order.indexOf(currentStep);
  if (index > 0) {
    return order[index - 1];
  } else {
    return null;
  }
};

class OnboardingPage extends React.Component<OnboardingPageProps> {
  constructor(props: OnboardingPageProps) {
    super(props);

    this.goToStep = this.goToStep.bind(this);
  }

  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    return (
      <PageContainer className="pv5-l mh0">
        <Formik<OnboardingFields>
          initialValues={{
            ...this.props.initialValues
          }}
          onSubmit={() => null}
          validate={fields => composeValidators(fields, {})}
        >
          {formikProps => {
            // const setFieldValue = (field: string, value: any) => {
            //   sFV(field, value);
            //   setFieldTouched(field);
            // };

            const yearsInCollege = 4;

            const grossCost = this.props.college.publishedCost * yearsInCollege;
            const grossEdstimate = this.props.college.edstimate * yearsInCollege;
            const grossCash = (formikProps.values.annualCashContributionAmount || 0) * yearsInCollege;
            const grossSavings = formikProps.values.savingsAmount || 0;
            const grossWorkStudy = (formikProps.values.annualStudentWageAmount || 0) * yearsInCollege;
            const grossOtherScholarships = formikProps.values.otherScholarshipsAmount || 0;

            const loanAmount = getLoanGap(
              grossEdstimate,
              grossCash,
              grossSavings,
              grossWorkStudy,
              grossOtherScholarships
            );

            return (
              <div key="onboarding-wizard">
                <Heading
                  size={EHeadingSize.H4}
                  text={`Report for ${this.props.college.name}`}
                  className={'tc'}
                />

                <SteppedWizardWrapper<EOnboardingStep, ICurrentStepState>
                  activeStep={this.props.activeStep}
                  order={stepOrder}
                  key="wizard"
                  initialLoading={this.props.initialLoading}
                  defaultStepState={{ // changed
                    buttons: {
                      back: {
                        disabled: false,
                        onClick: (doDefault) => {
                          return doDefault();
                        },
                        shown: true,
                        text: 'Back'
                      },
                      next: {
                        disabled: false,
                        onClick: (doDefault) => {
                          return doDefault();
                        },
                        shown: true,
                        text: 'Next'
                      }
                    }
                  }}
                  steps={[ // changed
                    {
                      render: ({ visibleState, setStepState }) => (
                        <OnboardingArea
                          key="cost"
                          visibleState={visibleState}
                          content={
                            <CostSection
                              key="onboarding-area-cost-section"
                              college={this.props.college}
                              updateProfile={this.props.updateProfile}
                              formikProps={formikProps}
                              setWizardState={setStepState as any} // FIXME: Properly type
                            />
                          }
                        />
                      ),
                      step: EOnboardingStep.Cost
                    },
                    {
                      render: ({ visibleState, setStepState }) => (
                        <OnboardingArea
                          key="affordability"
                          visibleState={visibleState}
                          content={
                            <AffordabilitySection
                              college={{
                                ...this.props.college,
                                firstYearEarnings: this.props.college.annualEarnings.find(earnings => earnings.year === 0)!.amount
                              }}

                              loanAmount={loanAmount}
                              yearsInCollege={yearsInCollege}
                              totalCostComponents={{
                                grossCash,
                                grossCost,
                                grossEdstimate,
                                grossSavings,
                                grossWorkStudy
                              }}

                              updateProfile={this.props.updateProfile}

                              formikProps={formikProps}
                              setWizardState={setStepState as any} // FIXME: Properly type
                            />
                          }
                        />
                      ),
                      step: EOnboardingStep.Affordability
                    },
                    {
                      render: ({ visibleState, setStepState }) => (
                        <OnboardingArea
                          key="value"
                          visibleState={visibleState}
                          content={
                            <ValueSection
                              college={{
                                ...this.props.college,
                                annualEarnings: this.props.college.annualEarnings.map(
                                  (earning) => {
                                    return {
                                      amount: earning.amount - (loanAmount / 10),
                                      loanAmount: (loanAmount / 10),
                                      year: earning.year
                                    }
                                  }
                                )
                              }}
                              majors={this.props.majors}

                              loanAmount={loanAmount}

                              updateProfile={this.props.updateProfile}

                              formikProps={formikProps}
                              setWizardState={setStepState as any} // FIXME: Properly type
                            />
                          }
                        />
                      ),
                      step: EOnboardingStep.Value
                    },
                    {
                      render: ({ visibleState }) => (
                        <OnboardingArea
                          key="grade"
                          visibleState={visibleState}
                          content={
                            <FinancialGradeSection
                              college={this.props.college}
                              formikProps={formikProps}
                            />
                          }
                        />
                      ),
                      step: EOnboardingStep.FinancialGrade
                    }
                  ]}
                >
                  {({ wizardComponent, currentStepState }) => (
                    <Card key="card" style={{ overflowX: 'hidden' }}>
                      {wizardComponent}
                      {!this.props.initialLoading &&
                        <div className="pa3 ph4-ns flex flex-row items-center justify-between bt b--gray-light">
                          <div>
                            {currentStepState.buttons.back.shown && (
                              <Button
                                size={EButtonSize.Medium}
                                type={EButtonType.Secondary}
                                text={currentStepState.buttons.back.text}
                                disabled={currentStepState.buttons.back.disabled}
                                onClick={() => {
                                  currentStepState.buttons.back.onClick(() => {
                                    const index = stepOrder.indexOf(this.props.activeStep);
                                    if (index > 0) {
                                      this.goToStep(stepOrder[index - 1]);
                                    }
                                  });
                                }}
                              />
                            )}
                          </div>
                          <div>
                            {currentStepState.buttons.next.shown && (
                              <FormSubmit
                                buttonSize={EButtonSize.Medium}
                                disabled={currentStepState.buttons.next.disabled}
                                defaultText={currentStepState.buttons.next.text}
                                submittedText={'Saving'}
                                succeededText={'Saved'}
                                failedText={'Saving Failed'}
                                submitState={
                                  formikProps.isSubmitting
                                    ? ESubmitState.Submitted
                                    : // : error
                                    // ? ESubmitState.Failed
                                    ESubmitState.Default
                                }
                                onClick={() => {
                                  currentStepState.buttons.next.onClick(() => {
                                    const index = stepOrder.indexOf(this.props.activeStep);
                                    if (index < stepOrder.length - 1) {
                                      this.goToStep(stepOrder[index + 1]);
                                    } else {
                                      this.props.onCompletedOnboarding();
                                    }
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                      }
                    </Card>
                  )}
                </SteppedWizardWrapper>
              </div>
            );
          }}
        </Formik>
      </PageContainer>
    );
  }

  private goToStep(step: EOnboardingStep) {
    scroll.scrollToTop({
      duration: 300
    });

    const timeoutFunc = () => this.props.goToStep(step);

    setTimeout(timeoutFunc.bind(this), 300);
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(OnboardingPage) as typeof OnboardingPage;
