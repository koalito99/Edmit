import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CollegeCard, CardButton } from '.';
import { FinancialGrade } from '../../../../../client/src/graphql/generated';
import { FlexRowContainer, FlexItem } from '../../layout';
import Icon, { EIconName } from '../../atoms/icon';
import { EEdmitColor } from '../../../lib/colors';
import { MyCollegesCardViewReportButton } from '../../../../../client/src/testIds/ids';
import { featureIds } from '../../../shared/features';

const collegeCardContainer = {
  background: "#f6f6f6",
  height: "100%",
  width: "100%",
  minHeight: "100%",
  minWidth: "100%"
}

const staticCollege = {
  name: "Case Western Reserve University",
  abbreviation: "CWRU",
  coverImageUrl: "https://storage.googleapis.com/edmit-wikipedia-scraped-college-images/FINAL_IMAGES/Caltech_Entrance.jpg",
  medianEarnings: [],
  averageCostOfAttendance: 60000,
  debtRemaining: [],
  id: "cwru",
  costOfAttendance: {
    value: 62949
  },
  edstimate: {
    value: 24399
  },
  postalCode: {
    id: "pc",
    city: {
      id: "city-cleveland",
      name: "Cleveland",
      state: {
        id: "state-ohio",
        name: "Ohio"
      },
    },
  },
  netEarnings: [],
  features: [
    featureIds.REGION_MIDWEST,
    featureIds.TYPE_PRIVATE,
    featureIds.SIZE_10000_TO_20000
  ],
  averageAnnualEarningsAmount: {
    value: 10000
  },
  annualLoanPaymentAmount: {
    value: 100
  },
  valueBenchmark: {
    value: 200
  },
  valueDelta: {
    value: 3000
  },
  financialGrade: FinancialGrade.A
}

storiesOf('molecules/College Card', module).add('Default', () => (
  <div style={collegeCardContainer} className="items-center pa5">
    <CollegeCard
      callToAction={(
        <FlexRowContainer className="items-baseline">
          <FlexItem style={{ color: EEdmitColor.MediumGrey, cursor: "pointer" }} className="mr2">
            <Icon onClick={() => { }} name={EIconName.Delete}></Icon>
          </FlexItem>
          <FlexItem className="w-90">
            <CardButton
              testId={MyCollegesCardViewReportButton}
              text={"View Report"}
              onClick={() => { }}
            />
          </FlexItem>
        </FlexRowContainer>
      )}
      college={staticCollege}
      onRemove={() => alert("REmove college")}
      onClick={() => alert("College clicked")} />
  </div>
));