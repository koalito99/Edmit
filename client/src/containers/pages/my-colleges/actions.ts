import ModalControllerActions from './../../organisms/modal-controller/actions';
import { ActionsUnion, createAction } from '../../../lib/redux';
import AppTemplateActions from '../../templates/app/actions';

export enum ActionTypes {
  SET_SEARCH_COLLEGES_STRING = 'MY_COLLEGES_PAGE/SET_SEARCH_COLLEGES_STRING',
  SET_ACTIVE_COLLEGE = 'MY_COLLEGES_PAGE/SET_ACTIVE_COLLEGE',
  SHOW_REMOVE_COLLEGE_DIALOG = 'MY_COLLEGES_PAGE/SHOW_REMOVE_COLLEGE_DIALOG'
}

const actions = {
  setSearchCollegesString: (index: number, query: string) =>
    createAction(ActionTypes.SET_SEARCH_COLLEGES_STRING, { index, query }),
  showRemoveCollegeDialog: (colleges: Array<{ id: string; name: string }> | null) =>
    createAction(ActionTypes.SHOW_REMOVE_COLLEGE_DIALOG, colleges),

  // external actions
  setPreferenceActive: ModalControllerActions.showPreferenceModal,
  showPurchaseModal: AppTemplateActions.showPurchaseModal,
  showUploadAidLetterModal: ModalControllerActions.showUploadAidLetterModal,

  setStripeCheckoutModalShown: ModalControllerActions.setStripeCheckoutModalShown,
  showPurchasedProductModal: ModalControllerActions.showPurchasedProductModal,
  setDismissedRecommendationToastShown: ModalControllerActions.setDismissedRecommendationToastShown,
  showEdstimateModal: ModalControllerActions.showEdstimateModal,
  setCollegeAddedToastShown: ModalControllerActions.setAddedToMyCollegesToastShown
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
