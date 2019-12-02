import { EOnboardingInvitedStep } from '../../../components/pages/onboarding-invited';
import { ActionsUnion, createAction } from '../../../lib/redux';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';

export enum ActionTypes {
  SET_SEARCH_ZIP_CODE_STRING = 'ONBOARDING_INVITED/SET_SEARCH_ZIP_CODE_STRING',
  SET_SEARCH_COLLEGES_STRING = 'ONBOARDING_INVITED/SET_SEARCH_COLLEGES_STRING',
  SET_STEP = 'ONBOARDING_INVITED/SET_STEP',
  ADD_SELECTED_COLLEGE = 'ONBOARDING_INVITED/ADD_SELECTED_COLLEGE',
  SELECT_ZIP_CODE = 'ONBOARDING_INVITED/SELECT_ZIP_CODE'
}

const actions = {
  setSearchZipCodeString: (query: string) =>
    createAction(ActionTypes.SET_SEARCH_ZIP_CODE_STRING, query),
  setSelectedZipCode: (zipCode: ISearchZipCodesOption) =>
    createAction(ActionTypes.SELECT_ZIP_CODE, zipCode),
  setStep: (step: EOnboardingInvitedStep) => createAction(ActionTypes.SET_STEP, step)
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
