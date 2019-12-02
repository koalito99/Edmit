import { modalControllerReducerKey, IModalControllerState } from './reducer';
import { IState } from '../../../store/rootReducer';
import { IContainedModalControllerViewModel } from '.';

export const modalControllerState = (state: IState): IModalControllerState =>
  state[modalControllerReducerKey];

export const modalControllerViewModel = (state: IState): IContainedModalControllerViewModel => {
  return {
    collegeSearchOverlayShown: modalControllerState(state).collegeSearchOverlayShown,
    collegeToBeRemoved: modalControllerState(state).collegeToBeRemoved,
    compareEditModalShown: modalControllerState(state).compareEditModalShown,
    errorModal: modalControllerState(state).errorModal,
    hotlineModalShown: modalControllerState(state).hotlineModalShown,
    inviteModalShown: modalControllerState(state).inviteModalShown,
    invitedToast: modalControllerState(state).invitedToast,
    preferenceModalShown: modalControllerState(state).preferenceModalShown,
    profileCompletionModal: modalControllerState(state).profileCompletionModal,
    purchaseModal: modalControllerState(state).purchaseModal,
    purchaseToast: modalControllerState(state).purchaseToast,
    purchasedProductModal: modalControllerState(state).purchasedProductModal,
    uploadAidLetterModal: modalControllerState(state).uploadAidLetterModal,
    uploadAidLetterToastShown: modalControllerState(state).uploadAidLetterToastShown,
    onboardingCompleteModalShown: modalControllerState(state).onboardingCompleteModalShown,
    stripeCheckoutModalShown: modalControllerState(state).stripeCheckoutModalShown,
    onboardingNavAwayDialogLink: modalControllerState(state).onboardingNavAwayDialogLink,
    dismissRecommendationToastShown: modalControllerState(state).dismissRecommendationToastShown,
    edstimateModalShown: modalControllerState(state).edstimateModalShown,
    addToMyCollegesToastShown: modalControllerState(state).addToMyCollegesToastShown
  };
};
