import * as fromActions from './actions';
const initialState: {} = {};

export const reportPageReducer = (
  state: {} = initialState,
  action: fromActions.Actions
): {} => {
  switch (action.type) {
    default:
      return state;
  }
};

export const reportPageReducerKey = 'reportPage';
