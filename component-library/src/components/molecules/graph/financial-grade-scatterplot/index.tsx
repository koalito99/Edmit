import * as React from 'react';
// import {
//   hexGrayDim,
//   hexGrayLight,
//   hexGreen, hexGreenMuted,
//   hexRed, hexRedMuted, hexWhite,
//   hexYellow, hexYellowMuted,
// } from "../../../atoms/colors";
import { hexGreen, hexGreenMuted, hexRed, hexRedMuted, hexYellowMuted, } from "../../../atoms/colors";
import withSizes from "react-sizes";
import Text from "../../../atoms/typography/text";
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from "../../../atoms/avatar";

interface IFinancialGradeScatterplotViewModel {
  collegeGroups: Array<{
    isAffordable: boolean;
    isAGoodValue: boolean;
    colleges: Array<{
      abbreviation: string;
    }>
  }>

  isMobile?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

type FinancialGradeScatterplotProps = IFinancialGradeScatterplotViewModel;

const FinancialGradeScatterplot: React.SFC<FinancialGradeScatterplotProps> = props => {
  const height = 450;

  const quadrants = {
    bottomLeft: props.collegeGroups.filter(group => !group.isAffordable && !group.isAGoodValue),
    bottomRight: props.collegeGroups.filter(group => !group.isAffordable && group.isAGoodValue),
    topLeft: props.collegeGroups.filter(group => group.isAffordable && !group.isAGoodValue),
    topRight: props.collegeGroups.filter(group => group.isAffordable && group.isAGoodValue),
  };

  return <div className={"tc"}>
    <Text style={{ color: hexGreen }}>More Affordable</Text>
    <div className={"flex justify-center"}>
      <div className={"flex items-center mr2"}>
        <Text style={{ color: hexRed }}>Worse Value</Text>
      </div>
      <div className={"flex flex-wrap w-80"} style={{ height }}>
        <div className={"w-50 h-50 pa2 pa4-ns flex flex-wrap justify-center align-center relative"} style={{ backgroundColor: hexYellowMuted }}>
          {quadrants.topLeft.map((group, groupIndex) => <div key={groupIndex} className={"flex flex-wrap justify-center items-center"}>
            {group.colleges.map(college => <Avatar className={"mr2 mb2"} key={college.abbreviation} type={EAvatarType.College} theme={EAvatarTheme.Offwhite} size={!props.isMobile ? EAvatarSize.Medium : EAvatarSize.Small} initials={college.abbreviation} />)}
          </div>)}
          <div className={"absolute near-white bg-gold pa1 w-40 top-0 left-0 f7 "}>Ok - B</div>
        </div>
        <div className={"w-50 h-50 pa2 pa4-ns flex flex-wrap justify-center align-center relative"} style={{ backgroundColor: hexGreenMuted }}>
          {quadrants.topRight.map((group, groupIndex) => <div key={groupIndex} className={"flex flex-wrap justify-center items-center"}>
            {group.colleges.map(college => <Avatar className={"mr2 mb2"} key={college.abbreviation} type={EAvatarType.College} theme={EAvatarTheme.Offwhite} size={!props.isMobile ? EAvatarSize.Medium : EAvatarSize.Small} initials={college.abbreviation} />)}
          </div>)}
          <div className={"absolute near-white bg-dark-green pa1 w-40 top-0 right-0 f7"}>Best - A</div>
        </div>
        <div className={"w-50 h-50 pa2 pa4-ns flex flex-wrap justify-center align-center relative"} style={{ backgroundColor: hexRedMuted }}>
          {quadrants.bottomLeft.map((group, groupIndex) => <div key={groupIndex} className={"flex flex-wrap justify-center items-center"}>
            {group.colleges.map(college => <Avatar className={"mr2 mb2"} key={college.abbreviation} type={EAvatarType.College} theme={EAvatarTheme.Offwhite} size={!props.isMobile ? EAvatarSize.Medium : EAvatarSize.Small} initials={college.abbreviation} />)}
          </div>)}
          <div className={"absolute near-white bg-crimson pa1 w-40 bottom-0 left-0 f7"}>Not Good - C</div>
        </div>
        <div className={"w-50 h-50 pa2 pa4-ns flex flex-wrap justify-center align-center relative"} style={{ backgroundColor: hexYellowMuted }}>
          {quadrants.bottomRight.map((group, groupIndex) => <div key={groupIndex} className={"flex flex-wrap justify-center items-center"}>
            {group.colleges.map(college => <Avatar className={"mr2 mb2"} key={college.abbreviation} type={EAvatarType.College} theme={EAvatarTheme.Offwhite} size={!props.isMobile ? EAvatarSize.Medium : EAvatarSize.Small} initials={college.abbreviation} />)}
          </div>)}
          <div className={"absolute near-white bg-gold pa1 w-40 bottom-0 right-0 f7"}>Ok - B</div>
        </div>
      </div>
      <div className={"flex items-center ml2"}>
        <Text style={{ color: hexGreen }}>Better Value</Text>
      </div>
    </div>
    <Text style={{ color: hexRed }}>Less Affordable</Text>
  </div>
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});
export default withSizes(mapSizesToProps)(FinancialGradeScatterplot) as typeof FinancialGradeScatterplot;