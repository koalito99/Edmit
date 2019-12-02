import * as fromActions from './actions';
import { ISearchHighSchoolOption } from '@edmit/component-library/src/components/molecules/search-high-schools';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';

export interface IProfilePageState {
  searchHighSchoolQuery: string | null;
  searchZipCodeQuery: string | null;
  selectedHighSchool: ISearchHighSchoolOption | null;
  selectedZipCode: ISearchZipCodesOption | null;
}

const initialState: IProfilePageState = {
  searchHighSchoolQuery: null,
  searchZipCodeQuery: null,
  selectedHighSchool: null,
  selectedZipCode: null
};

export const profilePageReducer = (
  state: IProfilePageState = initialState,
  action: fromActions.Actions
): IProfilePageState => {
  switch (action.type) {
    case fromActions.ActionTypes.SELECT_HIGH_SCHOOL:
      return {
        ...state,
        selectedHighSchool: action.payload
      };
    case fromActions.ActionTypes.SELECT_ZIP_CODE:
      return {
        ...state,
        selectedZipCode: action.payload
      };
    case fromActions.ActionTypes.SET_SEARCH_HIGH_SCHOOL_QUERY:
      return {
        ...state,
        searchHighSchoolQuery: action.payload
      };
    case fromActions.ActionTypes.SET_SEARCH_ZIP_CODE_QUERY:
      return {
        ...state,
        searchZipCodeQuery: action.payload
      };
    default:
      return state;
  }
};

export const profilePageReducerKey = 'profilePage';
