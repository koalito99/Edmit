import * as React from 'react';
import { CenterNarrow, OffWhiteSection, Single, SingleReportProps } from '../../report/shared';
import { EOnboardingWizardStep, OnboardingProps } from '..';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import {
  conceptColor,
  hexBlue,
  hexBlueMuted,
  hexGreen,
  hexGreenDark,
  hexGreenMuted,
  hexTeal
} from '@edmit/component-library/src/components/atoms/colors';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import FormFieldCurrency from '@edmit/component-library/src/components/atoms/form/form-field-currency';
import GenericHorizontalBarGraph from '@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar';
import { edstimateCopy, formatDollarsWhole } from '@edmit/component-library/src/shared';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';

const useHouseholdIncomeState = (props: SingleReportProps) => {
  const [householdIncome, setHouseholdIncome] = React.useState(
    props.student.householdIncome || props.student.imputedHouseholdIncome
  );

  const save = async () => {
    await props.updateProfile({
      householdIncome: { value: householdIncome }
    });
  };

  return {
    householdIncome,
    save,
    setHouseholdIncome
  };
};

const getNextStep = (props: OnboardingProps) => {
  const { step } = props;

  switch (step) {
    case EOnboardingWizardStep.HouseholdIncome:
      return EOnboardingWizardStep.AverageVsPublishedTuition;
    case EOnboardingWizardStep.AverageVsPublishedTuition:
      return EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition;
    case EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition:
      return EOnboardingWizardStep.ContributionSliders;
    default:
      return null;
  }
};

export const CostOnboardingSteps: React.SFC<OnboardingProps> = props => {
  const isOnCostSteps = props.step === EOnboardingWizardStep.HouseholdIncome ||
    props.step === EOnboardingWizardStep.AverageVsPublishedTuition ||
    props.step === EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition;

  const state = useHouseholdIncomeState(props);

  React.useEffect(() => {
    if (isOnCostSteps) {
      const nextStep = getNextStep(props);

      if (nextStep) {
        props.setNextCallback(() => async () => {
          if (props.step === EOnboardingWizardStep.HouseholdIncome) {
            await state.save();
          }
          props.setStep(nextStep);
        });
      }
    }
  }, [props.step, state.householdIncome]);

  React.useEffect(() => {
    if (isOnCostSteps) {
      props.setNextEnabled(state.householdIncome !== null);
    }
  }, [props.step, state.householdIncome]);

  window.analytics.track('onboarding_cost_start', {
    college: props.college.name,
    studentId: props.student.id
  });

  const header = {
    [EOnboardingWizardStep.HouseholdIncome]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}
        >
          <Heading
            size={EHeadingSize.H4}
            text={
              <p>
                Everyone pays a different price for college.
                <br />
                Let's find yours.
              </p>
            }
            noColor
          />
        </div>
      </>
    ),
    [EOnboardingWizardStep.AverageVsPublishedTuition]: (
      <>
        <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
          <Heading size={EHeadingSize.H4} text={'Just so you know:'} noColor />
          <div className={'flex justify-center'}>
            <div style={{ flex: 1 }}>
              <Heading size={EHeadingSize.H4} text={'PUBLISHED COST'} noColor />
              <Text>
                (Including room &amp; board and fees)
                <br />
                is the “sticker price” for college. You probably won’t pay this amount.
              </Text>
            </div>
            <span />
            <div style={{ flex: 1 }}>
              <Heading size={EHeadingSize.H4} text={'AVERAGE COST'} noColor />
              <Text>
                (Including room &amp; board and fees)
                <br />
                is the average price people pay. You probably won’t pay this amount either.
              </Text>
            </div>
          </div>
        </div>
      </>
    ),
    [EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}
        >
          <Heading
            size={EHeadingSize.H4}
            text={'Concentrate on your Edstimate®, what we think a college will cost you.'}
            noColor
          />
          <Text>
            The Edstimate® is specific to you, and is the price you'd be asked to pay, either with money you have available or by
            taking loans. It includes grants, scholarships, or factors like in-state reciprocity that can reduce your cost of attendance.
          </Text>
        </div>
      </>
    )
  };

  const body = {
    [EOnboardingWizardStep.HouseholdIncome]: (
      <>
        <div className="center ph3 ph5-l mb4 flex flex-column items-center">
          <Text className={'tc'}>
            We assume your household income based on zip code. To get a more accurate report, update
            your household income.
            <br />
            It doesn’t have to be exact and you can always update this later in your profile
            settings.
          </Text>
          <div className={'mt4 w5'}>
            <FormFieldCurrency
              label={'Household Income'}
              value={state.householdIncome}
              onChange={value => state.setHouseholdIncome(value || 0)}
              required={true}
            />
          </div>
        </div>
      </>
    ),
    [EOnboardingWizardStep.AverageVsPublishedTuition]: (
      <>
        <div className={'ph3 ph5-l mv4'}>
          <CenterNarrow>
            <GenericHorizontalBarGraph
              data={[
                {
                  color: hexTeal,
                  label: 'Average Cost',
                  value: props.college.averageCostOfAttendance
                },
                {
                  color: hexBlue,
                  label: 'Published Cost',
                  value: props.college.costOfAttendance
                }
              ]}
            />
          </CenterNarrow>
        </div>
      </>
    ),
    [EOnboardingWizardStep.EdstimateVsAverageVsPublishedTuition]: (
      <>
        <OffWhiteSection>
          <Single>
            <MetricCard
              title={`Your ${edstimateCopy} for ${props.college.name} is`}
              value={formatDollarsWhole(props.college.edstimate)}
              yearValue={'per year'}
              textColor={conceptColor.edstimate}
            />
          </Single>
        </OffWhiteSection>
        <CenterNarrow>
          <GenericHorizontalBarGraph
            data={[
              {
                color: hexGreen,
                label: edstimateCopy,
                value: props.college.edstimate
              },
              {
                color: hexTeal,
                label: 'Average Cost',
                value: props.college.averageCostOfAttendance
              },
              {
                color: hexBlue,
                label: 'Published Cost',
                value: props.college.costOfAttendance
              }
            ]}
          />
        </CenterNarrow>
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
