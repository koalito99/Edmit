import * as React from 'react';
import { GET_MY_COLLEGES } from '../../../graphql/queries';
import { useMutation } from 'react-apollo-hooks';
import {
  AddToMyColleges,
  AddToMyCollegesVariables,
  AffordabilityDetermination,
  CheckTip,
  CheckTipVariables,
  DismissRecommendation,
  DismissRecommendationVariables, DismissTip, DismissTipVariables,
  GetMyColleges,
  GetMyCollegesVariables,
  RemoveFromMyColleges,
  RemoveFromMyCollegesVariables,
  SetHand,
  SetHandVariables,
  UpdateCollegeApplicationStatus,
  UpdateCollegeApplicationStatusVariables,
  ValueDetermination,
} from '../../../graphql/generated'
import {
  ECollegeApplicationStatus,
  ECollegeStatusMyColleges
} from '@edmit/component-library/src/shared';
import MyCollegesPage, {
  IMyCollegesPageActions,
  IMyCollegesPageViewModel
} from '../../../components/pages/my-colleges';
import {
  ADD_TO_MY_COLLEGES,
  CHECK_TIP,
  DISMISS_RECOMMENDATION, DISMISS_TIP,
  REMOVE_FROM_MY_COLLEGES,
  SET_HAND,
  UPDATE_COLLEGE_APPLICATION_STATUS,
} from '../../../graphql/mutations'
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import ConnectedSearchColleges from '../../molecules/search-colleges';
import { personTypeFromGraphQL } from '../../../lib/auth';
import {
  fromGQLAffinity, fromGQLAffordabilityDetermination,
  fromGQLCollegeApplicationStatus, fromGQLFinancialGrade, fromGQLValueDetermination,
  toGQLCollegeApplicationStatus,
} from '../../../graphql/helpers'
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { usePaywall } from '../../../hooks/paywall';
import { Nullable, StudentId, normalizeId } from '@edmit/component-library/src/lib/models';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { studentQueryProperties, useArbitraryQuery } from '../../../lib/graphql'
import SmartHHIField from '../../molecules/smart-fields/field-hhi';
import SmartSATField from '../../molecules/smart-fields/field-sat';
import SmartMajorField from '../../molecules/smart-fields/field-major';
import { useUpdateSmartValueRefetcher } from '../../molecules/smart-values/shared';
import SmartSavingsSlider from '../../molecules/smart-fields/slider-savings';
import SmartWorkStudySlider from '../../molecules/smart-fields/slider-workstudy';
import { transformRecommendation } from '../../../components/organisms/recommendation-grid';

export interface IMyCollegesOwnProps {
  edmitPlusUser: any;
  myCollegesList: any;
  overallListFinancialGrade: any;
  recommendations: any;
  isMobile: any;
  loading: any;
  personType: any;
  affordabilityBenchmark: number;
  highSchoolEarnings: number;
  student: any;
  affinities: any;
  stage: any;
  studentId: string;

  components: any;
}

export type ConnectedMyCollegesPageViewModel = Subtract<
  IMyCollegesPageViewModel,
  IMyCollegesOwnProps
>;

export type ConnectedMyCollegesPageActions = IMyCollegesPageActions & {
  setSearchCollegesString: (index: number, query: string) => void;
  showRemoveCollegeDialog: (colleges: Array<{ id: string; name: string }> | null) => void;
  onOpenPreferenceModal: () => void;
  setCollegeAddedToastShown: (shown: boolean) => any;
};

type ConnectedMyCollegesPageProps = ConnectedMyCollegesPageViewModel &
  ConnectedMyCollegesPageActions;

const useStudentColleges = (studentId: Nullable<StudentId>) => {
  const { data, loading, refetch, refetching } = useArbitraryQuery<GetMyColleges, GetMyCollegesVariables>(
    GET_MY_COLLEGES,
    {
      ...studentQueryProperties(studentId)({}),
      fetchPolicy: 'no-cache'
    }
  );

  useUpdateSmartValueRefetcher('my-colleges', async () => void (await refetch()), [
    Boolean(studentId)
  ]);

  return {
    data,
    loading: loading || refetching || (!data ||
      !data.student ||
      !data.student.colleges),
    refetch
  };
};

const useMutations = () => {
  const setHand = useMutation<SetHand, SetHandVariables>(SET_HAND);
  const removeFromMyColleges = useMutation<RemoveFromMyColleges, RemoveFromMyCollegesVariables>(
    REMOVE_FROM_MY_COLLEGES
  );
  const updateCollegeApplicationStatus = useMutation<
    UpdateCollegeApplicationStatus,
    UpdateCollegeApplicationStatusVariables
  >(UPDATE_COLLEGE_APPLICATION_STATUS);
  const addToMyColleges = useMutation<AddToMyColleges, AddToMyCollegesVariables>(
    ADD_TO_MY_COLLEGES
  );
  const dismissRecommendation = useMutation<DismissRecommendation, DismissRecommendationVariables>(
    DISMISS_RECOMMENDATION
  );
  const dismissTip = useMutation<DismissTip, DismissTipVariables>(
    DISMISS_TIP
  );
  const checkTip = useMutation<CheckTip, CheckTipVariables>(
    CHECK_TIP
  );

  return {
    setHand,
    removeFromMyColleges,
    updateCollegeApplicationStatus,
    addToMyColleges,
    dismissRecommendation,
    checkTip,
    dismissTip
  };
};

export const ConnectedMyCollegesPage: React.SFC<ConnectedMyCollegesPageProps> = props => {
  const { studentId } = useStudentSwitcher();

  const {
    data: studentColleges,
    loading: studentCollegesLoading,
    refetch: refetchStudentColleges
  } = useStudentColleges(studentId);

  const {
    setHand,
    removeFromMyColleges,
    updateCollegeApplicationStatus,
    addToMyColleges,
    dismissRecommendation,
    checkTip,
    dismissTip
  } = useMutations();

  const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = usePaywall();

  const myCollegesList: IMyCollegesPageViewModel['myCollegesList'] =
    !studentCollegesLoading
      ? studentColleges!.student.colleges.map(college => ({
        abbreviation: college.abbreviation,
        admissibility: college.admissibility.value,
        admissionUnlikely: college.admissionUnlikely.value,
        affordabilityDetermination: fromGQLAffordabilityDetermination(college.affordabilityDetermination),
        aidAward: college.financialAidAward,
        aidOffer: {
          award: college.financialAidAward,
          letterFilename: null // TODO: fetch
        },
        annualEarnings: college.medianEarnings.reduce<
          IMyCollegesPageViewModel['myCollegesList'][0]['annualEarnings']
        >(
          (acc, netEarnings) => [
            ...acc,
            {
              debtRemaining: college.debtRemaining.find(
                record => record.year === netEarnings.year
              )!.value,
              medianEarnings: (() => {
                const currentYearMedianEarnings = college.medianEarnings.find(
                  record => record.year === netEarnings.year
                )!.value;

                const prevYear = acc.length !== 0 ? acc[acc.length - 1] : null;
                const prevYearMedianEarnings = prevYear ? (prevYear as any).medianEarnings : null;

                return prevYearMedianEarnings &&
                  currentYearMedianEarnings < prevYearMedianEarnings
                  ? prevYearMedianEarnings
                  : currentYearMedianEarnings;
              })(),
              year: netEarnings.year
            }
          ],
          []
        ),
        applicationStatus:
          (college.status && fromGQLCollegeApplicationStatus(college.status)) ||
          ECollegeApplicationStatus.Considering,
        averageGPA: college.averageGPA ? college.averageGPA.value : null,
        averageSAT: college.averageSATScore ? college.averageSATScore.value : null,
        calculationsUseAidAward: college.calculationsUseAidAward,
        edstimate: college.edstimate.value,
        effectiveCost: college.effectiveCost.value,
        financialAidAward: college.financialAidAward,
        firstYearEarnings: college.medianEarnings[0].value,
        handCount: studentColleges!.student!.hand!.current!.length || 0,
        hasMyMajor: studentColleges!.student.major
          ? college.majors.some(major => major.id === studentColleges!.student.major!.id)
          : false,
        id: college.id,
        isAGoodValue: college.valueDetermination === ValueDetermination.GoodValue,
        isAffordable:
          college.affordabilityDetermination === AffordabilityDetermination.Affordable,
        location: `${college.postalCode.city.name}, ${college.postalCode.city.state.abbreviation}`,
        logoSrc: college.logo && college.logo.url,
        midCareerEarnings: {
          totalEarnings: college.accumulatedEarnings.value,
          totalEdstimatePrice: college.edstimate.value * 4
        },
        name: college.name,
        scholarships: college.scholarships,
        statusMyColleges: ECollegeStatusMyColleges.Added,
        stickerPrice: college.costOfAttendance.value,
        financialGrade: fromGQLFinancialGrade(college.financialGrade),
        valueDetermination: fromGQLValueDetermination(college.valueDetermination)
      }))
      : [];

  const addToMyCollegesAndHand = async (collegeId: string) => {
    await addToMyColleges(
      studentQueryProperties(studentId)({
        collegesWhere: [{ id: collegeId }]
      })
    );


    props.setCollegeAddedToastShown(true);

    setTimeout(() => {
      props.setCollegeAddedToastShown(false);
    }, 3000);

    window.analytics.track('add_college', {
      collegeId,
      from: 'My Colleges',
      studentId
    });

    refetchStudentColleges();
  };

  return (
    <MyCollegesPage
      {...props}
      refetch={async () => {
        await refetchStudentColleges();
        return Promise.resolve();
      }}
      studentId={studentId}
      setHand={setHand}
      personType={personTypeFromGraphQL(
        (studentColleges &&
          studentColleges.student &&
          studentColleges.student.person &&
          studentColleges.student.person.type) ||
        null
      )}
      affinities={
        (studentColleges &&
          studentColleges.student &&
          studentColleges.student.person &&
          studentColleges.student.person.affinities &&
          studentColleges.student.person.affinities.map(affinity => fromGQLAffinity(affinity))) ||
        []
      }
      edmitPlusUser={false}
      removeFromMyColleges={async (ids: string[]) => {
        await removeFromMyColleges(
          studentQueryProperties(studentId)({
            collegesWhere: ids.map(id => ({ id }))
          })
        );

        window.analytics.track('Removed Colleges from My Colleges', {
          collegeIds: ids,
          from: 'My Colleges',
          studentId
        });

        await refetchStudentColleges();
      }}
      myCollegesList={myCollegesList}
      colleges={(studentColleges && studentColleges.student) ? studentColleges.student.colleges : []}
      overallListFinancialGrade={(studentColleges && studentColleges.student && studentColleges.student.overallGrade && fromGQLFinancialGrade(studentColleges.student.overallGrade)) || null}
      addToMyColleges={async (collegeId: string) => {
        await addToMyCollegesAndHand(collegeId);
        props.addToMyColleges(collegeId);
      }}
      changeCollegeApplicationStatus={async (collegeId, status) => {
        await updateCollegeApplicationStatus(
          studentQueryProperties(studentId)({
            collegeId,
            status: toGQLCollegeApplicationStatus(status)
          })
        );
        window.analytics.track('Updated College Application Status', {
          collegeId,
          status
        });
      }}
      student={{
        normalizedGPA:
          studentColleges && studentColleges.student
            ? studentColleges.student.normalizedGPA.value
            : null,
        satScore:
          studentColleges && studentColleges.student
            ? studentColleges.student.satScore.value
            : null,
        tips:
          studentColleges && studentColleges.student ? studentColleges.student.tips : [],
        bestPublicCollege:
          studentColleges && studentColleges.student && studentColleges.student.bestPublicCollege ? transformRecommendation(studentColleges.student, studentColleges.student.bestPublicCollege) : null
      }}
      highSchoolEarnings={50000}
      onOpenPreferenceModal={() => {
        if (!hasEdmitPlus) {
          setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
          return openPlanSelectionModal('to set your recommendation preferences');
        }

        props.onOpenPreferenceModal();
      }}
      dismissRecommendation={async id => {
        await dismissRecommendation({
          variables: { collegeId: id, studentId: studentId!, reason: 'NO REASON' }
        });
        props.dismissRecommendation(id);
      }}
      dismissTip={async tipId => {
        await dismissTip({
          variables: { studentId: studentId!, tipId }
        })
        await refetchStudentColleges()
        props.dismissTip(tipId)
      }}
      checkTip={async id => {
        await checkTip({
          variables: { studentId: studentId!, tipId: id }
        });
        await refetchStudentColleges()
        props.checkTip(id)
      }}

      components={{
        smallSearchCollegesElement: (
          <ConnectedSearchColleges
            inputValue={props.searchColleges[0]}
            onSearch={query => props.setSearchCollegesString(0, query)}
            selected={null}
            onSelected={async option => {
              props.setSearchCollegesString(0, '');

              if (option.collegeStatusMyColleges === ECollegeStatusMyColleges.NotAdded) {
                await addToMyCollegesAndHand(option.id);
              }
            }}
            myColleges={myCollegesList}
          />
        ),
        largeSearchCollegesElement: (
          <ConnectedSearchColleges
            inputValue={props.searchColleges[1]}
            onSearch={query => props.setSearchCollegesString(1, query)}
            onSelected={async option => {
              if (option.collegeStatusMyColleges === ECollegeStatusMyColleges.NotAdded) {
                await addToMyCollegesAndHand(option.id);
              }
            }}
            myColleges={myCollegesList}
          />
        ),

        firstCollegeTipSearchCollegesElement: <span />,
        secondCollegeTipSearchCollegesElement: <span />,
        HHIField: fieldProps => <SmartHHIField {...fieldProps} />,
        SATField: fieldProps => <SmartSATField {...fieldProps} />,
        MajorField: fieldProps => <SmartMajorField {...fieldProps} />,
        SavingsSlider: sliderProps => <SmartSavingsSlider {...sliderProps} />,
        WorkStudySlider: sliderProps => <SmartWorkStudySlider {...sliderProps} />
      }}

      loading={studentCollegesLoading}
    />
  );
};

export default ConnectedMyCollegesPage;
