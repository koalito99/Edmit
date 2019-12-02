import { IState } from '../../../store/rootReducer';
import { IOnboardingPageNewWithDataViewModel } from '.';
import { IOnboardingPageState, registrationReducerKey } from './reducer';

const onboardingPageState = (state: IState): IOnboardingPageState =>
  state[registrationReducerKey];

export const onboardingPageViewModel = (state: IState): IOnboardingPageNewWithDataViewModel => ({
  step: onboardingPageState(state).step
});
