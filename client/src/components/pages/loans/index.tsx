import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Card from '@edmit/component-library/src/components/atoms/card';
import { SingleLoanPaymentsReport } from '../report/loan-payments/single';
import { SingleReportProps } from '../report/shared';
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';

const ReportLoading: React.SFC<{}> = () => (
    <div>
        <div
            className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center"
            style={{ opacity: 1, transition: 'opacity 200ms' }}
        >
            <LoadingSpinner />
        </div>
        <div style={{ marginTop: 600 }} />
    </div>
);

const LoansPage: React.SFC<SingleReportProps> = props => {
    if (props.loading) {
        return <ReportLoading />;
    }
    return (
        <>
            <PageContainer>
                <Heading
                    size={EHeadingSize.H3}
                    text={"Student Loan Calculator"}
                    className={"tc mb0"}
                />
                <Heading
                    size={EHeadingSize.H4}
                    text={props.college ? `for ${props.college.name}` : ''}
                    className={'tc mt2 mb5'}
                />
                <Card>
                    <div className={"pa3"}>
                        <SingleLoanPaymentsReport
                            {...props}
                        />
                    </div>
                </Card>
            </PageContainer>
        </>
    );
};

export default (LoansPage) as typeof LoansPage;