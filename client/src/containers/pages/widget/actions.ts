import { ActionsUnion, createAction } from '../../../lib/redux';
import { ISearchCollegeOption } from '@edmit/component-library/src/components/molecules/search-colleges';

export enum ActionTypes {
  SET_SEARCH_COLLEGE_STRING = 'WIDGET/SET_SEARCH_COLLEGE_STRING',
  SELECT_COLLEGE = 'WIDGET/SELECT_COLLEGE'
}

const actions = {
  selectCollege: (college: ISearchCollegeOption | null) =>
    createAction(ActionTypes.SELECT_COLLEGE, college),
  setSearchCollegeString: (query: string) =>
    createAction(ActionTypes.SET_SEARCH_COLLEGE_STRING, { query })
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
