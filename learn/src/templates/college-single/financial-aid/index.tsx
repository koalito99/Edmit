import * as React from 'react';
import { OffWhiteSection, Single, OneHalf, OneThird } from '../../../atoms/sections';
import * as numeral from "numeral";
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Button, { EButtonType, EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import TextLink from '@edmit/component-library/src/components/atoms/link-text'
import { CTABanner } from '../index'

interface ICollegeFinancialBodyProps {
  name: string;
  averageNetPrice: number;
  percentageOfFreshmenReceivingFinancialAid: number;
  percentageOfUndergraduateNeedMet: number;
}

export const CollegeFinancialBody: React.SFC<ICollegeFinancialBodyProps> = props => {
  return (
    <>
      <OffWhiteSection className="bg-white">
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Average Student" />
          <Text className="t-medium black tc pv1">The average student at {props.name} pays</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.averageNetPrice).format("$0,0")}</span>} />
          <Text className="t-medium black tc pv1">per year</Text>
        </OneThird>
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Need Met" />
          <Text className="t-medium black tc pv1">{props.name}'s financial aid meets</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.percentageOfUndergraduateNeedMet / 100).format("0.0%")}</span>} />
          <Text className="t-medium black tc pv1">of student's demonstrated need</Text>
        </OneThird>
        <OneThird>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Financial Aid" />
          <Text className="t-medium black tc pv1">At {props.name}</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.percentageOfFreshmenReceivingFinancialAid / 100).format("0.0%")}</span>} />
          <Text className="t-medium black tc pv1">of freshmen receive some form of financial aid</Text>
        </OneThird>
      </OffWhiteSection>

      <CTABanner ctaTo={"https://www.edmit.me/signup"}>HOW DOES {props.name.toUpperCase()} COMPARE TO OTHER SCHOOLS?</CTABanner>

      <OffWhiteSection>
        <OneHalf>
          <Text className="black t-large">Fill out the FAFSA for {props.name}</Text>
          <Text className="black t-medium">If you're applying to {props.name} and hoping for need-based financial aid, you'll need to fill out the FAFSA</Text>
          <a href={"https://www.edmit.me/resources/what-is-the-fafsa-and-how-does-it-work"}><Button size={EButtonSize.Large} type={EButtonType.Primary} text={'LEARN MORE'} className="mt4" /></a>
        </OneHalf>
      </OffWhiteSection>
      <TextLink to={"https://www.edmit.me/blog/tag/financial-aid-and-scholarships"}><span className="t-medium db tr mv3">LEARN MORE ABOUT FINANCIAL AID &gt;</span></TextLink>
    </>
  );
};