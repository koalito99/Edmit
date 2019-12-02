import { IState } from '../../../store/rootReducer';
import { IHomeEquityCalculatorState, homeEquityCalculatorPageReducerKey } from './reducer';
import { homeEquityCalculatorData } from './data';

const homeEquityCalculatorPageState = (state: IState): IHomeEquityCalculatorState =>
  state[homeEquityCalculatorPageReducerKey];

interface IHomeEquityCollege {
  id: string;
  name: string;
}

export type IHomeEquityCalculatorViewModel = IHomeEquityCalculatorState & {
  determinedHomeEquityAmountToIncludeInAssets: number | null;
  determinedReductionInFinancialAid: number | null;
  colleges: IHomeEquityCollege[];
};

const availableColleges = () =>
  homeEquityCalculatorData.map(college => ({
    id: college.id,
    name: college.name
  }));

const numericHouseholdIncome = (state: IHomeEquityCalculatorState) =>
  state.householdIncome === null ? null : state.householdIncome;

const numericHomeEquity = (state: IHomeEquityCalculatorState) =>
  state.homeEquityValue === null ? null : state.homeEquityValue;

const calculateReductionInFinancialAid = (state: IHomeEquityCalculatorState) => {
  const homeEquity = calculateHomeEquity(state);

  return homeEquity === null ? null : homeEquity * 0.05;
};

const calculateHomeEquity = (state: IHomeEquityCalculatorState) => {
  const selectedCollegeId = state.college;
  const householdIncome = numericHouseholdIncome(state);
  const homeEquity = numericHomeEquity(state);

  if (selectedCollegeId === null || selectedCollegeId === '') {
    return null;
  }
  if (householdIncome === null) {
    return null;
  }
  if (homeEquity === null) {
    return null;
  }

  const filteredColleges = homeEquityCalculatorData.filter(
    college => college.id === selectedCollegeId
  );

  if (filteredColleges.length !== 1) {
    throw Error('unexpected - invalid college selected');
  }

  const selectedCollege = filteredColleges[0];

  if (selectedCollege.multiplier === null) {
    return homeEquity;
  } else {
    if (selectedCollege.multiplier * householdIncome > homeEquity) {
      return homeEquity;
    } else {
      return selectedCollege.multiplier * householdIncome;
    }
  }
};

export const homeEquityCalculatorViewModel = (state: IState): IHomeEquityCalculatorViewModel => ({
  ...homeEquityCalculatorPageState(state),
  colleges: availableColleges(),
  determinedHomeEquityAmountToIncludeInAssets: calculateHomeEquity(
    homeEquityCalculatorPageState(state)
  ),
  determinedReductionInFinancialAid: calculateReductionInFinancialAid(
    homeEquityCalculatorPageState(state)
  )
});
