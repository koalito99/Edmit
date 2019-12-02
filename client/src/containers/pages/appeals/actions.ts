import ModalControllerActions from './../../organisms/modal-controller/actions';
import { ActionsUnion } from '../../../lib/redux';
import AppTemplateActions from "../../templates/app/actions";

export enum ActionTypes {}

const actions = {
  // external actions
  showUploadAidLetterModal: ModalControllerActions.showUploadAidLetterModal,
  upgradeToPlus: AppTemplateActions.showPurchaseModal
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
