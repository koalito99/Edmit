import * as React from 'react';
import OnboardingFormPage, {
  IOnboardingFormPageActions,
  IOnboardingFormPageViewModel
} from '../../../components/pages/onboarding-form';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import { Mutation, Query } from 'react-apollo';
import {
  AddToHand,
  AddToHandVariables,
  AddToMyColleges,
  AddToMyCollegesVariables,
  GetOnboardingFormStudent,
  GetOnboardingFormStudentVariables,
  PersonType,
  Signup,
  SignupVariables,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
import { GET_ONBOARDING_FORM_STUDENT } from '../../../graphql/queries';
import {
  ADD_TO_HAND,
  ADD_TO_MY_COLLEGES,
  SIGNUP,
  UPDATE_PROFILE
} from '../../../graphql/mutations';
import SearchZipCodes from '@edmit/component-library/src/components/molecules/search-zip-codes';
import ConnectedSearchZipCodes from '../../molecules/search-zip-codes';
import SearchColleges from '@edmit/component-library/src/components/molecules/search-colleges';
import ConnectedSearchColleges from '../../molecules/search-colleges';
import { isUserValue, toGQLAffinity } from '../../../graphql/helpers';
import { personTypeToGraphQL } from '../../../lib/auth';
import { studentQueryProperties } from '../../../lib/graphql'

export type ConnectedOnboardingFormPageViewModel = Subtract<
  IOnboardingFormPageViewModel,
  {
    searchZipCodeComponent: any;
    searchCollegesComponent: any;
    initialValues: any;
    isSaving: any;
    signupError: any;
    stateAbbreviation: any;
    cityName: any;
  }
>;

export type ConnectedOnboardingFormPageActions = Subtract<
  IOnboardingFormPageActions,
  {
    signup: any;
    updateProfile: any;
    addToList: any;
    refetchOnboardingColleges: any;
  }
>;

type ConnectedOnboardingFormPageProps = ConnectedOnboardingFormPageViewModel &
  ConnectedOnboardingFormPageActions;

const ConnectedOnboardingFormPage: React.SFC<ConnectedOnboardingFormPageProps> = props => {
  return (
    <Query<GetOnboardingFormStudent, GetOnboardingFormStudentVariables>
      query={GET_ONBOARDING_FORM_STUDENT}
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
                          getOnboardingStudentQuery.loading === true ||
                          getOnboardingStudentQuery.data == null
                        ) {
                          return (
                            <OnboardingFormPage
                              {...props}
                              initialValues={{
                                accountType: null,
                                actScore: null,
                                emailAddress: null,
                                firstCollege: null,
                                firstName: null,
                                gradePointAverage: null,
                                lastName: null,
                                password: null,
                                psatScore: null,
                                satScore: null,
                                zipCode: null
                              }}
                              isSaving={false}
                              searchZipCodeComponent={() => (
                                <SearchZipCodes options={[]} onSearch={() => null} />
                              )}
                              searchCollegesComponent={() => (
                                <SearchColleges options={[]} onSearch={() => null} />
                              )}
                              signup={async () => ({ errors: [] })}
                              addToList={async () => {
                                return;
                              }}
                              updateProfile={async () => {
                                return;
                              }}
                              cityName=""
                              stateAbbreviation=""
                            />
                          );
                        }

                        return (
                          <OnboardingFormPage
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
                            updateProfile={async fields => {
                              await updateProfile({
                                variables: {
                                  data: {
                                    accountType: fields.accountType
                                      ? personTypeToGraphQL(fields.accountType)
                                      : PersonType.Parent,
                                    actScore: {
                                      value: fields.actScore
                                    },
                                    affinities: fields.fitScorePriorities.map(priority =>
                                      toGQLAffinity(priority.content)
                                    ),
                                    firstName: fields.firstName,
                                    gradePointAverage: {
                                      value: fields.gradePointAverage
                                    },
                                    lastName: fields.lastName,
                                    postalCodeId: fields.zipCode && fields.zipCode.id,
                                    psatScore: {
                                      value: fields.psatScore
                                    },
                                    satScore: {
                                      value: fields.satScore
                                    }
                                  }
                                }
                              });

                              window.analytics.track('Updated Profile', {
                                from: 'Onboarding',
                                studentId: props.studentId
                              });
                            }}
                            initialValues={{
                              accountType: null,
                              actScore: isUserValue(
                                getOnboardingStudentQuery.data!.student.actScore
                              )
                                ? getOnboardingStudentQuery.data!.student.actScore.value
                                : null,
                              emailAddress: null,
                              firstCollege: null,
                              firstName: getOnboardingStudentQuery.data!.student.person
                                ? getOnboardingStudentQuery.data!.student.person!.firstName
                                : null,
                              gradePointAverage: isUserValue(
                                getOnboardingStudentQuery.data!.student.gradePointAverage
                              )
                                ? getOnboardingStudentQuery.data!.student.gradePointAverage.value
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
                              zipCode:
                                (getOnboardingStudentQuery.data!.student.household &&
                                  getOnboardingStudentQuery.data!.student.household!.postalCode && {
                                    id: getOnboardingStudentQuery.data!.student.household!
                                      .postalCode!.id,
                                    label: getOnboardingStudentQuery.data!.student.household!
                                      .postalCode!.postalCode
                                  }) ||
                                null
                            }}
                            searchZipCodeComponent={ConnectedSearchZipCodes}
                            searchCollegesComponent={ConnectedSearchColleges}
                            cityName={
                              getOnboardingStudentQuery.data &&
                                getOnboardingStudentQuery.data.student.household &&
                                getOnboardingStudentQuery.data.student.household.postalCode
                                ? getOnboardingStudentQuery.data.student.household.postalCode.city
                                  .name
                                : ''
                            }
                            stateAbbreviation={
                              getOnboardingStudentQuery.data &&
                                getOnboardingStudentQuery.data.student.household &&
                                getOnboardingStudentQuery.data.student.household.postalCode
                                ? getOnboardingStudentQuery.data.student.household.postalCode.city
                                  .state.abbreviation
                                : ''
                            }
                            isSaving={false}
                          />
                        );
                      }}
                    </Mutation>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default ConnectedOnboardingFormPage;
