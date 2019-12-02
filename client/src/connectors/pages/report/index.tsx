import * as React from 'react'

import { useReportPage } from '../../../components/pages/report/shared'
import { ReportPage } from '../../../components/pages/report'
import { useStudentSwitcher } from '../../../hooks/student-switcher'
import { usePaywall } from '../../../hooks/paywall'
import { normalizeId } from '@edmit/component-library/src/lib/models'
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment'

interface IConnectedReportPageViewModel { }

interface IConnectedReportPageActions {
  onOpenSearchOverlay: () => void;
  onOpenPreferenceModal: () => void;
  dismissRecommendation: (collegeId: string) => void;
  onUploadAidLetter: (college: {
    id: string;
    name: string;
    edstimate: number;
  } | null) => void;
}

type ConnectedReportPageProps = IConnectedReportPageViewModel & IConnectedReportPageActions;

const ConnectedReportPage: React.FC<ConnectedReportPageProps> = props => {
  const { studentId } = useStudentSwitcher();

  const paywall = usePaywall();
  const report = useReportPage(studentId, {
    uploadAidLetter: (...args) => {
      console.log("CONNECTOR UPLOAD AID LETTER")
      props.onUploadAidLetter(...args)
    }
  });

  const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = paywall;

  return (
    <ReportPage
      {...report}
      {...paywall}
      onOpenSearchOverlay={props.onOpenSearchOverlay}
      onOpenPreferenceModal={() => {
        if (!hasEdmitPlus) {
          setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
          return openPlanSelectionModal(
            'to set your recommendation preferences'
          );
        }

        props.onOpenPreferenceModal()
      }}
      dismissRecommendation={async (sId, collegeId) => {
        await report.dismissRecommendation(sId, collegeId);
        props.dismissRecommendation(collegeId);
      }}
    />
  );
};

export default ConnectedReportPage;
