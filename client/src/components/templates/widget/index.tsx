import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/rc-slider.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { useAuthentication } from '../../../hooks/auth';
const WidgetTemplate: React.SFC = props => {
  const { studentId, selectStudentId } = useStudentSwitcher();
  const authentication = useAuthentication()

  const theStudentId = authentication.studentId

  if (!studentId && theStudentId) {
    selectStudentId(theStudentId);
  }

  return <div className="lato">{props.children}</div>;
};

export default WidgetTemplate;
