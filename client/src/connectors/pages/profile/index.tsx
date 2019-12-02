import * as React from 'react';
import ProfilePage, {
  IProfilePageActions,
  IProfilePageViewModel
} from '../../../components/pages/profile';
import ConnectedSearchHighSchools from '../../molecules/search-high-schools';
import ConnectedSearchZipCodes from '../../molecules/search-zip-codes';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import { Mutation, Query } from 'react-apollo';
import {
  GetCollegeComparisonVariables,
  GetMajors,
  GetProfile,
  GetProfileVariables,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
import { GET_COLLEGE_COMPARISON, GET_MAJORS, GET_PROFILE } from '../../../graphql/queries';
import { UPDATE_PROFILE } from '../../../graphql/mutations';
import { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import SearchHighSchools, {
  ISearchHighSchoolOption
} from '@edmit/component-library/src/components/molecules/search-high-schools';
import SearchZipCodes, {
  ISearchZipCodesOption
} from '@edmit/component-library/src/components/molecules/search-zip-codes';
import { personTypeFromGraphQL } from '../../../lib/auth';
import { isUserValue } from '../../../graphql/helpers';
import { usePaywall } from '../../../hooks/paywall';
import { Nullable, StudentId, normalizeId } from '@edmit/component-library/src/lib/models';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { EPersonType } from '@edmit/component-library/src/shared'
import { studentQueryProperties } from '../../../lib/graphql'

export type ConnectedProfilePageViewModel = Subtract<
  IProfilePageViewModel,
  {
    searchHighSchoolsComponent: any;
    searchZipCodesComponent: any;
    loading: any;
    values: any;
    savePasswordState: any;
    edmitPlusUser: any;
    personType: any;
    majors: any;
  }
> & {
  searchHighSchoolQuery: string | null;
  searchZipCodeQuery: string | null;

  studentId: Nullable<StudentId>;
};

export type ConnectedProfilePageActions = Subtract<
  IProfilePageActions,
  {
    onSavePassword: (password: string) => void;
    onUpdateProfile: any;
  }
> & {
  selectHighSchool: (option: ISearchHighSchoolOption) => void;
  selectZipCode: (option: ISearchZipCodesOption) => void;

  setSearchHighSchoolQuery: (query: string) => void;
  setSearchZipCodeQuery: (query: string) => void;
};

type ConnectedProfilePageProps = ConnectedProfilePageViewModel & ConnectedProfilePageActions;

const ConnectedProfilePage: React.SFC<ConnectedProfilePageProps> = props => {
  const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = usePaywall();
  return (
    <Query<GetMajors> query={GET_MAJORS} variables={{}}>
      {getMajorsQuery => (
        <Query<GetProfile, GetProfileVariables>
          query={GET_PROFILE}
          {...studentQueryProperties(props.studentId)({})}
          fetchPolicy="network-only"
        >
          {getProfileQuery => {
            if (
              getProfileQuery.loading ||
              getProfileQuery.data == null ||
              getProfileQuery.data.session!.account == null
            ) {
              return (
                <ProfilePage
                  {...props}
                  personType={EPersonType.STUDENT}
                  majors={[]}
                  selectedHighSchool={null}
                  selectedZipCode={null}
                  values={{
                    actScore: null,
                    cashContributionAmount: null,
                    collegeSavingsPlanAmount: null,
                    efc: null,
                    firstName: '',
                    gradePointAverage: null,
                    graduationYear: null,
                    highSchoolId: null,
                    householdIncome: null,
                    isWeighted: false,
                    lastName: '',
                    majorId: null,
                    otherScholarshipsAmount: null,
                    postalCodeId: null,
                    psatScore: null,
                    satScore: null,
                    weightedMaximum: null,
                    workStudyAmount: null
                  }}
                  edmitPlusUser={hasEdmitPlus}
                  savePasswordState={ESubmitState.Default}
                  searchHighSchoolsComponent={
                    <SearchHighSchools options={[]} onSearch={() => null} />
                  }
                  searchZipCodesComponent={<SearchZipCodes options={[]} onSearch={() => null} />}
                  onSavePassword={password => null}
                  onUpdateProfile={() => null}
                  onUpgrade={() => null}
                  loading={true}
                />
              );
            }

            const fetchedPostalCode =
              getProfileQuery.data.student.household &&
                getProfileQuery.data.student.household.postalCode
                ? {
                  id: getProfileQuery.data.student.household.postalCode.id,
                  label: getProfileQuery.data.student.household.postalCode.postalCode
                }
                : null;

            const fetchedHighSchool = getProfileQuery.data.student.highSchool
              ? {
                id: getProfileQuery.data.student.highSchool.id,
                name: getProfileQuery.data.student.highSchool.name,
                zipCode: getProfileQuery.data.student.highSchool.postalCode.postalCode
              }
              : null;

            const household = getProfileQuery.data.student.household;

            const householdPostalCode = household && household.postalCode;

            const profileLoading =
              getProfileQuery.loading ||
              getProfileQuery.data == null ||
              getProfileQuery.data.student == null ||
              getProfileQuery.data.session == null;
            const majorsLoading = getMajorsQuery.loading || getMajorsQuery.data == null;

            return (
              <Mutation<UpdateProfile, UpdateProfileVariables>
                mutation={UPDATE_PROFILE}
                refetchQueries={[
                  {
                    query: GET_COLLEGE_COMPARISON,
                    variables: { studentId: props.studentId } as GetCollegeComparisonVariables
                  }
                ]}
              >
                {(updateProfile, mutationState) => (
                  <ProfilePage
                    {...props}
                    personType={personTypeFromGraphQL(
                      (!profileLoading &&
                        getProfileQuery.data!.session!.account &&
                        getProfileQuery.data!.session!.account.person &&
                        getProfileQuery.data!.session!.account.person!.type) ||
                      null
                    )}
                    majors={
                      !majorsLoading
                        ? getMajorsQuery
                          .data!.majors.sort((a, b) =>
                            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                          )
                          .map(major => ({
                            id: major.id,
                            name: major.name
                          }))
                        : []
                    }
                    values={{
                      actScore:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.actScore) &&
                          getProfileQuery.data!.student.actScore.value) ||
                        null,
                      cashContributionAmount:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.cashContributionAmount) &&
                          getProfileQuery.data!.student.cashContributionAmount.value) ||
                        null,
                      collegeSavingsPlanAmount:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.collegeSavingsAmount) &&
                          getProfileQuery.data!.student!.collegeSavingsAmount.value) ||
                        null,
                      efc:
                        !profileLoading &&
                          getProfileQuery.data!.student!.household &&
                          isUserValue(getProfileQuery.data!.student.household!.efc) &&
                          getProfileQuery.data!.student!.household!.efc.value !== null
                          ? getProfileQuery.data!.student!.household!.efc.value
                          : null,
                      firstName: getProfileQuery.data!.session!.account!.person!.firstName || '',
                      gradePointAverage:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.gradePointAverage) &&
                          getProfileQuery.data!.student.gradePointAverage.value) ||
                        null,
                      graduationYear: getProfileQuery.data!.student.highSchoolGraduationYear.value,
                      highSchoolId: fetchedHighSchool ? fetchedHighSchool.id : null, // FIXME - change to id
                      householdIncome:
                        (!profileLoading &&
                          getProfileQuery.data!.student!.household &&
                          isUserValue(getProfileQuery.data!.student.household!.income) &&
                          getProfileQuery.data!.student!.household!.income.value) ||
                        null,
                      isWeighted: Boolean(
                        !profileLoading &&
                        isUserValue(
                          getProfileQuery.data!.student.weightedGradePointAverageMaximum
                        ) &&
                        getProfileQuery.data!.student.weightedGradePointAverageMaximum.value
                      ),
                      lastName: getProfileQuery.data!.session!.account!.person!.lastName || '',
                      majorId: getProfileQuery.data!.student!.major
                        ? getProfileQuery.data!.student!.major!.id
                        : null,
                      otherScholarshipsAmount:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.otherScholarshipsAmount) &&
                          getProfileQuery.data!.student!.otherScholarshipsAmount.value) ||
                        null,
                      postalCodeId: householdPostalCode ? householdPostalCode.id : null,
                      psatScore:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.psatScore) &&
                          getProfileQuery.data!.student.psatScore.value) ||
                        null,
                      satScore:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.satScore) &&
                          getProfileQuery.data!.student.satScore.value) ||
                        null,
                      weightedMaximum:
                        (!profileLoading &&
                          isUserValue(
                            getProfileQuery.data!.student.weightedGradePointAverageMaximum
                          ) &&
                          getProfileQuery.data!.student.weightedGradePointAverageMaximum.value) ||
                        null,
                      workStudyAmount:
                        (!profileLoading &&
                          isUserValue(getProfileQuery.data!.student.workStudyAmount) &&
                          getProfileQuery.data!.student.workStudyAmount.value) ||
                        null
                    }}
                    searchHighSchoolsComponent={
                      <ConnectedSearchHighSchools
                        defaultOption={props.selectedHighSchool || fetchedHighSchool || undefined}
                        selected={
                          props.selectedHighSchool
                            ? props.selectedHighSchool
                            : fetchedHighSchool || undefined
                        }
                        inputValue={props.searchHighSchoolQuery || ''}
                        onSearch={query => props.setSearchHighSchoolQuery(query)}
                        onSelected={props.selectHighSchool}
                      />
                    }
                    searchZipCodesComponent={
                      <ConnectedSearchZipCodes
                        defaultOption={props.selectedZipCode || fetchedPostalCode || undefined}
                        selected={props.selectedZipCode || fetchedPostalCode || undefined}
                        inputValue={props.searchZipCodeQuery || ''}
                        onSearch={query => props.setSearchZipCodeQuery(query)}
                        onSelected={props.selectZipCode}
                      />
                    }
                    edmitPlusUser={hasEdmitPlus}
                    onSavePassword={async password => {
                      await updateProfile({ variables: { data: { password } } });

                      window.analytics.track('Updated Profile', {
                        from: 'Profile',
                        studentId: props.studentId
                      });
                    }}
                    onUpdateProfile={async values => {
                      await updateProfile({
                        variables: {
                          data: {
                            actScore: {
                              value: values.actScore
                            },
                            cashContributionAmount: {
                              value: values.cashContributionAmount
                            },
                            collegeSavingsPlanAmount: {
                              value: values.collegeSavingsPlanAmount
                            },
                            efc: {
                              value: values.efc
                            },
                            firstName: values.firstName,
                            gradePointAverage: {
                              value: values.gradePointAverage || null
                            },
                            highSchoolGraduationYear: {
                              value: values.graduationYear
                            },
                            highSchoolId: values.highSchoolId,
                            householdIncome: {
                              value: values.householdIncome
                            },
                            lastName: values.lastName,
                            majorId: values.majorId,
                            otherScholarshipsAmount: {
                              value: values.otherScholarshipsAmount
                            },
                            postalCodeId: values.postalCodeId,
                            psatScore: {
                              value: values.psatScore
                            },
                            satScore: {
                              value: values.satScore
                            },
                            weightedGradePointAverageMaximum: {
                              value: values.weightedMaximum
                            },
                            workStudyAmount: {
                              value: values.workStudyAmount
                            }
                          }
                        }
                      });

                      window.analytics.track('Updated Profile', {
                        from: 'Profile',
                        studentId: props.studentId
                      });

                      getProfileQuery.refetch();
                    }}
                    onUpgrade={() => {
                      window.analytics.track('Requested Upgrade', {
                        from: 'Profile',
                        studentId: props.studentId
                      });
                      setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
                      openPlanSelectionModal("to Edmit Plus")
                    }}
                    savePasswordState={
                      mutationState.loading ? ESubmitState.Submitted : ESubmitState.Default
                    }
                    loading={profileLoading || majorsLoading}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
      )}
    </Query>
  );
};

export default ConnectedProfilePage;
