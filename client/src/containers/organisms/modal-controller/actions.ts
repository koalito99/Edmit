import { ActionsUnion, createAction } from '../../../lib/redux';
import { EPurchaseProduct } from '@edmit/component-library/src/lib/payment';
import { EProfileStep } from '@edmit/component-library/src/components/organisms/modal-profile-completion';

export enum ActionTypes {
  SHOW_REMOVE_COLLEGE_DIALOG = 'MODAL_CONTROLLER/SHOW_REMOVE_COLLEGE_DIALOG',
  SHOW_ERROR_MODAL = 'MODAL_CONTROLLER/SHOW_ERROR_MODAL',
  SHOW_PURCHASE_MODAL = 'MODAL_CONTROLLER/SHOW_PURCHASE_MODAL',
  SHOW_PURCHASED_PRODUCT_MODAL = 'MODAL_CONTROLLER/SHOW_PURCHASED_PRODUCT_MODAL',
  SHOW_PROFILE_COMPLETION_MODAL = 'MODAL_CONTROLLER/SHOW_PROFILE_COMPLETION_MODAL',
  SET_PROFILE_COMPLETION_MODAL_STEP = 'MODAL_CONTAINER/SET_PROFILE_COMPLETION_MODAL_STEP',
  SET_COMPARE_EDIT_MODAL_SHOWN = 'MODAL_CONTAINER/SET_COMPARE_EDIT_MODAL_SHOWN',
  SET_INVITE_MODAL_SHOWN = 'MODAL_CONTROLLER/SET_INVITE_MODAL_SHOWN',
  SET_HOTLINE_MODAL_SHOWN = 'MODAL_CONTROLLER/SET_HOTLINE_MODAL_SHOWN',
  SHOW_PURCHASE_TOAST = 'MODAL_CONTROLLER/SHOW_PURCHASE_TOAST',
  SET_INVITED_TOAST = 'MODAL_CONTROLLER/SET_INVITED_TOAST',
  SHOW_UPLOAD_AID_LETTER_MODAL = 'MODAL_CONTROLLER/SHOW_UPLOAD_AID_LETTER_MODAL',
  SHOW_UPLOAD_AID_LETTER_TOAST = 'MODAL_CONTROLLER/SHOW_UPLOAD_AID_LETTER_TOAST',
  SHOW_COLLEGE_SEARCH_OVERLAY = 'MODAL_CONTROLLER/SHOW_COLLEGE_SEARCH_OVERLAY',
  SHOW_PREFERENCE_MODAL = 'MODAL_CONTROLLER/SHOW_PREFERENCE_MODAL',
  SET_ONBOARDING_COMPLETE_MODAL_SHOWN = 'MODAL_CONTROLLER/SET_ONBOARDING_COMPLETE_MODAL_SHOWN',
  SET_STRIPE_CHECKOUT_MODAL_SHOWN = 'MODAL_CONTROLLER/SET_STRIPE_CHECKOUT_MODAL_SHOWN',
  SET_ONBOARDING_NAV_AWAY_DIALOG_SHOWN = 'MODAL_CONTROLLER/SET_ONBOARDING_NAV_AWAY_DIALOG_SHOWN',
  SET_DISMISSED_RECOMMENDATION_TOAST_SHOWN = 'MODAL_CONTROLLER/SET_DISMISSED_RECOMMENDATION_TOAST_SHOWN',
  SHOW_EDSTIMATE_MODAL = 'MODAL_CONTROLLER/SHOW_EDSTIMATE_MODAL',
  SET_ADDED_TO_MY_COLLEGES_TOAST_SHOWN = 'MODAL_CONTROLLER/SET_ADDED_TO_MY_COLLEGES_TOAST_SHOWN'
}

const actions = {
  setCollegeSearchOverlayShown: (shown: boolean) =>
    createAction(ActionTypes.SHOW_COLLEGE_SEARCH_OVERLAY, shown),
  setCompareEditModalShown: (shown: boolean) =>
    createAction(ActionTypes.SET_COMPARE_EDIT_MODAL_SHOWN, shown),
  setHotlineModalShown: (shown: boolean) =>
    createAction(ActionTypes.SET_HOTLINE_MODAL_SHOWN, shown),
  setInviteModalShown: (shown: boolean) => createAction(ActionTypes.SET_INVITE_MODAL_SHOWN, shown),

  showErrorModal: (payload: { heading: string; body: string; closeText: string } | null) =>
    createAction(ActionTypes.SHOW_ERROR_MODAL, payload),

  setProfileCompletionModalStep: (step: EProfileStep) =>
    createAction(ActionTypes.SET_PROFILE_COMPLETION_MODAL_STEP, step),
  showProfileCompletionModal: (show: boolean) =>
    createAction(ActionTypes.SHOW_PROFILE_COMPLETION_MODAL, show),

  showPurchaseModal: (
    payload: {
      payments?: EPurchaseProduct[];
      task: string | null;
      cancelRedirect?: string;
      successRedirect?: string;
    } | null
  ) => createAction(ActionTypes.SHOW_PURCHASE_MODAL, payload),
  showPurchasedProductModal: (payload: { product: EPurchaseProduct } | null) =>
    createAction(ActionTypes.SHOW_PURCHASED_PRODUCT_MODAL, payload),

  showRemoveCollegeDialog: (college: { id: string; name: string } | null) =>
    createAction(ActionTypes.SHOW_REMOVE_COLLEGE_DIALOG, college),

  setInvitedToast: (
    invitedToast: {
      firstName: string;
    } | null
  ) => createAction(ActionTypes.SET_INVITED_TOAST, invitedToast),

  showPreferenceModal: (shown: boolean) =>
    createAction(ActionTypes.SHOW_PREFERENCE_MODAL, shown),

  showPurchaseToast: (payload: { task: string } | null) =>
    createAction(ActionTypes.SHOW_PURCHASE_TOAST, payload),

  setUploadAidLetterToastShown: (shown: boolean) =>
    createAction(ActionTypes.SHOW_UPLOAD_AID_LETTER_TOAST, shown),
  showUploadAidLetterModal: (
    college: {
      id: string;
      name: string;
      edstimate: number;
    } | null,
    redirectToUrlAfterUpload?: string
  ) => createAction(ActionTypes.SHOW_UPLOAD_AID_LETTER_MODAL, { college, redirectToUrlAfterUpload }),

  setOnboardingCompleteModalShown: (shown: boolean) => createAction(ActionTypes.SET_ONBOARDING_COMPLETE_MODAL_SHOWN, shown),

  setStripeCheckoutModalShown: (shown: boolean) => createAction(ActionTypes.SET_STRIPE_CHECKOUT_MODAL_SHOWN, shown),
  setOnboardingNavAwayDialogShown: (link: string | null) => createAction(ActionTypes.SET_ONBOARDING_NAV_AWAY_DIALOG_SHOWN, link),
  setDismissedRecommendationToastShown: (shown: boolean) => createAction(ActionTypes.SET_DISMISSED_RECOMMENDATION_TOAST_SHOWN, shown),
  showEdstimateModal: (edstimateModal: {
    collegeId: string
  } | null) => createAction(ActionTypes.SHOW_EDSTIMATE_MODAL, edstimateModal),
  setAddedToMyCollegesToastShown: (shown: boolean) => createAction(ActionTypes.SET_ADDED_TO_MY_COLLEGES_TOAST_SHOWN, shown)
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
