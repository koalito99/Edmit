import * as React from 'react';
import { SingleReportProps, OffWhiteSection, Single, CenterNarrow } from '../shared';
import { CostEducationModule, SingleCollegeCostComparisonGraph } from './shared';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';
import { formatDollarsWhole } from '@edmit/component-library/src/shared';
import { conceptColor } from '@edmit/component-library/src/components/atoms/colors';
import { CostAskEdmit } from '../ask-edmit-card';
import { effectivePriceCopyInline } from '@edmit/component-library/src/lib/price';

export const SingleCostReport: React.SFC<SingleReportProps> = props => {
  const { college } = props;
  return (
    <>
      <CostEducationModule />
      <OffWhiteSection>
        <Single>
          <MetricCard
            title={`Your ${effectivePriceCopyInline(college)} for ${college.name} is`}
            value={formatDollarsWhole(college.effectiveCost)}
            yearValue={'per year'}
            textColor={conceptColor.edstimate}
          />
        </Single>
      </OffWhiteSection>
      <CenterNarrow>
        <SingleCollegeCostComparisonGraph college={college} />
      </CenterNarrow>
      <CostAskEdmit />
    </>
  );
};
