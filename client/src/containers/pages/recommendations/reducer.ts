import * as fromActions from './actions';

export interface IRecommendationsPageState {
  removeCollegeDialogShownForColleges: Array<{ name: string; id: string }> | null;
  searchColleges: { [key: number]: string };
}

const initialState: IRecommendationsPageState = {
  removeCollegeDialogShownForColleges: null,
  searchColleges: {
    0: '',
    1: '',
    2: '',
    3: ''
  }
};

export const RecommendationsPageReducer = (
  state: IRecommendationsPageState = initialState,
  action: fromActions.Actions
): IRecommendationsPageState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_SEARCH_COLLEGES_STRING:
      return {
        ...state,
        searchColleges: {
          ...state.searchColleges,
          [action.payload.index]: action.payload.query
        }
      };
    case fromActions.ActionTypes.SHOW_REMOVE_COLLEGE_DIALOG:
      return {
        ...state,
        removeCollegeDialogShownForColleges: action.payload
      };
    default:
      return state;
  }
};

export const RecommendationsPageReducerKey = 'RecommendationsPage';
