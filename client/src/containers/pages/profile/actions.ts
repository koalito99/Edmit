import { ActionsUnion, createAction } from '../../../lib/redux';
import AppTemplateActions from '../../templates/app/actions';
import { ISearchHighSchoolOption } from '@edmit/component-library/src/components/molecules/search-high-schools';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';

export enum ActionTypes {
  SELECT_HIGH_SCHOOL = 'PROFILE_PAGE/SELECT_HIGH_SCHOOL',
  SELECT_ZIP_CODE = 'PROFILE_PAGE/SELECT_ZIP_CODE',
  SET_SEARCH_HIGH_SCHOOL_QUERY = 'PROFILE_PAGE/SET_SEARCH_HIGH_SCHOOL_QUERY',
  SET_SEARCH_ZIP_CODE_QUERY = 'PROFILE_PAGE/SET_SEARCH_ZIP_CODE_QUERY'
}

const actions = {
  selectHighSchool: (option: ISearchHighSchoolOption) => {
    return createAction(ActionTypes.SELECT_HIGH_SCHOOL, option);
  },
  selectZipCode: (option: ISearchZipCodesOption) =>
    createAction(ActionTypes.SELECT_ZIP_CODE, option),
  setSearchHighSchoolQuery: (query: string) =>
    createAction(ActionTypes.SET_SEARCH_HIGH_SCHOOL_QUERY, query),
  setSearchZipCodeQuery: (query: string) =>
    createAction(ActionTypes.SET_SEARCH_ZIP_CODE_QUERY, query),

  // External Actions
  showPurchaseModal: AppTemplateActions.showPurchaseModal
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
