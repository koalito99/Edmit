import { IState } from '../../../store/rootReducer';
import { IContainedRecommendationsPageViewModel } from '.';
import { IRecommendationsPageState, RecommendationsPageReducerKey } from './reducer';

const RecommendationsPageState = (state: IState): IRecommendationsPageState =>
  state[RecommendationsPageReducerKey];

export const RecommendationsPageViewModel = (state: IState): IContainedRecommendationsPageViewModel => ({
  removeCollegeDialogShownForColleges: RecommendationsPageState(state).removeCollegeDialogShownForColleges,
  searchColleges: RecommendationsPageState(state).searchColleges
});
