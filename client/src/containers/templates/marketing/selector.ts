import { IMarketingTemplateState, marketingTemplateReducerKey } from './reducer';
import { IState } from '../../../store/rootReducer';
import { IMarketingTemplateWithDataViewModel } from '.';

const marketingTemplateState = (state: IState): IMarketingTemplateState =>
  state[marketingTemplateReducerKey];

export const marketingTemplateViewModel = (state: IState): IMarketingTemplateWithDataViewModel => {
  // TODO: add query for accountId, studentId if they aren't present in the store

  return {
    mobileMenuShown: marketingTemplateState(state).mobileMenuShown
  };
};
