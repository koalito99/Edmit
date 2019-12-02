import * as fromActions from './actions';
import { EPurchaseProduct } from '@edmit/component-library/src/lib/payment';
import { EProfileStep } from '@edmit/component-library/src/components/organisms/modal-profile-completion';

export interface IModalControllerState {
  collegeSearchOverlayShown: boolean;
  compareEditModalShown: boolean;
  hotlineModalShown: boolean;
  collegeToBeRemoved: { id: string; name: string } | null;
  purchaseModal: {
    payments: EPurchaseProduct[];
    task: string | null;
    cancelRedirect?: string;
    successRedirect?: string;
  } | null;
  purchasedProductModal: {
    product: EPurchaseProduct;
  } | null;
  errorModal: {
    heading: string;
    body: string;
    closeText: string;
  } | null;
  dismissRecommendationModal: {
    reasons: Array<{
      title: string;
    }>;
  } | null;
  inviteModalShown: boolean;
  invitedToast: {
    firstName: string;
  } | null;
  profileCompletionModal: {
    step: EProfileStep;
  } | null;
  preferenceModalShown: boolean;
  purchaseToast: {
    task: string;
  } | null;
  uploadAidLetterModal: {
    college: {
      id: string;
      name: string;
      edstimate: number;
    };
    redirectToUrlAfterUpload?: string;
  } | null;
  uploadAidLetterToastShown: boolean;

  onboardingCompleteModalShown: boolean;
  stripeCheckoutModalShown: boolean;
  onboardingNavAwayDialogLink: string | null;
  dismissRecommendationToastShown: boolean;
  edstimateModalShown: {
    collegeId: string
  } | null;
  addToMyCollegesToastShown: boolean;
}

const initialState: IModalControllerState = {
  collegeSearchOverlayShown: false,
  collegeToBeRemoved: null,
  compareEditModalShown: false,
  dismissRecommendationModal: null,
  errorModal: null,
  hotlineModalShown: false,
  inviteModalShown: false,
  invitedToast: null,
  preferenceModalShown: false,
  profileCompletionModal: null,
  purchaseModal: null,
  purchaseToast: null,
  purchasedProductModal: null,
  uploadAidLetterModal: null,
  uploadAidLetterToastShown: false,

  onboardingCompleteModalShown: false,
  stripeCheckoutModalShown: false,
  onboardingNavAwayDialogLink: null,
  dismissRecommendationToastShown: false,
  edstimateModalShown: null,
  addToMyCollegesToastShown: false
};

export const modalControllerReducer = (
  state: IModalControllerState = initialState,
  action: fromActions.Actions
): IModalControllerState => {
  switch (action.type) {
    case fromActions.ActionTypes.SHOW_COLLEGE_SEARCH_OVERLAY:
      action.payload = !state.collegeSearchOverlayShown;
      return {
        ...state,
        collegeSearchOverlayShown: action.payload
      };
    case fromActions.ActionTypes.SET_COMPARE_EDIT_MODAL_SHOWN:
      return {
        ...state,
        compareEditModalShown: action.payload
      };
    case fromActions.ActionTypes.SET_INVITE_MODAL_SHOWN:
      return {
        ...state,
        inviteModalShown: action.payload
      };
    case fromActions.ActionTypes.SHOW_REMOVE_COLLEGE_DIALOG:
      return {
        ...state,
        collegeToBeRemoved: action.payload
      };
    case fromActions.ActionTypes.SHOW_ERROR_MODAL:
      return {
        ...state,
        errorModal: action.payload
      };
    case fromActions.ActionTypes.SHOW_PROFILE_COMPLETION_MODAL:
      return {
        ...state,
        profileCompletionModal: action.payload
          ? {
            step: EProfileStep.HighSchool
          }
          : null
      };
    case fromActions.ActionTypes.SET_PROFILE_COMPLETION_MODAL_STEP:
      return {
        ...state,
        profileCompletionModal: {
          step: action.payload
        }
      };
    case fromActions.ActionTypes.SHOW_PURCHASE_MODAL:
      return {
        ...state,
        purchaseModal: action.payload
          ? {
            payments: [EPurchaseProduct.PLUS_ANNUAL /*, EPurchaseModalProduct.PREMIUM*/],
            ...action.payload
          }
          : null
      };
    case fromActions.ActionTypes.SHOW_PURCHASED_PRODUCT_MODAL:
      return {
        ...state,
        purchasedProductModal: action.payload
      };
    case fromActions.ActionTypes.SET_HOTLINE_MODAL_SHOWN:
      return {
        ...state,
        hotlineModalShown: action.payload
      };

    // toasts

    case fromActions.ActionTypes.SET_INVITED_TOAST:
      return {
        ...state,
        invitedToast: action.payload
      };
    case fromActions.ActionTypes.SHOW_PURCHASE_TOAST:
      return {
        ...state,
        purchaseToast: action.payload
      };
    case fromActions.ActionTypes.SHOW_UPLOAD_AID_LETTER_MODAL:
      return {
        ...state,
        uploadAidLetterModal: action.payload.college
          ? {
            college: action.payload.college,
            redirectToUrlAfterUpload: action.payload.redirectToUrlAfterUpload
          }
          : null
      };
    case fromActions.ActionTypes.SHOW_UPLOAD_AID_LETTER_TOAST:
      return {
        ...state,
        uploadAidLetterToastShown: action.payload
      };
    case fromActions.ActionTypes.SHOW_PREFERENCE_MODAL:
      return {
        ...state,
        preferenceModalShown: action.payload
      };
    case fromActions.ActionTypes.SET_ONBOARDING_COMPLETE_MODAL_SHOWN:
      return {
        ...state,
        onboardingCompleteModalShown: action.payload
      };
    case fromActions.ActionTypes.SET_STRIPE_CHECKOUT_MODAL_SHOWN:
      return {
        ...state,
        stripeCheckoutModalShown: action.payload
      };
    case fromActions.ActionTypes.SET_ONBOARDING_NAV_AWAY_DIALOG_SHOWN:
      return {
        ...state,
        onboardingNavAwayDialogLink: action.payload
      };
    case fromActions.ActionTypes.SET_DISMISSED_RECOMMENDATION_TOAST_SHOWN:
      return {
        ...state,
        dismissRecommendationToastShown: action.payload
      };
    case fromActions.ActionTypes.SHOW_EDSTIMATE_MODAL:
      return {
        ...state,
        edstimateModalShown: action.payload
      };
    case fromActions.ActionTypes.SET_ADDED_TO_MY_COLLEGES_TOAST_SHOWN:
      return {
        ...state,
        addToMyCollegesToastShown: action.payload
      }
    default:
      return state;
  }
};

export const modalControllerReducerKey = 'modalController';
