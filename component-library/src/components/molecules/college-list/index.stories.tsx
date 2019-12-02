import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CollegeList } from '.';
import { CollegeModel } from '../../../lib/models';
import { FinancialGrade } from '../../../../../client/src/graphql/generated';

const collegeCardContainer = {
  background: "#f6f6f6",
  height: "100%",
  width: "100%",
  minHeight: "100%",
  minWidth: "100%"
}

const staticColleges: CollegeModel[] = [
  {
    name: "Case Western Reserve University",
    abbreviation: "CWRU",
    medianEarnings: [],
    coverImageUrl: "https://storage.googleapis.com/edmit-wikipedia-scraped-college-images/FINAL_IMAGES/Caltech_Entrance.jpg",
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
          abbreviation: "OH",
          id: "state-ohio",
          name: "Ohio"
        },
      },
    },
    netEarnings: [],
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
  },
  {
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
  },
]

storiesOf('molecules/College List', module).add('Default', () => (
  <div style={collegeCardContainer} className="items-center pa5">
    <CollegeList
      colleges={staticColleges}
    />
  </div>
));