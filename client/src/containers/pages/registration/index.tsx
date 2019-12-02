import * as React from 'react';
import * as qs from 'query-string';
import { ERegistrationStepNew } from '../../../components/pages/registration';
import { connect } from 'react-redux';
import { onboardingPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import { nextInObj } from '@edmit/component-library/src/lib/typescript';
import ConnectedRegistrationPage from '../../../connectors/pages/registration';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { usePaywall } from '../../../hooks/paywall';
import { useAuthentication } from '../../../hooks/auth';

export interface IOnboardingPageNewWithDataViewModel {
  step: ERegistrationStepNew;
}

export type OnboardingPageNewWithDataActions = typeof actions & {};

type OnboardingPageNewWithDataProps = IOnboardingPageNewWithDataViewModel &
  OnboardingPageNewWithDataActions & {
    redirectToUrlOnRegistrationCompletion?: string;
    appCueId?: string;
    productId: string | null;
    token: string | null;
  };

const RegistrationPageWithData: React.SFC<OnboardingPageNewWithDataProps> = props => {
  const { studentId } = useStudentSwitcher();
  const paywall = usePaywall()

  const session = useAuthentication();

  const existingEmailAddress = session.emailAddress

  const existingFirstName = session.firstName

  const existingLastName = session.lastName

  const hasRegistered = !!existingEmailAddress && !!existingFirstName && !!existingLastName;

  const getStep = (s: ERegistrationStepNew, registered: boolean) => {
    if (s === ERegistrationStepNew.Registration && registered) {
      return ERegistrationStepNew.PersonTypeAndZip;
    }

    return s;
  };

  const step = getStep(props.step, hasRegistered)

  return (
    <ConnectedRegistrationPage
      {...props}
      studentId={studentId}
      activeStep={step}
      onContinue={() => {
        const nextStep = nextInObj(props.step, 1, ERegistrationStepNew);
        window.analytics.track('account_step_' + props.step + '_start', {
          step: nextStep,
          studentId
        });
        props.setStep(nextStep);
      }}
      applyProduct={() => props.token ? paywall.applyProduct({ token: props.token }) : Promise.resolve()}
      token={props.token}
      productToApply={props.productId}
      onPrevious={() => props.setStep(nextInObj(step, -1, ERegistrationStepNew))}
      onCompletedSignup={() => {
        const queryOpts = props.appCueId
          ? qs.stringify({
            appcue: props.appCueId
          })
          : null;

        window.location.href =
          (props.redirectToUrlOnRegistrationCompletion || '/my-colleges') + (queryOpts ? `?${queryOpts}` : '');
      }}
    />
  );
};

export default connect(
  onboardingPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(RegistrationPageWithData);
