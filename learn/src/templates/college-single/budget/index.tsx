import * as React from 'react';
import { OffWhiteSection, Single } from '../shared';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import TextLink from '@edmit/component-library/src/components/atoms/link-text'
import { CTABanner } from '../index'

interface ICollegeBudgetBodyProps {
  name: string;
}

export const CollegeBudgetBody: React.SFC<ICollegeBudgetBodyProps> = props => {
  return (
    <>
      <Text className="t-medium black tc pv1">Every student's costs are a little different.</Text>

      <CTABanner ctaTo={"https://www.edmit.me/college-student-budget-template"}>CREATE YOUR BUDGET FOR {props.name.toUpperCase()}</CTABanner>
      <TextLink to={"https://www.edmit.me/how-much-should-i-budget-for-college"}><span className="t-medium db tr mv3">LEARN MORE ABOUT BUDGETING &gt;</span></TextLink>
    </>
  );
};