import * as React from 'react';
import { OnboardingWithData, Onboarding } from '../../../components/pages/onboarding';
import { connect } from 'react-redux';
import { reportPageViewModel } from '../report/selector';
import { useStudentSwitcher } from '../../../hooks/student-switcher';

export interface IContainedOnboardingPageViewModel {
  studentId: string;
}

type ContainedOnboardingPageProps = IContainedOnboardingPageViewModel;

const ContainedOnboardingPage: React.SFC<ContainedOnboardingPageProps> = props => {
  const { studentId } = useStudentSwitcher();

  return (
    <OnboardingWithData studentId={studentId}>
      {data => <Onboarding {...data} />}
    </OnboardingWithData>
  );
};

export default connect(
  reportPageViewModel,
  {}
)(ContainedOnboardingPage);
