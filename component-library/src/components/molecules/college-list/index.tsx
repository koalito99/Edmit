import * as React from "react";
import { FlexColumnContainer, FlexItem, FlexWrappingContainer } from "../../layout";
import { CollegeCard } from "../college-card";
import { CollegeModel } from "../../../lib/models";
import { FinancialGrade } from "../../../../../client/src/graphql/generated";
import { RecommendationCollege } from "../../../../../client/src/components/organisms/recommendation-grid";

interface ICollegeListViewModel {
  colleges: CollegeModel[]
  recColleges?: RecommendationCollege[]
  title?: string
  callToAction?: (college: CollegeModel) => React.ReactNode
  toolbar: () => React.ReactNode
  onClick?: (college: CollegeModel) => any;
  headerAction?: () => React.ReactNode
  showEdstimateModal?: (college: CollegeModel) => any;
  onRemove?: (college: CollegeModel) => any;
}

type CollegeListProps = ICollegeListViewModel

const css = (properties: React.CSSProperties) => properties

const financialGradeIndex = (college: CollegeModel) => {
  switch (college.financialGrade) {
    case FinancialGrade.A:
      return 0
    case FinancialGrade.AMINUS:
      return 1
    case FinancialGrade.BPLUS:
      return 2
    case FinancialGrade.B:
      return 3
    case FinancialGrade.BMINUS:
      return 4
    case FinancialGrade.CPLUS:
      return 5
    case FinancialGrade.C:
      return 6
  }
}

export const CollegeList: React.FC<CollegeListProps> = (props) => {
  const listHeaderStyle = css({
    fontSize: "24px",
    fontFamily: "Merriweather",
    fontWeight: 900,
    color: "#282727"
  })

  return (
    <>
      <FlexColumnContainer>
        <FlexItem className="mb3">
          <FlexWrappingContainer className="items-start justify-between">
            <FlexItem className="w-100 w-75-ns">
              <span style={listHeaderStyle}>{props.title || "College List"}</span>
            </FlexItem>
            {props.headerAction && (
              <FlexItem className="w-100 w-25-ns mv2 mv0-ns">
                {props.headerAction()}
              </FlexItem>
            )}
          </FlexWrappingContainer>
        </FlexItem>
        {props.toolbar ? (
          <FlexItem className="mb3">
            {props.toolbar()}
          </FlexItem>
        ) : <span />}
        <FlexItem>
          <FlexColumnContainer>
            {
              (props.recColleges &&
                props.recColleges.sort(
                  (c1, c2) => (c1 && c2) ? financialGradeIndex(c1) - financialGradeIndex(c2) : 0
                ).map(
                  (college) => (
                    <FlexItem className="mb3">
                      <CollegeCard
                        college={college}
                        recCollege={college}
                        onRemove={() => props.onRemove ? props.onRemove(college) : undefined}
                        onClick={props.onClick ? props.onClick(college) : undefined}
                        callToAction={
                          props.callToAction ? props.callToAction(college) : null
                        }
                        onClickEdstimate={props.showEdstimateModal ?
                          () => props.showEdstimateModal && props.showEdstimateModal(college) :
                          undefined
                        }
                      />
                    </FlexItem>
                  )
                ))}

            {!props.recColleges && props.colleges.sort(
              (c1, c2) => (c1 && c2) ? financialGradeIndex(c1) - financialGradeIndex(c2) : 0
            ).map(
              (college) => (
                <FlexItem className="mb3">
                  <CollegeCard
                    college={college}
                    onRemove={() => props.onRemove ? props.onRemove(college) : undefined}
                    onClick={props.onClick ? props.onClick(college) : undefined}
                    callToAction={
                      props.callToAction ? props.callToAction(college) : null
                    }
                    onClickEdstimate={props.showEdstimateModal ?
                      () => props.showEdstimateModal && props.showEdstimateModal(college) :
                      undefined
                    }
                  />
                </FlexItem>
              )
            )
            }
          </FlexColumnContainer>
        </FlexItem>
      </FlexColumnContainer>
    </>
  )
}