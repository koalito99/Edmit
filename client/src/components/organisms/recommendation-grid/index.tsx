import * as React from 'react';
import { GET_RECOMMENDATIONS } from '../../../graphql/queries';
import {
  GetRecommendations,
  GetRecommendationsVariables,
  UpdateProfile,
  UpdateProfileVariables,
  RecommendationStudentFragment
} from '../../../graphql/generated'
import { edstimateCopy, formatDollarsWhole } from '@edmit/component-library/src/shared'
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';
import {
  CollegeId,
  Nullable,
  StudentId,
  useNullableState,
  normalizeId, useAtomicBoolean, EAtomicBoolean, CollegeModel,
} from '@edmit/component-library/src/lib/models';
import { usePaywall } from '../../../hooks/paywall';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { studentQueryProperties, useArbitraryQuery } from '../../../lib/graphql'
import { useMutation } from 'react-apollo-hooks'
import { UPDATE_PROFILE } from '../../../graphql/mutations'
import { useUpdateSmartValueRefetcher } from '../../../connectors/molecules/smart-values/shared'
import { Pair } from '@edmit/component-library/src/components/molecules/college-features'
import { Subtract } from '@edmit/component-library/src/lib/typescript'
import { CollegeList } from '@edmit/component-library/src/components/molecules/college-list';
import { CardButton } from '@edmit/component-library/src/components/molecules/college-card';
import CollegeCompareGrid from '../../../connectors/organisms/college-compare-grid';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import { FlexRowContainer, FlexItem, DesktopHidden, MobileHidden } from '@edmit/component-library/src/components/layout';

const selectRecommendations = (data: GetRecommendations) => {
  const recommendationSets: IRecommendationSet[] = data.student
    ? data.student.recommendations.map(set => {
      const recommendationColleges: RecommendationCollege[] = [];

      set.colleges.forEach(college => {
        if (college.__typename === 'College') {
          recommendationColleges.push(transformRecommendation(data.student, college))
        }
      });

      return {
        colleges: recommendationColleges,
        id: set.id,
        title: set.title
      };
    })
    : [];

  return recommendationSets;
};

export type RecommendationCollege = IRecommendationCollege & CollegeModel;

export const transformRecommendation = (student: RecommendationStudentFragment, college: CollegeModel): RecommendationCollege => {
  return {
    ...college,
    abbreviation: college.abbreviation,
    admissionUnlikely: college.admissionUnlikely,
    edstimate: college.edstimate,
    features: college.features,
    hasMajor: student.major
      ? college.majors.map(m => m.id).indexOf(student.major.id) > -1
      : false,
    popularInMyHighSchool: student.highSchool && student.highSchool.popularColleges.includes(college.id),
    id: college.id,
    location: `${college.postalCode.city.name}, ${college.postalCode.city.state.abbreviation}`,
    logoSrc: college.logo ? college.logo.url : null,
    majorName: student.major && student.major.name,
    majors: college.majors,
    gpaRange: null,
    satRange: !!college.satScoreIQR && !!college.satScoreIQR.low && !!college.satScoreIQR.high ? [college.satScoreIQR.low, college.satScoreIQR.high] : null,
    actRange: !!college.actScoreIQR && !!college.actScoreIQR.low && !!college.actScoreIQR.high ? [college.actScoreIQR.low, college.actScoreIQR.high] : null,
    name: college.name,
    recommendedReason: '',
    financialGrade: college.financialGrade,
    imageUrl: college.coverImageUrl,
    averageMeritAid: college.averageMeritScholarship,
    meritAidGenerosity: college.meritAidGenerosity,
    needBasedAidGenerosity: college.needBasedAidGenerosity
  }
}

export interface IRecommendationGridProps {
  studentId: Nullable<StudentId>;
  removedColleges: string[];
  primaryCta: string;
  primaryCtaOnClick(id: string): void;
  secondaryCta: string;
  secondaryCtaOnClick(id: string): void;
  onOpenPreferenceModal(): void;
  primaryCtaDisabled?: boolean;
  isEdmitPlus: boolean;
  updatePreferences(newPreferences: string[]): void;
  onUpgradeToEdmitPlus(): void;
  showEdstimateModal: (modal: { collegeId: string }) => any;
}

type RecommendationGridProps = IRecommendationGridProps;

const useRecommendations = (studentId: Nullable<StudentId>) => {
  return useArbitraryQuery<GetRecommendations, GetRecommendationsVariables>(GET_RECOMMENDATIONS, {
    ...studentQueryProperties(studentId)({}),
    fetchPolicy: 'no-cache'
  });
};

export const useUpdateProfile = () => {
  const { value: saving, setTrue: setSaving, setFalse: setNotSaving } = useAtomicBoolean(
    EAtomicBoolean.False
  );
  const { value: done, setTrue: setDone } = useAtomicBoolean(EAtomicBoolean.False);
  const m = useMutation<UpdateProfile, UpdateProfileVariables>(UPDATE_PROFILE);

  const mutate = async (v: UpdateProfileVariables) => {
    setSaving();
    await m({ variables: v });
    setNotSaving();
    setDone();
  };

  return {
    mutate,
    saving: saving === EAtomicBoolean.True,
    done
  };
};

const RecommendationGridWithData: React.SFC<Subtract<RecommendationGridProps, { onUpgradeToEdmitPlus: any }>> = props => {
  const { studentId } = props;

  const {
    data: recommendationsData,
    loading: recommendationsLoading,
    refetch: refetchRecommendations,
    refetching: refetchingRecommendations
  } = useRecommendations(studentId);

  useUpdateSmartValueRefetcher("recommendations", async () => { await refetchRecommendations() }, [Boolean(studentId)])

  const preferenceData = recommendationsData && recommendationsData.student &&
    recommendationsData.student.preferences &&
    recommendationsData.student.preferences
    ? recommendationsData.student.preferences.filter(p => p.value > 0).map(p => p.id)
    : [];

  const [preferences, setPreferences] = React.useState<string[]>(preferenceData)

  React.useEffect(() => {
    setPreferences(preferenceData)
  }, [preferenceData.length])

  // noinspection JSUnusedLocalSymbols
  // @ts-ignore
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: updateProfile,
    saving: savingUpdateProfile
  } = useUpdateProfile();

  const { openPlanSelectionModal, setSelectedProductId } = usePaywall();

  if (recommendationsLoading || !recommendationsData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RecommendationGrid
        {...props}
        recommendationSets={selectRecommendations(recommendationsData)}
        removedColleges={props.removedColleges}
        student={{
          highSchool: recommendationsData.student &&
            recommendationsData.student.highSchool &&
            recommendationsData.student.highSchool.popularColleges && {
              popularColleges: recommendationsData.student.highSchool.popularColleges
            },
          major: recommendationsData.student && recommendationsData.student.major,
          preferences: preferences,
          gpa: recommendationsData.student && recommendationsData.student.gradePointAverage.value,
          satScore: recommendationsData.student && recommendationsData.student.satScore.value,
          actScore: recommendationsData.student && recommendationsData.student.actScore.value
        }}
        showEdstimateModal={props.showEdstimateModal}
        refetch={async () => {
          await refetchRecommendations();
          return Promise.resolve();
        }}
        updatePreferences={async newPreferences => {
          if (!savingUpdateProfile && !refetchingRecommendations) {
            setPreferences(newPreferences)

            await updateProfile({
              data: {
                preferences: newPreferences.map(newPreference => ({
                  id: newPreference,
                  value: 1
                }))
              }
            })
            refetchRecommendations();
            props.updatePreferences(newPreferences)
          }
        }}
        onUpgradeToEdmitPlus={() => {
          setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
          openPlanSelectionModal('to Edmit Plus');
        }}
      />
    </>
  );
};

export interface IRecommendationSet {
  id: string;
  title: string;
  colleges: RecommendationCollege[];
}

export interface IRecommendationCollege {
  id: string;
  abbreviation: string;
  name: string;
  logoSrc: string | null;
  imageUrl: string | null;
  averageMeritAid: number | null;
  location: string;
  hasMajor: boolean;
  gpaRange: Pair<string> | null;
  satRange: Pair<number> | null;
  actRange: Pair<number> | null;
  recommendedReason: string;
  majorName: string | null;
  popularInMyHighSchool: boolean | null;
}

interface IRecommendationGridViewModel {
  recommendationSets: IRecommendationSet[];

  student: {
    major: {
      id: string;
      name: string;
    } | null;
    preferences?: string[];

    gpa: string | null;
    satScore: number | null;
    actScore: number | null;

    highSchool: {
      popularColleges: string[];
    } | null;
  };

}

interface IRecommendationGridActions {
  refetch: () => Promise<void>;
  showEdstimateModal: (modal: { collegeId: string }) => any;
}

type Props = IRecommendationGridActions & IRecommendationGridViewModel & IRecommendationGridProps;

const RecommendationGrid: React.SFC<Props> = props => {
  const [dismissed, setDismissed] = React.useState<string[]>([])

  const [selectedSet] = React.useState<string | null>(null);
  const [collegeAdding, setCollegeAdding] = useNullableState<CollegeId>();
  const [secondaryCtaLoading] = useNullableState<CollegeId>();

  const [moreLoadedCount, setMoreLoadedCount] = React.useState(0);

  const collegeIsAdding = (id: CollegeId) => collegeAdding === id;
  const secondaryCtaIsLoading = (id: CollegeId) => secondaryCtaLoading === id;

  let set: any = null;
  if (selectedSet) {
    set = props.recommendationSets.filter(s => s.id === selectedSet)[0];
  } else {
    set = props.recommendationSets[0];
  }

  if (!set) {
    return <span />;
  }

  const baseCount = 6;

  const shownCount = baseCount * (moreLoadedCount + 1);

  const colleges = set.colleges.slice(0, shownCount).map((college: any) => ({
    ...college,
    content: edstimateCopy,
    cost: formatDollarsWhole(college.edstimate.value),
    expanded: false,
    field: '1 year',
    id: college.id,
    infoShow: false,
    tooltip: false,
    collegeIsAdding: collegeIsAdding(college.id),
    secondaryCtaIsLoading: secondaryCtaIsLoading(college.id)
  })).filter((college: any) => props.removedColleges.indexOf(college.id) === -1);

  return (
    <>
      <div className="w-100">
        <CollegeList
          title={"College Recommendations"}
          colleges={colleges}
          recColleges={colleges}
          showEdstimateModal={(college) => props.showEdstimateModal({ collegeId: college.id })}
          onRemove={async (college) => {
            setDismissed([...dismissed, college.id])
            await props.secondaryCtaOnClick(college.id)
            await props.refetch();
          }}
          toolbar={
            () => (
              <CollegeCompareGrid
                {...props}
                colleges={colleges.filter((c: any) => dismissed.indexOf(c.id) === -1)}
                setCollegeAdding={setCollegeAdding}
                primaryCtaOnClick={async (id: CollegeId) => {
                  await props.primaryCtaOnClick(id);
                  await props.refetch();
                }}
                secondaryCtaOnClick={async (id: CollegeId) => {
                  await props.secondaryCtaOnClick(id);
                  await props.refetch();
                }}
                onOpenPreferenceModal={props.onOpenPreferenceModal}
                onUpgradeToEdmitPlus={props.onUpgradeToEdmitPlus}
                ableToLoadMore={set ? (shownCount < set.colleges.length) : false}
                onLoadMore={() => setMoreLoadedCount(moreLoadedCount + 1)}
              />
            )
          }
          callToAction={
            (college) => (
              <>
                <DesktopHidden>
                  <FlexRowContainer className="items-baseline">
                    <FlexItem className="w-100">
                      <CardButton
                        text={"Add to List"}
                        loading={collegeAdding === college.id}
                        onClick={
                          async () => {
                            setCollegeAdding(college.id)
                            await props.primaryCtaOnClick(college.id);
                            await props.refetch();
                            setCollegeAdding(null)
                          }
                        }
                      />
                    </FlexItem>
                  </FlexRowContainer>
                </DesktopHidden>
                <MobileHidden>
                  <FlexRowContainer className="items-baseline">
                    <FlexItem>
                      <CardButton
                        text={"Add to List"}
                        loading={collegeAdding === college.id}
                        onClick={
                          async () => {
                            setCollegeAdding(college.id)
                            await props.primaryCtaOnClick(college.id);
                            await props.refetch();
                            setCollegeAdding(null)
                          }
                        }
                      />
                    </FlexItem>
                  </FlexRowContainer>
                </MobileHidden>


              </>

            )
          }
        />

        {(shownCount < set.colleges.length) &&
          <div className="tc">
            <Button
              text={'Load More'}
              size={EButtonSize.Medium}
              type={EButtonType.Primary}
              onClick={() => {
                setMoreLoadedCount(moreLoadedCount + 1)
              }}
            />
          </div>}

      </div>
    </>
  );
};

export default RecommendationGridWithData;
