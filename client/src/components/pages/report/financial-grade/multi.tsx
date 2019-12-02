import * as React from "react";
import { MultiReportProps, PageSection, CenterNarrow } from "../shared";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import FinancialGradeScatterplot from "@edmit/component-library/src/components/molecules/graph/financial-grade-scatterplot";
import { hexGreenMuted, hexGreenDark } from "@edmit/component-library/src/components/atoms/colors";
import { EAffordabilityDetermination, EValueDetermination } from '@edmit/component-library/src/shared'

export const MultiFinancialGradeReport: React.SFC<MultiReportProps> = (props) => {
  return (
    <>
      <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
        <Heading
          size={EHeadingSize.H4}
          text={
            <p>Now let’s put it all together!<br />
              A college’s Financial Grade is a letter grade (A, B or C) which is personalized for you based on a college’s affordability and value.</p>
          }
          noColor
        />
      </div>
      <div>
        {/* <div className={"tc mt3 pv2"} style={{ backgroundColor: hexOffwhite }}>
          <div className={"mb3"}>
            <Heading size={EHeadingSize.H4} text={
              <span>
                <span style={{ color: props.college.affordabilityDetermination === AffordabilityDetermination.Affordable ? hexGreen : hexRed }}>
                  {props.college.affordabilityDetermination === AffordabilityDetermination.Affordable ? 'Affordable' : 'Not Affordable'}
                </span>,&nbsp;
          <span style={{ color: props.college.valueDetermination === ValueDetermination.GoodValue ? hexGreen : hexRed }}>
                  {props.college.valueDetermination === ValueDetermination.GoodValue ? 'a good value' : 'not a good value'}
                </span>
                , and has a Financial Grade of <FitChip
                  admissionUnlikely={false}
                  totalFitScore={determinationsToFitScore(props.college.affordabilityDetermination, props.college.valueDetermination)}
                  loading={false}
                  size={40}
                  className={"dib ml1"}
                  style={{ transform: 'translateY(12.5px)' }}
                />
              </span>
            } className={"mt0 mb0 dib mr2"} />
          </div>
        </div> */}
        <PageSection>
          <CenterNarrow>
            <FinancialGradeScatterplot
              collegeGroups={
                props.colleges.map(
                  (college) => (
                    {
                      colleges: [{ abbreviation: college.abbreviation }],
                      isAGoodValue: college.valueDetermination === EValueDetermination.GoodValue,
                      isAffordable: college.affordabilityDetermination === EAffordabilityDetermination.Affordable,
                    }
                  )
                )
              }
              className={"db center"}
            />
          </CenterNarrow>
        </PageSection>
      </div>
    </>)
}