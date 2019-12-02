import { ERegistrationStepNew } from '../../../components/pages/registration';
import * as fromActions from './actions';

export interface IOnboardingPageState {
  step: ERegistrationStepNew;
}

const initialState: IOnboardingPageState = {
  step: ERegistrationStepNew.Registration
};

export const registrationReducer = (
  state: IOnboardingPageState = initialState,
  action: fromActions.Actions
): IOnboardingPageState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_STEP:
      return {
        ...state,
        step: action.payload
      };
    default:
      return state;
  }
};

export const registrationReducerKey = 'registration';
