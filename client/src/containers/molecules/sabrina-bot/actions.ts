import { ActionsUnion, createAction } from '../../../lib/redux';
import ModalControllerActions from '../../organisms/modal-controller/actions';

export enum ActionTypes {
  SET_SABRINA_BOT_OPENED = 'APP_TEMPLATE/SET_SABRINA_BOT_OPENED'
}

const actions = {
  setSabrinaBotOpened: (open: boolean) => createAction(ActionTypes.SET_SABRINA_BOT_OPENED, open),

  // External Actions
  showProfileCompletionModal: ModalControllerActions.showProfileCompletionModal,
  showPurchaseModal: ModalControllerActions.showPurchaseModal
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
