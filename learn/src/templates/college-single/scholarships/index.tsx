import * as React from 'react';
import { OffWhiteSection, OneHalf } from '../../../atoms/sections';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import { AverageCost } from './average-cost';
import TextLink from '@edmit/component-library/src/components/atoms/link-text'
import * as numeral from "numeral";
import { CTABlock, ECollegeBadge, iconForBadge } from '../index'
import DetailedIcon from '@edmit/component-library/src/components/atoms/icon-detailed'

interface ICollegeScholarshipBodyProps {
  name: string;
  averageMeritScholarshipValue: number;
  scholarshipsBlurb: string;
  averageCosts: Array<{
    incomeRange: string;
    amount: number;
  }>;
}

export const CollegeScholarshipBody: React.SFC<ICollegeScholarshipBodyProps> = props => {
  return (
    <>
      <OffWhiteSection>
        <OneHalf>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Average Merit Scholarships" />
          <Text className="t-medium black tc pv1">The average {props.name} merit scholarship for students without financial need is</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.averageMeritScholarshipValue).format("$0,0")}</span>} />
        </OneHalf>
        <CTABlock ctaText={"See your merit award"} ctaTo={"https://www.edmit.me/signup"}>HOW MUCH WILL I PAY AT {props.name.toUpperCase()}?</CTABlock>
      </OffWhiteSection>

      {props.scholarshipsBlurb && (
        <OffWhiteSection>
          <Text className="black pv2 ph2 t-medium pl2">
            <div dangerouslySetInnerHTML={{ __html: props.scholarshipsBlurb }} />
          </Text>
        </OffWhiteSection>
      )}

      <AverageCost className="mt3" averageCosts={props.averageCosts} />

      <TextLink to={"https://www.edmit.me/blog/tag/financial-aid-and-scholarships"}><span className="t-medium db tr mv3">LEARN MORE ABOUT SCHOLARSHIPS &gt;</span></TextLink>
    </>
  );
};

export const CollegeFinancialBadgeBody: React.SFC<{ badge: ECollegeBadge; description: string; }> = props => {
  return (
    <>
      <Text className="t-medium black tc pv1">{props.description}</Text>
      <div className={"flex justify-center"}>
        <DetailedIcon name={iconForBadge(props.badge)} style={{ width: 200, height: 200 }} />
      </div>
      <TextLink to={"https://www.edmit.me/blog/edmit-badges"} className="crimson t-medium db tr mv3">LEARN MORE ABOUT BADGES &gt;</TextLink>
    </>
  );
};