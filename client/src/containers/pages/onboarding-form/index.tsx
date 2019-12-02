import * as React from 'react';
import { connect } from 'react-redux';
import { onboardingFormPageViewModel } from './selector';
import ConnectedOnboardingFormPage from '../../../connectors/pages/onboarding-form';
import { useStudentSwitcher } from '../../../hooks/student-switcher';

export interface IOnboardingFormPageWithDataViewModel {}
type OnboardingFormPageWithDataProps = IOnboardingFormPageWithDataViewModel;

const OnboardingFormPageWithData: React.SFC<OnboardingFormPageWithDataProps> = props => {
  const { studentId } = useStudentSwitcher();

  return (
    <ConnectedOnboardingFormPage
      {...props}
      studentId={studentId}
      goToMyColleges={() => {
        window.location.href = 'my-colleges';
      }}
    />
  );
};

export default connect(onboardingFormPageViewModel)(OnboardingFormPageWithData);
