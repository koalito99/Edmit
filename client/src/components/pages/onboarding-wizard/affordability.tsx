import * as React from 'react';
import { useEffect } from 'react';
import { FormikProps } from 'formik';
import numeral from 'numeral';

import { ICurrentStepStateInput, OnboardingFields, nextItem, previousItem } from './index';
import {
  hexBlue,
  hexGreen,
  hexOffwhite,
  hexRed, hexTeal
} from '@edmit/component-library/src/components/atoms/colors';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import FinancialPlannerGraph, { EVoidMode } from "@edmit/component-library/src/components/molecules/graph/financial-planner";
import { UpdateProfile, UpdateProfileVariables } from '../../../graphql/generated';
import { MutationFn } from 'react-apollo';
import { EAffordabilityDetermination } from '@edmit/component-library/src/shared'

export enum EAffordabilitySectionStep {
  EnterFinancialValues = 'EnterFinancialValues',
  LoanWarning = 'LoanWarning',
  IsItAffordableForYou = 'IsItAffordableForYou'
}

const affordabilitySectionOrder = [
  EAffordabilitySectionStep.EnterFinancialValues,
  EAffordabilitySectionStep.LoanWarning,
  EAffordabilitySectionStep.IsItAffordableForYou
];

export const getLoanGap = (netCost: number, netCash: number, savings: number, netWorkStudy: number, otherScholarships?: number) => {
  const voluntaryAmount = (netCash * 4) + savings + (4 * netWorkStudy) + (otherScholarships || 0);

  return Math.max(0, ((netCost * 4) - voluntaryAmount))
};

export interface IAffordabilitySectionFields {
  savingsAmount: number | null;
  annualCashContributionAmount: number | null;
  annualStudentWageAmount: number | null;
  otherScholarshipsAmount: number | null;
}

interface IAffordabilitySectionProps {
  college: {
    abbreviation: string;
    edstimate: number;
    name: string;
    publishedCost: number;
    firstYearEarnings: number;
    isAffordable: EAffordabilityDetermination;
  };

  loanAmount: number;
  yearsInCollege: number;
  totalCostComponents: {
    grossCash: number;
    grossCost: number;
    grossEdstimate: number;
    grossSavings: number;
    grossWorkStudy: number;
  };

  updateProfile: MutationFn<UpdateProfile, UpdateProfileVariables>;

  formikProps: FormikProps<OnboardingFields>;
  setWizardState: (stepState: ICurrentStepStateInput) => void;
}


const useContributionAmounts = (
  updateProfile: MutationFn<UpdateProfile, UpdateProfileVariables>,
  edstimate: number
) => {
  const [cash, setCash] = React.useState(0)
  const [savings, setSavings] = React.useState(0)
  const [studentWages, setStudentWages] = React.useState(0)
  const [otherScholarships, setOtherScholarships] = React.useState(0)

  const maxAmounts = {
    maxCash: Math.max(50000),
    maxOtherScholarships: Math.max(50000),
    maxSavings: Math.max(250000),
    maxStudentWages: Math.max(50000)
  }

  const loans = getLoanGap(
    edstimate,
    cash,
    savings,
    studentWages,
    otherScholarships
  )

  const onBlur = async () => {
    await updateProfile({
      variables: {
        data: {
          cashContributionAmount: { value: cash },
          collegeSavingsPlanAmount: { value: savings },
          otherScholarshipsAmount: { value: otherScholarships },
          workStudyAmount: { value: studentWages }
        }
      }
    });
  }

  return {
    ...maxAmounts,
    cash,
    loans,
    onBlur,
    otherScholarships,
    savings,
    setCash,
    setOtherScholarships,
    setSavings,
    setStudentWages,
    studentWages
  }
}

const AffordabilitySection: React.SFC<IAffordabilitySectionProps> = props => {
  const [step, setStep] = React.useState(EAffordabilitySectionStep.EnterFinancialValues)

  const contributionState = useContributionAmounts(props.updateProfile, props.college.edstimate)

  const {
    studentWages,
    otherScholarships,
    savings,
    loans
  } = contributionState;

  useEffect(() => {
    props.setWizardState({
      buttons: {
        back: {
          onClick: (doDefault) => {

            if (step === EAffordabilitySectionStep.IsItAffordableForYou && props.loanAmount <= 0) {
              setStep(EAffordabilitySectionStep.EnterFinancialValues);
              return;
            }

            const previousStep = previousItem(step, affordabilitySectionOrder);
            if (previousStep) {
              setStep(previousStep);
            } else {
              doDefault();
            }
          }
        },
        next: {
          onClick: async (doDefault) => {
            if (step === EAffordabilitySectionStep.EnterFinancialValues && props.loanAmount <= 0) {
              setStep(EAffordabilitySectionStep.IsItAffordableForYou);
              return;
            }

            const nextStep = nextItem(step, affordabilitySectionOrder);

            if (nextStep) {
              setStep(nextStep);
            } else {
              doDefault();
            }
          }
        }
      }
    })
  }, [step]);



  return (
    <div>
      {/* Content */}
      <div>
        <div className="center">
          {step === EAffordabilitySectionStep.LoanWarning ? (
            <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
              <Text className={'mb0'}>Your estimated loan amount for {props.college.name} is</Text>
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={numeral(props.loanAmount).format('$0a')}
                  className={'mt0 mb0 dib mr2'}
                  style={{ color: hexRed }}
                />
                <Text className="dib" style={{ color: hexRed }}>
                  (${props.yearsInCollege} years)
                </Text>
              </div>
            </div>
          ) : step === EAffordabilitySectionStep.IsItAffordableForYou &&
            <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
              <Text className={'mb0'}>Your estimated loan amount for {props.college.name} is</Text>
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={numeral(Math.abs(props.college.firstYearEarnings - props.loanAmount)).format('$0a')}
                  className={'mt0 mb0 dib mr2'}
                />
                <Text className="dib">
                  {props.college.firstYearEarnings - props.loanAmount >= 0 ? 'less' : 'more'} than your estimated first year earnings.
                </Text>
                <Text style={{ color: hexGreen }}>
                  See where we got that earnings number by clicking next.
                </Text>
              </div>
            </div>}
          {step === EAffordabilitySectionStep.EnterFinancialValues ||
          step === EAffordabilitySectionStep.LoanWarning ? (
            <div className="mt4 mt4-ns ph5-l">
              <FinancialPlannerGraph
                voidMode={step === EAffordabilitySectionStep.EnterFinancialValues ? EVoidMode.Positive : EVoidMode.Negative}
                data={{
                  abbreviation: props.college.abbreviation,
                  cash: props.totalCostComponents.grossCash,
                  collegeNameFull: props.college.name,
                  edstimate: props.college.edstimate,
                  loans,
                  otherScholarships: otherScholarships || undefined,
                  savings,
                  workStudy: studentWages
                }}
                loading={false}
              />
            </div>
          ) : (
            <div className="mv4 ph3 ph5-l">
              <GenericHorizontalBarGraph
                data={[
                  ...(props.loanAmount > 0 ? [{
                    color: hexTeal,
                    label: 'Your Loan',
                    value: props.loanAmount,
                  }] : []),
                  { label: '1st Year Earnings', value: props.college.firstYearEarnings, color: hexBlue }
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilitySection;
