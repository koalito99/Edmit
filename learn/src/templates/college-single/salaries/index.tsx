import * as React from 'react';
import { OffWhiteSection, OneHalf, Single } from '../../../atoms/sections';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import { SalaryYears } from './salary-years';
import AverageCostTable from './average-cost';
import * as numeral from "numeral";
import { CTABlock, FuturePrice, Salary } from '../index'
import TextLink from '@edmit/component-library/src/components/atoms/link-text'

interface ICollegeSalariesBodyProps {
  name: string;
  averageStartingSalary: number;
  salaries: Salary[];
}

export const CollegeSalariesBody: React.SFC<ICollegeSalariesBodyProps> = props => {
  return (
    <>
      <OffWhiteSection>
        <OneHalf>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Average Starting Salary" />
          <Text className="t-medium black tc pv1">The average starting salary for a {props.name} graduate is</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.averageStartingSalary).format("$0,0")}</span> } />
        </OneHalf>
        <CTABlock ctaText={"Get my salary report"} ctaTo={"https://www.edmit.me/signup"}>HOW MUCH WILL I MAKE IF I GRADUATE FROM {props.name.toUpperCase()}?</CTABlock>
      </OffWhiteSection>
      
      <SalaryYears className="mt3" name={props.name} salaries={props.salaries}/>
      
      <TextLink to={"https://www.edmit.me/blog/tag/salary-and-career"}><span className="t-medium db tr mv3">LEARN MORE ABOUT CAREERS AFTER COLLEGE &gt;</span></TextLink>
    </>
  );
};

interface ICollegeSavingsBodyProps {
  name: string;
  stickerPriceChangePercentage: number;
  netPriceChangePercentage: number;
  futurePrices: FuturePrice[];
}

export const CollegeSavingsBody: React.SFC<ICollegeSavingsBodyProps> = props => {
  return (
    <>
      <OffWhiteSection className="bg-white">
        <OneHalf className="br b--light-gray">
          <Heading size={EHeadingSize.H3} className={'tc'} text="Sticker Price" />
          <Text className="t-medium black tc pv1">{props.name}'s full cost of attendance has increased an average of</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.stickerPriceChangePercentage/100).format("0.0%")}</span> } />
          <Text className="t-medium black tc pv1">per year since 2014</Text>
        </OneHalf>
        <OneHalf>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Net Price" />
          <Text className="t-medium black tc pv1">{props.name}'s average net price has increased an average of</Text>
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.netPriceChangePercentage/100).format("0.0%")}</span> } />
          <Text className="t-medium black tc pv1">per year since 2014</Text>
        </OneHalf>
      </OffWhiteSection>

      <Heading size={EHeadingSize.H3} className={'tc'} text="Average Cost" />
      <Text className="t-medium black tc pv1">Given past trends, we expect {props.name}'s tuition pricing to be the following:</Text>

      <OffWhiteSection className="bg-white">
        <Single>
          <AverageCostTable data={
            props.futurePrices.map(futurePrice => ({ name: futurePrice.year, amount: numeral(futurePrice.price).format("$0,0") }))}/>
        </Single>        
      </OffWhiteSection>
      
      <TextLink to={"https://www.edmit.me/blog/tag/saving-for-college"}><span className="t-medium db tr mv3">LEARN MORE ABOUT SAVINGS &gt;</span></TextLink>
    </>
  );
};

interface ICollegeApplyBodyProps {
  name: string;
  acceptanceRate: number;
  applicationFee: number;
}

export const CollegeApplyBody: React.SFC<ICollegeApplyBodyProps> = props => {
  return (
    <>
      <OffWhiteSection className="bg-white">
        <OneHalf className="br b--light-gray">
          <Heading size={EHeadingSize.H3} className={'tc'} text="Application Fee" />
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.applicationFee).format("$0[.]0")}</span> } />
        </OneHalf>
        <OneHalf>
          <Heading size={EHeadingSize.H3} className={'tc'} text="Acceptance Rate" />
          <Heading size={EHeadingSize.H2} className={'green-success tc'} text={<span className={"lato b f1"}>{numeral(props.acceptanceRate/100).format("0.0%")}</span> } />
        </OneHalf>
      </OffWhiteSection>
    </>
  );
};