import * as React from 'react';

import LoansPage from '../../../components/pages/loans'
import { SingleReportProps, useReportPage, EReportType } from '../../../components/pages/report/shared';
import { useStudentSwitcher } from '../../../hooks/student-switcher';

type ConnectedLoansPageProps = SingleReportProps

export const ConnectedLoansPage: React.SFC<ConnectedLoansPageProps> = props => {
    console.log(props);
    // const getColleges = (props: ReportProps) => {
    //     if (props.loading) {
    //         return [];
    //     } else {
    //         if (props.type === EReportType.Single) {
    //             window.analytics.track('view_initial_report', {
    //                 collegeId: props.college.id,
    //                 studentId: props.student.id
    //             });
    //             return [props.college];
    //         } else if (props.type === EReportType.Multi) {
    //             window.analytics.track('view_multi_report', {
    //                 collegeId: props.colleges[0].id,
    //                 studentId: props.student.id
    //             });
    //             return props.colleges;
    //         } else {
    //             return [];
    //         }
    //     }
    // };
    const { studentId } = useStudentSwitcher();
    const report = useReportPage(studentId, {
        uploadAidLetter: (...args) => { },
    }, true);

    if (report.loading) {
        return <span />
    }

    if (report.type === EReportType.Single) {
        return (
            <LoansPage
                {...report}
                refetch={() => report.refetch}
                type={EReportType.Single}
                student={props.student}
                majors={props.majors}
                account={props.account}
                loading={props.loading}
            />
        );
    }
    else if (report.type === EReportType.Multi) {
        return (
            <LoansPage
                {...report}
                college={report.colleges[0]}
                refetch={() => report.refetch}
                type={EReportType.Single}
                student={props.student}
                majors={props.majors}
                account={props.account}
                loading={props.loading}
            />
        );
    }
    else {
        return <span />
    }
};

export default ConnectedLoansPage;
