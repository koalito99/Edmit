import * as fromActions from './actions';

export interface IHomeEquityCalculatorState {
  college: string | null;
  householdIncome: number | null;
  homeEquityValue: number | null;
}

const initialState: IHomeEquityCalculatorState = {
  college: null,
  homeEquityValue: null,
  householdIncome: null
};

export const homeEquityCalculatorReducer = (
  state: IHomeEquityCalculatorState = initialState,
  action: fromActions.HomeEquityCalculatorActions
): IHomeEquityCalculatorState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_COLLEGE:
      return {
        ...state,
        college: action.payload
      };
    case fromActions.ActionTypes.SET_HOME_EQUITY_VALUE:
      return {
        ...state,
        homeEquityValue: action.payload
      };
    case fromActions.ActionTypes.SET_HOUSEHOLD_INCOME:
      return {
        ...state,
        householdIncome: action.payload
      };
    default:
      return state;
  }
};

export const homeEquityCalculatorPageReducerKey = 'homeEquityCalculatorPage';
