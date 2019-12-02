import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Mutation, Query } from 'react-apollo';
import { GET_MODAL_CONTROLLER } from '../../../graphql/queries';
import {
  ADD_TO_HAND,
  ADD_TO_MY_COLLEGES,
  CREATE_INVITATION,
  REMOVE_FROM_HAND,
  REMOVE_FROM_MY_COLLEGES,
  UPDATE_FINANCIAL_AID,
  UPDATE_PROFILE
} from '../../../graphql/mutations';
import {
  AddToHand,
  AddToHandVariables,
  AddToMyColleges,
  AddToMyCollegesVariables,
  CreateInvitation,
  CreateInvitationVariables,
  GetModalController,
  GetModalControllerVariables,
  OnboardingStatus,
  RemoveFromHand,
  RemoveFromHandVariables,
  RemoveFromMyColleges,
  RemoveFromMyCollegesVariables,
  UpdateFinancialAid,
  UpdateFinancialAidVariables,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';

import actions from './actions';
import { modalControllerViewModel } from './selector';

import { EPurchaseProduct, EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import ErrorModal from '@edmit/component-library/src/components/organisms/modal-error';
import Dialog from '@edmit/component-library/src/components/molecules/dialog';
import PurchasedProductModal from '@edmit/component-library/src/components/organisms/modal-purchased-product';
import ProfileCompletionModal, {
  EProfileStep
} from '@edmit/component-library/src/components/organisms/modal-profile-completion';
import HotlineModal from '@edmit/component-library/src/components/organisms/modal-hotline';
import InviteModal from '@edmit/component-library/src/components/organisms/modal-invite';
import ToastOverlay from '@edmit/component-library/src/components/molecules/overlay-toast';
import { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import { hexCrimson, hexGrayDim, hexWhite } from '@edmit/component-library/src/components/atoms/colors';
import ConnectedSearchHighSchools from '../../../connectors/molecules/search-high-schools';
import { personTypeFromGraphQL } from '../../../lib/auth';
import { ECompareStatus, EPersonType } from '@edmit/component-library/src/shared'
import CompareEditModal from '@edmit/component-library/src/components/organisms/modal-edit-compare';
import ConnectedSearchColleges from '../../../connectors/molecules/search-colleges';
import { isUserValue } from '../../../graphql/helpers';
import UploadAidLetterModal from '@edmit/component-library/src/components/organisms/modal-upload-aid-letter';
import SearchCollegesOverlay from '@edmit/component-library/src/components/organisms/search-colleges-overlay';
import PostOnboardingModal from '@edmit/component-library/src/components/organisms/modal-post-onboarding';
import { history } from '../../../store';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { Nullable, StudentId, normalizeId } from '@edmit/component-library/src/lib/models';
import { usePaywall } from '../../../hooks/paywall';
import EdstimatePresentationModal from '@edmit/component-library/src/components/organisms/modal-edstimate-presentation';
import { studentQueryProperties } from '../../../lib/graphql'
import PreferenceModal from '../../../connectors/organisms/modal-preference'
import { useEdstimatePresentation } from '../../../connectors/pages/edstimate/shared'

export interface IContainedModalControllerOwnProps {
  studentId: Nullable<StudentId>;
}

export interface IContainedModalControllerViewModel {
  compareEditModalShown: boolean;
  collegeSearchOverlayShown: boolean;
  hotlineModalShown: boolean;
  collegeToBeRemoved: {
    id: string;
    name: string;
  } | null;
  purchaseModal: {
    payments: EPurchaseProduct[];
    task: string | null;
    cancelRedirect?: string;
    successRedirect?: string;
  } | null;
  purchasedProductModal: {
    product: EPurchaseProduct;
  } | null;
  errorModal: {
    heading: string;
    body: string;
    closeText: string;
  } | null;
  inviteModalShown: boolean;
  profileCompletionModal: { step: EProfileStep } | null;

  purchaseToast: {
    task: string;
  } | null;
  invitedToast: {
    firstName: string;
  } | null;

  uploadAidLetterModal: {
    college: {
      id: string;
      name: string;
      edstimate: number;
    };
    redirectToUrlAfterUpload?: string;
  } | null;
  uploadAidLetterToastShown: boolean;
  preferenceModalShown: boolean;
  onboardingCompleteModalShown: boolean;
  stripeCheckoutModalShown: boolean;
  onboardingNavAwayDialogLink: string | null;
  dismissRecommendationToastShown: boolean;
  edstimateModalShown: {
    collegeId: string
  } | null;
  addToMyCollegesToastShown: boolean;
}

export type ContainedModalControllerActions = typeof actions & {};

export type ContainedModalControllerProps = IContainedModalControllerOwnProps &
  IContainedModalControllerViewModel &
  ContainedModalControllerActions;

export const compareMaxForUser = (edmitPlus: boolean) => (edmitPlus ? 5 : 1);

const ContainedModalController: React.SFC<ContainedModalControllerProps> = props => {

  const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = usePaywall();

  const { refetch: refetchEdstimatePresentation, ...edstimatePresentation } = useEdstimatePresentation(props.studentId, props.edstimateModalShown && props.edstimateModalShown.collegeId);
  const [frozen, setFrozen] = React.useState(false)
  const [yPos, setYPos] = React.useState<number | null>(null)

  React.useEffect(
    () => {
      if (props.edstimateModalShown) {
        setYPos(window.pageYOffset);
        setFrozen(true)
      } else {
        setFrozen(false)
      }
    },
    [props.edstimateModalShown]
  )

  React.useEffect(
    () => {
      if (frozen) {
        // @ts-ignore
        document.body.style = `position: fixed; top: ${yPos * -1}px; height: 100%; width: 100%; overflow: hidden;`
      } else {
        document.body.removeAttribute(`style`)
        window.scrollTo({ top: yPos || 0 })
      }
    }, [frozen]
  )

  React.useEffect(() => {
    if (props.edstimateModalShown) {
      refetchEdstimatePresentation()
    }
  }, [props.edstimateModalShown, props.studentId])

  return (
    <Query<GetModalController, GetModalControllerVariables>
      query={GET_MODAL_CONTROLLER}
      {...studentQueryProperties(props.studentId)({})}
    >
      {modalControllerQuery => (
        <Mutation<UpdateProfile, UpdateProfileVariables> mutation={UPDATE_PROFILE}>
          {updateProfile => (
            <Mutation<CreateInvitation, CreateInvitationVariables> mutation={CREATE_INVITATION}>
              {createInvitation => (
                <Mutation<RemoveFromMyColleges, RemoveFromMyCollegesVariables>
                  mutation={REMOVE_FROM_MY_COLLEGES}
                >
                  {removeFromMyColleges => (
                    <Mutation<AddToHand, AddToHandVariables>
                      mutation={ADD_TO_HAND}
                      refetchQueries={[
                        {
                          query: GET_MODAL_CONTROLLER,
                          variables: {
                            studentId: props.studentId
                          } as GetModalControllerVariables
                        }
                      ]}
                    >
                      {addToHand => (
                        <Mutation<AddToMyColleges, AddToMyCollegesVariables>
                          mutation={ADD_TO_MY_COLLEGES}
                        >
                          {addToMyColleges => (
                            <Mutation<RemoveFromHand, RemoveFromHandVariables>
                              mutation={REMOVE_FROM_HAND}
                              refetchQueries={[
                                {
                                  query: GET_MODAL_CONTROLLER,
                                  variables: {
                                    studentId: props.studentId
                                  } as GetModalControllerVariables
                                }
                              ]}
                            >
                              {removeFromHand => (
                                <Mutation<UpdateFinancialAid, UpdateFinancialAidVariables>
                                  mutation={UPDATE_FINANCIAL_AID}
                                >
                                  {updateFinancialAid => {
                                    const profileLoading =
                                      modalControllerQuery == null ||
                                      modalControllerQuery.data == null ||
                                      modalControllerQuery.data.student == null;

                                    const compareLoading =
                                      modalControllerQuery.loading ||
                                      modalControllerQuery.data == null ||
                                      modalControllerQuery.data.student == null ||
                                      modalControllerQuery.data.student.hand == null;

                                    const compareMax = compareMaxForUser(hasEdmitPlus);

                                    const compareStatus =
                                      (
                                        (!compareLoading &&
                                          modalControllerQuery.data!.student.hand.current) ||
                                        []
                                      ).length >= compareMax
                                        ? ECompareStatus.Full
                                        : ECompareStatus.NotFull;

                                    const addToHandAndMyColleges = async (collegeId: string) => {
                                      await addToHand(
                                        studentQueryProperties(props.studentId)({
                                          collegesWhere: [{ id: collegeId }]
                                        })
                                      );

                                      window.analytics.track('add_college', {
                                        collegeId,
                                        from: 'Compare',
                                        studentId: props.studentId
                                      });

                                      // TODO: Check if it isn't already in My Colleges

                                      await addToMyColleges(
                                        studentQueryProperties(props.studentId)({
                                          collegesWhere: [{ id: collegeId }]
                                        })
                                      );

                                      window.location.reload();
                                    };

                                    return (
                                      <>
                                        <CompareEditModal
                                          compareColleges={
                                            (!compareLoading &&
                                              modalControllerQuery.data!.student.hand.current.map(
                                                college => ({
                                                  abbreviation: college.abbreviation,
                                                  id: college.id,
                                                  logoSrc: (college.logo && college.logo.url) || '',
                                                  name: college.name
                                                })
                                              )) ||
                                            []
                                          }
                                          compareStatus={compareStatus}
                                          compareEditActive={props.compareEditModalShown}
                                          loading={modalControllerQuery.loading}
                                          isEdmitPlusUser={hasEdmitPlus}
                                          onRemoveFromHand={async collegeId => {
                                            await removeFromHand(
                                              studentQueryProperties(props.studentId)({
                                                collegesWhere: [{ id: collegeId }]
                                              })
                                            );

                                            window.analytics.track('Removed College from Hand', {
                                              collegeId,
                                              from: 'Compare',
                                              studentId: props.studentId
                                            });
                                          }}
                                          addToHandCollegeSearchComponent={searchProps => (
                                            <ConnectedSearchColleges
                                              disabled={compareStatus === ECompareStatus.Full}
                                              myColleges={[]}
                                              onSearch={() => null}
                                              inputValue={''}
                                              {...searchProps}
                                            />
                                          )}
                                          onAddToHand={async collegeId => {
                                            if (
                                              modalControllerQuery.data != null &&
                                              modalControllerQuery.data.student.hand.current
                                                .length === compareMax
                                            ) {
                                              props.showPurchaseModal({
                                                payments: [EPurchaseProduct.PLUS_ANNUAL],
                                                task: null
                                              });
                                            } else {
                                              await addToHandAndMyColleges(collegeId);
                                            }
                                          }}
                                          onUpgradeToPlus={() => {
                                            setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
                                            openPlanSelectionModal(
                                              'to add more colleges to your comparison'
                                            )
                                          }}
                                          onStopEditing={() =>
                                            props.setCompareEditModalShown(false)
                                          }
                                        />

                                        <PreferenceModal
                                          setPreferenceActive={props.preferenceModalShown}
                                          loading={modalControllerQuery.loading}
                                          onStopEditing={() => {
                                            props.showPreferenceModal(false);
                                          }}
                                          studentId={props.studentId || ''}
                                        />

                                        <SearchCollegesOverlay
                                          compareColleges={
                                            (!compareLoading &&
                                              modalControllerQuery.data!.student.hand.current.map(
                                                college => ({
                                                  abbreviation: college.abbreviation,
                                                  id: college.id,
                                                  logoSrc: (college.logo && college.logo.url) || '',
                                                  name: college.name
                                                })
                                              )) ||
                                            []
                                          }
                                          compareStatus={compareStatus}
                                          searchEditActive={props.collegeSearchOverlayShown}
                                          searchCollegesComponent={searchProps => (
                                            <ConnectedSearchColleges
                                              myColleges={[]}
                                              onSearch={() => null}
                                              inputValue={''}
                                              {...searchProps}
                                            />
                                          )}
                                          loading={false}
                                        />

                                        <ErrorModal
                                          isOpen={props.errorModal != null}
                                          heading={`Oops, something went wrong.`}
                                          bodyTitle={
                                            props.errorModal ? props.errorModal.heading : ''
                                          }
                                          bodyCopy={props.errorModal ? props.errorModal.body : ''}
                                          buttonText={
                                            props.errorModal ? props.errorModal.closeText : ''
                                          }
                                          onClose={() => props.showErrorModal(null)}
                                        />

                                        <Dialog
                                          isOpen={!!props.collegeToBeRemoved}
                                          header={
                                            props.collegeToBeRemoved
                                              ? `Remove ${
                                              props.collegeToBeRemoved.name
                                              } from My Colleges?`
                                              : ''
                                          }
                                          text={
                                            props.collegeToBeRemoved
                                              ? `Remove ${
                                              props.collegeToBeRemoved.name
                                              }? You can always add it again.`
                                              : ''
                                          }
                                          confirmButtonText={'Remove College'}
                                          cancelButtonText={'Cancel'}
                                          onConfirm={() => {
                                            props.showRemoveCollegeDialog(null);

                                            removeFromMyColleges(
                                              studentQueryProperties(props.studentId)({
                                                collegesWhere: [
                                                  { id: props.collegeToBeRemoved!.id }
                                                ]
                                              })
                                            );

                                            window.analytics.track('Removed College from My Colleges', {
                                              collegeId: props.collegeToBeRemoved!.id,
                                              from: 'App Template',
                                              studentId: props.studentId
                                            });
                                          }}
                                          onCancel={() => props.showRemoveCollegeDialog(null)}
                                        />

                                        <UploadAidLetterModal
                                          college={
                                            props.uploadAidLetterModal
                                              ? props.uploadAidLetterModal.college
                                              : { name: '' }
                                          }
                                          isOpen={Boolean(props.uploadAidLetterModal)}
                                          onCancel={() => props.showUploadAidLetterModal(null)}
                                          onSubmit={async values => {
                                            const aidLetterDataURL = await new Promise<
                                              string | null
                                            >((resolve, reject) => {
                                              if (values.aidLetter) {
                                                // read data uri
                                                const reader = new FileReader();

                                                reader.addEventListener(
                                                  'load',
                                                  async () => {
                                                    resolve(reader.result as string);
                                                  },
                                                  false
                                                );

                                                reader.readAsDataURL(values.aidLetter);
                                              } else {
                                                resolve(null);
                                              }
                                            });

                                            await updateFinancialAid(
                                              studentQueryProperties(props.studentId)({
                                                collegeId: props.uploadAidLetterModal!.college.id,
                                                input: {
                                                  aidAward: {
                                                    value: values.aidAmount
                                                  },
                                                  aidLetter: aidLetterDataURL
                                                    ? {
                                                      dataUrl: aidLetterDataURL,
                                                      name: values.aidLetter!.name
                                                    }
                                                    : null
                                                }
                                              })
                                            );

                                            window.analytics.track('Updated Financial Aid Award Info', {
                                              collegeId: props.uploadAidLetterModal!.college.id,
                                              edstimate: props.uploadAidLetterModal!.college
                                                .edstimate,
                                              info: {
                                                aidAward: {
                                                  value: values.aidAmount
                                                },
                                                aidLetter: aidLetterDataURL
                                                  ? {
                                                    dataUrl: aidLetterDataURL,
                                                    name: values.aidLetter!.name
                                                  }
                                                  : null
                                              }
                                            });

                                            props.showUploadAidLetterModal(null);

                                            if (!(props.uploadAidLetterModal && props.uploadAidLetterModal.redirectToUrlAfterUpload)) {
                                              window.location.reload();
                                            } else {
                                              window.location.href = props.uploadAidLetterModal.redirectToUrlAfterUpload
                                            }

                                            // props.setUploadAidLetterToastShown(true);
                                            //
                                            // setTimeout(() => {
                                            //   props.setUploadAidLetterToastShown(false);
                                            // }, 5000);
                                          }}
                                        />

                                        <PurchasedProductModal
                                          isOpen={props.purchasedProductModal != null}
                                          onClose={() => {
                                            if (props.purchaseModal!.successRedirect) {
                                              window.location.href = props.purchaseModal!.successRedirect!;
                                            } else {
                                              window.location.reload();
                                            }

                                            props.showPurchasedProductModal(null);
                                          }}
                                          product={
                                            props.purchasedProductModal
                                              ? props.purchasedProductModal.product
                                              : EPurchaseProduct.PLUS_ANNUAL
                                          }
                                        />

                                        <ProfileCompletionModal
                                          isOpen={props.profileCompletionModal != null}
                                          accountType={
                                            (!profileLoading &&
                                              modalControllerQuery.data!.student.person &&
                                              personTypeFromGraphQL(
                                                modalControllerQuery.data!.student.person!.type
                                              )) ||
                                            EPersonType.STUDENT
                                          }
                                          profileStep={
                                            props.profileCompletionModal
                                              ? props.profileCompletionModal.step
                                              : EProfileStep.HighSchool
                                          }
                                          highSchoolSearchComponent={searchProps => (
                                            <ConnectedSearchHighSchools
                                              inputValue={searchProps.inputValue || ''}
                                              onSearch={() => null}
                                              {...searchProps}
                                            />
                                          )}
                                          majors={
                                            (modalControllerQuery.data &&
                                              modalControllerQuery.data.majors) ||
                                            []
                                          }
                                          graduationYears={[2019, 2020]} // TODO: get from backend (?)
                                          initialValues={{
                                            annualCashContribution:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student
                                                  .cashContributionAmount &&
                                                modalControllerQuery.data!.student
                                                  .cashContributionAmount.value) ||
                                              null,
                                            gpaScore:
                                              (!profileLoading &&
                                                isUserValue(
                                                  modalControllerQuery.data!.student
                                                    .gradePointAverage
                                                ) &&
                                                modalControllerQuery.data!.student.gradePointAverage
                                                  .value) ||
                                              null,
                                            graduationYear:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student
                                                  .highSchoolGraduationYear.value) ||
                                              null,
                                            highSchool:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student.highSchool && {
                                                  id: modalControllerQuery.data!.student.highSchool!
                                                    .id,
                                                  name: modalControllerQuery.data!.student
                                                    .highSchool!.name,
                                                  zipCode: modalControllerQuery.data!.student
                                                    .highSchool!.postalCode.postalCode
                                                }) ||
                                              null,
                                            householdIncome:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student.household &&
                                                isUserValue(
                                                  modalControllerQuery.data!.student.household!
                                                    .income
                                                ) &&
                                                modalControllerQuery.data!.student.household!.income
                                                  .value) ||
                                              null,
                                            isWeighted: Boolean(
                                              !profileLoading &&
                                              isUserValue(
                                                modalControllerQuery.data!.student
                                                  .weightedGradePointAverageMaximum
                                              ) &&
                                              modalControllerQuery.data!.student
                                                .weightedGradePointAverageMaximum.value
                                            ),
                                            majorId:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student.major &&
                                                modalControllerQuery.data!.student.major!.id) ||
                                              null,
                                            savings:
                                              (!profileLoading &&
                                                modalControllerQuery.data!.student
                                                  .collegeSavingsAmount.value) ||
                                              null,
                                            weightedMaximum:
                                              (!profileLoading &&
                                                isUserValue(
                                                  modalControllerQuery.data!.student
                                                    .weightedGradePointAverageMaximum
                                                ) &&
                                                modalControllerQuery.data!.student
                                                  .weightedGradePointAverageMaximum.value) ||
                                              null
                                          }}
                                          onSubmit={async (values, initialValues) => {
                                            await updateProfile({
                                              variables: {
                                                data: {
                                                  cashContributionAmount:
                                                    initialValues.annualCashContribution !==
                                                      values.annualCashContribution
                                                      ? {
                                                        value: values.annualCashContribution
                                                      }
                                                      : null,
                                                  collegeSavingsPlanAmount:
                                                    initialValues.savings !== values.savings
                                                      ? {
                                                        value: values.savings
                                                      }
                                                      : null,
                                                  gradePointAverage:
                                                    initialValues.gpaScore !== values.gpaScore
                                                      ? {
                                                        value: values.gpaScore
                                                      }
                                                      : null,
                                                  highSchoolGraduationYear:
                                                    initialValues.graduationYear !==
                                                      values.graduationYear
                                                      ? {
                                                        value: values.graduationYear
                                                      }
                                                      : null,
                                                  highSchoolId:
                                                    values.highSchool && values.highSchool.id,
                                                  householdIncome:
                                                    initialValues.householdIncome !==
                                                      values.householdIncome
                                                      ? {
                                                        value: values.householdIncome
                                                      }
                                                      : null,
                                                  majorId: values.majorId,
                                                  weightedGradePointAverageMaximum:
                                                    initialValues.weightedMaximum !==
                                                      values.weightedMaximum
                                                      ? {
                                                        value: values.weightedMaximum
                                                      }
                                                      : null
                                                }
                                              }
                                            });

                                            await modalControllerQuery.refetch();
                                          }}
                                          onContinue={() =>
                                            props.setProfileCompletionModalStep(
                                              (props.profileCompletionModal
                                                ? props.profileCompletionModal.step
                                                : EProfileStep.HighSchool) + 1
                                            )
                                          }
                                          onPrevious={() =>
                                            props.setProfileCompletionModalStep(
                                              (props.profileCompletionModal
                                                ? props.profileCompletionModal.step
                                                : EProfileStep.Academic) - 1
                                            )
                                          }
                                          onJumpToStep={props.setProfileCompletionModalStep}
                                          onClose={() => props.showProfileCompletionModal(false)}
                                        />
                                        <HotlineModal
                                          isOpen={props.hotlineModalShown}
                                          edmitPlusUser={true}
                                          onClose={() => props.setHotlineModalShown(false)}
                                          onUpgrade={() => {
                                            props.setHotlineModalShown(false);
                                            props.showPurchaseModal({
                                              task: 'get access to Edmit Advisor'
                                            });
                                          }}
                                          onConsult={() => {
                                            window.location.href =
                                              'https://calendly.com/edmit-advising/edmit-consultation';
                                          }}
                                          onAskQuestion={() => {
                                            window.location.hash = '#hotline-bot';
                                            setTimeout(() => {
                                              window.location.hash = '';
                                            }, 500);
                                          }}
                                        />
                                        <InviteModal
                                          isOpen={props.inviteModalShown}
                                          onClose={() => props.setInviteModalShown(false)}
                                          onInvite={async values => {
                                            await createInvitation({
                                              variables: {
                                                emailAddress: values.emailAddress,
                                                firstName: values.firstName,
                                                lastName: values.lastName,
                                                personType: values.accountType
                                              }
                                            });
                                            props.setInviteModalShown(false);

                                            setTimeout(() => {
                                              props.setInvitedToast({
                                                firstName: values.firstName
                                              });

                                              setTimeout(() => {
                                                props.setInvitedToast(null);
                                              }, 10000);
                                            }, 1000);
                                          }}
                                        />

                                        <ToastOverlay
                                          isOpen={props.invitedToast != null}
                                          messageText={`Thanks! We notified ${
                                            props.invitedToast
                                              ? `${props.invitedToast.firstName}. Your free month will start when they sign up.`
                                              : 'them'
                                            }`}
                                          iconName={EIconName.Invite}
                                          foregroundColor={hexGrayDim}
                                          backgroundColor={hexWhite}
                                          className="mt3"
                                          actionText="Dismiss"
                                          onClick={() => props.setInvitedToast(null)}
                                        />
                                        <ToastOverlay
                                          isOpen={props.purchaseToast != null}
                                          messageText={`To ${
                                            props.purchaseToast ? props.purchaseToast.task : ''
                                            }, you'll need to upgrade to Edmit Plus.`}
                                          actionText={`View pricing`}
                                          iconName={EIconName.Error}
                                          backgroundColor={hexCrimson}
                                          className="mt3"
                                          onClick={() => {
                                            props.showPurchaseModal({
                                              task: props.purchaseToast
                                                ? props.purchaseToast.task
                                                : ''
                                            });
                                          }}
                                        />
                                        <ToastOverlay
                                          isOpen={props.uploadAidLetterToastShown}
                                          messageText={`Thanks! You should see your numbers update, and we'll send you an email with more information on how to appeal your award letter.`}
                                          iconName={EIconName.Success}
                                          foregroundColor={hexGrayDim}
                                          backgroundColor={hexWhite}
                                          className="mt3"
                                          actionText="Dismiss"
                                          onClick={() => props.setUploadAidLetterToastShown(false)}
                                        />

                                        <PostOnboardingModal
                                          isOpen={props.onboardingCompleteModalShown}
                                          maxColleges={5}
                                          onClose={() => {
                                            props.setOnboardingCompleteModalShown(false);
                                            history.push(`/report`);
                                          }}
                                        />

                                        <Dialog
                                          header={
                                            'Are you sure that you would like to skip this intro to Edmit? Click Tour to revisit this intro.'
                                          }
                                          text={''}
                                          isOpen={Boolean(props.onboardingNavAwayDialogLink)}
                                          onConfirm={async () => {
                                            await updateProfile({
                                              variables: {
                                                data: {
                                                  onboardingStatus: OnboardingStatus.Onboarded
                                                }
                                              }
                                            });
                                            props.setOnboardingNavAwayDialogShown(null);
                                            window.location.href = props.onboardingNavAwayDialogLink!;
                                          }}
                                          onCancel={() => {
                                            props.setOnboardingNavAwayDialogShown(null);
                                          }}
                                          confirmButtonText={'Skip'}
                                          cancelButtonText={'Cancel'}
                                        />
                                        <ToastOverlay
                                          isOpen={props.dismissRecommendationToastShown}
                                          messageText={`Recommendation dismissed.`}
                                          iconName={EIconName.Success}
                                          foregroundColor={hexGrayDim}
                                          backgroundColor={hexWhite}
                                          className="mt3"
                                          actionText="Dismiss"
                                          onClick={() =>
                                            props.setDismissedRecommendationToastShown(false)
                                          }
                                        />
                                        <EdstimatePresentationModal
                                          isOpen={Boolean(props.edstimateModalShown)}
                                          onClose={() => props.showEdstimateModal(null)}
                                          {...edstimatePresentation}
                                        />
                                        <ToastOverlay
                                          isOpen={props.addToMyCollegesToastShown}
                                          messageText={`Added to your college list.`}
                                          iconName={EIconName.Success}
                                          foregroundColor={hexGrayDim}
                                          backgroundColor={hexWhite}
                                          className="mt3"
                                          actionText="View colleges"
                                          onClick={() => {
                                            props.setAddedToMyCollegesToastShown(false)
                                            history.push('/my-colleges')
                                          }}
                                        />
                                      </>
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
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  );
};

ContainedModalController.contextTypes = {
  logout: PropTypes.func
};

const ConnectedContainedModalController = connect(
  modalControllerViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedModalController);

const ModalControllerWithStudentId: React.SFC = props => {
  const { studentId } = useStudentSwitcher();

  return <ConnectedContainedModalController studentId={studentId} />;
};

export default ModalControllerWithStudentId;
