import { appTemplateReducerKey, IAppTemplateState } from './reducer';
import { IState } from '../../../store/rootReducer';
import { IAppTemplateWithDataViewModel } from '.';
import { modalControllerState } from '../../organisms/modal-controller/selector';

export const appTemplateState = (state: IState): IAppTemplateState => state[appTemplateReducerKey];

export const appTemplateViewModel = (state: IState): IAppTemplateWithDataViewModel => {
  return {
    compareEditActive: modalControllerState(state).compareEditModalShown,
    mobileMenuShown: appTemplateState(state).mobileMenuShown
  };
};
