import { ActionsUnion } from '../../../lib/redux';
import AppTemplateActions from '../../templates/app/actions';
import ModalControllerActions from '../../organisms/modal-controller/actions';

export enum ActionTypes {}

const actions = {
  upgradeToPlus: AppTemplateActions.showPurchaseModal,

  // externals
  setEditActive: ModalControllerActions.setCompareEditModalShown,
  setOnboardingCompleteModalShown: ModalControllerActions.setOnboardingCompleteModalShown,
  setPreferenceActive: ModalControllerActions.showPreferenceModal,
  setDismissedRecommendationToastShown: ModalControllerActions.setDismissedRecommendationToastShown,
  showUploadAidLetterModal: ModalControllerActions.showUploadAidLetterModal
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
