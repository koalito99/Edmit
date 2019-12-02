import * as React from 'react';
import { PrimaryValue, Section, UnlockWithEdmitButton, ValueLabel } from '../shared'
import numeral from 'numeral';

interface ICollegeValueFirstBodyProps {
  averageLoanAmount: number | null;
  loanRepaymentPercentage: number;

  valueColor: string;
}

export const CollegeValueFirstBody: React.SFC<ICollegeValueFirstBodyProps> = props => {
  return (
    <div>
      <Section>
        {props.averageLoanAmount && (
          <>
            <ValueLabel>Student Loan Average</ValueLabel>
            <PrimaryValue color={props.valueColor}>
              {numeral(props.averageLoanAmount).format('$0,0')}
            </PrimaryValue>
          </>
        )}
        <ValueLabel>Repayment</ValueLabel>
        <PrimaryValue color={props.valueColor}>{numeral(props.loanRepaymentPercentage/100).format("0[.]0%")}</PrimaryValue>
      </Section>
    </div>
  );
};

interface ICollegeValueSecondBodyProps {
  averageAnnualEarnings: number;

  valueColor: string;
}

export const CollegeValueSecondBody: React.SFC<ICollegeValueSecondBodyProps> = props => {
  return (
    <div>
      <Section>
        <ValueLabel>Average Annual Earnings</ValueLabel>
        <PrimaryValue color={props.valueColor}>
          {numeral(props.averageAnnualEarnings).format('$0,0')}
        </PrimaryValue>
        <ValueLabel>Your Value</ValueLabel>
        <UnlockWithEdmitButton color={props.valueColor} />
      </Section>
    </div>
  );
};
