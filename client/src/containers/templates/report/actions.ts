import { ActionsUnion } from '../../../lib/redux';
import RootActions from '../../../store/rootActions';

const actions = {
  // External Actions
  logout: RootActions.logout
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
