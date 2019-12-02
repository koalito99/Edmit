import * as React from 'react';
import { SingleReportProps, PageSection } from '../shared';
import Button, {
  EButtonSize,
  EButtonType
} from '@edmit/component-library/src/components/atoms/button';
import { Link as RouteLink } from 'react-router-dom';
import { LoanPaymentDetails } from '../../loan-report/step/loan-payments';
import { LoanCalculateLoanPayments } from '../../../../testIds/ids';

export const SingleLoanPaymentsReport: React.SFC<SingleReportProps> = props => {
  const federalSubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Subsidized Loan'
  );
  const federalUnsubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Unsubsidized Loan'
  );
  const privateLoan = props.college.loans.find(loan => loan.provider === 'Private Loan');

  const needsLoans = federalSubsidizedLoan || federalUnsubsidizedLoan || privateLoan;

  return (
    <>
      <PageSection>
        {needsLoans && (
          <LoanPaymentDetails
            title={"Your estimated loan payments post graduation is"}
            cta={<div className={'mt3'}>
              <RouteLink to={'/loan-report'}>
                <span data-testid={LoanCalculateLoanPayments}>
                  <Button
                    text={'Calculate Loan Payments'}
                    size={EButtonSize.Medium}
                    type={EButtonType.Secondary}
                  />
                </span>
              </RouteLink>
            </div>}
            federalSubsidizedLoan={federalSubsidizedLoan}
            federalUnsubsidizedLoan={federalUnsubsidizedLoan}
            privateLoan={privateLoan}
          />
        )}
      </PageSection>
    </>
  );
};
