import { ActionsUnion } from '../../../lib/redux';

const actions = {};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
