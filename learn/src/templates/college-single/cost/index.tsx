import * as React from 'react';
import * as numeral from "numeral";
import { OffWhiteSection, OneHalf } from '../../../atoms/sections';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import CostBreakdownTable from './cost-breakdown';
import { Cost, CTABlock } from '../index'
import TextLink from '@edmit/component-library/src/components/atoms/link-text'

interface ICollegeCostBodyProps {
  name: string;
  totalCostOfAttendance: number;
  costs: Cost[];
  payingForBlurb: string;
}

export const CollegeCostBody: React.SFC<ICollegeCostBodyProps> = props => {
  return (
    <>
      <OffWhiteSection>
        <OneHalf>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Total Cost" />
          <Text className="t-medium black tc pv1">The total cost of attendance  at {props.name} is</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc mb2'} text={<span className={"lato b f1"}>{numeral(props.totalCostOfAttendance).format("$0,0")}</span>} />
          <Text className="t-medium black tc pv1">per year<br />(which includes tuition and fees, books and supplies, and living expenses)</Text>
        </OneHalf>
        <CTABlock ctaText={"Find out"} ctaTo={"https://www.edmit.me/signup"}>HOW MUCH WILL I PAY AT {props.name.toUpperCase()}?</CTABlock>
      </OffWhiteSection>

      <Heading size={EHeadingSize.H3} className="tc" text="Cost Breakdown" />
      <OffWhiteSection className="bg-white">
        <OneHalf>
          <CostBreakdownTable data={
            props.costs.slice(0, props.costs.length / 2 + 1).map(cost => ({ name: cost.type, amount: numeral(cost.amount).format("$0,0") }))} />
        </OneHalf>
        <OneHalf>
          <CostBreakdownTable data={
            props.costs.slice(props.costs.length / 2 + 1).map(cost => ({ name: cost.type, amount: numeral(cost.amount).format("$0,0") }))} />
        </OneHalf>
      </OffWhiteSection>

      {props.payingForBlurb && (
        <OffWhiteSection>
          <Text className="black pv2 ph2 t-medium pl2">
            <div dangerouslySetInnerHTML={{ __html: props.payingForBlurb }} />
          </Text>
        </OffWhiteSection>
      )}

      <TextLink to={"https://www.edmit.me/blog/tag/cost-of-college"}><span className="t-medium db tr mv3">LEARN MORE ABOUT COLLEGE COST &gt;</span></TextLink>
    </>
  );
};