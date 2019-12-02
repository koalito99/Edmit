import * as fromActions from './actions';

export interface IMarketingTemplateState {
  mobileMenuShown: boolean;
}

const initialState: IMarketingTemplateState = {
  mobileMenuShown: false
};

export const marketingTemplateReducer = (
  state: IMarketingTemplateState = initialState,
  action: fromActions.Actions
): IMarketingTemplateState => {
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

export const marketingTemplateReducerKey = 'marketingTemplate';
