import * as React from 'react';

import IconTuitionPrice from '../../../assets/icon/tuition-price.png';
import IconUserProfile from '../../../assets/icon/user-profile.png';
import IconUserStudent from '../../../assets/icon/user-student.png';
import IconUserParent from '../../../assets/icon/user-parent.png';
import IconUserOther from '../../../assets/icon/user-other.png';
import IconConnectWithCollege from '../../../assets/icon/connect-with-college.png';
import IconInviterViewDetails from '../../../assets/icon/inviter-view-details.png';
import IconInviterEditDetails from '../../../assets/icon/inviter-edit-details.png';
import IconInviterNoAccess from '../../../assets/icon/inviter-no-access.png';
import IconReport from '../../../assets/icon/report.png';
import IconCompare from '../../../assets/icon/compare.png';
import IconFinancialPlanner from '../../../assets/icon/financial-planner.png';
import IconAdvisorNetwork from '../../../assets/icon/advisor-network.png';
import IconGreenRuleOfThumb from '../../../assets/icon/green-rule-of-thumb.svg';
import IconRedRuleOfThumb from '../../../assets/icon/red-rule-of-thumb.svg';
import IconGuarantee from '../../../assets/icon/guarantee.svg';
import IconBadgeFinancialAidClarity from "../../../assets/icon/badge-financial-aid-clarity.svg";
import IconBadgeFinancialAidClarityDisabled from "../../../assets/icon/badge-financial-aid-clarity-disabled.svg";
import IconBadgeFinancialEducation from "../../../assets/icon/badge-financial-education.svg";
import IconBadgeFinancialEducationDisabled from "../../../assets/icon/badge-financial-education-disabled.svg";
import IconBadgeTruthInPricing from "../../../assets/icon/badge-truth-in-pricing.svg";
import IconBadgeTruthInPricingDisabled from "../../../assets/icon/badge-truth-in-pricing-disabled.svg";
import IconChecklist from "../../../assets/icon/checklist.svg";
import IconOverallGrade from "../../../assets/icon/overall-grade.svg";
import IconLightbulb from "../../../assets/icon/lightbulb.png";

export enum EDetailedIconName {
  TuitionPrice = 'TuitionPrice',
  UserProfile = 'UserProfile',
  UserStudent = 'UserStudent',
  UserParent = 'UserParent',
  UserOther = 'UserOther',
  ConnectWithCollege = 'ConnectWithCollege',
  InviteViewDetails = 'InviteViewDetails',
  InviteEditDetails = 'InviteEditDetails',
  InviteNoAccess = 'InviteNoAccess',
  Report = 'Report',
  Compare = 'Compare',
  FinancialPlanner = 'FinancialPlanner',
  AdvisorNetwork = 'AdvisorNetwork',
  GreenRuleOfThumb = 'GreenRuleOfThumb',
  RedRuleOfThumb = 'RedRuleOfThumb',
  Guarantee = 'Guarantee',
  BadgeFinancialAidClarity = 'BadgeFinancialAidClarity',
  BadgeFinancialAidClarityDisabled = 'BadgeFinancialAidClarityDisabled',
  BadgeFinancialEducation = 'BadgeFinancialEducation',
  BadgeFinancialEducationDisabled = 'BadgeFinancialEducationDisabled',
  BadgeTruthInPricing = 'BadgeTruthInPricing',
  BadgeTruthInPricingDisabled = 'BadgeTruthInPricingDisabled',
  Checklist = 'Checklist',
  Lightbulb = 'Lightbulb',
  OverallGrade = 'OverallGrade'
}

export interface IDetailedIconViewModel {
  name: EDetailedIconName;
  width: number;
  className?: string;
  style?: React.CSSProperties;
}

type DetailedIconProps = IDetailedIconViewModel;

const DetailedIcon: React.SFC<DetailedIconProps> = props => {
  let detailedIconSource = null;

  switch (props.name) {
    case EDetailedIconName.TuitionPrice:
      detailedIconSource = IconTuitionPrice;
      break;
    case EDetailedIconName.UserProfile:
      detailedIconSource = IconUserProfile;
      break;
    case EDetailedIconName.UserStudent:
      detailedIconSource = IconUserStudent;
      break;
    case EDetailedIconName.UserParent:
      detailedIconSource = IconUserParent;
      break;
    case EDetailedIconName.UserOther:
      detailedIconSource = IconUserOther;
      break;
    case EDetailedIconName.ConnectWithCollege:
      detailedIconSource = IconConnectWithCollege;
      break;
    case EDetailedIconName.InviteViewDetails:
      detailedIconSource = IconInviterViewDetails;
      break;
    case EDetailedIconName.InviteEditDetails:
      detailedIconSource = IconInviterEditDetails;
      break;
    case EDetailedIconName.InviteNoAccess:
      detailedIconSource = IconInviterNoAccess;
      break;
    case EDetailedIconName.Report:
      detailedIconSource = IconReport;
      break;
    case EDetailedIconName.Compare:
      detailedIconSource = IconCompare;
      break;
    case EDetailedIconName.FinancialPlanner:
      detailedIconSource = IconFinancialPlanner;
      break;
    case EDetailedIconName.AdvisorNetwork:
      detailedIconSource = IconAdvisorNetwork;
      break;
    case EDetailedIconName.GreenRuleOfThumb:
      detailedIconSource = IconGreenRuleOfThumb;
      break;
    case EDetailedIconName.RedRuleOfThumb:
      detailedIconSource = IconRedRuleOfThumb;
      break;
    case EDetailedIconName.Guarantee:
      detailedIconSource = IconGuarantee;
      break;
    case EDetailedIconName.BadgeFinancialAidClarity:
      detailedIconSource = IconBadgeFinancialAidClarity;
      break;
    case EDetailedIconName.BadgeFinancialAidClarityDisabled:
      detailedIconSource = IconBadgeFinancialAidClarityDisabled;
      break;
    case EDetailedIconName.BadgeFinancialEducation:
      detailedIconSource = IconBadgeFinancialEducation;
      break;
    case EDetailedIconName.BadgeFinancialEducationDisabled:
      detailedIconSource = IconBadgeFinancialEducationDisabled;
      break;
    case EDetailedIconName.BadgeTruthInPricing:
      detailedIconSource = IconBadgeTruthInPricing;
      break;
    case EDetailedIconName.BadgeTruthInPricingDisabled:
      detailedIconSource = IconBadgeTruthInPricingDisabled;
      break;
    case EDetailedIconName.Checklist:
      detailedIconSource = IconChecklist;
      break;
    case EDetailedIconName.Lightbulb:
      detailedIconSource = IconLightbulb;
      break;
    case EDetailedIconName.OverallGrade:
      detailedIconSource = IconOverallGrade;
      break;
    default:
      break;
  }

  return (
    <img
      src={detailedIconSource || undefined}
      alt={'icon-' + props.name}
      className={`dib h-auto ${props.className}`}
      width={props.width}
      style={props.style}
    />
  );
};

export default DetailedIcon;
