import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';

export interface IReportTemplateViewModel {
  loading: boolean;
}

type ReportTemplateProps = IReportTemplateViewModel;

export const ReportTemplate: React.SFC<ReportTemplateProps> = props => {
  return (
    <div style={{ paddingTop: '48px' }}>
      <div className="bg-offwhite bg-app-layout" />
      <div className="app-nav-footer-offset">{props.children}</div>
    </div>
  );
};

export default ReportTemplate;
