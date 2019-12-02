import { IState } from '../../../store/rootReducer';
import { IOnboardingInvitedPageWithDataViewModel } from '.';
import { IOnboardingInvitedPageState, onboardingInvitedPageReducerKey } from './reducer';

const onboardingInvitedPageState = (state: IState): IOnboardingInvitedPageState =>
  state[onboardingInvitedPageReducerKey];

export const onboardingInvitedPageViewModel = (
  state: IState
): IOnboardingInvitedPageWithDataViewModel => ({
  searchZipCode: onboardingInvitedPageState(state).searchZipCode,
  selectedZipCode: onboardingInvitedPageState(state).selectedZipCode,
  step: onboardingInvitedPageState(state).step
});
