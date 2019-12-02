import * as React from 'react'
import { LoanReport, LoanReportWithData } from '../../../components/pages/loan-report'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from './actions'
import ConnectedSearchColleges from '../../../connectors/molecules/search-colleges'
import SmartEFCField from '../../../connectors/molecules/smart-fields/field-efc'
import SmartHHIField from '../../../connectors/molecules/smart-fields/field-hhi'
import { Helmet } from 'react-helmet'

export interface IContainedLoanReportPageViewModel { }
export type ContainedLoanReportPageActions = typeof actions & {};

type ContainedLoanReportPageProps = IContainedLoanReportPageViewModel &
  ContainedLoanReportPageActions;

const ContainedLoanReportPage: React.SFC<ContainedLoanReportPageProps> = props => {
  return (
    <>
      <Helmet>
        <title>Student Loan Calculator for Multiple Loans</title>
        <meta
          name="description"
          content="See what your payments on multiple student loans with different interest rates will be and calculate the total amount you’ll pay."
        />
      </Helmet>
      <LoanReportWithData
        onUploadAidLetter={props.showUploadAidLetterModal}
        searchCollegesComponent={searchProps => (
          <ConnectedSearchColleges
            onSearch={query => null}
            myColleges={[]}
            inputValue={''}
            {...searchProps}
          />
        )}
        efcFieldComponent={fieldProps => <SmartEFCField {...fieldProps} />}
        hhiFieldComponent={fieldProps => <SmartHHIField {...fieldProps} />}
      >
        {data => <LoanReport {...data} />}
      </LoanReportWithData>
    </>
  );
};

export default connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedLoanReportPage);
