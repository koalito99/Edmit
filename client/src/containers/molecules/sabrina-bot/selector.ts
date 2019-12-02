import { sabrinabotReducerKey, ISabrinabotState } from './reducer';
import { IState } from '../../../store/rootReducer';
import { IContainedSabrinaBotViewModel } from '.';

export const sabrinabotState = (state: IState): ISabrinabotState => state[sabrinabotReducerKey];

export const sabrinabotViewModel = (state: IState): IContainedSabrinaBotViewModel => {
  return {
    open: sabrinabotState(state).sabrinaBotCurrentlyOpened,
  };
};
