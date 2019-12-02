import * as fromActions from './actions';

export interface IMyCollegesPageState {
  removeCollegeDialogShownForColleges: Array<{ name: string; id: string }> | null;
  searchColleges: { [key: number]: string };
}

const initialState: IMyCollegesPageState = {
  removeCollegeDialogShownForColleges: null,
  searchColleges: {
    0: '',
    1: '',
    2: '',
    3: ''
  }
};

export const myCollegesPageReducer = (
  state: IMyCollegesPageState = initialState,
  action: fromActions.Actions
): IMyCollegesPageState => {
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

export const myCollegesPageReducerKey = 'myCollegesPage';
