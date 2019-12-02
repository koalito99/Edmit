import { EIconName } from '@edmit/component-library/src/components/atoms/icon'
import numeral from 'numeral'
import { Nullable, ProductId } from '../lib/models'

// FIXME: move to context?
declare global {
  interface Window { analytics: any; }
}

export enum EFinancialGrade {
  A = "A",
  AMINUS = "A-",
  BPLUS = "B+",
  B = "B",
  BMINUS = "B-",
  CPLUS = "C+",
  C = "C"
}

export function financialGradeSortIncreasing(a: EFinancialGrade | null, b: EFinancialGrade | null): number {
  const increasingOrder = [EFinancialGrade.C, EFinancialGrade.CPLUS, EFinancialGrade.BMINUS, EFinancialGrade.B, EFinancialGrade.BPLUS, EFinancialGrade.AMINUS, EFinancialGrade.A]

  return ((a !== null ?increasingOrder.indexOf(a) : -1) > (b !== null ? increasingOrder.indexOf(b) : -1)) ? 1 : -1
}

export function financialGradeSortDecreasing(a: EFinancialGrade | null, b: EFinancialGrade | null): number {
  const increasingOrder = [EFinancialGrade.C, EFinancialGrade.CPLUS, EFinancialGrade.BMINUS, EFinancialGrade.B, EFinancialGrade.BPLUS, EFinancialGrade.AMINUS, EFinancialGrade.A]

  return ((a !== null ?increasingOrder.indexOf(a) : -1) > (b !== null ? increasingOrder.indexOf(b) : -1)) ? -1 : 1
}

// NEW ENTRIES POST-CLIENT-MERGE
// - GraphQL Types
export enum EAidMeasurement {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

export enum EAidGenerosity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

export enum EAffordabilityDetermination {
  Affordable = "Affordable",
  NotAffordable = "NotAffordable",
}

export enum EValueDetermination {
  GoodValue = "GoodValue",
  NotGoodValue = "NotGoodValue",
}

export enum EPersonType {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  OTHER = 'OTHER'
}

export enum BillingPeriod {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export enum EProfileCompleteFieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  CURRENCY = 'CURRENCY'
}

// - Paywall Types

export interface IProduct {
  id: ProductId;
  name: string;
  description: string | null;
  version: ProductId;
  amount: number;
  period: BillingPeriod | null;
  organization: IOrganization | null;
}

interface IOrganization {
  logoUrl: string | null;
}

export interface IEdmitPlusStatusProps {
  hasEdmitPlus: boolean;
  organizationLogoUrl: Nullable<string>;
}
// -----

export const measureNormalizer = (input: number, base: number, xMin = -1, xMax = 1) => {
  const yMax = base + base * 0.25;
  const yMin = base - base * 0.25;

  const percent = (input - yMin) / (yMax - yMin);
  const outputX = percent * (xMax - xMin) + xMin;
  return Math.max(xMin, Math.min(xMax, outputX));
};

export const formatDollarsShort = (value: number, absoluteValue: boolean = false) => {
  let valueToUse;

  if (absoluteValue) {
    valueToUse = Math.abs(value);
  } else {
    valueToUse = value;
  }

  return numeral(valueToUse).format('$0[.]0a');
};

export const doNothingFn = () => null;

export const formatPercent = (value: number) => numeral(value).format('0[.]0%');

export const formatDollars = (value: number, absoluteValue: boolean = false) => {
  let valueToUse;

  if (absoluteValue) {
    valueToUse = Math.abs(value);
  } else {
    valueToUse = value;
  }
  return numeral(valueToUse).format('$0,0[.]00');
};

export const formatDollarsWhole = (value: number) => {
  return numeral(value).format('$0,0');
};

export const lessThanGreaterThanEqualToValue = (value: number) => {
  if (value < 0) {
    return 'less than';
  } else if (value > 0) {
    return 'greater than';
  } else {
    return 'equal to';
  }
};

export const betterWorseSame = (value: number) => {
  if (value < 0) {
    return 'worse';
  } else if (value > 0) {
    return 'better';
  } else {
    return 'same';
  }
};

export function iconForRoute(url: string): EIconName | undefined {
  switch (true) {
    case /my-colleges/.test(url):
      return EIconName.MyColleges;
    case /compare/.test(url):
      return EIconName.Compare;
    case /recommendations/.test(url):
      return EIconName.Recommendations;
    case /financial-planner/.test(url):
      return EIconName.FinancialPlanner;
    case /profile/.test(url):
      return EIconName.Profile;
    case /appeals/.test(url):
      return EIconName.Article;
    case /report/.test(url):
      return EIconName.Article;
    case /onboarding/.test(url):
      return EIconName.Place;
    default:
      return undefined;
  }
}

export enum EStage {
  Looking = 'Looking',
  Applying = 'Applying',
  Negotiating = 'Negotiating',
  PlanningForPayment = 'Planning For Payment'
}

export enum EGoal {
  Affordability = 'Affordability',
  Earnings = 'Earnings',
  Value = 'Value'
}

export enum ECollegeApplicationStatus {
  Considering = 'Considering',
  Applied = 'Applied',
  Accepted = 'Accepted',
  NotAttending = 'Not Attending',
  Attending = 'Attending'
}

export enum ECollegeStatusMyColleges {
  Added = 'Added',
  NotAdded = 'Not Added'
}

export enum ECollegeStatusCompare {
  Added = 'Added',
  NotAdded = 'Not Added'
}

export enum ECompareStatus {
  Full = 'Full',
  NotFull = 'Not Full'
}

export enum ECaretPosition {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right'
}

export interface IRequirement<T> {
  id: string;
  name: string;
}

export interface IMissingRequirement<T> extends IRequirement<T> {
  reason?: string;
}

export interface IProvidedRequirement<T> extends IRequirement<T> {
  value: T;
}

export interface IUserProvidedRequirement<T> extends IProvidedRequirement<T> {
  value: T;
  fromNode: any;
}

export interface ISystemProvidedRequirement<T> extends IProvidedRequirement<T> {
  value: T;
  fromNode?: any;
}

export interface IComputedRequirement<T> extends IRequirement<T> {
  value: T;
  computedAt: string;
  staleAt?: string;
  fromProvided: Array<IProvidedRequirement<any>>;
  recommendations: Array<IMissingRequirement<any>>;
}

export enum EWidgetType {
  Affordability = 'Affordability',
  EdstimateCostBreakdown = 'Edstimate Cost Breakdown',
  Earnings = 'Earnings'
}

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const edstimateCopy = 'Edstimate®';
export const askEdmitCopy = 'Ask Edmit®';