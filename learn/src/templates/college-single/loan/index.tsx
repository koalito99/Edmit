import * as React from 'react';
import { OffWhiteSection, OneThird } from '../../../atoms/sections';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import TextLink from '@edmit/component-library/src/components/atoms/link-text'
import * as numeral from "numeral";
import { CTABanner } from '../index'

interface ICollegeLoansBodyProps {
  name: string;
  averageLoanAmount: number;
  loanRepaymentFiveYearPercentage: number;
  loanRepaymentSevenYearPercentage: number;
  studentLoanDefaultRate: number;
}

export const CollegeLoansBody: React.SFC<ICollegeLoansBodyProps> = props => {
  return (
    <>
      <OffWhiteSection className="bg-white">
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Student Loans" />
          <Text className="t-medium black tc pv1">The average student at {props.name} takes out</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc mv2'} text={<span className={"lato b f1"}>{numeral(props.averageLoanAmount).format("$0,0")}</span>} />
          <Text className="t-medium black tc pb1">in student loans</Text>
        </OneThird>
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Student Loan Repayment" />
          <Text className="t-medium black tc pv1">The student loan repayment rate at {props.name} is</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc mv2'} text={<span className={"lato b f1"}>{numeral(props.loanRepaymentFiveYearPercentage / 100).format("0.0%")}</span>} />
          <Text className="t-medium black tc pv1">after five years</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc mv2'} text={<span className={"lato b f1"}>{numeral(props.loanRepaymentSevenYearPercentage / 100).format("0.0%")}</span>} />
          <Text className="t-medium black tc pb1">after seven years</Text>
        </OneThird>
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Student Loan Default Rate" />
          <Text className="t-medium black tc pv1">At {props.name}</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc mv2'} text={<span className={"lato b f1"}>{numeral(props.studentLoanDefaultRate / 100).format("0.0%")}</span>} />
          <Text className="t-medium black tc pb1">after three years</Text>
        </OneThird>
      </OffWhiteSection>

      <CTABanner ctaTo={"https://www.edmit.me/signup"}>GET YOUR LOAN DETAILS</CTABanner>

      <TextLink to={"https://www.edmit.me/blog/tag/student-loans"}><span className="t-medium db tr mv3">LEARN MORE ABOUT LOANS &gt;</span></TextLink>
    </>
  );
};