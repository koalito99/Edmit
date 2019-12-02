import * as fromActions from './actions';

export interface ISabrinabotState {
  sabrinaBotCurrentlyOpened: boolean;
}

const initialState: ISabrinabotState = {
  sabrinaBotCurrentlyOpened: false
};

export const sabrinabotReducer = (
  state: ISabrinabotState = initialState,
  action: fromActions.Actions
): ISabrinabotState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_SABRINA_BOT_OPENED:
      return {
        ...state,
        sabrinaBotCurrentlyOpened: action.payload
      };
    default:
      return state;
  }
};

export const sabrinabotReducerKey = 'sabrinabot';
