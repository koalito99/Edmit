import * as React from "react";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import numeral from "numeral";

import { ICurrentStepStateInput, nextItem, OnboardingFields, previousItem } from "./index";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import {
  hexBlue,
  hexBlueMuted,
  hexGreenDark,
  hexGreenMuted,
  hexOffwhite,
  hexRed,
  hexRedMuted, hexTeal
} from "@edmit/component-library/src/components/atoms/colors";
import Text from "@edmit/component-library/src/components/atoms/typography/text";
import FormFieldSelect from "@edmit/component-library/src/components/atoms/form/form-field-select";
import EarningsAnnualGraph from "@edmit/component-library/src/components/molecules/graph/earnings-annual";
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import { UpdateProfile, UpdateProfileVariables } from "../../../graphql/generated";
import { MutationFn } from "react-apollo";
import { EValueDetermination } from '@edmit/component-library/src/shared'

export enum EValueSectionStep {
  UpdateYourMajor = 'UpdateYourMajor',
  RememberThatLoan = 'RememberThatLoan',
  IsItAGoodValueForYou = 'IsItAGoodValueForYou'
}

const valueSectionOrder = [EValueSectionStep.UpdateYourMajor, EValueSectionStep.RememberThatLoan, EValueSectionStep.IsItAGoodValueForYou];

export interface IValueSectionFields {
  majorId: string | null;
}

interface IValueSectionProps {
  college: {
    abbreviation: string;
    name: string;
    annualEarnings: Array<{
      amount: number;
      loanAmount: number;
      year: number;
    }>;
    edstimate: number;
    estimatedAnnualLoanPayments: number;

    isAGoodValue: EValueDetermination;
    valueDelta: number;
    valueBenchmark: number;
  };

  loanAmount: number;

  majors: Array<{
    id: string;
    name: string;
  }>;

  updateProfile: MutationFn<UpdateProfile, UpdateProfileVariables>;

  formikProps: FormikProps<OnboardingFields>;
  setWizardState: (stepState: ICurrentStepStateInput) => void;
}

const ValueSection: React.FC<IValueSectionProps> = props => {
  const [step, setStep] = useState(valueSectionOrder[0]);
  const [major, setMajor] = useState<string | null>(null)

  const updateMajor = (id: string) => {
    setMajor(id)
    props.updateProfile({
      variables: {
        data: {
          majorId: id
        }
      }
    })
  }

  useEffect(() => {
    props.setWizardState({
      buttons: {
        back: {
          onClick: (doDefault) => {
            if (step === EValueSectionStep.IsItAGoodValueForYou && props.loanAmount <= 0) {
              setStep(EValueSectionStep.UpdateYourMajor);
              return;
            }

            const previousStep = previousItem(step, valueSectionOrder);
            if (previousStep) {
              setStep(previousStep);
            } else {
              doDefault();
            }
          }
        },
        next: {
          onClick: async (doDefault) => {
            if (step === EValueSectionStep.UpdateYourMajor && props.loanAmount <= 0) {
              setStep(EValueSectionStep.IsItAGoodValueForYou);
              return;
            }

            const nextStep = nextItem(step, valueSectionOrder);

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

  const averageAnnualEarnings = props.college.annualEarnings.reduce((acc, curr) => acc + curr.amount, 0) / props.college.annualEarnings.length;

  return <div>
    {/* Banner */}
    <div>
      {step === EValueSectionStep.UpdateYourMajor ? <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
        <Heading size={EHeadingSize.H4}
          text={<span>Now let’s take a look at your estimated earnings post-graduation<br />
            for {props.college.name}.</span>} noColor />
        <Text>To get a more accurate estimate update your major below. You can change this later in your profile.</Text>
        <div className={"center"}>
          <FormFieldSelect required={false} value={major || undefined} onSelect={updateMajor} className={"mw5"}>
            {props.majors.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </FormFieldSelect>
        </div>
      </div> : step === EValueSectionStep.RememberThatLoan ?
          <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexRedMuted, color: hexRed }}>
            <Heading size={EHeadingSize.H4}
              text={<span>Remember that loan?</span>} noColor />
            <Text>Now we are going to show your estimated student loan payments (principal and interest) and how that impacts your earnings.</Text>
          </div> : step === EValueSectionStep.IsItAGoodValueForYou &&
          <div className={"pv3 ph4 tc"} style={{ backgroundColor: props.college.isAGoodValue === EValueDetermination.GoodValue ? hexGreenMuted : hexRedMuted, color: props.college.isAGoodValue ? hexGreenDark : hexRed }}>
            <Heading size={EHeadingSize.H4} text={`${props.college.name} is`} noColor />
            <Heading size={EHeadingSize.H3} text={`${props.college.isAGoodValue === EValueDetermination.NotGoodValue ? 'a worse value for you' : 'a better value for you'}`} noColor />
          </div>}
    </div>

    {/* Content */}
    <div>
      {step === EValueSectionStep.UpdateYourMajor ?
        <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
          <div style={{ flex: 1 }}>
            <Text>
              Your average annual earnings could be
          </Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={numeral(averageAnnualEarnings).format('$0a')}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexBlue }}
              />
              <Text className="dib" style={{ color: hexBlue }}>
                (per year)
            </Text>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Text>
              Your total 10 year earnings after graduating could be
          </Text>
            <div>
              <Heading
                size={EHeadingSize.H2}
                text={numeral(props.college.annualEarnings.reduce((acc, curr) => acc + curr.amount, 0)).format('$0a')}
                className={'mt0 mb0 dib mr2'}
                style={{ color: hexBlue }}
              />
            </div>
          </div>
        </div> :
        step === EValueSectionStep.RememberThatLoan ?
          <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
            <div style={{ flex: 1 }}>
              <Text>
                Your estimated annual loan payments could be
              </Text>
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={numeral(props.college.estimatedAnnualLoanPayments).format('$0a')}
                  className={'mt0 mb0 dib mr2'}
                  style={{ color: hexRed }}
                />
                <Text className="dib" style={{ color: hexRed }}>
                  (per year)
                </Text>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Text>
                Your average annual earnings (minus loans) could be
              </Text>
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={numeral(averageAnnualEarnings - props.college.estimatedAnnualLoanPayments).format('$0a')}
                  className={'mt0 mb0 dib mr2'}
                  style={{ color: hexBlue }}
                />
                <Text className="dib" style={{ color: hexBlue }}>
                  (per year)
                </Text>
              </div>
            </div>
          </div> : step === EValueSectionStep.IsItAGoodValueForYou &&
          <div className={'tc mt3 pv2 flex justify-center'} style={{ backgroundColor: hexOffwhite }}>
            <div style={{ flex: 1 }}>
              <Text>
                {props.college.name} is
              </Text>
              <div>
                <Heading
                  size={EHeadingSize.H2}
                  text={numeral(Math.abs(props.college.valueDelta)).format('$0a')}
                  className={'mt0 mb0 dib mr2'}
                />
                <Text className="dib">
                  {props.college.valueDelta >= 0 ? 'better' : 'worse'} value per year
                </Text>
                <Text>
                  than similar schools
                </Text>
              </div>
            </div>
          </div>
      }
      <div className="center ph5-l">
        {(step === EValueSectionStep.UpdateYourMajor || step === EValueSectionStep.RememberThatLoan) ? <div className="mt2 mt4-ns flex justify-center w-90">
          <EarningsAnnualGraph colleges={[{
            abbreviation: props.college.abbreviation,
            annualEarnings: props.college.annualEarnings
          }]}
            showLoanAmount={step === EValueSectionStep.RememberThatLoan}
            loading={false}
          />
        </div> : step === EValueSectionStep.IsItAGoodValueForYou &&
          <div className="mv4 ph3 ph5-l">
            <GenericHorizontalBarGraph
              data={[
                {
                  color: hexTeal,
                  label: 'Average Earnings (minus loans) for similar schools',
                  value: props.college.valueBenchmark,
                },
                { label: 'Your Earnings (minus loans)', value: averageAnnualEarnings - props.college.estimatedAnnualLoanPayments, color: hexBlue }
              ]}
            />
          </div>}
      </div>
    </div>
  </div>;
};

export default ValueSection;