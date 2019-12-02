import { IState } from '../../../store/rootReducer';
import { IContainedMyCollegesPageViewModel } from '.';
import { IMyCollegesPageState, myCollegesPageReducerKey } from './reducer';

const myCollegesPageState = (state: IState): IMyCollegesPageState =>
  state[myCollegesPageReducerKey];

export const myCollegesPageViewModel = (state: IState): IContainedMyCollegesPageViewModel => ({
  removeCollegeDialogShownForColleges: myCollegesPageState(state).removeCollegeDialogShownForColleges,
  searchColleges: myCollegesPageState(state).searchColleges
});
