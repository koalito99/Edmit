import { ActionsUnion, createAction } from '../../../lib/redux';

export enum ActionTypes {
  SET_COLLEGE = 'HOME_EQUITY_CALCULATOR/SET_COLLEGE',
  SET_HOUSEHOLD_INCOME = 'HOME_EQUITY_CALCULATOR/SET_HOUSEHOLD_INCOME',
  SET_HOME_EQUITY_VALUE = 'HOME_EQUITY_CALCULATOR/SET_HOME_EQUITY_VALUE'
}

export const homeEquityCalculatorActions = {
  setCollege: (college: string) => createAction(ActionTypes.SET_COLLEGE, college),
  setHomeEquityValue: (homeEquityValue: number) =>
    createAction(ActionTypes.SET_HOME_EQUITY_VALUE, homeEquityValue),
  setHouseholdIncome: (householdIncome: number) =>
    createAction(ActionTypes.SET_HOUSEHOLD_INCOME, householdIncome)
};

export type HomeEquityCalculatorActions = ActionsUnion<typeof homeEquityCalculatorActions>;
