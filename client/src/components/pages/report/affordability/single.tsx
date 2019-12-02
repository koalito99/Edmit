import * as React from 'react'
import { CenterNarrow, OffWhiteSection, OneHalf, PageSection, Single, SingleReportProps } from '../shared'
import {
  AffordabilityDeterminationHero,
  ContributionAmountHero,
  LoanEducationModule,
  SingleReportAffordabilityGraph,
  useContributionAmounts,
} from './shared'
import {
  formatDollarsShort,
  formatDollarsWhole,
  lessThanGreaterThanEqualToValue,
} from '@edmit/component-library/src/shared'
import { conceptColor } from '@edmit/component-library/src/components/atoms/colors'
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric'
import { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import Header from '@edmit/component-library/src/components/molecules/header'
import FinancialPlannerGraph, { EVoidMode } from '@edmit/component-library/src/components/molecules/graph/financial-planner'
import { AffordabilityAskEdmit } from '../ask-edmit-card'
import { effectivePriceCopy } from '@edmit/component-library/src/lib/price'
import Text from "@edmit/component-library/src/components/atoms/typography/text"
import { Link as RouteLink } from "react-router-dom";
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button'

export const SingleAffordabilityReport = (props: SingleReportProps) => {
  const { college } = props
  const contributionsState = useContributionAmounts(props)

  return (
    <>
      <ContributionAmountHero {...contributionsState} />
      <LoanEducationModule />
      <OffWhiteSection>
        <OneHalf>
          <MetricCard
            title={effectivePriceCopy(college)}
            value={formatDollarsShort(college.effectiveCost * 4)}
            yearValue={'4 years'}
            textColor={conceptColor.edstimate}
          />
          <div className={"flex flex-column items-center mt2"}>
            <Text className={"i tc mh4"}>Upload your financial aid letter if you have received it so we can reflect your actual cost of attendance.</Text>
            <Button text={"Upload Aid Letter"} size={EButtonSize.Medium} type={EButtonType.Secondary} onClick={() => {
              console.log("COMPONENT UPLOAD AID LETTER")
              return props.uploadAidLetter({
                id: college.id,
                name: college.name,
                edstimate: college.edstimate,
              })
            }} />
          </div>
        </OneHalf>
        <OneHalf>
          <MetricCard
            title={`Loan Amount`}
            value={formatDollarsShort(college.loanPrincipalAmount)}
            textColor={conceptColor.loan}
          />
          <div className={"flex flex-column items-center mt2"}>
            <Text className={"i tc mh4"}>Estimate your loan payments after graduation. We will show you what you will need to borrow in federal and/or private loans.</Text>
            <RouteLink to={"/loan-report"}><Button text={"Calculate Loan Payments"} size={EButtonSize.Medium} type={EButtonType.Secondary} /></RouteLink>
          </div>
        </OneHalf>
      </OffWhiteSection>
      <PageSection>
        <Header size={EHeadingSize.H4} text={`Here's how you will pay for four years at ${college.name}`} />
        <FinancialPlannerGraph
          voidMode={EVoidMode.Negative}
          data={{
            abbreviation: college.abbreviation,
            cash: contributionsState.cash * 4,
            collegeNameFull: college.name,
            edstimate: college.effectiveCost,
            loans: contributionsState.gaps[college.id],
            otherScholarships: contributionsState.otherScholarships,
            savings: contributionsState.savings,
            workStudy: contributionsState.studentWages * 4
          }}
          loading={false}
        />
      </PageSection>
      <PageSection>
        <AffordabilityDeterminationHero {...props} />
      </PageSection>
      <OffWhiteSection>
        <Single>
          <MetricCard
            title={`Your estimated loan amount for ${college.name} is`}
            footer="your estimated first year earnings"
            value={formatDollarsWhole(Math.abs(college.affordabilityDelta))}
            yearValue={lessThanGreaterThanEqualToValue(-1 * college.affordabilityDelta)}
          />
        </Single>
      </OffWhiteSection>
      <PageSection>
        <CenterNarrow>
          <SingleReportAffordabilityGraph {...props} />
        </CenterNarrow>
      </PageSection>
      <PageSection>
        <AffordabilityAskEdmit />
      </PageSection>
    </>
  )
}