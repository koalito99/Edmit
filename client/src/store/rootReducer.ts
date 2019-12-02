import {
  onboardingInvitedPageReducer,
  onboardingInvitedPageReducerKey
} from '../containers/pages/onboarding-invited/reducer';
import { widgetPageReducer, widgetPageReducerKey } from '../containers/pages/widget/reducer';
import { profilePageReducer, profilePageReducerKey } from '../containers/pages/profile/reducer';
import {
  marketingTemplateReducer,
  marketingTemplateReducerKey
} from '../containers/templates/marketing/reducer';

import {
  myCollegesPageReducer,
  myCollegesPageReducerKey
} from '../containers/pages/my-colleges/reducer';
import { combineReducers } from 'redux';
import * as fromActions from './rootActions';
import { appTemplateReducer, appTemplateReducerKey } from '../containers/templates/app/reducer';
import {
  modalControllerReducer,
  modalControllerReducerKey
} from '../containers/organisms/modal-controller/reducer';
import {
  homeEquityCalculatorReducer,
  homeEquityCalculatorPageReducerKey
} from '../containers/pages/home-equity-calculator/reducer';
import {
  sabrinabotReducer,
  sabrinabotReducerKey
} from '../containers/molecules/sabrina-bot/reducer';
import { reportPageReducer, reportPageReducerKey } from "../containers/pages/report/reducer";
import { registrationReducer, registrationReducerKey } from '../containers/pages/registration/reducer';
import { RecommendationsPageReducerKey, RecommendationsPageReducer } from '../containers/pages/recommendations/reducer';

export interface IState {
  rootState: IRootState;
}

interface IRootState { }

export default combineReducers({
  rootState: (state: IRootState = {}, action: fromActions.Actions): IRootState => {
    switch (action.type) {
      default:
        return state;
    }
  },
  [appTemplateReducerKey]: appTemplateReducer,
  [modalControllerReducerKey]: modalControllerReducer,
  [marketingTemplateReducerKey]: marketingTemplateReducer,
  [reportPageReducerKey]: reportPageReducer,
  [myCollegesPageReducerKey]: myCollegesPageReducer,
  // [onboardingPageReducerKey]: onboardingPageReducer,
  [onboardingInvitedPageReducerKey]: onboardingInvitedPageReducer,
  [profilePageReducerKey]: profilePageReducer,
  [widgetPageReducerKey]: widgetPageReducer,
  [homeEquityCalculatorPageReducerKey]: homeEquityCalculatorReducer,
  [sabrinabotReducerKey]: sabrinabotReducer,
  [registrationReducerKey]: registrationReducer,
  [RecommendationsPageReducerKey]: RecommendationsPageReducer
});
