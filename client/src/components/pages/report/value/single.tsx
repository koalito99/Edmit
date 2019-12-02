import * as React from "react";
import { SingleReportProps, PageSection, OffWhiteSection, OneHalf, CenterNarrow } from "../shared";
import { ValueDeterminationHero, SingleCollegeEarningsGraph, ValueDeltaHero, MajorSelectionHero, ValueDeltaGraph } from "./shared";
import { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import Header from "@edmit/component-library/src/components/molecules/header";
import MetricCard from "@edmit/component-library/src/components/organisms/card-metric";
import { formatDollarsShort, formatPercent } from "@edmit/component-library/src/shared";
import { conceptColor } from "@edmit/component-library/src/components/atoms/colors";
import { ValueAskEdmit } from "../ask-edmit-card";

export const SingleValueReport: React.SFC<SingleReportProps> = (props) => {
  return (
    <>
      <PageSection>
        <MajorSelectionHero {...props} />
      </PageSection>
      <PageSection>
        <OffWhiteSection>
          <OneHalf>
            <MetricCard
              title={`Your estimated annual loan payments could be`}
              value={formatDollarsShort(props.college.annualLoanPaymentAmount)}
              yearValue={'per year'}
              textColor={conceptColor.loan}
              isTooltipShow={false}
              footer={props.college.annualLoanPaymentAmount > 0 ? `(assuming an interest rate of ${formatPercent(props.college.loanInterestRate)})` : ''}
            />

          </OneHalf>
          <OneHalf>
            <MetricCard
              title={`Your average annual earnings (minus loans)`}
              value={formatDollarsShort(props.college.averageAnnualEarningsAmount - props.college.annualLoanPaymentAmount)}
              yearValue={'per year'}
              textColor={conceptColor.earnings}
            />
          </OneHalf>
          {/*<div className={"w-100 flex flex-column items-center mt2 mb3"}>
            <Text className={"i tc mh4"}>Estimate your loan payments after graduation. We will show you what you will need to borrow in federal and/or private loans.</Text>
            <RouteLink to={"/loan-report"}><Button text={"Calculate Loan Payments"} size={EButtonSize.Medium} type={EButtonType.Secondary}/></RouteLink>
          </div>*/}
        </OffWhiteSection>
      </PageSection>
      <PageSection>
        <Header size={EHeadingSize.H4} text={`Annual earnings (minus loans)`} />
        <SingleCollegeEarningsGraph showLoanAmount {...props} />
      </PageSection>
      <PageSection>
        <ValueDeterminationHero {...props} />
      </PageSection>
      <PageSection>
        <ValueDeltaHero {...props} />
      </PageSection>
      <PageSection>
        <CenterNarrow>
          <ValueDeltaGraph {...props} />
        </CenterNarrow>
      </PageSection>
      <ValueAskEdmit />
    </>
  )
}