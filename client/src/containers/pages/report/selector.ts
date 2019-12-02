import { IState } from '../../../store/rootReducer';
import { IContainedReportPageViewModel } from '.';
import {modalControllerState} from "../../organisms/modal-controller/selector";
// import { reportPageReducerKey, IReportPageState } from './reducer';

// const reportPageState = (state: IState): IReportPageState =>
//   state[reportPageReducerKey];

export const reportPageViewModel = (state: IState): IContainedReportPageViewModel => ({
  // editActive: modalControllerState(state).compareEditModalShown,
  onboardingCompleteModalShown: modalControllerState(state).onboardingCompleteModalShown
});
