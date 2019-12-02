import * as React from 'react';
import withSizes from 'react-sizes';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import {
  EAffordabilityDetermination,
  ECollegeApplicationStatus,
  ECollegeStatusMyColleges,
  EFinancialGrade,
  EGoal,
  EPersonType,
  EValueDetermination
} from '@edmit/component-library/src/shared';
import { CollegeList } from "@edmit/component-library/src/components/molecules/college-list"
import Dialog from '@edmit/component-library/src/components/molecules/dialog';
import { without } from 'lodash-es';
import Navbar from '@edmit/component-library/src/components/molecules/navbar';
import Button, {
  EButtonSize,
  EButtonType
} from '@edmit/component-library/src/components/atoms/button';
import { SetHand, SetHandVariables } from '../../../graphql/generated';
import { MutationFn } from 'react-apollo';
import { anyCollegesUsingAidAward } from '@edmit/component-library/src/lib/price';
import { RecommendationCollege } from '../../organisms/recommendation-grid';
import EdmitTooltip, {
  ETooltipType
} from '@edmit/component-library/src/components/molecules/tooltip';
import { usePaywall } from '../../../hooks/paywall';
import { normalizeId, Nullable, StudentId, CollegeModel } from '@edmit/component-library/src/lib/models';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { studentQueryProperties } from '../../../lib/graphql';
import FinancialGradeTipsCard from './financial-grade-tips-card';
import { SmartHHIFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-hhi';
import { SmartSATFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-sat';
import { SmartMajorFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-major';
import { SmartSavingsSliderProps } from '@edmit/component-library/src/components/molecules/smart-fields/slider-savings';
import { SmartWorkStudySliderProps } from '@edmit/component-library/src/components/molecules/smart-fields/slider-workstudy';
import { tipIds } from '@edmit/component-library/src/shared/tips';
import ListGradeCard from './list-grade-card';
import { CardButton } from '@edmit/component-library/src/components/molecules/college-card';
import { FlexItem, FlexRowContainer, MobileHidden, DesktopHidden } from '@edmit/component-library/src/components/layout';
import { MyCollegesCardViewReportButton } from '../../../testIds/ids';

export interface IMyCollege {
  id: string;
  name: string;
  abbreviation: string;
  logoSrc: string | null;
  statusMyColleges: ECollegeStatusMyColleges;

  firstYearEarnings: number;
  effectiveCost: number;
  edstimate: number;
  financialAidAward: number | null;
  calculationsUseAidAward: boolean;
  scholarships: string[];
  location: string;
  stickerPrice: number;
  hasMyMajor: boolean;

  midCareerEarnings: {
    totalEdstimatePrice: number;
    totalEarnings: number;
  };

  annualEarnings: Array<{
    debtRemaining: number;
    medianEarnings: number;
    year: number;
  }>;

  averageGPA: number | null;
  averageSAT: number | null;

  financialGrade: EFinancialGrade;
  admissionUnlikely: boolean;

  aidOffer: {
    award: number | null;
    letterFilename: string | null;
  };

  affordabilityDetermination: EAffordabilityDetermination;
  valueDetermination: EValueDetermination;
  applicationStatus: ECollegeApplicationStatus;
}

interface IMyCollegesPageInjectedComponents {
  smallSearchCollegesElement: JSX.Element;
  largeSearchCollegesElement: JSX.Element;
  firstCollegeTipSearchCollegesElement: JSX.Element;
  secondCollegeTipSearchCollegesElement: JSX.Element;

  HHIField: React.ComponentType<Partial<SmartHHIFieldProps>>;
  SATField: React.ComponentType<Partial<SmartSATFieldProps>>;
  MajorField: React.ComponentType<Partial<SmartMajorFieldProps>>;
  SavingsSlider: React.ComponentType<Partial<SmartSavingsSliderProps>>;
  WorkStudySlider: React.ComponentType<Partial<SmartWorkStudySliderProps>>;
}

export interface IMyCollegesPageViewModel {
  studentId: Nullable<StudentId>;
  personType: EPersonType;
  affinities: EGoal[];
  edmitPlusUser: boolean;
  handCount: number;
  myCollegesList: IMyCollege[];
  colleges: CollegeModel[];
  overallListFinancialGrade: EFinancialGrade | null;
  searchColleges: { [key: number]: string };
  highSchoolEarnings: number;

  student: {
    normalizedGPA: number | null;
    satScore: number | null;
    tips: Array<{
      id: string;
      title: string;
      text?: string;
      checked: boolean;
      userCheckable: boolean;
      dismissable: boolean;
    }>;
    bestPublicCollege: RecommendationCollege | null;
  };

  components: IMyCollegesPageInjectedComponents;

  loading: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  removeCollegeDialogShownForColleges: Array<{ id: string; name: string }> | null;
}

export interface IMyCollegesPageActions {
  setHand: MutationFn<SetHand, SetHandVariables>;
  refetch: () => Promise<void>;
  showUploadAidLetterModal: (
    college: {
      id: string;
      name: string;
      edstimate: number;
    } | null
  ) => void;
  addToMyColleges: (collegeId: string) => void;
  showRemoveCollegeDialog: (colleges: Array<{ id: string; name: string }> | null) => void;
  removeFromMyColleges: (ids: string[]) => Promise<void>;
  dismissRecommendation: (id: string) => void | Promise<void>;
  changeCollegeApplicationStatus: (collegeId: string, status: ECollegeApplicationStatus) => void;
  showPurchaseModal: any;
  onOpenPreferenceModal: () => void;
  showEdstimateModal: (modal: { collegeId: string } | null) => void;
  checkTip: (id: string) => void;
  onConsult: () => void;
  dismissTip: (tipId: string) => void;
}

type Props = IMyCollegesPageViewModel & IMyCollegesPageActions;

const useMyCollegesState = (
  colleges: IMyCollege[],
  changeCollegeApplicationStatus: (collegeId: string, status: ECollegeApplicationStatus) => void
) => {
  const [checked, setChecked] = React.useState<string[]>([]);
  const [collegeStatuses, setCollegeStatuses] = React.useState({});

  React.useEffect(() => {
    setChecked([]);
    setCollegeStatuses({});
  }, [colleges.length]);

  const setCollegeStatus = (id: string, status: ECollegeApplicationStatus) => {
    setCollegeStatuses({
      ...collegeStatuses,
      [id]: status
    });

    changeCollegeApplicationStatus(id, status);
  };

  const getIsChecked = (key: string) => checked.includes(key);

  const setIsChecked = (key: string) => {
    if (getIsChecked(key)) {
      setChecked(without(checked, key));
    } else {
      setChecked([...checked, key]);
    }
  };

  const clearIsChecked = () => setChecked([]);

  const checkedCount = checked.length;

  const checkedColleges = checked;

  const anyCollegeStatusesForActual =
    Object.keys(collegeStatuses)
      .map(id => collegeStatuses[id])
      .filter(
        status =>
          status === ECollegeApplicationStatus.Accepted ||
          // status === ECollegeApplicationStatus.Appealing ||
          status === ECollegeApplicationStatus.Attending
      ).length > 0;

  const showActualColumn = anyCollegeStatusesForActual || anyCollegesUsingAidAward(colleges);

  return {
    checkedColleges,
    checkedCount,
    clearIsChecked,
    collegeStatuses,
    getIsChecked,
    setCollegeStatus,
    setIsChecked,
    showActualColumn
  };
};

const MyCollegesPage: React.SFC<Props> = props => {
  const paywall = usePaywall();
  const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = paywall;

  const state = useMyCollegesState(props.myCollegesList, props.changeCollegeApplicationStatus);

  const viewReport = async (colleges: string[]) => {
    await props.setHand(
      studentQueryProperties(props.studentId)({
        colleges
      })
    );

    return (window.location.href = '/report');
  }

  const toolbarCompare = async () => {
    if (state.checkedColleges.length > 1 && !hasEdmitPlus) {
      setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
      return openPlanSelectionModal('to compare multiple colleges');
    } else {
      await viewReport(state.checkedColleges)
    }
  };

  const { checkedCount, checkedColleges } = state;

  const toolbarShown = checkedCount > 0;
  const compareDisabled = checkedCount > 5;

  const toolbarReportButtonText = checkedCount === 1 ? 'View' : 'Compare';

  const arrayAsFormattedString = (arr: string[]) => {
    return arr.length === 1 ? arr[0] : arr.slice(0, -1).join(', ') + ' and ' + arr.slice(-1);
  };

  const {
    firstCollegeTipSearchCollegesElement,
    secondCollegeTipSearchCollegesElement,
    HHIField,
    SATField,
    MajorField,
    SavingsSlider,
    WorkStudySlider
  } = props.components;

  return (
    <>
      {toolbarShown && (
        <Navbar fixed={true} top={48} zIndex={997} className="b--light-gray">
          <div className="w-100 center">
            <div className="pv1 tr flex">
              <div className="pa1">
                <EdmitTooltip
                  type={ETooltipType.Custom}
                  text={"You've reached the maximum number of colleges for a comparison"}
                  disabled={!compareDisabled}
                >
                  <Button
                    text={toolbarReportButtonText}
                    size={EButtonSize.Medium}
                    disabled={compareDisabled}
                    type={EButtonType.Primary}
                    onClick={() => toolbarCompare()}
                    className={'mr2'}
                  />
                </EdmitTooltip>
                <Button
                  text={'Remove'}
                  size={EButtonSize.Medium}
                  type={EButtonType.Secondary}
                  onClick={() => {
                    props.showRemoveCollegeDialog(
                      checkedColleges.map(
                        id => props.myCollegesList.find(college => college.id === id)!
                      )
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </Navbar>
      )}
      <PageContainer>
        <Dialog
          isOpen={props.removeCollegeDialogShownForColleges != null}
          header={
            props.removeCollegeDialogShownForColleges
              ? `Remove ${
              props.removeCollegeDialogShownForColleges.length <= 3
                ? arrayAsFormattedString(
                  props.removeCollegeDialogShownForColleges.map(college => college.name)
                )
                : `${props.removeCollegeDialogShownForColleges.length} colleges`
              }?`
              : ''
          }
          text={
            props.removeCollegeDialogShownForColleges
              ? `You can always add ${
              props.removeCollegeDialogShownForColleges.length === 1 ? 'it' : 'them'
              } again.`
              : ''
          }
          confirmButtonText={
            props.removeCollegeDialogShownForColleges
              ? `Remove ${
              props.removeCollegeDialogShownForColleges.length === 1 ? 'College' : 'Colleges'
              }`
              : ''
          }
          cancelButtonText={'Cancel'}
          onConfirm={async () => {
            if (props.removeCollegeDialogShownForColleges) {
              await props.removeFromMyColleges(
                props.removeCollegeDialogShownForColleges.map(college => college.id) || ''
              );
              await props.refetch();
              props.showRemoveCollegeDialog(null);
            }
          }}
          onCancel={() => props.showRemoveCollegeDialog(null)}
        />
        <div className={'mt2 mb4 w-100 flex flex-column justify-between'}>
          <div className={'flex-grow-1'}>
            {/* {props.loading ? (
              <MyCollegesTable
                {...state}
                personType={props.personType}
                colleges={dataLoadingMyCollegesList}
                mobileTable={props.isMobile || false}
                tabletTable={props.isTablet || false}
                loading={props.loading}
                onRemove={() => null}
                highlightedColumns={[]}
                showActualCost={false}
                showEdstimateModal={props.showEdstimateModal}
              />
            ) : myColleges.length !== 0 ? (
              <MyCollegesTable
                {...state}
                personType={props.personType}
                colleges={myColleges}
                mobileTable={props.isMobile || false}
                tabletTable={props.isTablet || false}
                loading={props.loading}
                onRemove={college =>
                  props.showRemoveCollegeDialog([{ name: college.name, id: college.id }])
                }
                onUploadFinAidLetter={college => props.showUploadAidLetterModal(college)}
                onChangeApplicationStatus={setCollegeStatus}
                highlightedColumns={[]}
                showActualCost={showActualColumn}
                showEdstimateModal={props.showEdstimateModal}
              />
            ) : (
                  <div className="mv5 tc mw7 center">
                    <Heading
                      size={EHeadingSize.H4}
                      text={'Hey there, it looks like there are no colleges in your list.'}
                      className="mv0"
                    />
                    <Text className="mt2 mb3">
                      To start building your list and see which colleges are a great fit, search for a
                      college below.
                </Text>
                    <div className="center mw6 ph5-l tl">{largeSearchCollegesElement}</div>
                  </div>
                )} */}
            <CollegeList
              colleges={props.colleges}
              toolbar={() => null}
              onRemove={(college) => props.showRemoveCollegeDialog([{ name: college.name, id: college.id }])}
              headerAction={() => (
                <div className="w-100">
                  {props.components.smallSearchCollegesElement}
                </div>
              )}
              showEdstimateModal={(college) => props.showEdstimateModal({ collegeId: college.id })}
              callToAction={
                (college) => (
                  <>
                    <MobileHidden>
                      <FlexRowContainer className="items-baseline">
                        <FlexItem>
                          <CardButton
                            testId={MyCollegesCardViewReportButton}
                            text={"View Report"}
                            onClick={() => viewReport([college.id])}
                          />
                        </FlexItem>
                      </FlexRowContainer>
                    </MobileHidden>
                    <DesktopHidden>
                      <FlexRowContainer className="items-baseline">
                        <FlexItem className="w-100">
                          <CardButton
                            testId={MyCollegesCardViewReportButton}
                            text={"View Report"}
                            onClick={() => viewReport([college.id])}
                          />
                        </FlexItem>
                      </FlexRowContainer>
                    </DesktopHidden>
                  </>

                )
              }
            />
          </div>
        </div>
        <div className={'pt4 pb3 pb0-ns'}>
          <div className={'flex justify-between flex-wrap items-stretch'}>
            <div className={'w-100 mb3'}>
              <ListGradeCard
                overallListFinancialGrade={props.overallListFinancialGrade}
                collegeFinancialGrades={props.myCollegesList.map(college => college.financialGrade)}
                loading={props.loading}
              />
            </div>
            <div className={'w-100 mb3'}>
              <FinancialGradeTipsCard
                tips={
                  props.loading
                    ? []
                    : props.student.tips
                      .map(tip => {
                        switch (tip.id) {
                          case tipIds.firstCollege:
                            return {
                              ...tip,
                              render: () => {
                                return <div key={tip.id}>{firstCollegeTipSearchCollegesElement}</div>
                              }
                            };
                          case tipIds.secondCollege:
                            return {
                              ...tip,
                              render: () => <div key={tip.id}>{secondCollegeTipSearchCollegesElement}</div>
                            };
                          case tipIds.updatePreferences:
                            return {
                              ...tip,
                              render: () => <div key={tip.id} />
                            };
                          case tipIds.overallListGrade:
                            return {
                              ...tip,
                              render: () => <div key={tip.id} />
                            };
                          case tipIds.hhi:
                            return {
                              ...tip,
                              render: () => (
                                <div key={tip.id} className={'flex justify-center'}>
                                  <HHIField />
                                </div>
                              )
                            };
                          case tipIds.major:
                            return {
                              ...tip,
                              render: () => {
                                return (
                                  <div key={tip.id} className={'flex justify-center'}>
                                    <MajorField />
                                  </div>
                                );
                              }
                            };
                          case tipIds.satScore:
                            return {
                              ...tip,
                              render: () => (
                                <div key={tip.id} className={'flex justify-center'}>
                                  <SATField />
                                </div>
                              )
                            };
                          case tipIds.collegeSavings:
                            return {
                              ...tip,
                              render: () => {
                                return (
                                  <div key={tip.id} className={'w-100'}>
                                    <SavingsSlider />
                                  </div>
                                );
                              }
                            };
                          case tipIds.workStudy:
                            return {
                              ...tip,
                              render: () => {
                                return (
                                  <div key={tip.id} className={'w-100'}>
                                    <WorkStudySlider />
                                  </div>
                                );
                              }
                            };
                          case tipIds.bestStateSchool:
                            return null
                          // return (
                          //   props.student.bestPublicCollege && {
                          //     ...tip,
                          //     render: () => (
                          //       <div key={tip.id} className={'flex justify-center'}>
                          //         <CollegeComparisonCard
                          //           name={props.student.bestPublicCollege!.name}
                          //           location={props.student.bestPublicCollege!.location}
                          //           imageUrl={props.student.bestPublicCollege!.imageUrl}
                          //           selectedFeatures={[]}
                          //           major={null}
                          //           gpa={null}
                          //           sat={null}
                          //           act={null}
                          //           edstimatePreference={null}
                          //           meritAidGenerosityPreference={null}
                          //           needBasedAidGenerosityPreference={null}
                          //           popularInMyHighSchoolPreferenceEnabled={true}
                          //           majors={props.student.bestPublicCollege!.majors}
                          //           features={props.student.bestPublicCollege!.features}
                          //           gpaRange={props.student.bestPublicCollege!.gpaRange}
                          //           satRange={props.student.bestPublicCollege!.satRange}
                          //           actRange={props.student.bestPublicCollege!.actRange}
                          //           meritAidGenerosity={
                          //             props.student.bestPublicCollege!.meritAidGenerosity
                          //           }
                          //           needBasedAidGenerosity={
                          //             props.student.bestPublicCollege!.needBasedAidGenerosity
                          //           }
                          //           financialGrade={
                          //             props.student.bestPublicCollege!.financialGrade
                          //           }
                          //           edstimate={props.student.bestPublicCollege!.edstimate}
                          //           averageMeritAid={
                          //             props.student.bestPublicCollege!.averageMeritAid ||
                          //             undefined
                          //           }
                          //           popularInMyHighSchool={
                          //             props.student.bestPublicCollege!.popularInMyHighSchool
                          //           }
                          //           hideDismiss={true}
                          //           onDismiss={() => { }}
                          //           onCompare={async () => {
                          //             await props.addToMyColleges(
                          //               props.student.bestPublicCollege!.id
                          //             );
                          //             await props.refetch();
                          //           }}
                          //         />
                          //       </div>
                          //     )
                          //   }
                          // );
                          case tipIds.scheduleConsult:
                            return {
                              ...tip,
                              render: () => (
                                <div key={tip.id} className={'flex justify-center'}>
                                  <Button
                                    text={'Schedule a Consult'}
                                    size={EButtonSize.Medium}
                                    type={EButtonType.Primary}
                                    onClick={props.onConsult}
                                  />
                                </div>
                              )
                            };
                          default:
                            return {
                              ...tip,
                              render: () => null
                            };
                        }
                      })
                      .filter(e => !!e)
                      .map(e => e!)
                }
                dismissTip={props.dismissTip}
                checkTip={props.checkTip}
                loading={props.loading}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640,
  isTablet: sizes.width < 960
});
export default withSizes(mapSizesToProps)(MyCollegesPage) as typeof MyCollegesPage;
