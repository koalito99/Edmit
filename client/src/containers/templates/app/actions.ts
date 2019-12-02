import { ActionsUnion, createAction } from '../../../lib/redux';
import RootActions from '../../../store/rootActions';
import ModalControllerActions from '../../organisms/modal-controller/actions';

export enum ActionTypes {
  SET_MOBILE_MENU_SHOWN = 'APP_TEMPLATE/SET_MOBILE_MENU_SHOWN'
}

const actions = {
  setMobileMenuShown: (shown: boolean) => createAction(ActionTypes.SET_MOBILE_MENU_SHOWN, shown),

  // External Actions
  setHotlineModalShown: ModalControllerActions.setHotlineModalShown,
  setInviteModalShown: ModalControllerActions.setInviteModalShown,
  setInvitedToast: ModalControllerActions.setInvitedToast,
  showProfileCompletionModal: ModalControllerActions.showProfileCompletionModal,
  showPurchaseModal: ModalControllerActions.showPurchaseModal,
  showPurchaseToast: ModalControllerActions.showPurchaseToast,
  setOnboardingNavAwayDialogShown: ModalControllerActions.setOnboardingNavAwayDialogShown,

  // Root Actions
  logout: RootActions.logout
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
