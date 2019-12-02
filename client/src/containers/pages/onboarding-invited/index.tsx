import * as React from 'react';
import { connect } from 'react-redux';
import { onboardingInvitedPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import { nextInObj } from '@edmit/component-library/src/lib/typescript';
import ConnectedOnboardingInvitedPage from '../../../connectors/pages/onboarding-invited';
import { EOnboardingInvitedStep } from '../../../components/pages/onboarding-invited';
import * as PropTypes from 'prop-types';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';
import { useStudentSwitcher } from '../../../hooks/student-switcher';

export interface IOnboardingInvitedPageWithDataViewModel {
  searchZipCode: string;
  selectedZipCode: ISearchZipCodesOption | null;
  step: EOnboardingInvitedStep;
}

export type OnboardingInvitedPageWithDataActions = typeof actions & {};

type OnboardingInvitedPageWithDataProps = IOnboardingInvitedPageWithDataViewModel &
  OnboardingInvitedPageWithDataActions;

const OnboardingInvitedPageWithData: React.SFC<OnboardingInvitedPageWithDataProps> = (
  props
) => {
  const { studentId } = useStudentSwitcher();

  return (
    <ConnectedOnboardingInvitedPage
      {...props}
      studentId={studentId}
      activeStep={props.step}
      onContinue={() => {
        const nextStep = nextInObj(props.step, 1, EOnboardingInvitedStep);
        window.analytics.track('Step Started (Sign up free)', {
          step: nextStep,
          studentId
        });
        props.setStep(nextStep);
      }}
      onPrevious={() => props.setStep(nextInObj(props.step, -1, EOnboardingInvitedStep))}
      goToMyColleges={async () => {
        window.location.href = 'my-colleges';
      }}
    />
  );
};

OnboardingInvitedPageWithData.contextTypes = {
  saveAuthentication: PropTypes.func
};

export default connect(
  onboardingInvitedPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(OnboardingInvitedPageWithData);
