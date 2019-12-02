import {
  EAffordabilityDetermination,
  ECollegeApplicationStatus,
  ECollegeStatusMyColleges,
  EFinancialGrade, EValueDetermination,
} from '../../../../shared'
import { IMyCollegesTableViewModel } from '../../../molecules/table-my-colleges'

export const dataLoadingValueGraph = [
  {
    abbreviation: 'AU',
    value: {
      computedAt: '',
      fromProvided: [],
      id: '',
      name: '',
      recommendations: [],
      value: 4
    }
  },
  {
    abbreviation: 'BU',
    value: {
      computedAt: '',
      fromProvided: [],
      id: '',
      name: '',
      recommendations: [],
      value: 7
    }
  },
  {
    abbreviation: 'CU',
    value: {
      computedAt: '',
      fromProvided: [],
      id: '',
      name: '',
      recommendations: [],
      value: 9
    }
  }
];

export const dataLoadingDivergingGraph = [
  {
    abbreviation: 'AU',
    value: 4
  },
  {
    abbreviation: 'BU',
    value: -7
  },
  {
    abbreviation: 'CU',
    value: 9
  }
];

export const dataLoadingEdstimateCostBreakdownGraph = [
  {
    label: '',
    value: 1500
  },
  {
    label: '',
    value: 8000
  },
  {
    label: '',
    value: 42000
  }
];

export const dataLoadingAffordabilityGraph = [
  {
    affordability: {
      computedAt: '',
      fromProvided: [],
      id: '',
      name: '',
      recommendations: [],
      value: 4
    },
    name: 'a'
  }
];

export const dataLoadingEarningsNetGraph = [
  {
    debtRemaining: -30000,
    medianEarnings: 75000,

    netEarnings: 45000,
    year: 0
  },
  {
    debtRemaining: -20000,
    medianEarnings: 80000,

    netEarnings: 60000,
    year: 12
  },
  {
    debtRemaining: -10000,
    medianEarnings: 85000,

    netEarnings: 75000,
    year: 24
  },
  {
    debtRemaining: -5000,
    medianEarnings: 90000,

    netEarnings: 85000,
    year: 168
  }
];

export const dataLoadingEarningsAnnualGraph = [
  {
    abbreviation: 'A',
    annualEarnings: [
      {
        debtRemaining: 0,
        medianEarnings: 70000,
        netEarnings: 0,
        year: 0
      },
      {
        debtRemaining: 0,
        medianEarnings: 80000,
        netEarnings: 0,
        year: 2
      },
      {
        debtRemaining: 0,
        medianEarnings: 90000,
        netEarnings: 0,
        year: 5
      },
      {
        debtRemaining: 0,
        medianEarnings: 100000,
        netEarnings: 0,
        year: 9
      },
      {
        debtRemaining: 0,
        medianEarnings: 100000,
        netEarnings: 0,
        year: 10
      },
      {
        debtRemaining: 0,
        medianEarnings: 105000,
        netEarnings: 0,
        year: 14
      }
    ],
    name: ''
  },
  {
    abbreviation: 'B',
    annualEarnings: [
      {
        debtRemaining: 0,
        medianEarnings: 60000,
        netEarnings: 0,
        year: 0
      },
      {
        debtRemaining: 0,
        medianEarnings: 75000,
        netEarnings: 0,
        year: 2
      },
      {
        debtRemaining: 0,
        medianEarnings: 85000,
        netEarnings: 0,
        year: 5
      },
      {
        debtRemaining: 0,
        medianEarnings: 90000,
        netEarnings: 0,
        year: 9
      },
      {
        debtRemaining: 0,
        medianEarnings: 120000,
        netEarnings: 0,
        year: 14
      }
    ],
    name: ''
  },
  {
    abbreviation: 'C',
    annualEarnings: [
      {
        debtRemaining: 0,
        medianEarnings: 85000,
        netEarnings: 0,
        year: 0
      },
      {
        debtRemaining: 0,
        medianEarnings: 90000,
        netEarnings: 0,
        year: 2
      },
      {
        debtRemaining: 0,
        medianEarnings: 95000,
        netEarnings: 0,
        year: 5
      },
      {
        debtRemaining: 0,
        medianEarnings: 100000,
        netEarnings: 0,
        year: 9
      },
      {
        debtRemaining: 0,
        medianEarnings: 100000,
        netEarnings: 0,
        year: 14
      }
    ],
    name: ''
  }
];

export const dataLoadingEarningsMidCareerGraph = [
  {
    abbreviation: 'A',
    hasMyMajor: true,
    midCareerEarnings: {
      totalActualPrice: null,
      totalEarnings: 1300000,
      totalEdstimatePrice: 247000
    },
    name: ''
  },
  {
    abbreviation: 'B',
    hasMyMajor: true,
    midCareerEarnings: {
      totalActualPrice: null,
      totalEarnings: 900000,
      totalEdstimatePrice: 256000
    },
    name: ''
  },
  {
    abbreviation: 'C',
    hasMyMajor: true,
    midCareerEarnings: {
      totalActualPrice: null,
      totalEarnings: 1100000,
      totalEdstimatePrice: 160000
    },
    name: ''
  }
];

export const dataLoadingNetPriceGraph = [
  {
    abbreviation: '',
    name: '',
    netPrice: {
      actualCostOfAttendance: null,
      costOfAttendance: 50000,
      stickerPrice: 55000
    }
  },
  {
    abbreviation: 'BU',
    name: '',
    netPrice: {
      actualCostOfAttendance: null,
      costOfAttendance: 50000,
      stickerPrice: 60000
    }
  }
];

export const dataLoadingFinancialPlannerGraph = {
  abbreviation: '',
  cash: 5000,
  collegeNameFull: '',
  costOfAttendance: 220000,
  discount: 60000,
  loans: 65000,
  savings: 75000,
  workStudy: 15000
};

export const dataLoadingFitGraph = [
  {
    dimension: 'Affordability',
    value: 1,
    weight: 33.33
  },
  {
    dimension: 'Value',
    value: 0.5,
    weight: 33.33
  },
  {
    dimension: 'Earnings',
    value: 0.75,
    weight: 33.33
  }
];

export const dataLoadingRecommendendedColleges = [
  {
    abbreviation: '',
    addedToMyColleges: false,
    admissionUnlikely: false,
    cardExpanded: false,
    cardLocked: false,
    id: '',
    location: '',
    logoSrc: null,
    name: '',
    totalFitScore: 78
  },
  {
    abbreviation: '',
    addedToMyColleges: false,
    admissionUnlikely: false,
    cardExpanded: false,
    cardLocked: false,
    id: '',
    location: '',
    logoSrc: null,
    name: '',
    totalFitScore: 98
  },
  {
    abbreviation: '',
    addedToMyColleges: false,
    admissionUnlikely: false,
    cardExpanded: false,
    cardLocked: false,
    id: '',
    location: '',
    logoSrc: null,
    name: '',
    totalFitScore: 88
  },
  {
    abbreviation: '',
    addedToMyColleges: false,
    admissionUnlikely: false,
    cardExpanded: false,
    cardLocked: false,
    id: '',
    location: '',
    logoSrc: null,
    name: '',
    totalFitScore: 93
  },
  {
    abbreviation: '',
    addedToMyColleges: false,
    admissionUnlikely: false,
    cardExpanded: false,
    cardLocked: false,
    id: '',
    location: '',
    logoSrc: null,
    name: '',
    totalFitScore: 77
  }
];

const dataLoadingMyCollege: IMyCollegesTableViewModel["colleges"][0] = {
  admissionUnlikely: true,
  aidOffer: {
    award: null
  },
  applicationStatus: ECollegeApplicationStatus.Considering,
  calculationsUseAidAward: false,
  collegeInfo: {
    collegeAbbreviation: '',
    collegeName: ''
  },
  collegeStatusMyColleges: ECollegeStatusMyColleges.Added,
  edstimate: 0,
  effectiveCost: 0,
  financialAidAward: 0,
  firstYearEarnings: 0,
  financialGrade: EFinancialGrade.A,
  hasMyMajor: true,
  id: '',
  scholarship: null,
  stickerPrice: 0,
  affordabilityDetermination: EAffordabilityDetermination.Affordable,
  valueDetermination: EValueDetermination.GoodValue
}

export const dataLoadingMyCollegesList: IMyCollegesTableViewModel["colleges"] = [0, 1, 2, 3, 4].map(() => dataLoadingMyCollege)

export const dataLoadingLoanRepaymentAnnualGraph = [
  {
    medianEarnings: 51905,
    year: 0
  },
  {
    medianEarnings: 53536,
    year: 1
  },
  {
    medianEarnings: 55166,
    year: 2
  },
  {
    medianEarnings: 58770,
    year: 3
  },
  {
    medianEarnings: 62375,
    year: 4
  },
  {
    medianEarnings: 65979,
    year: 5
  },
  {
    medianEarnings: 69583,
    year: 6
  },
  {
    medianEarnings: 73813,
    year: 7
  },
  {
    medianEarnings: 78044,
    year: 8
  },
  {
    medianEarnings: 82274,
    year: 9
  },
  {
    medianEarnings: 86504,
    year: 10
  }
];
