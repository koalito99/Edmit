import * as React from 'react'
import * as numeral from 'numeral'
import { graphql } from 'gatsby'
import { groupBy, isEqual, uniqWith, values } from 'lodash'

import { CollegeSectionHeader, CollegeSingleDetail } from './shared'
import Card from '@edmit/component-library/src/components/atoms/card'
import { CollegeCostBody } from './cost'
import { CollegeFinancialBody } from './financial-aid'
import { CollegeFinancialBadgeBody, CollegeScholarshipBody } from './scholarships'
import { CollegeBudgetBody } from './budget'
import { CollegeLoansBody } from './loan'
import { CollegeApplyBody, CollegeSalariesBody, CollegeSavingsBody } from './salaries'
import Layout from '../../components/layout'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed'
import { OffWhiteSection, OneHalf, PageSection, Single } from '../../atoms/sections'

interface IBadge {
  id: string;
  name: string;
  description: string;
}

interface ICTABlockViewModel {
  ctaText: string;
  ctaTo: string;

  style?: React.CSSProperties;
  className?: string;
}

type CTABlockProps = ICTABlockViewModel;

export const CTABlock: React.FC<CTABlockProps> = props => {
  return (
    <OneHalf className={"bg-green-success pl4 pr4 " + props.className} style={props.style}>
      <Heading size={EHeadingSize.H3} className={'white'} text={<span className={"lato b"} style={{ letterSpacing: ".05em" }}>{props.children}</span>} />
      <a href={props.ctaTo}><Button text={props.ctaText} size={EButtonSize.Large} type={EButtonType.Secondary} className={"mb4"} /></a>
    </OneHalf>
  )
}

interface ICTABannerViewModel {
  ctaTo: string;

  style?: React.CSSProperties;
  className?: string;
}

type CTABannerProps = ICTABannerViewModel;

export const CTABanner: React.FC<CTABannerProps> = props => {
  return (
    <OffWhiteSection className={"bg-green-success " + props.className} style={props.style}>
      <Single>
        <a href={props.ctaTo} className={"no-underline"}><Text className="white t-large tc"><span className={"lato b"} style={{ letterSpacing: ".05em" }}>{props.children} &gt;</span></Text></a>
      </Single>
    </OffWhiteSection>
  )
}

export interface FuturePrice {
  year: string
  price: number
}

export interface IncomeNetPrice {
  low: number
  high: number
  price: number
}

export interface Cost {
  type: string
  amount: number
}

export interface Salary {
  year: number
  salary: number
}

type MarkdownText = string

export enum ECollegeBadge {
  FinancialAidClarity = 'FinancialAidClarity',
  FinancialEducation = 'FinancialEducation',
  TruthInPricing = 'TruthInPricing'
}

export const nameOfBadge = (badge: ECollegeBadge): string => {
  switch (badge) {
    case ECollegeBadge.FinancialAidClarity:
      return "Financial Aid Clarity";
    case ECollegeBadge.FinancialEducation:
      return "Financial Education";
    case ECollegeBadge.TruthInPricing:
      return "Truth in Pricing";
  }
}

export const valueOfBadge = (badge: string): ECollegeBadge => {
  switch (badge) {
    case "Financial Aid Clarity":
      return ECollegeBadge.FinancialAidClarity;
    case "Financial Education":
      return ECollegeBadge.FinancialEducation;
    case "Truth in Pricing":
      return ECollegeBadge.TruthInPricing;
    default:
      throw Error(`unexpected - error - invalid badge - ${badge}`)
  }
}

export const iconForBadge = (badge: ECollegeBadge, disabled?: boolean): EDetailedIconName => {
  switch (badge) {
    case ECollegeBadge.FinancialAidClarity:
      return !disabled ? EDetailedIconName.BadgeFinancialAidClarity : EDetailedIconName.BadgeFinancialAidClarityDisabled;
    case ECollegeBadge.FinancialEducation:
      return !disabled ? EDetailedIconName.BadgeFinancialEducation : EDetailedIconName.BadgeFinancialEducationDisabled;
    case ECollegeBadge.TruthInPricing:
      return !disabled ? EDetailedIconName.BadgeTruthInPricing : EDetailedIconName.BadgeTruthInPricingDisabled;
  }
}

interface CollegeProps {
  index: number;
  image?: string
  color?: string
  name: string
  slug: string
  city: string
  state: string
  badges: IBadge[];
  heroCallToAction?: React.FunctionComponent<{}>
  costs: Cost[]
  futurePrices: FuturePrice[]
  incomeNetPrices: IncomeNetPrice[]
  payingForBlurb?: MarkdownText
  meritScholarshipsBlurb?: MarkdownText
  stickerPriceChangeValue: number
  stickerPriceChangePercentage: number
  stickerPriceChangeDirection: 'up' | 'down'
  stickerPriceChangeBaseYear: number
  netPriceChangeValue: number
  netPriceChangePercentage: number
  netPriceChangeDirection: 'up' | 'down'
  netPriceChangeBaseYear: number
  totalCostOfAttendance: number
  totalCostOfAttendanceChangeValue: number
  totalCostOfAttendanceChangePercentage: number
  totalCostOfAttendanceChangeDirection: 'up' | 'down'
  totalCostOfAttendanceChangeBaseYear: number
  averageNetPrice: number
  percentageOfFreshmenReceivingFinancialAid: number
  percentageOfUndergraduateNeedMet: number
  cssProfileRequired: boolean
  fafsaRequired: boolean
  averageMeritScholarshipValue: number
  averageLoanAmount: number
  loanRepaymentPercentage: number
  loanRepaymentFiveYearPercentage: number
  loanRepaymentSevenYearPercentage: number
  studentLoanDefaultRate: number
  averageStartingSalary: number
  salaries: Salary[]
  acceptanceRate: number
  applicationFee: number
}

const defaultHeroCallToAction: React.FunctionComponent<{}> = (props: {}) => (
  <span />
)

const meritScholarships = (name: string) => `${name} Merit Scholarships`
const commonDataSet = (name: string) => `${name} Common Data Set`
const tuitionBreakdown = (name: string) => `${name} Tuition Breakdown`
const costOptions = (name: string) => `${name} Cost Options`
const financialAidEstimates = (name: string) => `${name} Financial Aid Estimates`
const costsFAAndScholarships = (name: string) => `${name} Costs, Financial Aid and Scholarships`
const costsAndSalaries = (name: string) => `${name} Costs and Salaries`

const titles = [
  meritScholarships,
  commonDataSet,
  tuitionBreakdown,
  costOptions,
  financialAidEstimates,
  costsFAAndScholarships,
  costsAndSalaries
]

const titleForCollege = (index: number, name: string) => {
  return titles[(index % titles.length)](name)
}

const CollegeSingle: React.SFC<CollegeProps> = ({
  image = null,
  index,
  color,
  name,
  city,
  slug,
  state,
  badges,
  heroCallToAction = defaultHeroCallToAction,
  futurePrices = [],
  costs = [],
  payingForBlurb,
  meritScholarshipsBlurb,
  incomeNetPrices = [],
  stickerPriceChangeBaseYear,
  stickerPriceChangeDirection,
  stickerPriceChangePercentage,
  stickerPriceChangeValue,
  netPriceChangePercentage,
  netPriceChangeValue,
  netPriceChangeBaseYear,
  netPriceChangeDirection,
  totalCostOfAttendance,
  totalCostOfAttendanceChangeBaseYear,
  totalCostOfAttendanceChangeDirection,
  totalCostOfAttendanceChangePercentage,
  totalCostOfAttendanceChangeValue,
  averageNetPrice,
  percentageOfFreshmenReceivingFinancialAid,
  percentageOfUndergraduateNeedMet,
  cssProfileRequired,
  fafsaRequired,
  averageMeritScholarshipValue,
  averageLoanAmount,
  loanRepaymentPercentage,
  loanRepaymentFiveYearPercentage,
  loanRepaymentSevenYearPercentage,
  studentLoanDefaultRate,
  averageStartingSalary,
  salaries,
  acceptanceRate,
  applicationFee,
}) => {
  return (
    <div style={{ paddingTop: '48px' }}>
      <CollegeSingleDetail
        college={{
          name,
          location: `${city}, ${state}`,
          badges: badges.map((badge) => valueOfBadge(badge.name))
        }}
      />
      <Layout
        description={`Get data and advice about budgeting and paying for ${name}. Find out what financial aid, merit scholarships, grants, and loans are available, and see starting salaries for graduates.`}
        keywords={'Colleges'}
        canonical={`https://edmit.me/college/${slug}/`}
        title={titleForCollege(index, name)}
      >
        <span id="cost" className="db college-cost-section">
          <PageSection>
            <Card>
              <CollegeSectionHeader name={`Cost of ${name}`} />
              <div className="pa2">
                <CollegeCostBody payingForBlurb={payingForBlurb} name={name} costs={costs} totalCostOfAttendance={totalCostOfAttendance} />
              </div>

            </Card>
          </PageSection>
        </span>
        <span id="financial-aid" className="db mt2">
          <PageSection>
            <Card>
              <CollegeSectionHeader
                name={`Financial Aid for ${name}`}
              />
              <div className="pa2">
                <CollegeFinancialBody name={name} averageNetPrice={averageNetPrice} percentageOfFreshmenReceivingFinancialAid={percentageOfFreshmenReceivingFinancialAid} percentageOfUndergraduateNeedMet={percentageOfUndergraduateNeedMet} />
              </div>
            </Card>
          </PageSection>
        </span>
        <span id="scholarships" className="db mt2">
          <PageSection>
            <Card>
              <CollegeSectionHeader
                name={`Merit Scholarships for ${name}`}
              />
              <div className="pa2">
                <CollegeScholarshipBody
                  scholarshipsBlurb={meritScholarshipsBlurb}
                  name={name}
                  averageMeritScholarshipValue={averageMeritScholarshipValue}
                  averageCosts={incomeNetPrices.map((inp) => ({ incomeRange: `${currency(inp.low)}${inp.high ? `-${currency(inp.high)}` : "+"}`, amount: inp.price }))} />
              </div>
            </Card>
            {badges.map(
              (badge) => (
                <Card className="mt4">
                  <CollegeSectionHeader
                    name={`${name} wins Edmit's ${badge.name} Badge`}
                  />
                  <div className="pa2">
                    <CollegeFinancialBadgeBody badge={valueOfBadge(badge.name)} description={badge.description} />
                  </div>
                </Card>
              )
            )}
          </PageSection>
        </span>

        <span id="budget" className="db mt2">
          <PageSection>
            <Card>
              <CollegeSectionHeader name={`Budget for ${name}`} />
              <div className="pa2">
                <CollegeBudgetBody name={name} />
              </div>
            </Card>
          </PageSection>
        </span>

        <span id="loans" className="db mt2">
          <PageSection>
            <Card>
              <CollegeSectionHeader name={`Loans for ${name}`} />
              <div className="pa2">
                <CollegeLoansBody name={name} averageLoanAmount={averageLoanAmount} loanRepaymentFiveYearPercentage={loanRepaymentFiveYearPercentage} loanRepaymentSevenYearPercentage={loanRepaymentSevenYearPercentage} studentLoanDefaultRate={studentLoanDefaultRate} />
              </div>
            </Card>
          </PageSection>
        </span>

        <span id="salaries" className="db mt2">
          <PageSection>
            <Card>
              <CollegeSectionHeader
                name={`Graduate salaries for ${name}`}
              />
              <div className="pa2">
                <CollegeSalariesBody name={name} averageStartingSalary={averageStartingSalary} salaries={salaries} />
              </div>
            </Card>
            <Card className="mt4">
              <CollegeSectionHeader name={`Savings for ${name}`} />
              <div className="pa2">
                <CollegeSavingsBody name={name} stickerPriceChangePercentage={stickerPriceChangePercentage} netPriceChangePercentage={netPriceChangePercentage} futurePrices={futurePrices} />
              </div>
            </Card>
            <Card className="mt4">
              <CollegeSectionHeader name={`Applying to ${name}`} />
              <div className="pa2">
                <CollegeApplyBody name={name} applicationFee={applicationFee} acceptanceRate={acceptanceRate} />
              </div>
            </Card>
          </PageSection>
        </span>
      </Layout>
    </div>
  )
}

const CURRENT_ACADEMIC_YEAR = '2017-2018'
const RATE_OF_DEFAULT_BASE_YEAR = 3

const currencyFormat = '$0,0'
//const currencyFormat = '$0,0[.]00'
const percentageFormat = '0.0%'

const currency = (value: number) => numeral(value).format(currencyFormat)
const percentage = (value: number) =>
  numeral(value / 100).format(percentageFormat)

export const query = graphql`
  query SingleCollegePageQuery($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    graphcms {
      college(where: { slug: $slug }) {
        name
        slug
        netPricesPaid {
          incomeLow
          incomeHigh
          netPricePaid
        }
        salaries {
          yearSinceGraduation {
            year
          }
          salary
        }
        costs {
          costType {
            name
          }
          amount
          appliesInState
          appliesOutOfState
          academicYear {
            name
          }
        }
        ratesOfDefault {
          yearSinceGraduation {
            year
          }
          rate
        }
        badges {
          id
          name
          description
        }
        ratesOfRepayment {
          yearSinceGraduation {
            year
          }
          rate
        }
        city {
          name
          state {
            name
          }
        }
        meritScholarshipsSection {
          body
        }
        payingForSection {
          body
        }
        stickerPriceGrowthRate
        stickerPriceGrowthRateFromYear {
          calendarYear
        }
        netPriceGrowthRate
        netPriceGrowthRateFromYear {
          calendarYear
        }
        rateOfFreshmenReceivingAid
        rateOfNeedMetForUndergraduates
        fafsaRequired
        cssProfileRequired
        averageNetPrice
        avgMeritScholarshipForNonNeed
        averageStudentLoanAmount
        applicationFee
        acceptanceRate
        isPrivate
      }
    }
  }
`

interface IGraphQLCollegeCost {
  costType: {
    name: string
  }
  amount: number
  appliesInState: boolean
  appliesOutOfState: boolean
  academicYear: {
    name: string
  }
}

interface IGraphQLNetPricePaid {
  incomeLow: number
  incomeHigh?: number | null
  netPricePaid: number
}

interface IGraphQLCollege {
  name: string
  slug: string
  meritScholarshipsSection: {
    body: string
  } | null
  payingForSection: {
    body: string
  } | null
  netPricesPaid: IGraphQLNetPricePaid[]
  salaries: {
    yearSinceGraduation: {
      year: number
    }
    salary: number
  }[]
  costs: IGraphQLCollegeCost[]
  ratesOfDefault: {
    yearSinceGraduation: {
      year: number
    }
    rate: number
  }[]
  ratesOfRepayment: {
    yearSinceGraduation: {
      year: number
    }
    rate: number
  }[]
  city: {
    name: string
    state: {
      name: string
    }
  }
  badges: IBadge[];
  stickerPriceGrowthRate: number
  stickerPriceGrowthRateFromYear: {
    calendarYear: number
  }
  netPriceGrowthRate: number
  netPriceGrowthRateFromYear: {
    calendarYear: number
  }
  rateOfFreshmenReceivingAid: number
  rateOfNeedMetForUndergraduates: number
  fafsaRequired: boolean
  cssProfileRequired: boolean
  averageNetPrice: number
  avgMeritScholarshipForNonNeed: number
  averageStudentLoanAmount: number
  acceptanceRate: number
  applicationFee: number
  isPrivate: boolean
}

interface IGraphQLCollegeQuery {
  graphcms: {
    college: IGraphQLCollege
  }
}

const incomeNetPrices = (college: IGraphQLCollege) =>
  uniqWith(college.netPricesPaid, isEqual).map(npp => ({
    low: npp.incomeLow,
    high: npp.incomeHigh,
    price: npp.netPricePaid,
  }))

const futurePrices = (college: IGraphQLCollege) => {
  const rate = college.isPrivate ? 2.6 : 2.3

  const currentCosts = summedCosts(college, CURRENT_ACADEMIC_YEAR, false)

  const years = {
    '2020-2021': 2,
    '2021-2022': 3,
    '2022-2023': 4,
  }

  const yearList = ['2020-2021', '2021-2022', '2022-2023']

  const values = yearList.map(year => {
    return currentCosts * Math.pow(1 + rate / 100, years[year])
  })

  return [
    {
      year: yearList[0],
      price: values[0],
    },
    {
      year: yearList[1],
      price: values[1],
    },
    {
      year: yearList[2],
      price: values[2],
    },
  ]
}

const calculateStickerPriceIncreasePercentage = (
  stickerPriceIncrease: number
) => stickerPriceIncrease * 100

const direction = (value: number) => (value > 0 ? 'up' : 'down')

const absoluteValuePercentage = (value: number) => Math.abs(value * 100)

const stickerPriceChangeDirection = (college: IGraphQLCollege) =>
  direction(stickerPriceGrowthRate(college))

const stickerPriceChangeBaseYear = (college: IGraphQLCollege) => 2014

const stickerPriceGrowthRate = (college: IGraphQLCollege) => {
  const costs = {
    '2014-2015': summedCosts(college, '2014-2015', false),
    '2015-2016': summedCosts(college, '2015-2016', false),
    '2016-2017': summedCosts(college, '2016-2017', false),
  }

  const costs1 = costs['2014-2015']
  const costs2 = costs['2015-2016']
  const costs3 = costs['2016-2017']

  const growthRates = [(costs2 - costs1) / costs1, (costs3 - costs2) / costs2]

  const sumOfGrowthRates = growthRates.reduce((acc, val) => acc + val, 0)

  const averageGrowthRate = sumOfGrowthRates / growthRates.length

  return averageGrowthRate
}

const stickerPriceChangePercentage = (college: IGraphQLCollege) =>
  absoluteValuePercentage(stickerPriceGrowthRate(college))

const stickerPriceChangeValue = (college: IGraphQLCollege) => null

const netPriceChangePercentage = (college: IGraphQLCollege) =>
  absoluteValuePercentage(college.netPriceGrowthRate)

const netPriceChangeDirection = (college: IGraphQLCollege) =>
  direction(college.netPriceGrowthRate)

const netPriceChangeBaseYear = (college: IGraphQLCollege) => 2014

const netPriceChangeValue = (college: IGraphQLCollege) => null

const costName = (cost: IGraphQLCollegeCost) => {
  let costApplicability = ''
  if (cost.appliesInState && !cost.appliesOutOfState) {
    costApplicability = ' (in-state)'
  } else if (cost.appliesOutOfState && !cost.appliesInState) {
    costApplicability = ' (out-of-state)'
  }

  return `${cost.costType.name}${costApplicability}`
}

const effectiveCosts = (
  college: IGraphQLCollege,
  academicYear: string,
  includeOutOfState: boolean
) => {
  const uniques = uniqWith(college.costs, isEqual)
  return uniques
    .filter(cost => cost.academicYear.name === academicYear)
    .filter(cost => cost.costType.name !== "Other Expenses")
    .filter(
      cost =>
        cost.appliesInState ||
        (includeOutOfState ? cost.appliesOutOfState : false)
    )
    .map(cost => ({
      type: costName(cost),
      amount: cost.amount,
    }))
}

const sortedCosts = (college: IGraphQLCollege) =>
  effectiveCosts(college, CURRENT_ACADEMIC_YEAR, true).sort(
    (a, b) => b.amount - a.amount
  )

const summedCosts = (
  college: IGraphQLCollege,
  academicYear,
  includeOutOfState: boolean
) =>
  effectiveCosts(college, academicYear, includeOutOfState)
    .map(cost => cost.amount)
    .reduce((acc, value) => acc + value, 0)

const totalCostOfAttendance = (college: IGraphQLCollege) =>
  summedCosts(college, CURRENT_ACADEMIC_YEAR, false)

const averageNetPrice = (college: IGraphQLCollege) => college.averageNetPrice

const percentageOfFreshmenReceivingFinancialAid = (college: IGraphQLCollege) =>
  absoluteValuePercentage(college.rateOfFreshmenReceivingAid)

const percentageOfUndergraduateNeedMet = (college: IGraphQLCollege) =>
  absoluteValuePercentage(college.rateOfNeedMetForUndergraduates)

const cssProfileRequired = (college: IGraphQLCollege) =>
  college.cssProfileRequired

const fafsaRequired = (college: IGraphQLCollege) => college.fafsaRequired

const averageMeritScholarshipValue = (college: IGraphQLCollege) =>
  college.avgMeritScholarshipForNonNeed

const averageLoanAmount = (college: IGraphQLCollege) =>
  college.averageStudentLoanAmount

const loanRepaymentPercentage = (college: IGraphQLCollege) =>
  loanRepaymentSevenYearPercentage(college)

const loanRepaymentFiveYearPercentage = (college: IGraphQLCollege) => {
  const fiveYearRate = uniqWith(college.ratesOfRepayment, isEqual).filter(
    rop => rop.yearSinceGraduation.year === 5
  )[0]

  if (fiveYearRate) {
    return absoluteValuePercentage(fiveYearRate.rate)
  }

  return null
}

const loanRepaymentSevenYearPercentage = (college: IGraphQLCollege) => {
  const yearSevenRepaymentRate = uniqWith(
    college.ratesOfRepayment,
    isEqual
  ).filter(rop => rop.yearSinceGraduation.year === 7)[0]

  if (yearSevenRepaymentRate) {
    return absoluteValuePercentage(yearSevenRepaymentRate.rate)
  }

  return null
}

const studentLoanDefaultRate = (college: IGraphQLCollege) => {
  const defaultRate = uniqWith(college.ratesOfDefault, isEqual).filter(
    rod => rod.yearSinceGraduation.year === RATE_OF_DEFAULT_BASE_YEAR
  )[0]

  if (defaultRate) {
    return absoluteValuePercentage(defaultRate.rate)
  }
  return null
}

const scholarshipsBlurb = (college: IGraphQLCollege) =>
  college.meritScholarshipsSection && college.meritScholarshipsSection.body

const payingForBlurb = (college: IGraphQLCollege) =>
  college.payingForSection && college.payingForSection.body

const salaries = (college: IGraphQLCollege) =>
  values(
    groupBy(
      uniqWith(college.salaries, isEqual),
      salary => salary.yearSinceGraduation.year
    )
  ).map((salary: any) => ({
    year: salary[0].yearSinceGraduation.year,
    salary: salary[0].salary,
  }))

const averageStartingSalary = (college: IGraphQLCollege) => {
  const first = uniqWith(college.salaries, isEqual).filter(
    salary => salary.yearSinceGraduation.year === 0
  )[0]

  if (first) return first.salary

  return undefined
}

const acceptanceRate = (college: IGraphQLCollege) =>
  college.acceptanceRate * 100

const applicationFee = (college: IGraphQLCollege) => college.applicationFee

const ConnectedCollege = (props: { pageContext: { index: number }, data: IGraphQLCollegeQuery }) => {
  const college = props.data.graphcms.college

  return (
    <CollegeSingle
      index={props.pageContext.index}
      name={college.name}
      slug={college.slug}
      city={college.city.name}
      state={college.city.state.name}
      costs={sortedCosts(college)}
      futurePrices={futurePrices(college)}
      incomeNetPrices={incomeNetPrices(college)}
      stickerPriceChangeBaseYear={stickerPriceChangeBaseYear(college)}
      stickerPriceChangeDirection={stickerPriceChangeDirection(college)}
      stickerPriceChangePercentage={stickerPriceChangePercentage(college)}
      stickerPriceChangeValue={stickerPriceChangeValue(college)}
      netPriceChangePercentage={netPriceChangePercentage(college)}
      netPriceChangeValue={netPriceChangeValue(college)}
      netPriceChangeBaseYear={netPriceChangeBaseYear(college)}
      netPriceChangeDirection={netPriceChangeDirection(college)}
      totalCostOfAttendance={totalCostOfAttendance(college)}
      totalCostOfAttendanceChangeBaseYear={stickerPriceChangeBaseYear(college)}
      totalCostOfAttendanceChangeDirection={stickerPriceChangeDirection(
        college
      )}
      totalCostOfAttendanceChangePercentage={stickerPriceChangePercentage(
        college
      )}
      totalCostOfAttendanceChangeValue={stickerPriceChangeValue(college)}
      averageNetPrice={averageNetPrice(college)}
      percentageOfFreshmenReceivingFinancialAid={percentageOfFreshmenReceivingFinancialAid(
        college
      )}
      percentageOfUndergraduateNeedMet={percentageOfUndergraduateNeedMet(
        college
      )}
      cssProfileRequired={cssProfileRequired(college)}
      fafsaRequired={fafsaRequired(college)}
      averageMeritScholarshipValue={averageMeritScholarshipValue(college)}
      averageLoanAmount={averageLoanAmount(college)}
      loanRepaymentPercentage={loanRepaymentPercentage(college)}
      badges={college.badges}
      loanRepaymentFiveYearPercentage={loanRepaymentFiveYearPercentage(college)}
      loanRepaymentSevenYearPercentage={loanRepaymentSevenYearPercentage(
        college
      )}
      studentLoanDefaultRate={studentLoanDefaultRate(college)}
      meritScholarshipsBlurb={scholarshipsBlurb(college)}
      payingForBlurb={payingForBlurb(college)}
      salaries={salaries(college)}
      averageStartingSalary={averageStartingSalary(college)}
      acceptanceRate={acceptanceRate(college)}
      applicationFee={applicationFee(college)}
    />
  )
}

export default ConnectedCollege
