import { EOnboardingInvitedStep } from '../../../components/pages/onboarding-invited';
import * as fromActions from './actions';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';

export interface IOnboardingInvitedPageState {
  searchZipCode: string;
  step: EOnboardingInvitedStep;
  selectedZipCode: ISearchZipCodesOption | null;
}

const initialState: IOnboardingInvitedPageState = {
  searchZipCode: '',
  selectedZipCode: null,
  step: EOnboardingInvitedStep.Password
};

export const onboardingInvitedPageReducer = (
  state: IOnboardingInvitedPageState = initialState,
  action: fromActions.Actions
): IOnboardingInvitedPageState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_STEP:
      return {
        ...state,
        step: action.payload
      };
    case fromActions.ActionTypes.SET_SEARCH_ZIP_CODE_STRING:
      return {
        ...state,
        searchZipCode: action.payload
      };
    case fromActions.ActionTypes.SELECT_ZIP_CODE:
      return {
        ...state,
        selectedZipCode: action.payload
      };
    default:
      return state;
  }
};

export const onboardingInvitedPageReducerKey = 'onboardingInvitedPage';
