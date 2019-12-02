import * as React from 'react';
import EdstimatePage from '../../../components/pages/edstimate';
import { useEdstimatePresentation } from './shared'
import { useStudentSwitcher } from '../../../hooks/student-switcher'

interface IConnectedEdstimatePageViewModel {}

interface IConnectedEdstimatePageActions {}

type ConnectedEdstimatePageProps = IConnectedEdstimatePageViewModel &
  IConnectedEdstimatePageActions;

const ConnectedEdstimatePage: React.FC<ConnectedEdstimatePageProps> = props => {
  const { studentId } = useStudentSwitcher();
  const edstimatePresentation = useEdstimatePresentation(studentId, "4baf271b-492a-4077-a63f-7aeefeca0a95");

  return (
    <EdstimatePage
      {...edstimatePresentation}
    />
  );
};

export default ConnectedEdstimatePage;
