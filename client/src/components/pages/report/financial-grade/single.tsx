import * as React from "react";
import { SingleReportProps, PageSection, CenterNarrow } from "../shared";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { hexGreenMuted, hexGreenDark, hexOffwhite, hexGreen, hexRed } from "@edmit/component-library/src/components/atoms/colors";
import Text from "@edmit/component-library/src/components/atoms/typography/text";
import { FitChip } from "@edmit/component-library/src/components/molecules/graph/fit";
import FinancialGradeScatterplot from "@edmit/component-library/src/components/molecules/graph/financial-grade-scatterplot";
import { EAffordabilityDetermination, EValueDetermination } from '@edmit/component-library/src/shared'
// import { useFeaturesContext } from "../../../../hooks/features";
// import { useMenu } from "../../../../connectors/organisms/sidebar";
// import { MenuLocation } from "../../../../graphql/generated";

// const featuresContext = useFeaturesContext();
// const { get } = featuresContext;
// React.useEffect(
//   () => {
//     useMenu(MenuLocation.Sidebar)
//   });

export const SingleFinancialGradeReport: React.SFC<SingleReportProps> = (props) => {
  return (
    <>
      <div>
        <div className={"pv3 ph4 tc"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
          <Heading size={EHeadingSize.H4}
            text={<p>Now let’s put it all together!<br />A college’s Financial Grade is a letter grade (A, B or C) which is personalized for you based on a
                   college’s affordability and value.</p>} noColor />
        </div>
      </div>
      <div>
        <div className={"tc mt3 pv2"} style={{ backgroundColor: hexOffwhite }}>
          <Text className={"mb1"}>
            {props.college.name} is
            </Text>
          <div className={"mb3"}>
            <Heading size={EHeadingSize.H4} text={
              <span>
                <span style={{ color: props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable ? hexGreen : hexRed }}>
                  {props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable ? 'more affordable' : 'less affordable'}
                </span>,&nbsp;
            <span style={{ color: props.college.valueDetermination === EValueDetermination.GoodValue ? hexGreen : hexRed }}>
                  {props.college.valueDetermination === EValueDetermination.GoodValue ? 'a better value' : 'a worse value'}
                </span>
                , and has a Financial Grade of <FitChip
                  admissionUnlikely={false}
                  financialGrade={props.college.financialGrade}
                  loading={false}
                  size={40}
                  className={"dib ml1"}
                  style={{ transform: 'translateY(12.5px)' }}
                />
              </span>
            } className={"mt0 mb0 dib mr2"} />
          </div>
        </div>
        <PageSection>
          <CenterNarrow>
            <FinancialGradeScatterplot
              collegeGroups={[
                {
                  colleges: [{ abbreviation: props.college.abbreviation }],
                  isAGoodValue: props.college.valueDetermination === EValueDetermination.GoodValue,
                  isAffordable: props.college.affordabilityDetermination === EAffordabilityDetermination.Affordable,
                }
              ]}
              className={"db center"}
            />
          </CenterNarrow>
        </PageSection>
      </div>
    </>
  )
}