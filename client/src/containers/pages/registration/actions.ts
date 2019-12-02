import { ERegistrationStepNew } from '../../../components/pages/registration';
import { ActionsUnion, createAction } from '../../../lib/redux';

export enum ActionTypes {
  SET_STEP = 'ONBOARDING/SET_STEP'
}

const actions = {
  setStep: (step: ERegistrationStepNew) => createAction(ActionTypes.SET_STEP, step)
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
