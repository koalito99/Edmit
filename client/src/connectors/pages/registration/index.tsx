import * as React from 'react';
import OnboardingPageNew, {
  IOnboardingPageNewActions,
  IOnboardingPageNewViewModel
} from '../../../components/pages/registration';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import ConnectedSearchColleges from '../../molecules/search-colleges';
import { Mutation, Query } from 'react-apollo';
import {
  AddToHand,
  AddToHandVariables,
  AddToMyColleges,
  AddToMyCollegesVariables,
  GetMyColleges,
  GetMyCollegesVariables,
  GetRegisteringStudentAccount,
  GetRegisteringStudentAccountVariables,
  Signup,
  SignupVariables,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
import { GET_MY_COLLEGES, GET_REGISTERING_STUDENT_ACCOUNT } from '../../../graphql/queries';
import {
  ADD_TO_HAND,
  ADD_TO_MY_COLLEGES,
  SIGNUP,
  UPDATE_PROFILE
} from '../../../graphql/mutations';
import ConnectedSearchZipCodes from '../../molecules/search-zip-codes';
import { isUserValue, toGQLAffinity } from '../../../graphql/helpers';
import { personTypeFromGraphQL, personTypeToGraphQL } from '../../../lib/auth';
import { EPersonType } from '@edmit/component-library/src/shared'
import { studentQueryProperties } from '../../../lib/graphql'
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';

const fromGraduationYearToStudentYear = (year: number | null): 'Senior' | 'Junior' | 'Other' => {
  const currentYear = new Date().getFullYear();

  if (year === currentYear) {
    return 'Senior';
  } else if (year === currentYear + 1) {
    return 'Junior';
  } else {
    return 'Other';
  }
};

const toGraduationYearFromStudentYear = (year: 'Senior' | 'Junior' | 'Other'): number | null => {
  const currentYear = new Date().getFullYear();

  if (year === 'Senior') {
    return currentYear;
  } else if (year === 'Junior') {
    return currentYear + 1;
  } else {
    return null;
  }
};

export type ConnectedOnboardingPageNewViewModel = Subtract<
  IOnboardingPageNewViewModel,
  {
    myCollegesList: any;
    searchZipCodeComponent: any;
    firstSearchCollegesComponent: any;
    secondSearchCollegesComponent: any;
    initialValues: any;
    onboardingColleges: any;
    isSaving: any;
    loadingOnboardingColleges: any;
    signupError: any;
    stateAbbreviation: any;
    cityName: any;
    loading: any;
  }
>;

export type ConnectedOnboardingPageNewActions = Subtract<
  IOnboardingPageNewActions,
  {
    signup: any;
    updateProfile: any;
    addToList: any;
    refetchOnboardingColleges: any;
    refetchProfile: any;
  }
>;

type ConnectedOnboardingPageNewProps = ConnectedOnboardingPageNewViewModel &
  ConnectedOnboardingPageNewActions;

const ConnectedOnboardingPageNew: React.SFC<ConnectedOnboardingPageNewProps> = props => {

  return (
    <Query<GetMyColleges, GetMyCollegesVariables>
      query={GET_MY_COLLEGES}
      {...studentQueryProperties(props.studentId)({})}
    >
      {myCollegesQuery => (
        <Query<GetRegisteringStudentAccount, GetRegisteringStudentAccountVariables>
          query={GET_REGISTERING_STUDENT_ACCOUNT}
          {...studentQueryProperties(props.studentId)({})}
        >
          {getOnboardingStudentQuery => (
            <Mutation<UpdateProfile, UpdateProfileVariables> mutation={UPDATE_PROFILE}>
              {updateProfile => (
                <Mutation<AddToMyColleges, AddToMyCollegesVariables> mutation={ADD_TO_MY_COLLEGES}>
                  {addToMyColleges => (
                    <Mutation<AddToHand, AddToHandVariables> mutation={ADD_TO_HAND}>
                      {addToHand => (
                        <Mutation<Signup, SignupVariables> mutation={SIGNUP}>
                          {(signup, { data }) => {
                            if (
                              !(getOnboardingStudentQuery.data && getOnboardingStudentQuery.data.student)
                            ) {
                              return (<LoadingSpinner />)
                            }


                            return (
                              <OnboardingPageNew
                                {...props}
                                signup={async (emailAddress: string, password: string) => {
                                  const signupResult = await signup({
                                    variables: { emailAddress, password }
                                  });
                                  const error =
                                    signupResult && signupResult.data
                                      ? signupResult.data.signup.error
                                      : null;

                                  if (!error) {
                                    window.analytics.track('Account Created', {
                                      from: 'Onboarding',
                                      studentId: props.studentId
                                    });

                                    return { errors: null };
                                  }

                                  return { errors: [error] };
                                }}
                                addToList={async collegeId => {
                                  await addToHand(
                                    studentQueryProperties(props.studentId)({
                                      collegesWhere: [{ id: collegeId }]
                                    })
                                  );
                                  window.analytics.track('add_college', {
                                    collegeId,
                                    from: 'Onboarding',
                                    studentId: props.studentId
                                  });

                                  await addToMyColleges(
                                    studentQueryProperties(props.studentId)({
                                      collegesWhere: [{ id: collegeId }]
                                    })
                                  );

                                  window.analytics.track('add_college', {
                                    collegeId,
                                    from: 'Onboarding',
                                    studentId: props.studentId
                                  });
                                }}
                                updateProfile={async (values, initialValues) => {
                                  await updateProfile({
                                    variables: {
                                      data: {
                                        accountType:
                                          (values.accountType !== undefined &&
                                            personTypeToGraphQL(values.accountType)) ||
                                          null,
                                        actScore:
                                          values.actScore !== undefined &&
                                            initialValues.actScore !== values.actScore
                                            ? {
                                              value: values.actScore
                                            }
                                            : null,
                                        affinities:
                                          values.affinities &&
                                          values.affinities.map(priority =>
                                            toGQLAffinity(priority.content)
                                          ),
                                        firstName: values.firstName,
                                        gradePointAverage:
                                          values.gradePointAverage !== undefined &&
                                            initialValues.gradePointAverage !==
                                            values.gradePointAverage
                                            ? {
                                              value: values.gradePointAverage
                                            }
                                            : null,
                                        highSchoolGraduationYear: values.studentYear
                                          ? {
                                            value: toGraduationYearFromStudentYear(
                                              values.studentYear
                                            )
                                          }
                                          : null,
                                        lastName: values.lastName,
                                        postalCodeId: values.zipCodeId,
                                        psatScore:
                                          values.psatScore !== undefined &&
                                            initialValues.psatScore !== values.psatScore
                                            ? {
                                              value: values.psatScore
                                            }
                                            : null,
                                        satScore:
                                          values.satScore !== undefined &&
                                            initialValues.satScore !== values.satScore
                                            ? {
                                              value: values.satScore
                                            }
                                            : null
                                      }
                                    }
                                  });

                                  window.analytics.track('Updated Profile', {
                                    from: 'Onboarding',
                                    studentId: props.studentId
                                  });
                                }}
                                refetchProfile={() => getOnboardingStudentQuery.refetch()}
                                initialValues={{
                                  accountType:
                                    (getOnboardingStudentQuery.data!.student.person &&
                                      personTypeFromGraphQL(
                                        getOnboardingStudentQuery.data!.student.person!.type
                                      )) ||
                                    EPersonType.PARENT,
                                  actScore: isUserValue(
                                    getOnboardingStudentQuery.data!.student.actScore
                                  )
                                    ? getOnboardingStudentQuery.data!.student.actScore.value
                                    : null,
                                  emailAddress: null,
                                  firstName: getOnboardingStudentQuery.data!.student.person
                                    ? getOnboardingStudentQuery.data!.student.person!.firstName
                                    : null,
                                  gradePointAverage: isUserValue(
                                    getOnboardingStudentQuery.data!.student.gradePointAverage
                                  )
                                    ? getOnboardingStudentQuery.data!.student.gradePointAverage
                                      .value
                                    : null,
                                  lastName: getOnboardingStudentQuery.data!.student.person
                                    ? getOnboardingStudentQuery.data!.student.person!.lastName
                                    : null,
                                  password: null,
                                  psatScore: isUserValue(
                                    getOnboardingStudentQuery.data!.student.psatScore
                                  )
                                    ? getOnboardingStudentQuery.data!.student.psatScore.value
                                    : null,
                                  satScore: isUserValue(
                                    getOnboardingStudentQuery.data!.student.satScore
                                  )
                                    ? getOnboardingStudentQuery.data!.student.satScore.value
                                    : null,
                                  studentYear: getOnboardingStudentQuery.data!.student
                                    .highSchoolGraduationYear
                                    ? fromGraduationYearToStudentYear(
                                      getOnboardingStudentQuery.data!.student
                                        .highSchoolGraduationYear.value
                                    )
                                    : 'Senior'
                                }}
                                searchZipCodeComponent={searchProps => (
                                  <ConnectedSearchZipCodes
                                    inputValue={''}
                                    onSearch={() => null}
                                    {...searchProps}
                                  />
                                )}
                                firstSearchCollegesComponent={searchProps => (
                                  <ConnectedSearchColleges
                                    inputValue={''}
                                    onSearch={() => null}
                                    myColleges={[]}
                                    {...searchProps}
                                  />
                                )}
                                secondSearchCollegesComponent={searchProps => (
                                  <ConnectedSearchColleges
                                    inputValue={''}
                                    onSearch={() => null}
                                    myColleges={[]}
                                    {...searchProps}
                                  />
                                )}
                                onboardingColleges={
                                  (myCollegesQuery.data &&
                                    myCollegesQuery.data.student &&
                                    myCollegesQuery.data.student.colleges.map(college => ({
                                      edstimate: college.edstimate.value,
                                      id: college.id,
                                      name: college.name
                                    }))) ||
                                  []
                                }
                                refetchOnboardingColleges={() => myCollegesQuery.refetch()} // FIXME
                                cityName={
                                  getOnboardingStudentQuery.data &&
                                    getOnboardingStudentQuery.data.student.household &&
                                    getOnboardingStudentQuery.data.student.household.postalCode
                                    ? getOnboardingStudentQuery.data.student.household.postalCode
                                      .city.name
                                    : ''
                                }
                                stateAbbreviation={
                                  getOnboardingStudentQuery.data &&
                                    getOnboardingStudentQuery.data.student.household &&
                                    getOnboardingStudentQuery.data.student.household.postalCode
                                    ? getOnboardingStudentQuery.data.student.household.postalCode
                                      .city.state.abbreviation
                                    : ''
                                }
                                loading={false}
                              />
                            );
                          }
                          }
                        </Mutation>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Query>
      )}
    </Query>
  );
};

export default ConnectedOnboardingPageNew;
