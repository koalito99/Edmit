import * as React from "react";
import { MultiReportProps, PageSection, OffWhiteSection, OneHalf, CenterNarrow, Single } from "../shared";
import { CollegeDetailCard } from "@edmit/component-library/src/components/organisms/college-accordion";
import { CollegeAccordion } from "../report-accordion";
import MetricCard from "@edmit/component-library/src/components/organisms/card-metric";
import { EValueDetermination, formatDollarsShort } from '@edmit/component-library/src/shared'
import { conceptColor, hexGreenDark, hexBlueMuted } from "@edmit/component-library/src/components/atoms/colors";
import { ValueDeterminationHero, SingleCollegeEarningsGraph, useReportValueState, MajorSelectionHero } from "./shared";
import GenericHorizontalBarGraph from "@edmit/component-library/src/components/molecules/graph/generic-horizontal-bar";
import { useMultiReportSorts } from "..";
import { ValueAskEdmit } from "../ask-edmit-card";

export const MultiValueReport: React.SFC<MultiReportProps> = (props) => {
  const majorState = useReportValueState(props)
  const sorts = useMultiReportSorts(props)

  return (
    <>
      <MajorSelectionHero {...majorState} {...props} />
      <PageSection>
        <OffWhiteSection>
          <Single>
            <MetricCard
              title={`The best value is`}
              value={sorts.highestValueCollege.name}
              yearValue={''}
              textColor={conceptColor.edstimate}
              isTooltipShow={false}
            />
          </Single>
        </OffWhiteSection>
      </PageSection>
      <PageSection>
        <CollegeAccordion {...props} colleges={sorts.collegesSortedByAlpha}>
          {(row) => (
            <CollegeDetailCard
              {...row}
              className={'mv2'}
              disabled={false}
              subtitle={row.college.valueDetermination === EValueDetermination.GoodValue ? "better value" : "worse value"}
              highlighter={row.college.valueDetermination === EValueDetermination.GoodValue ? "green" : "red"}
            >
              <div className="pa3">
                <OffWhiteSection>
                  <OneHalf>
                    <MetricCard
                      title={`Your estimated annual loan payments will be`}
                      value={formatDollarsShort(row.college.annualLoanPaymentAmount)}
                      yearValue={'per year'}
                      textColor={conceptColor.loan}
                      className={'w-50 fl-ns'}
                      isTooltipShow={false}
                    />
                  </OneHalf>
                  <OneHalf>
                    <MetricCard
                      title={`Your average annual earnings (minus loans)`}
                      value={formatDollarsShort(row.college.averageAnnualEarningsAmount - row.college.annualLoanPaymentAmount)}
                      yearValue={'per year'}
                      textColor={conceptColor.earnings}
                      className={'w-50 fr-ns'}
                    />
                  </OneHalf>
                  {/*<div className={"w-100 flex flex-column items-center mt2 mb3"}>
                    <Text className={"i tc mh4"}>Estimate your loan payments after graduation. We will show you what you will need to borrow in federal and/or private loans.</Text>
                    <RouteLink to={"/loan-report"}><Button text={"Calculate Loan Payments"} size={EButtonSize.Medium} type={EButtonType.Secondary}/></RouteLink>
                  </div>*/}
                </OffWhiteSection>
                <PageSection>
                  <SingleCollegeEarningsGraph showLoanAmount college={row.college} />
                </PageSection>
                <PageSection>
                  <ValueDeterminationHero college={row.college} />
                </PageSection>
                <PageSection>
                  <CenterNarrow>
                    <GenericHorizontalBarGraph data={[
                      {
                        color: hexGreenDark,
                        label: "Average Earnings (Minus Loans) For Similar Schools",
                        value: row.college.valueBenchmark
                      },
                      {
                        color: hexBlueMuted,
                        label: "Your Earnings (Minus Loans)",
                        value: row.college.averageAnnualEarningsAmount - row.college.annualLoanPaymentAmount,
                      }
                    ]} />
                  </CenterNarrow>
                </PageSection>
              </div>
            </CollegeDetailCard>
          )}
        </CollegeAccordion>
      </PageSection>
      <PageSection>
        <div className="mt3">
          <ValueAskEdmit />
        </div>
      </PageSection>
    </>
  )
}