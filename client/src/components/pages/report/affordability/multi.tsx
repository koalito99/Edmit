import * as React from "react";
import { MultiReportProps, PageSection, OffWhiteSection, OneHalf, CenterNarrow } from '../shared'
import { ContributionAmountHero, useContributionAmounts, LoanEducationModule, MultiReportAffordabilityGraph } from "./shared";
import { useMultiReportSorts } from "..";
import {
  lessThanGreaterThanEqualToValue,
  formatDollarsWhole,
  formatDollarsShort,
  EAffordabilityDetermination,
} from '@edmit/component-library/src/shared'
import { conceptColor } from "@edmit/component-library/src/components/atoms/colors";
import MetricCard from "@edmit/component-library/src/components/organisms/card-metric";
import { CollegeAccordion } from "../report-accordion";
import { CollegeDetailCard } from "@edmit/component-library/src/components/organisms/college-accordion";
import FinancialPlannerGraph, { EVoidMode } from "@edmit/component-library/src/components/molecules/graph/financial-planner";
import Header from "@edmit/component-library/src/components/molecules/header";
import { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { AffordabilityAskEdmit } from "../ask-edmit-card";
import { effectivePriceCopy } from '@edmit/component-library/src/lib/price'

export const MultiAffordabilityReport: React.SFC<MultiReportProps> = (props) => {
  const contributionState = useContributionAmounts(props)
  const sorts = useMultiReportSorts(props)

  return (
    <>
      <ContributionAmountHero {...contributionState} />
      <PageSection>
        <LoanEducationModule />
      </PageSection>
      <OffWhiteSection>
        <OneHalf>
          <MetricCard
            title={`Your loan amount for ${sorts.mostAffordableCollege.name} is`}
            value={`${formatDollarsWhole(Math.abs(sorts.mostAffordableCollege.affordabilityDelta))}`}
            footer={`${lessThanGreaterThanEqualToValue(sorts.mostAffordableCollege.affordabilityDelta * -1)} your estimated first-year earnings`}
            textColor={sorts.mostAffordableCollege.affordabilityDelta >= 0 ? conceptColor.edstimate : conceptColor.loan}
            isTooltipShow={false}
          />
        </OneHalf>
        <OneHalf>
          <MetricCard
            title={`Your loan amount for ${sorts.leastAffordableCollege.name} is`}
            value={`${formatDollarsWhole(Math.abs(sorts.leastAffordableCollege.affordabilityDelta))}`}
            footer={`${lessThanGreaterThanEqualToValue(sorts.leastAffordableCollege.affordabilityDelta * -1)} your estimated first-year earnings`}
            textColor={sorts.leastAffordableCollege.affordabilityDelta >= 0 ? conceptColor.edstimate : conceptColor.loan}
            isTooltipShow={false}
          />
        </OneHalf>
        {/*<div className={"w-100 flex flex-column items-center mt2 mb3"}>
          <Text className={"i tc mh4"}>Estimate your loan payments after graduation. We will show you what you will need to borrow in federal and/or private loans.</Text>
          <RouteLink to={"/loan-report"}><Button text={"Calculate Loan Payments"} size={EButtonSize.Medium} type={EButtonType.Secondary}/></RouteLink>
        </div>*/}
      </OffWhiteSection>
      <PageSection>
        <CenterNarrow>
          <MultiReportAffordabilityGraph {...props} />
        </CenterNarrow>
      </PageSection>
      <PageSection>
        <CollegeAccordion {...props} colleges={sorts.collegesSortedByAlpha}>
          {(row) => (
            <CollegeDetailCard
              {...row}
              className={'mv2'}
              disabled={false}
              subtitle={row.college.affordabilityDetermination === EAffordabilityDetermination.Affordable ? "Affordable" : "Stretch"}
              highlighter={row.college.affordabilityDetermination === EAffordabilityDetermination.Affordable ? "green" : "red"}
            >
              <div className="ph3">
                <OffWhiteSection>
                  <OneHalf>
                    <MetricCard
                      title={effectivePriceCopy(row.college)}
                      value={formatDollarsShort(row.college.effectiveCost * 4)}
                      yearValue={'4 years'}
                      textColor={conceptColor.edstimate}
                    />
                  </OneHalf>
                  <OneHalf>
                    <MetricCard
                      title={`Loan Amount`}
                      value={formatDollarsShort(row.college.loanPrincipalAmount)}
                      textColor={conceptColor.loan}
                    />
                  </OneHalf>
                </OffWhiteSection>
                <PageSection>
                  <Header size={EHeadingSize.H4} text={`Here's how you will pay for four years at ${row.college.name}`} />
                  <FinancialPlannerGraph
                    voidMode={EVoidMode.Negative}
                    data={{
                      abbreviation: row.college.abbreviation,
                      cash: contributionState.cash * 4,
                      collegeNameFull: row.college.name,
                      edstimate: row.college.effectiveCost,
                      loans: contributionState.gaps[row.college.id],
                      otherScholarships: contributionState.otherScholarships,
                      savings: contributionState.savings,
                      workStudy: contributionState.studentWages * 4
                    }}
                    loading={false}
                  />
                </PageSection>
              </div>
            </CollegeDetailCard>
          )}
        </CollegeAccordion>
      </PageSection>
      <AffordabilityAskEdmit />
    </>
  )
}