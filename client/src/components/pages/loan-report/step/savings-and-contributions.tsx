import * as React from "react";
import { LoanReportNonEmptyProps, ELoanReportWizardStep } from "..";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { hexGreenMuted, hexGreenDark } from "@edmit/component-library/src/components/atoms/colors";
import { PageSection } from "../../report/shared";
import Header from "@edmit/component-library/src/components/molecules/header";
import {
  FinancialPlannerSliders,
  useContributionAmounts,
} from '../../report/affordability/shared'
import FinancialPlannerGraph, { EVoidMode } from '@edmit/component-library/src/components/molecules/graph/financial-planner'

interface ISavingsAndContributions { }

type SavingsAndContributionsProp = LoanReportNonEmptyProps & ISavingsAndContributions;

export const SavingsAndContributionsStep: React.SFC<SavingsAndContributionsProp> = (props) => {
  const contributionState = useContributionAmounts(props)

  React.useEffect(
    () => {
      if (props.step === ELoanReportWizardStep.SavingsAndContributions) {
        props.setNextEnabled(!contributionState.refetching)
        props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.LoanAmount))
      }
    },
    [props.step]
  )

  const body = {
    [ELoanReportWizardStep.SavingsAndContributions]: (
      <>
        <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }} >
          <Heading
            size={EHeadingSize.H4}
            text={`Let’s see what you'll need to borrow for your first year at ${props.college.name}.`}
            noColor
          />
          <FinancialPlannerSliders {...contributionState} />
          {/*<div className={'mv4 flex justify-between flex-wrap'}>
            <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
              <FinancialGoalDimension
                color={hexOrange}
                title={`Savings`}
                loading={false}
                // tooltipText={"Savings"}
                {...sliderProps(savings, maxSavings, setSavings, () => {
                  props.updateProfile({
                    collegeSavingsPlanAmount: {
                      value: savings
                    }
                  })
                })}
              />
            </div>
            <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
              <FinancialGoalDimension
                color={hexBlue}
                title={`Annual Cash Contributions`}
                loading={false}
                // tooltipText={"Annual Cash Contributions"}
                {...sliderProps(annualCash, maxCash, setAnnualCash, () => {
                  props.updateProfile({
                    cashContributionAmount: {
                      value: annualCash
                    }
                  })
                })}
              />
            </div>
            <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
              <FinancialGoalDimension
                color={hexYellow}
                title={`Annual Student Wages`}
                loading={false}
                // tooltipText={"Annual Student Wages"}
                {...sliderProps(annualWorkStudy, maxStudentWages, setAnnualWorkStudy, () => {
                  props.updateProfile({
                    workStudyAmount: {
                      value: annualWorkStudy
                    }
                  })
                })}
              />
            </div>
            <div className="w-25-ns w-50-m w-100 ph3-ns mv3 mt3 mt0-ns">
              <FinancialGoalDimension
                color={hexGreen}
                title={`Other Scholarships`}
                loading={false}
                // tooltipText={"Other Scholarships"}
                {...sliderProps(otherScholarships, maxOtherScholarships, setOtherScholarships, () => {
                  props.updateProfile({
                    otherScholarshipsAmount: {
                      value: otherScholarships
                    }
                  })
                })}
              />
            </div>
          </div>*/}
        </div>
        <div className={'pa3'}>
          <PageSection>
            <Header size={EHeadingSize.H4} text={`How you will afford to pay for 1 year at ${props.college.name}`} />
            <FinancialPlannerGraph
              voidMode={EVoidMode.Negative}
              data={{
                abbreviation: props.college.abbreviation,
                cash: contributionState.cash,
                collegeNameFull: props.college.name,
                edstimate: props.college.effectiveCost / 4,
                loans: contributionState.gaps[props.college.id] / 4,
                otherScholarships: contributionState.otherScholarships / 4,
                savings: contributionState.savings / 4,
                workStudy: contributionState.studentWages
              }}
              sectionLabels={{
                cash: null,
                savings: "Savings X 1 year",
                workStudy: null,
                otherScholarships: "Other Scholarships X 1 year"
              }}
              loading={false}
            />
          </PageSection>
        </div>
      </>
    )
  }

  return (
    <>
      {body[props.step]}
    </>
  )
}