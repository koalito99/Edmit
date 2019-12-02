import { ActionsUnion, createAction } from '../../../lib/redux';

export enum ActionTypes {
  SET_MOBILE_MENU_SHOWN = 'MARKETING_TEMPLATE/SET_MOBILE_MENU_SHOWN'
}

const actions = {
  setMobileMenuShown: (shown: boolean) => createAction(ActionTypes.SET_MOBILE_MENU_SHOWN, shown)
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
