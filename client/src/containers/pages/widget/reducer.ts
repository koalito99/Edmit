import * as fromActions from './actions';
import { ISearchCollegeOption } from '@edmit/component-library/src/components/molecules/search-colleges';

export interface IWidgetPageState {
  searchCollege: string;
  selectedCollege: ISearchCollegeOption | null;
}

const initialState: IWidgetPageState = {
  searchCollege: '',
  selectedCollege: null
};

export const widgetPageReducer = (
  state: IWidgetPageState = initialState,
  action: fromActions.Actions
): IWidgetPageState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_SEARCH_COLLEGE_STRING:
      return {
        ...state,
        searchCollege: action.payload.query
      };
    case fromActions.ActionTypes.SELECT_COLLEGE:
      return {
        ...state,
        selectedCollege: action.payload
      };
    default:
      return state;
  }
};

export const widgetPageReducerKey = 'widgetPage';
