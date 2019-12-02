import * as React from 'react'
import { SingleReportProps } from '../../../components/pages/report/shared';
import ConnectedLoansPage from '../../../connectors/pages/loans'


type LoansPageProps = SingleReportProps

class ContainedLoansPage extends React.Component<LoansPageProps> {
    render() {
        return (
            <>
                <ConnectedLoansPage {...this.props}></ConnectedLoansPage>
            </>
        );
    }
};

export default ContainedLoansPage;