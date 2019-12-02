import * as React from "react";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import numeral from "numeral";

import { hexBlue, hexBlueMuted, hexGreen, hexGreenDark, hexGreenMuted, hexOffwhite, hexTeal } from "@edmit/component-library/src/components/atoms/colors";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import Text from "@edmit/component-library/src/components/atoms/typography/text";
import FormFieldCurrency from "@edmit/component-library/src/components/atoms/form/form-field-currency";
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import { ICurrentStepStateInput, nextItem, OnboardingFields, previousItem } from "./index";
import { MutationFn } from "react-apollo";
import { UpdateProfile, UpdateProfileVariables } from "../../../graphql/generated";
import { edstimateCopy } from "@edmit/component-library/src/shared";

export enum ECostSectionStep {
  EnterHouseholdIncome = 'EnterHouseholdIncome',
  CostsWithoutEstimate = 'CostsWithoutEstimate',
  CostsWithEstimate = 'CostsWithEstimate'
}

const costSectionOrder = [
  ECostSectionStep.EnterHouseholdIncome,
  ECostSectionStep.CostsWithoutEstimate,
  ECostSectionStep.CostsWithEstimate
];

export interface ICostSectionFields {
  householdIncome: number | null;
}

interface ICostSectionProps {
  college: {
    name: string;
    edstimate: number;
    averageCost: number;
    publishedCost: number;
  };

  updateProfile: MutationFn<UpdateProfile, UpdateProfileVariables>
  formikProps: FormikProps<OnboardingFields>;
  setWizardState: (stepState: ICurrentStepStateInput) => void;
}

const Section: React.SFC<ICostSectionProps> = props => {
  const [step, setStep] = useState(costSectionOrder[0]);

  useEffect(() => {
    props.setWizardState({
      buttons: {
        back: {
          onClick: (doDefault) => {
            const previousStep = previousItem(step, costSectionOrder);
            if (previousStep) {
              setStep(previousStep);
            } else {
              doDefault();
            }
          },
          shown: costSectionOrder.indexOf(step) > 0
        },
        next: {
          disabled: !props.formikProps.values.householdIncome,
          onClick: async (doDefault) => {
            props.updateProfile({
              variables: {
                data: {
                  householdIncome: { value: props.formikProps.values.householdIncome }
                }
              }
            });

            const nextStep = nextItem(step, costSectionOrder);

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

  return <div>
    {/* Banner */}
    <div>
      {step === ECostSectionStep.EnterHouseholdIncome ?
        <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
          <Heading size={EHeadingSize.H4}
            text={<p>Everyone pays a different price for college.<br />Let's find yours.</p>} noColor />
        </div>
        : step === ECostSectionStep.CostsWithoutEstimate ?
          <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexBlueMuted, color: hexBlue }}>
            <Heading size={EHeadingSize.H4} text={"Just so you know:"} noColor />
            <div className={"flex justify-center"}>
              <div style={{ flex: 1 }}>
                <Heading size={EHeadingSize.H4} text={"PUBLISHED COST"} noColor />
                <Text>
                  (Including room &amp; board and fees)
                  <br />
                  is the “sticker price” for college.
                  You probably won’t pay this amount.
                </Text>
              </div>
              <span />
              <div style={{ flex: 1 }}>
                <Heading size={EHeadingSize.H4} text={"AVERAGE COST"} noColor />
                <Text>
                  (Including room &amp; board and fees)
                  <br />
                  is the average price people pay. You probably won’t pay
                  this amount either.
                </Text>
              </div>
            </div>
          </div>
          : step === ECostSectionStep.CostsWithEstimate ?
            <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
              <Heading size={EHeadingSize.H4}
                text={"Concentrate on your Edstimate®, what we think a college will cost you."} noColor />
              <Text>
                The Edstimate® is specific to you, and is the price you'd be asked to pay, either with money you have available or by
              taking loans. It includes grants, scholarships, or factors like in-state reciprocity that can reduce your cost of attendance.
              </Text>
            </div>
            : <div />
      }
    </div>

    {/* Content */}
    <div>

      {step === ECostSectionStep.EnterHouseholdIncome &&
        <div className="center ph3 ph5-l mb4 flex flex-column items-center">
          <Text className={"tc"}>We assume your household income based on zip code. To get a more accurate report, update
          your household income.<br />
            It doesn’t have to be exact and you can always update this later in your profile settings.</Text>
          <div className={"mt4 w5"}>
            <FormFieldCurrency label={'Household Income'} value={props.formikProps.values.householdIncome || undefined} onChange={newValue => props.formikProps.setFieldValue("householdIncome", newValue)} required={true} />
          </div>
        </div>}

      {(step === ECostSectionStep.CostsWithoutEstimate || step === ECostSectionStep.CostsWithEstimate) && <div>
        {step === ECostSectionStep.CostsWithEstimate &&
          <div className={"tc mt3"} style={{ backgroundColor: hexOffwhite }}>
            <Text className={"mb0"}>
              Your Edstimate® for {props.college.name} is
          </Text>
            <div>
              <Heading size={EHeadingSize.H2} text={numeral(props.college.edstimate).format("$0a")}
                className={"mt0 mb0 dib mr2"} style={{ color: hexGreen }} />
              <Text className="dib" style={{ color: hexGreen }}>
                (per year)
            </Text>
            </div>
          </div>}
        <div className={"ph3 ph5-l mv4"}>
          <GenericHorizontalBarGraph data={[
            ...(step === ECostSectionStep.CostsWithEstimate ? [{
              color: hexGreen,
              label: edstimateCopy,
              value: props.college.edstimate,
            }] : []),
            {
              color: hexTeal,
              hidden: step === ECostSectionStep.CostsWithEstimate,
              label: "Average Cost",
              value: props.college.averageCost,
            },
            {
              color: hexBlue,
              hidden: step === ECostSectionStep.CostsWithEstimate,
              label: "Published Cost",
              value: props.college.publishedCost,
            }
          ]} />
        </div>
      </div>}

    </div>
  </div>;
};

export default Section;