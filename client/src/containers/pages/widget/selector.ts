import { IContainedWidgetPageViewModel } from '.';
import { IState } from '../../../store/rootReducer';
import { IWidgetPageState, widgetPageReducerKey } from './reducer';

const widgetPageState = (state: IState): IWidgetPageState => state[widgetPageReducerKey];

export const widgetPageViewModel = (state: IState): IContainedWidgetPageViewModel => ({
  searchCollege: widgetPageState(state).searchCollege,
  selectedCollege: widgetPageState(state).selectedCollege
});
