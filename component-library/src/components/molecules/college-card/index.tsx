import * as React from "react";
import { FlexColumnContainer, FlexItem, FlexRowContainer, MobileHidden, DesktopHidden } from "../../layout";
import { formatDollarsWhole, edstimateCopy, EFinancialGrade } from "../../../shared";
import { CollegeModel } from "../../../lib/models";
import { FitChip } from "../graph/fit";
import Icon, { EIconName } from "../../atoms/icon";
import { EEdmitColor } from "../../../lib/colors";
import { AffordabilityDetermination, ValueDetermination, FinancialGrade } from "../../../../../client/src/graphql/generated";
import { featureIds, featureLabels } from "../../../shared/features";
import { RecommendationCollege } from "../../../../../client/src/components/organisms/recommendation-grid";

export enum ECollegeOwnershipType {
  Public,
  Private
}

interface ICollegeCardViewModel {
  college: CollegeModel
  recCollege?: RecommendationCollege
  callToAction?: React.ReactNode
  onClickEdstimate?: () => any;
  onRemove?: () => any;
}

interface ICollegeCardActions {
  onClick?: () => any;
}

type CollegeCardProps = ICollegeCardViewModel & ICollegeCardActions;

interface ICollegeCardInformationChipViewModel {
  title: string;
  value: React.ReactNode | string;
}

type CollegeCardInformationChipProps = ICollegeCardInformationChipViewModel

const cardInformationChipTitleStyle = {
  color: "#6f6868",
  fontFamily: "Lato",
  fontWeight: 500,
  fontSize: "14px",
  marginBottom: "2px"
}

const cardInformationChipValueStyle = {
  fontFamily: "Lato",
  fontWeight: 500,
  fontSize: "16px"
}


const CollegeCardInformationChip: React.FC<CollegeCardInformationChipProps> = (props) => {

  return (
    <>
      <FlexColumnContainer>
        <FlexItem style={cardInformationChipTitleStyle}>{props.title}</FlexItem>
        <FlexItem style={cardInformationChipValueStyle}>{props.value}</FlexItem>
      </FlexColumnContainer>
    </>
  )
}

type CardButtonOnClickFn = () => any;

interface ICardButtonPropsViewModel {
  text: string;
  onClick: CardButtonOnClickFn;
  loading?: boolean;
  testId?: string;
}

type CardButtonProps = ICardButtonPropsViewModel

export const CardButton: React.FC<CardButtonProps> = (props) => {
  const [hovered, setHovered] = React.useState(false)

  const cardButtonStyle: React.CSSProperties = {
    border: `solid 1px ${EEdmitColor.MediumGrey}`,
    borderRadius: "2px",
    minWidth: "100px",
    color: "#282727",
    fontFamily: "Lato",
    fontWeight: 600,
    fontSize: "14px",
    userSelect: "none",
    cursor: "pointer"
  }

  const cardButtonHoveredStyle: React.CSSProperties = {
    ...cardButtonStyle,
    border: `solid 1px ${EEdmitColor.DarkGrey}`
  }

  return (
    <>
      <div
        data-testid={props.testId}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
          return false;
        }}
        className="pa2 center tc"
        style={ifHovered(hovered, cardButtonStyle, cardButtonHoveredStyle)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {props.loading ? <Icon name={EIconName.Loading} className={"icon-animated-loading"}></Icon> : props.text}
      </div>
    </>
  )
}

type SetHoverFn = (hovered: boolean) => void;

const addHoverState = (setHoveredFn: SetHoverFn) => {
  return {
    onMouseEnter: () => setHoveredFn(true),
    onMouseLeave: () => setHoveredFn(false)
  }
}

const ifHovered = (hovered: boolean, nonHoverStyle: React.CSSProperties, hoverStyle: React.CSSProperties) => {
  return hovered ? hoverStyle : nonHoverStyle
}

export const CollegeCard: React.FC<CollegeCardProps> = (props) => {
  const [hovered, setHovered] = React.useState(false)
  const [expanded] = React.useState(true)

  const cardStyle = {
    background: "#fff",
    border: "1px solid #c9c9c9",
    fontFamily: "Lato",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
    cursor: props.onClick ? "pointer" : undefined
  }

  const cardHoverStyle = {
    ...cardStyle,
    border: `1px solid ${EEdmitColor.DarkGrey}`,
    boxShadow: `0 0 12px 0 rgba(0, 0, 0, 0.2)`
  }

  const imageStyle = (url: string | null) => ({
    background: url ? `url(${url})` : EEdmitColor.LightGrey,
    backgroundSize: url ? "cover" : undefined,
    borderRadius: "3px",
    minHeight: "100px",
    minWidth: "132px"
  });

  const cardHeaderStyle = {
    fontFamily: "Lato",
    fontSize: "21px",
    fontWeight: "bold",
    lineHeight: "25px",
    marginBottom: "2px"
  }

  const cardFooterStyle = {
    borderTop: "1px solid #ededed"
  }

  const cardAttributeStyle = {
    color: "#6f6868",
    fontSize: "12px",
    fontFamily: "Lato"
  }

  const cardAttributeTextStyle = {
    color: "#6f6868",
    fontSize: "12px",
    fontWeight: 500,
  }

  const cardAttributeIconStyle = {
    fontSize: "16px",
    height: "15px"
  }

  const expanderStyle = {
    fontSize: "12px",
    fontWeight: 600,
    color: EEdmitColor.Grey,
    borderBottom: `1px dashed ${EEdmitColor.MediumGrey}`
  }

  const cardXButtonStyle: React.CSSProperties = {
    position: "absolute",
    width: "18px",
    height: "18px",
    marginTop: "-9px",
    marginLeft: "-9px",
    borderRadius: "19px",
    lineHeight: "18px",
    background: "#6f6868",
    textAlign: "center",
    left: "100%"
  }

  enum EFeatureMatchStatus {
    Match,
    NotMatch,
    NoPreference
  }

  interface LabeledFeature {
    group: number;
    label: React.ReactNode | string;
    icon: EIconName;
    matchStatus: EFeatureMatchStatus;
  }

  const getLabeledFeature = (feature: string): LabeledFeature | null => {
    switch (feature) {
      case featureIds.REGION_NORTHEAST:
      case featureIds.REGION_SOUTH:
      case featureIds.REGION_WEST:
      case featureIds.REGION_MIDWEST:
        return {
          group: 1,
          label: (
            <span>In the <strong>{featureLabels[feature]}</strong></span>
          ),
          icon: EIconName.Place,
          matchStatus: EFeatureMatchStatus.NoPreference
        }
      case featureIds.SIZE_UNDER_1000:
      case featureIds.SIZE_1000_TO_5000:
      case featureIds.SIZE_5000_TO_10000:
      case featureIds.SIZE_10000_TO_20000:
      case featureIds.SIZE_ABOVE_20000:
        return {
          group: 1,
          label: (
            <span>Has a <strong>{featureLabels[feature]}</strong> student population</span>
          ),
          icon: EIconName.People,
          matchStatus: EFeatureMatchStatus.NoPreference
        }
      case featureIds.TYPE_PUBLIC:
      case featureIds.TYPE_PRIVATE:
        return {
          group: 1,
          label: (
            <span>Is <strong>{featureLabels[feature]}</strong></span>
          ),
          icon: EIconName.School,
          matchStatus: EFeatureMatchStatus.NoPreference
        }
      default:
        return null
        break;
    }
  }

  const getColorForMatchStatus = (matchStatus: EFeatureMatchStatus) => {
    switch (matchStatus) {
      case EFeatureMatchStatus.Match:
        return EEdmitColor.Green;
      case EFeatureMatchStatus.NotMatch:
        return EEdmitColor.Red;
      case EFeatureMatchStatus.NoPreference:
        return EEdmitColor.Grey;
    }
  }

  const getAttributes = () => {
    let attributes: { icon: EIconName, color: EEdmitColor, text: React.ReactNode | string }[] = []

    if (props.college.affordabilityDetermination === AffordabilityDetermination.Affordable) {
      attributes.push(
        {
          icon: EIconName.Success,
          color: EEdmitColor.Green,
          text: "Affordable"
        }
      )
    } else if (props.college.affordabilityDetermination === AffordabilityDetermination.NotAffordable) {
      attributes.push(
        {
          icon: EIconName.Cancel,
          color: EEdmitColor.Red,
          text: "A stretch"
        }
      )
    }

    if (props.college.valueDetermination === ValueDetermination.GoodValue) {
      attributes.push(
        {
          icon: EIconName.Success,
          color: EEdmitColor.Green,
          text: "A good value"
        }
      )
    } else if (props.college.valueDetermination === ValueDetermination.NotGoodValue) {
      attributes.push(
        {
          icon: EIconName.Cancel,
          color: EEdmitColor.Red,
          text: "Not a good value"
        }
      )
    }

    (props.college.features || [])
      .map(feature => getLabeledFeature(feature))
      .sort((f1, f2) => (f1 && f2) ? f1.group - f2.group : 0)
      .filter(labeledFeature => !!labeledFeature)
      .forEach(lf => {
        if (!!lf) {
          attributes.push(
            {
              icon: lf.icon,
              text: lf.label,
              color: getColorForMatchStatus(lf.matchStatus)
            }
          )
        }

      })

    if (props.recCollege && props.recCollege.hasMajor) {
      attributes.push(
        {
          icon: EIconName.Major,
          color: EEdmitColor.Green,
          text: "has " + props.recCollege.majorName + " major"
        }
      )
    }

    if (props.recCollege && props.recCollege.popularInMyHighSchool) {
      attributes.push(
        {
          icon: EIconName.HighSchool,
          color: EEdmitColor.Green,
          text: "is popular at my high school"
        }
      )
    }

    return attributes
  }

  const getFinancialGrade = (college: RecommendationCollege) => {
    switch (college.financialGrade) {
      case FinancialGrade.A:
        return EFinancialGrade.A
      case FinancialGrade.AMINUS:
        return EFinancialGrade.AMINUS
      case FinancialGrade.BPLUS:
        return EFinancialGrade.BPLUS
      case FinancialGrade.B:
        return EFinancialGrade.B
      case FinancialGrade.BMINUS:
        return EFinancialGrade.BMINUS
      case FinancialGrade.CPLUS:
        return EFinancialGrade.CPLUS
      case FinancialGrade.C:
        return EFinancialGrade.C
    }
  }

  const attributes = getAttributes().map(attribute => (
    <FlexItem className="pa2">
      <FlexRowContainer className="items-end">
        <FlexItem
          style={
            {
              ...cardAttributeIconStyle,
              color: attribute.color
            }
          }
          className="mr1"
        >
          <Icon name={attribute.icon}></Icon>
        </FlexItem>
        <FlexItem style={cardAttributeTextStyle}>
          {attribute.text}
        </FlexItem>
      </FlexRowContainer>
    </FlexItem>
  ))

  const collegeCard = (
    <div className="">
      <div
        {...addHoverState(setHovered)}
        className=""
      >
        <div className="relative w-100 pointer" style={{ textAlign: "right" }}>

          <MobileHidden>
            {(props.onRemove && hovered) && (
              <div onClick={props.onRemove} style={cardXButtonStyle}>
                <Icon name={EIconName.Close} style={{ color: "#fff", fontSize: "12px" }}></Icon>
              </div>
            )}
          </MobileHidden>
          <DesktopHidden>
            <div onClick={props.onRemove} style={cardXButtonStyle}>
              <Icon name={EIconName.Close} style={{ color: "#fff", fontSize: "12px" }}></Icon>
            </div>
          </DesktopHidden>
        </div>
        <div
          onClick={props.onClick}
          style={
            {
              ...ifHovered(hovered, cardStyle, cardHoverStyle),
              transition: "border 0.1s linear, box-shadow 0.1s linear",
              maxHeight: "1500px"
            }
          }
        >
          <FlexRowContainer className="pa3">
            <MobileHidden>
              <FlexItem className="mr3">
                <div style={imageStyle(props.college.coverImageUrl)}></div>
              </FlexItem>
            </MobileHidden>
            <FlexItem className="flex-auto">
              <FlexColumnContainer>
                <FlexItem style={cardHeaderStyle}>
                  {props.college.name}
                </FlexItem>
                <FlexItem>
                  <FlexRowContainer>
                    <FlexItem className="mr3 lh-copy" style={cardAttributeStyle}>{props.college.postalCode.city.name}, {props.college.postalCode.city.state.name}</FlexItem>
                  </FlexRowContainer>
                </FlexItem>
                <DesktopHidden>
                  <FlexItem className="mt3">
                    <FlexRowContainer>
                      <FlexItem className="mr3 pr3" style={{ borderRight: `1px solid ${EEdmitColor.MediumGrey}` }}>
                        <FitChip
                          size={40}
                          admissionUnlikely={false}
                          financialGrade={getFinancialGrade(props.college)}
                          loading={false}
                          className={'mt1'}
                        />
                      </FlexItem>
                      <FlexItem>
                        <FlexColumnContainer className="mt1 align-center items-justify">
                          <FlexItem>
                            <FlexRowContainer>
                              <FlexItem style={{ ...cardInformationChipTitleStyle, fontSize: undefined }} className="w-75">
                                Published Cost:
                          </FlexItem>
                              <FlexItem style={{ ...cardInformationChipValueStyle, fontSize: undefined }} className="ml2">
                                {formatDollarsWhole(props.college.costOfAttendance.value)}
                              </FlexItem>
                            </FlexRowContainer>
                          </FlexItem>
                          <FlexItem>
                            <FlexRowContainer>
                              <FlexItem style={{ ...cardInformationChipTitleStyle, fontSize: undefined }} className="w-75">
                                Your {edstimateCopy}:
                          </FlexItem>
                              <FlexItem style={{ ...cardInformationChipValueStyle, fontSize: undefined }} className="ml2">
                                {
                                  props.onClickEdstimate ? (<a
                                    onClick={() => props.onClickEdstimate && props.onClickEdstimate()}
                                    title={`See how this ${edstimateCopy} is calculated`}
                                    className={'dib no-underline bw1 pointer'}
                                    style={{
                                      borderBottomStyle: 'dotted',
                                      borderBottomWidth: 1,
                                      borderColor: EEdmitColor.Grey
                                    }}
                                  >
                                    {formatDollarsWhole(props.college.edstimate.value)}
                                  </a>
                                  ) : formatDollarsWhole(props.college.edstimate.value)
                                }
                              </FlexItem>
                            </FlexRowContainer>
                          </FlexItem>

                        </FlexColumnContainer>
                      </FlexItem>
                    </FlexRowContainer>
                  </FlexItem>
                </DesktopHidden>
                <MobileHidden>
                  <FlexItem className="mt3 w-90">
                    <FlexRowContainer className="justify-between pr4">
                      <FlexItem className="w-third">
                        <CollegeCardInformationChip
                          {
                          ...{
                            title: "Published cost",
                            value: formatDollarsWhole(props.college.costOfAttendance.value)
                          }
                          }
                        />
                      </FlexItem>
                      <FlexItem className="w-third">
                        <CollegeCardInformationChip
                          {
                          ...{
                            title: edstimateCopy,
                            value: props.onClickEdstimate ? (<a
                              onClick={() => props.onClickEdstimate && props.onClickEdstimate()}
                              title={`See how this ${edstimateCopy} is calculated`}
                              className={'dib no-underline bw1 pointer'}
                              style={{
                                borderBottomStyle: 'dotted',
                                borderBottomWidth: 1,
                                borderColor: EEdmitColor.Grey
                              }}
                            >
                              {formatDollarsWhole(props.college.edstimate.value)}
                            </a>
                            ) : formatDollarsWhole(props.college.edstimate.value)
                          }
                          }
                        />
                      </FlexItem>
                      <FlexItem className="w-third">
                        <FlexRowContainer className="items-center">
                          <FlexItem className="mr2" style={{ marginTop: -5 }}>
                            <FitChip
                              size={40}
                              admissionUnlikely={false}
                              financialGrade={getFinancialGrade(props.college)}
                              loading={false}
                              className={'mt1'}
                            />
                          </FlexItem>
                          <FlexItem style={{ marginTop: -10 }}>
                            <span style={cardInformationChipTitleStyle}>Financial<br />Grade</span>
                          </FlexItem>
                        </FlexRowContainer>
                      </FlexItem>
                    </FlexRowContainer>
                  </FlexItem>
                </MobileHidden>
              </FlexColumnContainer>
            </FlexItem>
            <MobileHidden>
              {props.callToAction && (
                <FlexItem className="tr ml3">
                  {props.callToAction}
                </FlexItem>
              )}
            </MobileHidden>
          </FlexRowContainer>
          <DesktopHidden>
            <FlexRowContainer className="ph3 pv2 w-100">
              {props.callToAction && (
                <FlexItem className="w-100">
                  {props.callToAction}
                </FlexItem>
              )}
            </FlexRowContainer>
          </DesktopHidden>
          <FlexRowContainer className="pv2 ph2" style={
            {
              ...cardFooterStyle
            }
          }>
            <MobileHidden>
              <FlexItem className="flex-auto" style={
                {
                  overflow: "hidden"
                }
              }>
                <div
                  className={`flex ${expanded ? "flex-wrap" : ""}`}
                  style={
                    {
                      width: expanded ? undefined : "1000px",
                      marginLeft: "-.25rem"
                    }
                  }
                >
                  {attributes}
                </div>
              </FlexItem>
            </MobileHidden>
            <DesktopHidden>
              <FlexColumnContainer>
                {attributes}
              </FlexColumnContainer>
            </DesktopHidden>
          </FlexRowContainer>
        </div>
      </div>
    </div>
  )

  return (
    <FlexColumnContainer className="w-100">
      <FlexItem>
        {collegeCard}
      </FlexItem>
    </FlexColumnContainer>
  )
}