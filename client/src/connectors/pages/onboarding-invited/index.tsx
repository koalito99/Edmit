import * as React from 'react';
import OnboardingInvitedPage, {
  IOnboardingInvitedPageActions,
  IOnboardingInvitedPageViewModel
} from '../../../components/pages/onboarding-invited';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import { Mutation, Query } from 'react-apollo';
import {
  AddToHand,
  AddToHandVariables,
  AddToMyColleges,
  AddToMyCollegesVariables,
  CompleteInvitation,
  CompleteInvitationVariables,
  GetInboundInvitations,
  GetMyColleges,
  GetMyCollegesVariables,
  GetOnboardingInvitedStudent,
  GetOnboardingInvitedStudentVariables,
  InviterPermission,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
import {
  GET_INBOUND_INVITATIONS,
  GET_MY_COLLEGES,
  GET_ONBOARDING_INVITED_STUDENT
} from '../../../graphql/queries';
import {
  ADD_TO_HAND,
  ADD_TO_MY_COLLEGES,
  COMPLETE_INVITATION,
  UPDATE_PROFILE
} from '../../../graphql/mutations';
import ConnectedSearchZipCodes from '../../molecules/search-zip-codes';
import SearchZipCodes, {
  ISearchZipCodesOption
} from '@edmit/component-library/src/components/molecules/search-zip-codes';
import { Nullable, StudentId } from "@edmit/component-library/src/lib/models";
import { studentQueryProperties } from '../../../lib/graphql'

export type ConnectedOnboardingInvitedPageViewModel = Subtract<
  IOnboardingInvitedPageViewModel,
  {
    collegeOptions: any;
    loading: any;
    isSaving: any;
    inviter: any;
    searchZipCodeComponent: any;
  }
> & {
  searchZipCode: string;
};

export type ConnectedOnboardingInvitedPageActions = Subtract<
  IOnboardingInvitedPageActions,
  {
    updateProfile: any;
    completeInvite: any;
    addToList: any;
  }
> & {
  setSearchZipCodeString: (query: string) => void;
  setSelectedZipCode: (zipCode: ISearchZipCodesOption) => void;
};

interface IConnectedOnboardingInvitedPageOwnProps {
  studentId: Nullable<StudentId>;
}

type ConnectedOnboardingInvitedPageProps = ConnectedOnboardingInvitedPageViewModel &
  ConnectedOnboardingInvitedPageActions &
  IConnectedOnboardingInvitedPageOwnProps;

const ConnectedOnboardingInvitedPage: React.SFC<ConnectedOnboardingInvitedPageProps> = props => {
  return (
    <Query<GetInboundInvitations, {}>
      query={GET_INBOUND_INVITATIONS}
      {...studentQueryProperties(props.studentId)({})}
    >
      {invitationsQuery => (
        <Query<GetMyColleges, GetMyCollegesVariables>
          query={GET_MY_COLLEGES}
          {...studentQueryProperties(props.studentId)({})}
        >
          {myCollegesQuery => (
            <Query<GetOnboardingInvitedStudent, GetOnboardingInvitedStudentVariables>
              query={GET_ONBOARDING_INVITED_STUDENT}
              {...studentQueryProperties(props.studentId)({})}
            >
              {getOnboardingStudentQuery => (
                <Mutation<CompleteInvitation, CompleteInvitationVariables>
                  mutation={COMPLETE_INVITATION}
                >
                  {completeInvitation => (
                    <Mutation<UpdateProfile, UpdateProfileVariables> mutation={UPDATE_PROFILE}>
                      {updateProfile => (
                        <Mutation<AddToMyColleges, AddToMyCollegesVariables>
                          mutation={ADD_TO_MY_COLLEGES}
                        >
                          {addToMyColleges => (
                            <Mutation<AddToHand, AddToHandVariables> mutation={ADD_TO_HAND}>
                              {addToHand => {
                                if (
                                  invitationsQuery.loading === true ||
                                  invitationsQuery.data == null ||
                                  invitationsQuery.data.session == null ||
                                  getOnboardingStudentQuery.loading === true ||
                                  getOnboardingStudentQuery.data == null
                                ) {
                                  return (
                                    <OnboardingInvitedPage
                                      {...props}
                                      onContinue={() => null}
                                      onPrevious={() => null}
                                      loading={true}
                                      inviter={{
                                        firstName: '',
                                        lastName: ''
                                      }}
                                      updateProfile={async () => {
                                        return;
                                      }}
                                      completeInvite={async () => {
                                        return;
                                      }}
                                      addToList={async () => {
                                        return;
                                      }}
                                      collegeOptions={[]}
                                      searchZipCodeComponent={
                                        <SearchZipCodes options={[]} onSearch={() => null} />
                                      }
                                    />
                                  );
                                }

                                const invitations =
                                  invitationsQuery.data.session.account.inboundInvitations;

                                if (invitations.length === 0) {
                                  window.location.href = '/login';
                                  return null;
                                }

                                const currentInvitation = invitations[0];
                                const inviter = currentInvitation.inviter;


                                const fetchedZipCode =
                                  props.selectedZipCode ||
                                  (getOnboardingStudentQuery.data!.student.household &&
                                    getOnboardingStudentQuery.data!.student.household!
                                      .postalCode && {
                                      id: getOnboardingStudentQuery.data!.student.household!
                                        .postalCode!.id,
                                      label: getOnboardingStudentQuery.data!.student.household!
                                        .postalCode!.postalCode
                                    }) ||
                                  null;

                                return (
                                  <OnboardingInvitedPage
                                    {...props}
                                    selectedZipCode={fetchedZipCode}
                                    inviter={{
                                      firstName: inviter.firstName || '',
                                      lastName: inviter.lastName || ''
                                    }}
                                    collegeOptions={[]}
                                    addToList={async (collegeId, shouldRefetch) => {
                                      await addToHand(
                                        studentQueryProperties(props.studentId)({
                                          collegesWhere: [{ id: collegeId }]
                                        })
                                      );

                                      window.analytics.track('add_college', {
                                        collegeId,
                                        from: 'Onboarding-Invited',
                                        studentId: props.studentId
                                      });

                                      await addToMyColleges(
                                        studentQueryProperties(props.studentId)({
                                          collegesWhere: [{ id: collegeId }]
                                        })
                                      );

                                      window.analytics.track('add_college', {
                                        collegeId,
                                        from: 'Onboarding-Invited',
                                        studentId: props.studentId
                                      });

                                      if (shouldRefetch) {
                                        await myCollegesQuery.refetch();
                                      }
                                    }}
                                    updateProfile={async (values, shouldRefetch) => {
                                      await updateProfile({
                                        variables: {
                                          data: {
                                            actScore: values.actScore
                                              ? {
                                                value: values.actScore
                                              }
                                              : null,
                                            gradePointAverage: values.gpaScore
                                              ? {
                                                value: values.gpaScore
                                              }
                                              : null,
                                            password: values.password,
                                            postalCodeId: values.zipCode && values.zipCode.id,
                                            psatScore: values.psatScore
                                              ? {
                                                value: values.psatScore
                                              }
                                              : null,
                                            satScore: values.satScore
                                              ? {
                                                value: values.satScore
                                              }
                                              : null
                                          }
                                        }
                                      });

                                      window.analytics.track('Updated Profile', {
                                        from: 'Onboarding-Invited',
                                        studentId: props.studentId
                                      });

                                      if (shouldRefetch) {
                                        await getOnboardingStudentQuery.refetch();
                                      }
                                    }}
                                    completeInvite={async fields => {
                                      let inviterPermission: InviterPermission =
                                        InviterPermission.View;
                                      switch (fields.inviterPermissionsType) {
                                        case 'view':
                                          inviterPermission = InviterPermission.View;
                                          break;
                                        case 'edit':
                                          inviterPermission = InviterPermission.Edit;
                                          break;
                                        case 'no-access':
                                          inviterPermission = InviterPermission.NoAccess;
                                          break;
                                      }

                                      await completeInvitation({
                                        variables: {
                                          invitationId: currentInvitation.id,
                                          inviterPermission
                                        }
                                      });

                                      window.analytics.track('Completed Invitation', {
                                        from: 'Onboarding-Invited',
                                        invitationId: currentInvitation.id,
                                        studentId: props.studentId
                                      });
                                    }}
                                    searchZipCodeComponent={
                                      <ConnectedSearchZipCodes
                                        inputValue={props.searchZipCode}
                                        selected={fetchedZipCode || undefined}
                                        defaultOption={fetchedZipCode || undefined}
                                        onSearch={query => props.setSearchZipCodeString(query)}
                                        onSelected={props.setSelectedZipCode}
                                      />
                                    }
                                    onContinue={() => props.onContinue()}
                                    onPrevious={() => props.onPrevious()}
                                    loading={false}
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
          )}
        </Query>
      )}
    </Query>
  );
};

export default ConnectedOnboardingInvitedPage;
