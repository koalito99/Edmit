import * as React from "react";
import { MultiReportProps, PageSection, OffWhiteSection, Single, CenterNarrow, ThreeFourthsCenterNarrow } from "../shared";
import { MultipleCostComparisonTable, CostEducationModule, MultipleCostComparisonGraph } from "./shared";
import { useMultiReportSorts } from "..";
import MetricCard from "@edmit/component-library/src/components/organisms/card-metric";
import { conceptColor } from "@edmit/component-library/src/components/atoms/colors";
import Card from "@edmit/component-library/src/components/atoms/card";
import { CostAskEdmit } from "../ask-edmit-card";

export const MultiCostReport: React.SFC<MultiReportProps> = (props) => {
  const sorts = useMultiReportSorts(props)

  return (
    <>
      <CostEducationModule />
      <PageSection>
        <OffWhiteSection>
          <Single>
            <MetricCard
              title={`Your least expensive college is`}
              value={sorts.leastExpensiveCollege.name}
              yearValue={''}
              textColor={conceptColor.edstimate}
              isTooltipShow={false}
            />
          </Single>
        </OffWhiteSection>
      </PageSection>
      <PageSection>
        <CenterNarrow>
          <MultipleCostComparisonGraph {...props} />
        </CenterNarrow>
      </PageSection>
      <PageSection>
        <ThreeFourthsCenterNarrow>
          <Card className="pa3">
            <MultipleCostComparisonTable {...props} />
          </Card>
        </ThreeFourthsCenterNarrow>
      </PageSection>
      <PageSection>
        <CostAskEdmit />
      </PageSection>
    </>
  )
}