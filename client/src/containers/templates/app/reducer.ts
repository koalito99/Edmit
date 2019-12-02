import * as fromActions from './actions';

export interface IAppTemplateState {
  mobileMenuShown: boolean;
}

const initialState: IAppTemplateState = {
  mobileMenuShown: false
};

export const appTemplateReducer = (
  state: IAppTemplateState = initialState,
  action: fromActions.Actions
): IAppTemplateState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_MOBILE_MENU_SHOWN:
      return {
        ...state,
        mobileMenuShown: action.payload
      };
    default:
      return state;
  }
};

export const appTemplateReducerKey = 'appTemplate';
