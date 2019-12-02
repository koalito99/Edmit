import * as React from 'react';
import { EOnboardingWizardStep, OnboardingProps } from '..';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import {
  hexBlue,
  hexBlueMuted,
  hexGreenDark,
  hexGreenMuted,
  hexOffwhite,
  hexRed,
  hexRedMuted,
  hexTeal
} from '@edmit/component-library/src/components/atoms/colors';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import GenericHorizontalBarGraph from '@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar';
import { EValueDetermination, formatDollarsWhole } from '@edmit/component-library/src/shared'
import { SingleCollegeEarningsGraph, useReportValueState } from '../../report/value/shared';
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select';
import { sortBy } from "lodash-es"

const getNextStep = (props: OnboardingProps) => {
  const { step } = props;

  switch (step) {
    case EOnboardingWizardStep.MajorSelectionAndEarnings:
      if (props.college.loansAmount > 0) {
        return EOnboardingWizardStep.EarningsAndLoans;
      } else {
        if (props.college.valueDetermination === EValueDetermination.GoodValue) {
          return EOnboardingWizardStep.GoodValue;
        } else {
          return EOnboardingWizardStep.NotAGoodValue;
        }
      }
    case EOnboardingWizardStep.EarningsAndLoans:
      if (props.college.valueDetermination === EValueDetermination.GoodValue) {
        return EOnboardingWizardStep.GoodValue;
      } else {
        return EOnboardingWizardStep.NotAGoodValue;
      }
    case EOnboardingWizardStep.GoodValue:
    case EOnboardingWizardStep.NotAGoodValue:
      return EOnboardingWizardStep.FinancialGrade;
    default:
      return null;
  }
};

export const ValueOnboardingSteps: React.SFC<OnboardingProps> = props => {
  const isOnValueSteps = props.step === EOnboardingWizardStep.MajorSelectionAndEarnings ||
    props.step === EOnboardingWizardStep.EarningsAndLoans ||
    props.step === EOnboardingWizardStep.GoodValue ||
    props.step === EOnboardingWizardStep.NotAGoodValue;

  const state = useReportValueState(props);

  React.useEffect(() => {
    if (isOnValueSteps) {
      const nextStep = getNextStep(props);

      if (nextStep) {
        props.setNextCallback(() => async () => {
          props.setStep(nextStep);
        });
      }
    }
  }, [props.step]);

/*  React.useEffect(() => {
    if (isOnValueSteps) {
      props.setNextEnabled(!!state.selectedMajor);
    }
  }, [props.step, state.selectedMajor]);*/

  const header = {
    [EOnboardingWizardStep.MajorSelectionAndEarnings]: (
      <>
        <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
          <Heading
            size={EHeadingSize.H4}
            text={
              <span>
                Now let’s take a look at your estimated earnings post-graduation
                <br />
                for {props.college.name}.
              </span>
            }
            noColor
          />
          <Text>
            To get a more accurate estimate update your major below. You can change this later in
            your profile.
          </Text>
          <div className={'center'}>
            <FormFieldSelect
              required={false}
              value={state.selectedMajor || undefined}
              onSelect={value => state.setSelectedMajor(value)}
              className={'mw5'}
              barStyle
            >
              <option selected={true} key={-1} value={""}>
                Select a major
              </option>
              {sortBy(props.majors, m => m.name).map((m: { id: string, name: string }) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </FormFieldSelect>
          </div>
        </div>
      </>
    ),
    [EOnboardingWizardStep.EarningsAndLoans]: (
      <>
        <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexRedMuted, color: hexRed }}>
          <Heading size={EHeadingSize.H4} text={<span>Remember that loan?</span>} noColor />
          <Text>
            Now we are going to show your estimated student loan payments (principal and interest)
            and how that impacts your earnings.
          </Text>
        </div>
      </>
    ),
    [EOnboardingWizardStep.GoodValue]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{
            backgroundColor:
              props.college.valueDetermination === EValueDetermination.GoodValue
                ? hexGreenMuted
                : hexRedMuted,
            color:
              props.college.valueDetermination === EValueDetermination.GoodValue
                ? hexGreenDark
                : hexRed
          }}
        >
          <Heading size={EHeadingSize.H4} text={`${props.college.name} is`} noColor />
          <Heading
            size={EHeadingSize.H3}
            text={`${
              props.college.valueDetermination === EValueDetermination.NotGoodValue ? 'a worse value for you' : 'a better value for you'
              }`}
            noColor
          />
        </div>
      </>
    ),
    [EOnboardingWizardStep.NotAGoodValue]: (
      <>
        <div
          className={'pv3 ph4 tc'}
          style={{
            backgroundColor:
              props.college.valueDetermination === EValueDetermination.GoodValue
                ? hexGreenMuted
                : hexRedMuted,
            color:
              props.college.valueDetermination === EValueDetermination.GoodValue
                ? hexGreenDark
                : hexRed
          }}
        >
          <Heading size={EHeadingSize.H4} text={`${props.college.name} is`} noColor />
          <Heading
            size={EHeadingSize.H3}
            text={`${
              props.college.valueDetermination === EValueDetermination.NotGoodValue ? 'a worse value for you' : 'a better value for you'
              }`}
            noColor
          />
        </div>
      </>
    )
  };

  const body = {
    [EOnboardingWizardStep.MajorSelectionAndEarnings]: (
      <>
        <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
          <div style={{ flex: 1 }}>
            <Text>Your average annual earnings could be</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(props.college.averageAnnualEarningsAmount)}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexBlue }}
              />
              <Text className="dib" style={{ color: hexBlue }}>
                (per year)
              </Text>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Text>Your total 10 year earnings after graduating could be</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(
                  props.college.annualEarnings
                    .filter((earnings) => earnings.year < 10)
                    .reduce((acc, curr) => acc + curr.medianEarnings, 0)
                )}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexBlue }}
              />
            </div>
          </div>
        </div>
        <div className="mt2 mt4-ns flex justify-center w-90">
          <SingleCollegeEarningsGraph showLoanAmount={false} {...props} />
        </div>
      </>
    ),
    [EOnboardingWizardStep.EarningsAndLoans]: (
      <>
        <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
          <div style={{ flex: 1 }}>
            <Text>Your estimated annual loan payments could be</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(props.college.annualLoanPaymentAmount)}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexRed }}
              />
              <Text className="dib" style={{ color: hexRed }}>
                (per year)
              </Text>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Text>Your average annual earnings (minus loans) could be</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(
                  props.college.averageAnnualEarningsAmount - props.college.annualLoanPaymentAmount
                )}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexBlue }}
              />
              <Text className="dib" style={{ color: hexBlue }}>
                (per year)
              </Text>
            </div>
          </div>
        </div>
        <div className="mt2 mt4-ns flex justify-center w-90">
          <SingleCollegeEarningsGraph showLoanAmount={true} {...props} />
        </div>
      </>
    ),
    [EOnboardingWizardStep.GoodValue]: (
      <>
        <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
          <div style={{ flex: 1 }}>
            <Text>{props.college.name} is</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(Math.abs(props.college.valueDelta))}
                className={'mt0 mb0 dib mr2'}
              />
              <Text className="dib">
                {props.college.valueDelta >= 0 ? 'better' : 'worse'} value per year
              </Text>
              <Text>than similar schools</Text>
            </div>
          </div>
        </div>
        <div className="mv4 ph3 ph5-l">
          <GenericHorizontalBarGraph
            data={[
              {
                color: hexTeal,
                label: 'Average Earnings (minus loans) for similar schools',
                value: props.college.valueBenchmark
              },
              {
                color: hexBlue,
                label: 'Your Earnings (minus loans)',
                value:
                  props.college.averageAnnualEarningsAmount - props.college.annualLoanPaymentAmount,
              }
            ]}
          />
        </div>
      </>
    ),
    [EOnboardingWizardStep.NotAGoodValue]: (
      <>
        <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
          <div style={{ flex: 1 }}>
            <Text>{props.college.name} is</Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={formatDollarsWhole(Math.abs(props.college.valueDelta))}
                className={'mt0 mb0 dib mr2'}
              />
              <Text className="dib">
                {props.college.valueDelta >= 0 ? 'better' : 'worse'} value per year
              </Text>
              <Text>than similar schools</Text>
            </div>
          </div>
        </div>
        <div className="mv4 ph3 ph5-l">
          <GenericHorizontalBarGraph
            data={[
              {
                color: hexTeal,
                label: 'Average Earnings (minus loans) for similar schools',
                value: props.college.valueBenchmark
              },
              {
                color: hexBlue,
                label: 'Your Earnings (minus loans)',
                value:
                  props.college.averageAnnualEarningsAmount - props.college.annualLoanPaymentAmount
              }
            ]}
          />
        </div>
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
