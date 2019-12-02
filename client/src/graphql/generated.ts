/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAnonymousSession
// ====================================================

export interface CreateAnonymousSession_createAnonymousSession_session {
  __typename: "Session";
  id: string;
}

export interface CreateAnonymousSession_createAnonymousSession {
  __typename: "CreatedSession";
  session: CreateAnonymousSession_createAnonymousSession_session;
  rawToken: string;
}

export interface CreateAnonymousSession {
  createAnonymousSession: CreateAnonymousSession_createAnonymousSession;
}

export interface CreateAnonymousSessionVariables {
  fingerprint: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_createdSession_session {
  __typename: "Session";
  id: string;
}

export interface Login_login_createdSession {
  __typename: "CreatedSession";
  session: Login_login_createdSession_session;
  rawToken: string;
}

export interface Login_login {
  __typename: "LoginResponse";
  createdSession: Login_login_createdSession | null;
  error: LoginError | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  emailAddress: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ApplyProduct
// ====================================================

export interface ApplyProduct_applyProduct {
  __typename: "SubmitStripePaymentResponse";
  status: EStripePaymentStatus;
}

export interface ApplyProduct {
  applyProduct: ApplyProduct_applyProduct;
}

export interface ApplyProductVariables {
  token: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetHand
// ====================================================

export interface SetHand_setHand {
  __typename: "Student";
  id: string;
}

export interface SetHand {
  setHand: SetHand_setHand | null;
}

export interface SetHandVariables {
  studentId: string;
  colleges: string[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCrediblePrefillRequest
// ====================================================

export interface CreateCrediblePrefillRequest_createCrediblePrefillRequest {
  __typename: "CreateCrediblePrefillRequest";
  id: string;
}

export interface CreateCrediblePrefillRequest {
  createCrediblePrefillRequest: CreateCrediblePrefillRequest_createCrediblePrefillRequest;
}

export interface CreateCrediblePrefillRequestVariables {
  studentId: string;
  collegeId: string;
  loanApplicantParty: PersonLoanApplicantParty;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePasswordReset
// ====================================================

export interface CreatePasswordReset_createPasswordReset {
  __typename: "CreatePasswordResetResponse";
  success: boolean;
}

export interface CreatePasswordReset {
  createPasswordReset: CreatePasswordReset_createPasswordReset;
}

export interface CreatePasswordResetVariables {
  emailAddress: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup_account {
  __typename: "Account";
  id: string;
}

export interface Signup_signup {
  __typename: "SignupResponse";
  error: SignupError | null;
  account: Signup_signup_account | null;
}

export interface Signup {
  signup: Signup_signup;
}

export interface SignupVariables {
  emailAddress?: string | null;
  password?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToMyColleges
// ====================================================

export interface AddToMyColleges_addToMyColleges_colleges {
  __typename: "College";
  id: string;
}

export interface AddToMyColleges_addToMyColleges {
  __typename: "Student";
  id: string;
  colleges: AddToMyColleges_addToMyColleges_colleges[];
}

export interface AddToMyColleges {
  addToMyColleges: AddToMyColleges_addToMyColleges;
}

export interface AddToMyCollegesVariables {
  studentId: string;
  collegesWhere: CollegeWhereUniqueInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromMyColleges
// ====================================================

export interface RemoveFromMyColleges_removeFromMyColleges_colleges {
  __typename: "College";
  id: string;
}

export interface RemoveFromMyColleges_removeFromMyColleges {
  __typename: "Student";
  id: string;
  colleges: RemoveFromMyColleges_removeFromMyColleges_colleges[];
}

export interface RemoveFromMyColleges {
  removeFromMyColleges: RemoveFromMyColleges_removeFromMyColleges;
}

export interface RemoveFromMyCollegesVariables {
  studentId: string;
  collegesWhere: CollegeWhereUniqueInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToHand
// ====================================================

export interface AddToHand_addToHand_hand_current {
  __typename: "College";
  id: string;
}

export interface AddToHand_addToHand_hand {
  __typename: "Hand";
  current: AddToHand_addToHand_hand_current[];
}

export interface AddToHand_addToHand {
  __typename: "Student";
  id: string;
  hand: AddToHand_addToHand_hand;
}

export interface AddToHand {
  addToHand: AddToHand_addToHand;
}

export interface AddToHandVariables {
  studentId: string;
  collegesWhere: CollegeWhereUniqueInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromHand
// ====================================================

export interface RemoveFromHand_removeFromHand_hand_current {
  __typename: "College";
  id: string;
}

export interface RemoveFromHand_removeFromHand_hand {
  __typename: "Hand";
  current: RemoveFromHand_removeFromHand_hand_current[];
}

export interface RemoveFromHand_removeFromHand {
  __typename: "Student";
  id: string;
  hand: RemoveFromHand_removeFromHand_hand;
}

export interface RemoveFromHand {
  removeFromHand: RemoveFromHand_removeFromHand;
}

export interface RemoveFromHandVariables {
  studentId: string;
  collegesWhere: CollegeWhereUniqueInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateInvitation
// ====================================================

export interface CreateInvitation_createInvitation_invitation {
  __typename: "Invitation";
  id: string;
}

export interface CreateInvitation_createInvitation {
  __typename: "CreateInvitationResponse";
  status: InvitationStatus;
  invitation: CreateInvitation_createInvitation_invitation | null;
}

export interface CreateInvitation {
  createInvitation: CreateInvitation_createInvitation;
}

export interface CreateInvitationVariables {
  firstName: string;
  lastName: string;
  emailAddress: string;
  personType: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteInvitation
// ====================================================

export interface CompleteInvitation_completeInvitation {
  __typename: "Invitation";
  id: string;
  permission: InviterPermission | null;
}

export interface CompleteInvitation {
  completeInvitation: CompleteInvitation_completeInvitation;
}

export interface CompleteInvitationVariables {
  invitationId: string;
  inviterPermission: InviterPermission;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSessionFromToken
// ====================================================

export interface CreateSessionFromToken_createSessionFromToken_session {
  __typename: "Session";
  id: string;
}

export interface CreateSessionFromToken_createSessionFromToken {
  __typename: "CreatedSession";
  session: CreateSessionFromToken_createSessionFromToken_session;
  rawToken: string;
}

export interface CreateSessionFromToken {
  createSessionFromToken: CreateSessionFromToken_createSessionFromToken;
}

export interface CreateSessionFromTokenVariables {
  accountToken: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PurchaseProduct
// ====================================================

export interface PurchaseProduct_submitStripePayment2 {
  __typename: "SubmitStripePaymentResponse";
  status: EStripePaymentStatus;
}

export interface PurchaseProduct {
  submitStripePayment2: PurchaseProduct_submitStripePayment2;
}

export interface PurchaseProductVariables {
  studentId: string;
  stripeToken: string;
  productId: string;
  coupon?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile {
  __typename: "Account";
  id: string;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile;
}

export interface UpdateProfileVariables {
  data: ProfileUpdateInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteParent
// ====================================================

export interface InviteParent_inviteParent {
  __typename: "Account";
  id: string;
}

export interface InviteParent {
  inviteParent: InviteParent_inviteParent;
}

export interface InviteParentVariables {
  emailAddress: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DismissRecommendation
// ====================================================

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_WithheldCollege {
  __typename: "WithheldCollege";
  id: string;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_logo {
  __typename: "File";
  url: string;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_majors {
  __typename: "Major";
  id: string;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode_city {
  __typename: "City";
  name: string;
  state: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode_city_state;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode {
  __typename: "PostalCode";
  city: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode_city;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_fitScore {
  __typename: "ComputedIntValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_affordabilityScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_valueScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_earningsScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface DismissRecommendation_dismissRecommendation_recommendations_colleges_College {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  recommendedReason: string | null;
  logo: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_logo | null;
  majors: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_majors[];
  postalCode: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_postalCode;
  features: string[];
  costOfAttendance: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_costOfAttendance;
  edstimate: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_edstimate;
  fitScore: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_fitScore;
  affordabilityScore: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_affordabilityScore;
  valueScore: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_valueScore;
  earningsScore: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_earningsScore;
  affordabilityDetermination: AffordabilityDetermination;
  valueDetermination: ValueDetermination;
  accumulatedEarnings: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_accumulatedEarnings;
  debtRemaining: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_debtRemaining[];
  /**
   * from 0 to 1
   */
  medianEarnings: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_medianEarnings[];
  admissibility: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_admissibility;
  admissionUnlikely: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_admissionUnlikely;
  averageGPA: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_averageGPA;
  averageSATScore: DismissRecommendation_dismissRecommendation_recommendations_colleges_College_averageSATScore;
}

export type DismissRecommendation_dismissRecommendation_recommendations_colleges = DismissRecommendation_dismissRecommendation_recommendations_colleges_WithheldCollege | DismissRecommendation_dismissRecommendation_recommendations_colleges_College;

export interface DismissRecommendation_dismissRecommendation_recommendations {
  __typename: "Recommendation";
  id: string;
  title: string;
  colleges: DismissRecommendation_dismissRecommendation_recommendations_colleges[];
}

export interface DismissRecommendation_dismissRecommendation {
  __typename: "Student";
  id: string;
  recommendations: DismissRecommendation_dismissRecommendation_recommendations[];
}

export interface DismissRecommendation {
  dismissRecommendation: DismissRecommendation_dismissRecommendation | null;
}

export interface DismissRecommendationVariables {
  studentId: string;
  collegeId: string;
  reason: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkNotificationsSeen
// ====================================================

export interface MarkNotificationsSeen_markNotificationsSeen_notifications {
  __typename: "Notification";
  id: string;
  lastSeenAt: any | null;
}

export interface MarkNotificationsSeen_markNotificationsSeen {
  __typename: "MarkNotificationsSeenResponse";
  notifications: MarkNotificationsSeen_markNotificationsSeen_notifications[];
}

export interface MarkNotificationsSeen {
  markNotificationsSeen: MarkNotificationsSeen_markNotificationsSeen;
}

export interface MarkNotificationsSeenVariables {
  ids: string[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCollegeApplicationStatus
// ====================================================

export interface UpdateCollegeApplicationStatus_updateApplicationStatus_colleges {
  __typename: "College";
  id: string;
  status: CollegeStatus | null;
}

export interface UpdateCollegeApplicationStatus_updateApplicationStatus {
  __typename: "Student";
  id: string;
  colleges: UpdateCollegeApplicationStatus_updateApplicationStatus_colleges[];
}

export interface UpdateCollegeApplicationStatus {
  updateApplicationStatus: UpdateCollegeApplicationStatus_updateApplicationStatus;
}

export interface UpdateCollegeApplicationStatusVariables {
  studentId: string;
  collegeId: string;
  status: CollegeStatus;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateFinancialAid
// ====================================================

export interface UpdateFinancialAid_updateFinancialAid_colleges {
  __typename: "College";
  id: string;
  financialAidAward: number | null;
}

export interface UpdateFinancialAid_updateFinancialAid {
  __typename: "Student";
  id: string;
  colleges: UpdateFinancialAid_updateFinancialAid_colleges[];
}

export interface UpdateFinancialAid {
  updateFinancialAid: UpdateFinancialAid_updateFinancialAid;
}

export interface UpdateFinancialAidVariables {
  studentId: string;
  collegeId: string;
  input: UpdateFinancialAidInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateFinancialAidAppeal
// ====================================================

export interface UpdateFinancialAidAppeal_updateFinancialAidAppeal_colleges_financialAidAppealLetter {
  __typename: "File";
  id: string;
}

export interface UpdateFinancialAidAppeal_updateFinancialAidAppeal_colleges {
  __typename: "College";
  id: string;
  financialAidAppealAward: number | null;
  financialAidAppealLetter: UpdateFinancialAidAppeal_updateFinancialAidAppeal_colleges_financialAidAppealLetter | null;
}

export interface UpdateFinancialAidAppeal_updateFinancialAidAppeal {
  __typename: "Student";
  id: string;
  colleges: UpdateFinancialAidAppeal_updateFinancialAidAppeal_colleges[];
}

export interface UpdateFinancialAidAppeal {
  updateFinancialAidAppeal: UpdateFinancialAidAppeal_updateFinancialAidAppeal;
}

export interface UpdateFinancialAidAppealVariables {
  studentId: string;
  collegeId: string;
  input: UpdateFinancialAidAppealInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SelectSabrinaBotMessageAction
// ====================================================

export interface SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages_SabrinaBotTextMessage {
  __typename: "SabrinaBotTextMessage" | "SabrinaBotEndMessage";
  id: string;
  createdAt: any;
  text: string;
  actions: string[] | null;
  selectedAction: string | null;
}

export interface SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages_SabrinaBotCTAMessage {
  __typename: "SabrinaBotCTAMessage";
  id: string;
  createdAt: any;
  text: string;
  actions: string[] | null;
  selectedAction: string | null;
  callToActionText: string;
  callToActionUrl: string | null;
}

export type SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages = SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages_SabrinaBotTextMessage | SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages_SabrinaBotCTAMessage;

export interface SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction {
  __typename: "Student";
  id: string;
  sabrinaBotMessages: SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction_sabrinaBotMessages[] | null;
}

export interface SelectSabrinaBotMessageAction {
  selectSabrinaBotMessageAction: SelectSabrinaBotMessageAction_selectSabrinaBotMessageAction;
}

export interface SelectSabrinaBotMessageActionVariables {
  studentId: string;
  messageId: string;
  action: string;
  url: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckTip
// ====================================================

export interface CheckTip_checkTip {
  __typename: "Student";
  id: string;
}

export interface CheckTip {
  checkTip: CheckTip_checkTip;
}

export interface CheckTipVariables {
  studentId: string;
  tipId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DismissTip
// ====================================================

export interface DismissTip_dismissTip {
  __typename: "Student";
  id: string;
}

export interface DismissTip {
  dismissTip: DismissTip_dismissTip;
}

export interface DismissTipVariables {
  studentId: string;
  tipId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMajors
// ====================================================

export interface GetMajors_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetMajors {
  majors: GetMajors_majors[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollegeComparison
// ====================================================

export interface GetCollegeComparison_session_account_person {
  __typename: "Person";
  type: PersonType | null;
}

export interface GetCollegeComparison_session_account {
  __typename: "Account";
  person: GetCollegeComparison_session_account_person | null;
}

export interface GetCollegeComparison_session {
  __typename: "Session";
  account: GetCollegeComparison_session_account;
}

export interface GetCollegeComparison_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetCollegeComparison_student_normalizedGPA {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetCollegeComparison_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetCollegeComparison_student_psatScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetCollegeComparison_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetCollegeComparison_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetCollegeComparison_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetCollegeComparison_student_household {
  __typename: "Household";
  income: GetCollegeComparison_student_household_income;
}

export interface GetCollegeComparison_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetCollegeComparison_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetCollegeComparison_student_appliedProducts_product;
}

export interface GetCollegeComparison_student_hand_current_logo {
  __typename: "File";
  url: string;
}

export interface GetCollegeComparison_student_hand_current_gpaDifference {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_satScoreDifference {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_majors {
  __typename: "Major";
  id: string;
}

export interface GetCollegeComparison_student_hand_current_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface GetCollegeComparison_student_hand_current_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetCollegeComparison_student_hand_current_averageACTScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface GetCollegeComparison_student_hand_current_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollegeComparison_student_hand_current_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollegeComparison_student_hand_current_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type GetCollegeComparison_student_hand_current_edstimate_from = GetCollegeComparison_student_hand_current_edstimate_from_FactIntValue | GetCollegeComparison_student_hand_current_edstimate_from_UserFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_UserNullableStringValue | GetCollegeComparison_student_hand_current_edstimate_from_UserNullableIntValue | GetCollegeComparison_student_hand_current_edstimate_from_UserIntValue | GetCollegeComparison_student_hand_current_edstimate_from_UserNullableFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_UserStringValue | GetCollegeComparison_student_hand_current_edstimate_from_UserNullableBooleanValue | GetCollegeComparison_student_hand_current_edstimate_from_UserBooleanValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableIntValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemIntValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableStringValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemStringValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemNullableBooleanValue | GetCollegeComparison_student_hand_current_edstimate_from_SystemBooleanValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableIntValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableFloatValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedIntValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedBooleanValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableStringValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedStringValue | GetCollegeComparison_student_hand_current_edstimate_from_ComputedNullableBooleanValue;

export interface GetCollegeComparison_student_hand_current_edstimate {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: GetCollegeComparison_student_hand_current_edstimate_from[];
  value: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type GetCollegeComparison_student_hand_current_admissibility_from = GetCollegeComparison_student_hand_current_admissibility_from_FactIntValue | GetCollegeComparison_student_hand_current_admissibility_from_UserFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_UserNullableStringValue | GetCollegeComparison_student_hand_current_admissibility_from_UserNullableIntValue | GetCollegeComparison_student_hand_current_admissibility_from_UserIntValue | GetCollegeComparison_student_hand_current_admissibility_from_UserNullableFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_UserStringValue | GetCollegeComparison_student_hand_current_admissibility_from_UserNullableBooleanValue | GetCollegeComparison_student_hand_current_admissibility_from_UserBooleanValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableIntValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemIntValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableStringValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemStringValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemNullableBooleanValue | GetCollegeComparison_student_hand_current_admissibility_from_SystemBooleanValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableIntValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableFloatValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedIntValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedBooleanValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableStringValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedStringValue | GetCollegeComparison_student_hand_current_admissibility_from_ComputedNullableBooleanValue;

export interface GetCollegeComparison_student_hand_current_admissibility {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: GetCollegeComparison_student_hand_current_admissibility_from[];
  value: number;
}

export interface GetCollegeComparison_student_hand_current_affordabilityScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_valueScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_earningsScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type GetCollegeComparison_student_hand_current_costOfAttendance_from = GetCollegeComparison_student_hand_current_costOfAttendance_from_FactIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserNullableBooleanValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_UserBooleanValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemNullableBooleanValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_SystemBooleanValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableFloatValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedIntValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedBooleanValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedStringValue | GetCollegeComparison_student_hand_current_costOfAttendance_from_ComputedNullableBooleanValue;

export interface GetCollegeComparison_student_hand_current_costOfAttendance {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: GetCollegeComparison_student_hand_current_costOfAttendance_from[];
  value: number;
}

export interface GetCollegeComparison_student_hand_current {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetCollegeComparison_student_hand_current_logo | null;
  scholarships: string[];
  gpaDifference: GetCollegeComparison_student_hand_current_gpaDifference;
  satScoreDifference: GetCollegeComparison_student_hand_current_satScoreDifference;
  majors: GetCollegeComparison_student_hand_current_majors[];
  averageGPA: GetCollegeComparison_student_hand_current_averageGPA;
  averageSATScore: GetCollegeComparison_student_hand_current_averageSATScore;
  averageACTScore: GetCollegeComparison_student_hand_current_averageACTScore;
  averageHHI: number;
  publishedTuition: number;
  admissionUnlikely: GetCollegeComparison_student_hand_current_admissionUnlikely;
  accumulatedEarnings: GetCollegeComparison_student_hand_current_accumulatedEarnings;
  /**
   * from 0 to 1
   */
  medianEarnings: GetCollegeComparison_student_hand_current_medianEarnings[];
  netEarnings: GetCollegeComparison_student_hand_current_netEarnings[];
  debtRemaining: GetCollegeComparison_student_hand_current_debtRemaining[];
  repaymentRate: number;
  edstimate: GetCollegeComparison_student_hand_current_edstimate;
  admissibility: GetCollegeComparison_student_hand_current_admissibility;
  affordabilityScore: GetCollegeComparison_student_hand_current_affordabilityScore;
  valueScore: GetCollegeComparison_student_hand_current_valueScore;
  earningsScore: GetCollegeComparison_student_hand_current_earningsScore;
  costOfAttendance: GetCollegeComparison_student_hand_current_costOfAttendance;
  financialAidAward: number | null;
}

export interface GetCollegeComparison_student_hand_recent_logo {
  __typename: "File";
  url: string;
}

export interface GetCollegeComparison_student_hand_recent_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_recent_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_recent_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetCollegeComparison_student_hand_recent {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetCollegeComparison_student_hand_recent_logo | null;
  edstimate: GetCollegeComparison_student_hand_recent_edstimate;
  admissibility: GetCollegeComparison_student_hand_recent_admissibility;
  costOfAttendance: GetCollegeComparison_student_hand_recent_costOfAttendance;
}

export interface GetCollegeComparison_student_hand {
  __typename: "Hand";
  current: GetCollegeComparison_student_hand_current[];
  recent: GetCollegeComparison_student_hand_recent[];
}

export interface GetCollegeComparison_student {
  __typename: "Student";
  id: string;
  gradePointAverage: GetCollegeComparison_student_gradePointAverage;
  normalizedGPA: GetCollegeComparison_student_normalizedGPA;
  actScore: GetCollegeComparison_student_actScore;
  satScore: GetCollegeComparison_student_satScore;
  psatScore: GetCollegeComparison_student_psatScore;
  major: GetCollegeComparison_student_major | null;
  collegeSavingsAmount: GetCollegeComparison_student_collegeSavingsAmount;
  household: GetCollegeComparison_student_household | null;
  appliedProducts: GetCollegeComparison_student_appliedProducts[];
  hand: GetCollegeComparison_student_hand;
}

export interface GetCollegeComparison {
  session: GetCollegeComparison_session | null;
  student: GetCollegeComparison_student;
}

export interface GetCollegeComparisonVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetModalController
// ====================================================

export interface GetModalController_student_cashContributionAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetModalController_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetModalController_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
}

export interface GetModalController_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetModalController_student_weightedGradePointAverageMaximum {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetModalController_student_highSchoolGraduationYear {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetModalController_student_major {
  __typename: "Major";
  id: string;
}

export interface GetModalController_student_highSchool_postalCode {
  __typename: "PostalCode";
  postalCode: string;
}

export interface GetModalController_student_highSchool {
  __typename: "HighSchool";
  id: string;
  name: string;
  postalCode: GetModalController_student_highSchool_postalCode;
}

export interface GetModalController_student_person {
  __typename: "Person";
  type: PersonType | null;
}

export interface GetModalController_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetModalController_student_household {
  __typename: "Household";
  income: GetModalController_student_household_income;
}

export interface GetModalController_student_hand_current_logo {
  __typename: "File";
  url: string;
}

export interface GetModalController_student_hand_current {
  __typename: "College";
  id: string;
  abbreviation: string;
  name: string;
  logo: GetModalController_student_hand_current_logo | null;
}

export interface GetModalController_student_hand {
  __typename: "Hand";
  current: GetModalController_student_hand_current[];
}

export interface GetModalController_student {
  __typename: "Student";
  id: string;
  cashContributionAmount: GetModalController_student_cashContributionAmount;
  collegeSavingsAmount: GetModalController_student_collegeSavingsAmount;
  appliedProducts: GetModalController_student_appliedProducts[];
  gradePointAverage: GetModalController_student_gradePointAverage;
  weightedGradePointAverageMaximum: GetModalController_student_weightedGradePointAverageMaximum;
  highSchoolGraduationYear: GetModalController_student_highSchoolGraduationYear;
  major: GetModalController_student_major | null;
  highSchool: GetModalController_student_highSchool | null;
  person: GetModalController_student_person | null;
  household: GetModalController_student_household | null;
  hand: GetModalController_student_hand;
}

export interface GetModalController_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetModalController {
  student: GetModalController_student;
  majors: GetModalController_majors[];
}

export interface GetModalControllerVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOnboardingFormStudent
// ====================================================

export interface GetOnboardingFormStudent_student_highSchoolGraduationYear {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetOnboardingFormStudent_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetOnboardingFormStudent_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetOnboardingFormStudent_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetOnboardingFormStudent_student_psatScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetOnboardingFormStudent_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetOnboardingFormStudent_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
}

export interface GetOnboardingFormStudent_student_household_postalCode_city_state {
  __typename: "State";
  abbreviation: string;
}

export interface GetOnboardingFormStudent_student_household_postalCode_city {
  __typename: "City";
  name: string;
  state: GetOnboardingFormStudent_student_household_postalCode_city_state;
}

export interface GetOnboardingFormStudent_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
  city: GetOnboardingFormStudent_student_household_postalCode_city;
}

export interface GetOnboardingFormStudent_student_household {
  __typename: "Household";
  postalCode: GetOnboardingFormStudent_student_household_postalCode | null;
}

export interface GetOnboardingFormStudent_student_colleges_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingFormStudent_student_colleges {
  __typename: "College";
  id: string;
  name: string;
  edstimate: GetOnboardingFormStudent_student_colleges_edstimate;
}

export interface GetOnboardingFormStudent_student {
  __typename: "Student";
  id: string;
  highSchoolGraduationYear: GetOnboardingFormStudent_student_highSchoolGraduationYear;
  gradePointAverage: GetOnboardingFormStudent_student_gradePointAverage;
  actScore: GetOnboardingFormStudent_student_actScore;
  satScore: GetOnboardingFormStudent_student_satScore;
  psatScore: GetOnboardingFormStudent_student_psatScore;
  major: GetOnboardingFormStudent_student_major | null;
  person: GetOnboardingFormStudent_student_person | null;
  household: GetOnboardingFormStudent_student_household | null;
  colleges: GetOnboardingFormStudent_student_colleges[];
}

export interface GetOnboardingFormStudent {
  student: GetOnboardingFormStudent_student;
}

export interface GetOnboardingFormStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOnboardingPage
// ====================================================

export interface GetOnboardingPage_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetOnboardingPage_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetOnboardingPage_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
}

export interface GetOnboardingPage_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetOnboardingPage_student_household {
  __typename: "Household";
  income: GetOnboardingPage_student_household_income;
}

export interface GetOnboardingPage_student_workStudyAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetOnboardingPage_student_cashContributionAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetOnboardingPage_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetOnboardingPage_student_colleges_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetOnboardingPage_student_colleges_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetOnboardingPage_student_colleges_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetOnboardingPage_student_colleges {
  __typename: "College";
  id: string;
  abbreviation: string;
  name: string;
  edstimate: GetOnboardingPage_student_colleges_edstimate;
  averageCostOfAttendance: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: GetOnboardingPage_student_colleges_medianEarnings[];
  netEarnings: GetOnboardingPage_student_colleges_netEarnings[];
  debtRemaining: GetOnboardingPage_student_colleges_debtRemaining[];
  averageAnnualEarningsAmount: GetOnboardingPage_student_colleges_averageAnnualEarningsAmount;
  costOfAttendance: GetOnboardingPage_student_colleges_costOfAttendance;
  annualLoanPaymentAmount: GetOnboardingPage_student_colleges_annualLoanPaymentAmount;
  valueBenchmark: GetOnboardingPage_student_colleges_valueBenchmark;
  valueDelta: GetOnboardingPage_student_colleges_valueDelta;
  financialGrade: FinancialGrade;
}

export interface GetOnboardingPage_student {
  __typename: "Student";
  id: string;
  major: GetOnboardingPage_student_major | null;
  person: GetOnboardingPage_student_person | null;
  household: GetOnboardingPage_student_household | null;
  workStudyAmount: GetOnboardingPage_student_workStudyAmount;
  cashContributionAmount: GetOnboardingPage_student_cashContributionAmount;
  collegeSavingsAmount: GetOnboardingPage_student_collegeSavingsAmount;
  colleges: GetOnboardingPage_student_colleges[];
}

export interface GetOnboardingPage {
  majors: GetOnboardingPage_majors[];
  student: GetOnboardingPage_student;
}

export interface GetOnboardingPageVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOnboardingInvitedStudent
// ====================================================

export interface GetOnboardingInvitedStudent_student_highSchoolGraduationYear {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetOnboardingInvitedStudent_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
}

export interface GetOnboardingInvitedStudent_student_household_postalCode_city_state {
  __typename: "State";
  abbreviation: string;
}

export interface GetOnboardingInvitedStudent_student_household_postalCode_city {
  __typename: "City";
  name: string;
  state: GetOnboardingInvitedStudent_student_household_postalCode_city_state;
}

export interface GetOnboardingInvitedStudent_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
  city: GetOnboardingInvitedStudent_student_household_postalCode_city;
}

export interface GetOnboardingInvitedStudent_student_household {
  __typename: "Household";
  postalCode: GetOnboardingInvitedStudent_student_household_postalCode | null;
}

export interface GetOnboardingInvitedStudent_student {
  __typename: "Student";
  id: string;
  highSchoolGraduationYear: GetOnboardingInvitedStudent_student_highSchoolGraduationYear;
  person: GetOnboardingInvitedStudent_student_person | null;
  household: GetOnboardingInvitedStudent_student_household | null;
}

export interface GetOnboardingInvitedStudent {
  student: GetOnboardingInvitedStudent_student;
}

export interface GetOnboardingInvitedStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegisteringStudent
// ====================================================

export interface GetRegisteringStudent_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetRegisteringStudent_student {
  __typename: "Student";
  id: string;
  person: GetRegisteringStudent_student_person | null;
}

export interface GetRegisteringStudent {
  student: GetRegisteringStudent_student;
}

export interface GetRegisteringStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInboundInvitations
// ====================================================

export interface GetInboundInvitations_session_account_inboundInvitations_inviter {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetInboundInvitations_session_account_inboundInvitations {
  __typename: "Invitation";
  id: string;
  inviter: GetInboundInvitations_session_account_inboundInvitations_inviter;
}

export interface GetInboundInvitations_session_account {
  __typename: "Account";
  inboundInvitations: GetInboundInvitations_session_account_inboundInvitations[];
}

export interface GetInboundInvitations_session {
  __typename: "Session";
  account: GetInboundInvitations_session_account;
}

export interface GetInboundInvitations {
  session: GetInboundInvitations_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyColleges
// ====================================================

export interface GetMyColleges_student_person {
  __typename: "Person";
  type: PersonType | null;
  affinities: Affinity[] | null;
}

export interface GetMyColleges_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetMyColleges_student_hand_current {
  __typename: "College";
  id: string;
}

export interface GetMyColleges_student_hand {
  __typename: "Hand";
  current: GetMyColleges_student_hand_current[];
}

export interface GetMyColleges_student_tips_TextTip {
  __typename: "TextTip";
  id: string;
  title: string;
  dismissable: boolean;
  userCheckable: boolean;
  checked: boolean;
  text: string;
}

export interface GetMyColleges_student_tips_FormTip {
  __typename: "FormTip";
  id: string;
  title: string;
  dismissable: boolean;
  userCheckable: boolean;
  checked: boolean;
  text: string;
}

export interface GetMyColleges_student_tips_LinkTip {
  __typename: "LinkTip";
  id: string;
  title: string;
  dismissable: boolean;
  userCheckable: boolean;
  checked: boolean;
  text: string;
}

export type GetMyColleges_student_tips = GetMyColleges_student_tips_TextTip | GetMyColleges_student_tips_FormTip | GetMyColleges_student_tips_LinkTip;

export interface GetMyColleges_student_normalizedGPA {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetMyColleges_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetMyColleges_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetMyColleges_student_appliedProducts_product;
  id: string;
}

export interface GetMyColleges_student_colleges_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface GetMyColleges_student_colleges_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_colleges_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_colleges_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetMyColleges_student_colleges_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetMyColleges_student_colleges_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_colleges_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetMyColleges_student_colleges_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface GetMyColleges_student_colleges_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetMyColleges_student_colleges_effectiveCost {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_logo {
  __typename: "File";
  url: string;
}

export interface GetMyColleges_student_colleges_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_colleges_postalCode_city_state {
  __typename: "State";
  id: string;
  abbreviation: string;
  name: string;
}

export interface GetMyColleges_student_colleges_postalCode_city {
  __typename: "City";
  id: string;
  name: string;
  state: GetMyColleges_student_colleges_postalCode_city_state;
}

export interface GetMyColleges_student_colleges_postalCode {
  __typename: "PostalCode";
  id: string;
  city: GetMyColleges_student_colleges_postalCode_city;
}

export interface GetMyColleges_student_colleges {
  __typename: "College";
  id: string;
  name: string;
  admissibility: GetMyColleges_student_colleges_admissibility;
  admissionUnlikely: GetMyColleges_student_colleges_admissionUnlikely;
  financialAidAward: number | null;
  coverImageUrl: string | null;
  abbreviation: string;
  edstimate: GetMyColleges_student_colleges_edstimate;
  averageCostOfAttendance: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: GetMyColleges_student_colleges_medianEarnings[];
  netEarnings: GetMyColleges_student_colleges_netEarnings[];
  features: string[];
  satScoreIQR: GetMyColleges_student_colleges_satScoreIQR | null;
  actScoreIQR: GetMyColleges_student_colleges_actScoreIQR | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
  debtRemaining: GetMyColleges_student_colleges_debtRemaining[];
  averageAnnualEarningsAmount: GetMyColleges_student_colleges_averageAnnualEarningsAmount;
  costOfAttendance: GetMyColleges_student_colleges_costOfAttendance;
  annualLoanPaymentAmount: GetMyColleges_student_colleges_annualLoanPaymentAmount;
  valueBenchmark: GetMyColleges_student_colleges_valueBenchmark;
  valueDelta: GetMyColleges_student_colleges_valueDelta;
  majors: GetMyColleges_student_colleges_majors[];
  financialGrade: FinancialGrade;
  calculationsUseAidAward: boolean;
  status: CollegeStatus | null;
  averageGPA: GetMyColleges_student_colleges_averageGPA;
  averageSATScore: GetMyColleges_student_colleges_averageSATScore;
  effectiveCost: GetMyColleges_student_colleges_effectiveCost;
  affordabilityDetermination: AffordabilityDetermination;
  valueDetermination: ValueDetermination;
  logo: GetMyColleges_student_colleges_logo | null;
  accumulatedEarnings: GetMyColleges_student_colleges_accumulatedEarnings;
  scholarships: string[];
  postalCode: GetMyColleges_student_colleges_postalCode;
}

export interface GetMyColleges_student_highSchool {
  __typename: "HighSchool";
  popularColleges: string[];
}

export interface GetMyColleges_student_preferences {
  __typename: "Preference";
  id: string;
  value: number;
}

export interface GetMyColleges_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetMyColleges_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetMyColleges_student_bestPublicCollege_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface GetMyColleges_student_bestPublicCollege_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetMyColleges_student_bestPublicCollege_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetMyColleges_student_bestPublicCollege_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetMyColleges_student_bestPublicCollege_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface GetMyColleges_student_bestPublicCollege_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetMyColleges_student_bestPublicCollege_effectiveCost {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_logo {
  __typename: "File";
  url: string;
}

export interface GetMyColleges_student_bestPublicCollege_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMyColleges_student_bestPublicCollege_postalCode_city_state {
  __typename: "State";
  id: string;
  abbreviation: string;
  name: string;
}

export interface GetMyColleges_student_bestPublicCollege_postalCode_city {
  __typename: "City";
  id: string;
  name: string;
  state: GetMyColleges_student_bestPublicCollege_postalCode_city_state;
}

export interface GetMyColleges_student_bestPublicCollege_postalCode {
  __typename: "PostalCode";
  id: string;
  city: GetMyColleges_student_bestPublicCollege_postalCode_city;
}

export interface GetMyColleges_student_bestPublicCollege {
  __typename: "College";
  id: string;
  name: string;
  admissibility: GetMyColleges_student_bestPublicCollege_admissibility;
  admissionUnlikely: GetMyColleges_student_bestPublicCollege_admissionUnlikely;
  financialAidAward: number | null;
  coverImageUrl: string | null;
  abbreviation: string;
  edstimate: GetMyColleges_student_bestPublicCollege_edstimate;
  averageCostOfAttendance: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: GetMyColleges_student_bestPublicCollege_medianEarnings[];
  netEarnings: GetMyColleges_student_bestPublicCollege_netEarnings[];
  features: string[];
  satScoreIQR: GetMyColleges_student_bestPublicCollege_satScoreIQR | null;
  actScoreIQR: GetMyColleges_student_bestPublicCollege_actScoreIQR | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
  debtRemaining: GetMyColleges_student_bestPublicCollege_debtRemaining[];
  averageAnnualEarningsAmount: GetMyColleges_student_bestPublicCollege_averageAnnualEarningsAmount;
  costOfAttendance: GetMyColleges_student_bestPublicCollege_costOfAttendance;
  annualLoanPaymentAmount: GetMyColleges_student_bestPublicCollege_annualLoanPaymentAmount;
  valueBenchmark: GetMyColleges_student_bestPublicCollege_valueBenchmark;
  valueDelta: GetMyColleges_student_bestPublicCollege_valueDelta;
  majors: GetMyColleges_student_bestPublicCollege_majors[];
  financialGrade: FinancialGrade;
  calculationsUseAidAward: boolean;
  status: CollegeStatus | null;
  averageGPA: GetMyColleges_student_bestPublicCollege_averageGPA;
  averageSATScore: GetMyColleges_student_bestPublicCollege_averageSATScore;
  effectiveCost: GetMyColleges_student_bestPublicCollege_effectiveCost;
  affordabilityDetermination: AffordabilityDetermination;
  valueDetermination: ValueDetermination;
  logo: GetMyColleges_student_bestPublicCollege_logo | null;
  accumulatedEarnings: GetMyColleges_student_bestPublicCollege_accumulatedEarnings;
  scholarships: string[];
  postalCode: GetMyColleges_student_bestPublicCollege_postalCode;
}

export interface GetMyColleges_student {
  __typename: "Student";
  id: string;
  person: GetMyColleges_student_person | null;
  major: GetMyColleges_student_major | null;
  hand: GetMyColleges_student_hand;
  tips: GetMyColleges_student_tips[];
  normalizedGPA: GetMyColleges_student_normalizedGPA;
  satScore: GetMyColleges_student_satScore;
  appliedProducts: GetMyColleges_student_appliedProducts[];
  onboardingStatus: OnboardingStatus;
  loanStatus: LoanStatus;
  colleges: GetMyColleges_student_colleges[];
  highSchool: GetMyColleges_student_highSchool | null;
  preferences: GetMyColleges_student_preferences[];
  gradePointAverage: GetMyColleges_student_gradePointAverage;
  actScore: GetMyColleges_student_actScore;
  bestPublicCollege: GetMyColleges_student_bestPublicCollege | null;
  overallGrade: FinancialGrade | null;
}

export interface GetMyColleges {
  student: GetMyColleges_student;
}

export interface GetMyCollegesVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchColleges
// ====================================================

export interface SearchColleges_colleges_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface SearchColleges_colleges_postalCode_city {
  __typename: "City";
  name: string;
  state: SearchColleges_colleges_postalCode_city_state;
}

export interface SearchColleges_colleges_postalCode {
  __typename: "PostalCode";
  city: SearchColleges_colleges_postalCode_city;
}

export interface SearchColleges_colleges {
  __typename: "College";
  id: string;
  name: string;
  postalCode: SearchColleges_colleges_postalCode;
}

export interface SearchColleges {
  colleges: SearchColleges_colleges[];
}

export interface SearchCollegesVariables {
  searchString: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMyColleges
// ====================================================

export interface SearchMyColleges_student_colleges_logo {
  __typename: "File";
  url: string;
}

export interface SearchMyColleges_student_colleges_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface SearchMyColleges_student_colleges_postalCode_city {
  __typename: "City";
  name: string;
  state: SearchMyColleges_student_colleges_postalCode_city_state;
}

export interface SearchMyColleges_student_colleges_postalCode {
  __typename: "PostalCode";
  city: SearchMyColleges_student_colleges_postalCode_city;
}

export interface SearchMyColleges_student_colleges {
  __typename: "College";
  id: string;
  name: string;
  logo: SearchMyColleges_student_colleges_logo | null;
  postalCode: SearchMyColleges_student_colleges_postalCode;
  financialGrade: FinancialGrade;
}

export interface SearchMyColleges_student {
  __typename: "Student";
  colleges: SearchMyColleges_student_colleges[];
}

export interface SearchMyColleges {
  student: SearchMyColleges_student;
}

export interface SearchMyCollegesVariables {
  searchString: string;
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CrediblePrefillRequest
// ====================================================

export interface CrediblePrefillRequest_crediblePrefillRequest {
  __typename: "CrediblePrefillRequest";
  link: string;
}

export interface CrediblePrefillRequest {
  crediblePrefillRequest: CrediblePrefillRequest_crediblePrefillRequest | null;
}

export interface CrediblePrefillRequestVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Menus
// ====================================================

export interface Menus_session_account_person_student_menus_menus_sections_links_MenuDivider {
  __typename: "MenuDivider";
  icon: string | null;
}

export interface Menus_session_account_person_student_menus_menus_sections_links_MenuLink_submenu {
  __typename: "Menu";
  location: MenuLocation | null;
}

export interface Menus_session_account_person_student_menus_menus_sections_links_MenuLink {
  __typename: "MenuLink";
  icon: string | null;
  label: string | null;
  link: string | null;
  style: MenuLinkStyle | null;
  submenu: Menus_session_account_person_student_menus_menus_sections_links_MenuLink_submenu | null;
}

export interface Menus_session_account_person_student_menus_menus_sections_links_LockableMenuLink_submenu {
  __typename: "Menu";
  location: MenuLocation | null;
}

export interface Menus_session_account_person_student_menus_menus_sections_links_LockableMenuLink {
  __typename: "LockableMenuLink";
  icon: string | null;
  label: string | null;
  link: string | null;
  style: MenuLinkStyle | null;
  submenu: Menus_session_account_person_student_menus_menus_sections_links_LockableMenuLink_submenu | null;
  lockedLink: string | null;
  logicCheckKey: string | null;
}

export type Menus_session_account_person_student_menus_menus_sections_links = Menus_session_account_person_student_menus_menus_sections_links_MenuDivider | Menus_session_account_person_student_menus_menus_sections_links_MenuLink | Menus_session_account_person_student_menus_menus_sections_links_LockableMenuLink;

export interface Menus_session_account_person_student_menus_menus_sections {
  __typename: "MenuSection";
  title: string | null;
  links: Menus_session_account_person_student_menus_menus_sections_links[];
}

export interface Menus_session_account_person_student_menus_menus {
  __typename: "Menu";
  location: MenuLocation | null;
  sections: Menus_session_account_person_student_menus_menus_sections[];
}

export interface Menus_session_account_person_student_menus {
  __typename: "MenuSet";
  menus: Menus_session_account_person_student_menus_menus[];
}

export interface Menus_session_account_person_student {
  __typename: "Student";
  id: string;
  menus: Menus_session_account_person_student_menus | null;
}

export interface Menus_session_account_person {
  __typename: "Person";
  student: Menus_session_account_person_student | null;
}

export interface Menus_session_account {
  __typename: "Account";
  person: Menus_session_account_person | null;
}

export interface Menus_session {
  __typename: "Session";
  account: Menus_session_account;
}

export interface Menus {
  session: Menus_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchHighSchools
// ====================================================

export interface SearchHighSchools_highSchools_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface SearchHighSchools_highSchools_postalCode_city {
  __typename: "City";
  name: string;
  state: SearchHighSchools_highSchools_postalCode_city_state;
}

export interface SearchHighSchools_highSchools_postalCode {
  __typename: "PostalCode";
  city: SearchHighSchools_highSchools_postalCode_city;
  postalCode: string;
}

export interface SearchHighSchools_highSchools {
  __typename: "HighSchool";
  id: string;
  name: string;
  postalCode: SearchHighSchools_highSchools_postalCode;
}

export interface SearchHighSchools {
  highSchools: SearchHighSchools_highSchools[];
}

export interface SearchHighSchoolsVariables {
  searchString: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPostalCodes
// ====================================================

export interface SearchPostalCodes_postalCodes_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface SearchPostalCodes_postalCodes_city {
  __typename: "City";
  name: string;
  state: SearchPostalCodes_postalCodes_city_state;
}

export interface SearchPostalCodes_postalCodes {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
  city: SearchPostalCodes_postalCodes_city;
}

export interface SearchPostalCodes {
  postalCodes: SearchPostalCodes_postalCodes[];
}

export interface SearchPostalCodesVariables {
  searchString: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchStudents
// ====================================================

export interface SearchStudents_students_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface SearchStudents_students {
  __typename: "Student";
  id: string;
  person: SearchStudents_students_person | null;
}

export interface SearchStudents {
  students: SearchStudents_students[];
}

export interface SearchStudentsVariables {
  searchString: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ValidateSession
// ====================================================

export interface ValidateSession_session_account_emailAddress {
  __typename: "EmailAddress";
  emailAddress: string;
}

export interface ValidateSession_session_account_person {
  __typename: "Person";
  id: string;
  firstName: string | null;
  lastName: string | null;
}

export interface ValidateSession_session_account {
  __typename: "Account";
  id: string;
  emailAddress: ValidateSession_session_account_emailAddress | null;
  person: ValidateSession_session_account_person | null;
}

export interface ValidateSession_session {
  __typename: "Session";
  id: string;
  account: ValidateSession_session_account;
}

export interface ValidateSession {
  session: ValidateSession_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSession
// ====================================================

export interface GetSession_session_account_emailAddress {
  __typename: "EmailAddress";
  id: string;
  emailAddress: string;
}

export interface GetSession_session_account_outboundInvitations {
  __typename: "Invitation";
  id: string;
  permission: InviterPermission | null;
}

export interface GetSession_session_account_notifications {
  __typename: "Notification";
  id: string;
  title: string;
  message: string | null;
  effectiveAt: any;
  link: string | null;
  lastSeenAt: any | null;
}

export interface GetSession_session_account_person_parent_children_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetSession_session_account_person_parent_children {
  __typename: "Student";
  id: string;
  person: GetSession_session_account_person_parent_children_person | null;
}

export interface GetSession_session_account_person_parent {
  __typename: "Parent";
  id: string;
  children: GetSession_session_account_person_parent_children[];
}

export interface GetSession_session_account_person_counselor_students_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetSession_session_account_person_counselor_students {
  __typename: "Student";
  id: string;
  person: GetSession_session_account_person_counselor_students_person | null;
}

export interface GetSession_session_account_person_counselor {
  __typename: "Counselor";
  id: string;
  students: GetSession_session_account_person_counselor_students[];
}

export interface GetSession_session_account_person_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetSession_session_account_person_student {
  __typename: "Student";
  id: string;
  person: GetSession_session_account_person_student_person | null;
}

export interface GetSession_session_account_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  affinities: Affinity[] | null;
  parent: GetSession_session_account_person_parent | null;
  counselor: GetSession_session_account_person_counselor | null;
  student: GetSession_session_account_person_student | null;
}

export interface GetSession_session_account {
  __typename: "Account";
  emailAddress: GetSession_session_account_emailAddress | null;
  hasPassword: boolean;
  outboundInvitations: GetSession_session_account_outboundInvitations[];
  notifications: GetSession_session_account_notifications[];
  isSuperUser: boolean;
  person: GetSession_session_account_person | null;
}

export interface GetSession_session {
  __typename: "Session";
  expiresAt: any;
  account: GetSession_session_account;
}

export interface GetSession {
  session: GetSession_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_organization {
  __typename: "Organization";
  id: string;
  name: string;
  logoUrl: string;
}

export interface GetProducts_products {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  version: any;
  amount: number;
  period: BillingPeriod | null;
  organization: GetProducts_products_organization | null;
}

export interface GetProducts {
  products: GetProducts_products[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomer
// ====================================================

export interface GetCustomer_session_account_emailAddress {
  __typename: "EmailAddress";
  emailAddress: string;
}

export interface GetCustomer_session_account_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetCustomer_session_account {
  __typename: "Account";
  emailAddress: GetCustomer_session_account_emailAddress | null;
  person: GetCustomer_session_account_person | null;
}

export interface GetCustomer_session {
  __typename: "Session";
  account: GetCustomer_session_account;
}

export interface GetCustomer {
  session: GetCustomer_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentStudent
// ====================================================

export interface GetCurrentStudent_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetCurrentStudent_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetCurrentStudent_student_appliedProducts_product;
}

export interface GetCurrentStudent_student {
  __typename: "Student";
  id: string;
  appliedProducts: GetCurrentStudent_student_appliedProducts[];
}

export interface GetCurrentStudent {
  student: GetCurrentStudent_student;
}

export interface GetCurrentStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAppliedProductsForStudent
// ====================================================

export interface GetAppliedProductsForStudent_student_appliedProducts_product_organization {
  __typename: "Organization";
  logoUrl: string;
}

export interface GetAppliedProductsForStudent_student_appliedProducts_product {
  __typename: "Product";
  name: string;
  organization: GetAppliedProductsForStudent_student_appliedProducts_product_organization | null;
}

export interface GetAppliedProductsForStudent_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetAppliedProductsForStudent_student_appliedProducts_product;
}

export interface GetAppliedProductsForStudent_student {
  __typename: "Student";
  id: string;
  appliedProducts: GetAppliedProductsForStudent_student_appliedProducts[];
}

export interface GetAppliedProductsForStudent {
  student: GetAppliedProductsForStudent_student;
}

export interface GetAppliedProductsForStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollege
// ====================================================

export interface GetCollege_college_logo {
  __typename: "File";
  url: string;
}

export interface GetCollege_college_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
  slug: string | null;
}

export interface GetCollege_college_postalCode_city {
  __typename: "City";
  name: string;
  state: GetCollege_college_postalCode_city_state;
}

export interface GetCollege_college_postalCode {
  __typename: "PostalCode";
  city: GetCollege_college_postalCode_city;
}

export interface GetCollege_college_costOfAttendance_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface GetCollege_college_costOfAttendance_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollege_college_costOfAttendance_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollege_college_costOfAttendance_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface GetCollege_college_costOfAttendance_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollege_college_costOfAttendance_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollege_college_costOfAttendance_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollege_college_costOfAttendance_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface GetCollege_college_costOfAttendance_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface GetCollege_college_costOfAttendance_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetCollege_college_costOfAttendance_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface GetCollege_college_costOfAttendance_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetCollege_college_costOfAttendance_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetCollege_college_costOfAttendance_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface GetCollege_college_costOfAttendance_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface GetCollege_college_costOfAttendance_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface GetCollege_college_costOfAttendance_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface GetCollege_college_costOfAttendance_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface GetCollege_college_costOfAttendance_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface GetCollege_college_costOfAttendance_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type GetCollege_college_costOfAttendance_from = GetCollege_college_costOfAttendance_from_FactIntValue | GetCollege_college_costOfAttendance_from_UserFloatValue | GetCollege_college_costOfAttendance_from_UserNullableStringValue | GetCollege_college_costOfAttendance_from_UserNullableIntValue | GetCollege_college_costOfAttendance_from_UserIntValue | GetCollege_college_costOfAttendance_from_UserNullableFloatValue | GetCollege_college_costOfAttendance_from_UserStringValue | GetCollege_college_costOfAttendance_from_UserNullableBooleanValue | GetCollege_college_costOfAttendance_from_UserBooleanValue | GetCollege_college_costOfAttendance_from_SystemNullableIntValue | GetCollege_college_costOfAttendance_from_SystemIntValue | GetCollege_college_costOfAttendance_from_SystemNullableFloatValue | GetCollege_college_costOfAttendance_from_SystemFloatValue | GetCollege_college_costOfAttendance_from_SystemNullableStringValue | GetCollege_college_costOfAttendance_from_SystemStringValue | GetCollege_college_costOfAttendance_from_SystemNullableBooleanValue | GetCollege_college_costOfAttendance_from_SystemBooleanValue | GetCollege_college_costOfAttendance_from_ComputedFloatValue | GetCollege_college_costOfAttendance_from_ComputedNullableIntValue | GetCollege_college_costOfAttendance_from_ComputedNullableFloatValue | GetCollege_college_costOfAttendance_from_ComputedIntValue | GetCollege_college_costOfAttendance_from_ComputedBooleanValue | GetCollege_college_costOfAttendance_from_ComputedNullableStringValue | GetCollege_college_costOfAttendance_from_ComputedStringValue | GetCollege_college_costOfAttendance_from_ComputedNullableBooleanValue;

export interface GetCollege_college_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: GetCollege_college_costOfAttendance_from[];
}

export interface GetCollege_college_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollege_college_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollege_college_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetCollege_college {
  __typename: "College";
  id: string;
  name: string;
  url: string | null;
  logo: GetCollege_college_logo | null;
  type: CollegeType;
  abbreviation: string;
  postalCode: GetCollege_college_postalCode;
  costOfAttendance: GetCollege_college_costOfAttendance;
  /**
   * from 0 to 1
   */
  medianEarnings: GetCollege_college_medianEarnings[];
  netEarnings: GetCollege_college_netEarnings[];
  debtRemaining: GetCollege_college_debtRemaining[];
  repaymentRate: number;
  meetFinancialAid: number | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
  averagePrice: number | null;
  publishedTuition: number;
}

export interface GetCollege {
  college: GetCollege_college;
}

export interface GetCollegeVariables {
  collegeSlug: string;
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFinancialPlanner
// ====================================================

export interface GetFinancialPlanner_session_account_person {
  __typename: "Person";
  type: PersonType | null;
}

export interface GetFinancialPlanner_session_account {
  __typename: "Account";
  person: GetFinancialPlanner_session_account_person | null;
}

export interface GetFinancialPlanner_session {
  __typename: "Session";
  account: GetFinancialPlanner_session_account;
}

export interface GetFinancialPlanner_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetFinancialPlanner_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetFinancialPlanner_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetFinancialPlanner_student_appliedProducts_product;
}

export interface GetFinancialPlanner_student_workStudyAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetFinancialPlanner_student_cashContributionAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetFinancialPlanner_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetFinancialPlanner_student_topChoice_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface GetFinancialPlanner_student_topChoice_postalCode_city {
  __typename: "City";
  name: string;
  state: GetFinancialPlanner_student_topChoice_postalCode_city_state;
}

export interface GetFinancialPlanner_student_topChoice_postalCode {
  __typename: "PostalCode";
  city: GetFinancialPlanner_student_topChoice_postalCode_city;
}

export interface GetFinancialPlanner_student_topChoice_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetFinancialPlanner_student_topChoice_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetFinancialPlanner_student_topChoice_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetFinancialPlanner_student_topChoice {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  postalCode: GetFinancialPlanner_student_topChoice_postalCode;
  financialAidAward: number | null;
  costOfAttendance: GetFinancialPlanner_student_topChoice_costOfAttendance;
  edstimate: GetFinancialPlanner_student_topChoice_edstimate;
  /**
   * from 0 to 1
   */
  medianEarnings: GetFinancialPlanner_student_topChoice_medianEarnings[];
}

export interface GetFinancialPlanner_student {
  __typename: "Student";
  id: string;
  person: GetFinancialPlanner_student_person | null;
  appliedProducts: GetFinancialPlanner_student_appliedProducts[];
  workStudyAmount: GetFinancialPlanner_student_workStudyAmount;
  cashContributionAmount: GetFinancialPlanner_student_cashContributionAmount;
  collegeSavingsAmount: GetFinancialPlanner_student_collegeSavingsAmount;
  topChoice: GetFinancialPlanner_student_topChoice | null;
}

export interface GetFinancialPlanner {
  session: GetFinancialPlanner_session | null;
  student: GetFinancialPlanner_student;
}

export interface GetFinancialPlannerVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLabs
// ====================================================

export interface GetLabs_colleges_logo {
  __typename: "File";
  url: string;
}

export interface GetLabs_colleges {
  __typename: "College";
  id: string;
  name: string;
  logo: GetLabs_colleges_logo | null;
}

export interface GetLabs {
  colleges: GetLabs_colleges[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMetroAreaColleges
// ====================================================

export interface GetMetroAreaColleges_metroArea_colleges_logo {
  __typename: "File";
  url: string;
}

export interface GetMetroAreaColleges_metroArea_colleges_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface GetMetroAreaColleges_metroArea_colleges_postalCode_city {
  __typename: "City";
  name: string;
  state: GetMetroAreaColleges_metroArea_colleges_postalCode_city_state;
}

export interface GetMetroAreaColleges_metroArea_colleges_postalCode {
  __typename: "PostalCode";
  city: GetMetroAreaColleges_metroArea_colleges_postalCode_city;
}

export interface GetMetroAreaColleges_metroArea_colleges_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMetroAreaColleges_metroArea_colleges_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetMetroAreaColleges_metroArea_colleges_firstYearEarnings {
  __typename: "EarningsDataPoint";
  value: number;
}

export interface GetMetroAreaColleges_metroArea_colleges {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetMetroAreaColleges_metroArea_colleges_logo | null;
  url: string | null;
  urlSlugs: string[];
  postalCode: GetMetroAreaColleges_metroArea_colleges_postalCode;
  costOfAttendance: GetMetroAreaColleges_metroArea_colleges_costOfAttendance;
  edstimate: GetMetroAreaColleges_metroArea_colleges_edstimate;
  /**
   * from 0 to 1
   */
  firstYearEarnings: GetMetroAreaColleges_metroArea_colleges_firstYearEarnings[];
}

export interface GetMetroAreaColleges_metroArea {
  __typename: "MetroArea";
  id: string;
  name: string;
  colleges: GetMetroAreaColleges_metroArea_colleges[];
}

export interface GetMetroAreaColleges {
  metroArea: GetMetroAreaColleges_metroArea;
}

export interface GetMetroAreaCollegesVariables {
  studentId: string;
  metroAreaSlug: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStateColleges
// ====================================================

export interface GetStateColleges_state_colleges_logo {
  __typename: "File";
  url: string;
}

export interface GetStateColleges_state_colleges_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface GetStateColleges_state_colleges_postalCode_city {
  __typename: "City";
  name: string;
  state: GetStateColleges_state_colleges_postalCode_city_state;
}

export interface GetStateColleges_state_colleges_postalCode {
  __typename: "PostalCode";
  city: GetStateColleges_state_colleges_postalCode_city;
}

export interface GetStateColleges_state_colleges_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetStateColleges_state_colleges_firstYearEarnings {
  __typename: "EarningsDataPoint";
  value: number;
}

export interface GetStateColleges_state_colleges {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetStateColleges_state_colleges_logo | null;
  url: string | null;
  urlSlugs: string[];
  postalCode: GetStateColleges_state_colleges_postalCode;
  costOfAttendance: GetStateColleges_state_colleges_costOfAttendance;
  /**
   * from 0 to 1
   */
  firstYearEarnings: GetStateColleges_state_colleges_firstYearEarnings[];
}

export interface GetStateColleges_state {
  __typename: "State";
  id: string;
  name: string;
  colleges: GetStateColleges_state_colleges[];
}

export interface GetStateColleges {
  state: GetStateColleges_state;
}

export interface GetStateCollegesVariables {
  studentId: string;
  stateSlug: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMetroAreas
// ====================================================

export interface GetMetroAreas_metroAreas {
  __typename: "MetroArea";
  id: string;
  abbreviation: string;
  name: string;
  slug: string | null;
}

export interface GetMetroAreas {
  metroAreas: GetMetroAreas_metroAreas[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStates
// ====================================================

export interface GetStates_states {
  __typename: "State";
  id: string;
  abbreviation: string;
  name: string;
  slug: string | null;
}

export interface GetStates {
  states: GetStates_states[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfile
// ====================================================

export interface GetProfile_session_account_emailAddress {
  __typename: "EmailAddress";
  id: string;
  emailAddress: string;
}

export interface GetProfile_session_account_person_parent_household_efc {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetProfile_session_account_person_parent_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetProfile_session_account_person_parent_household {
  __typename: "Household";
  efc: GetProfile_session_account_person_parent_household_efc;
  income: GetProfile_session_account_person_parent_household_income;
}

export interface GetProfile_session_account_person_parent {
  __typename: "Parent";
  id: string;
  household: GetProfile_session_account_person_parent_household | null;
}

export interface GetProfile_session_account_person_counselor {
  __typename: "Counselor";
  id: string;
}

export interface GetProfile_session_account_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
  parent: GetProfile_session_account_person_parent | null;
  counselor: GetProfile_session_account_person_counselor | null;
}

export interface GetProfile_session_account {
  __typename: "Account";
  emailAddress: GetProfile_session_account_emailAddress | null;
  person: GetProfile_session_account_person | null;
}

export interface GetProfile_session {
  __typename: "Session";
  account: GetProfile_session_account;
}

export interface GetProfile_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
}

export interface GetProfile_student_preferences {
  __typename: "Preference";
  id: string;
  value: number;
}

export interface GetProfile_student_highSchool_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface GetProfile_student_highSchool_postalCode_city {
  __typename: "City";
  name: string;
  state: GetProfile_student_highSchool_postalCode_city_state;
}

export interface GetProfile_student_highSchool_postalCode {
  __typename: "PostalCode";
  city: GetProfile_student_highSchool_postalCode_city;
  postalCode: string;
}

export interface GetProfile_student_highSchool {
  __typename: "HighSchool";
  id: string;
  name: string;
  postalCode: GetProfile_student_highSchool_postalCode;
}

export interface GetProfile_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetProfile_student_household_efc {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetProfile_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
}

export interface GetProfile_student_household {
  __typename: "Household";
  income: GetProfile_student_household_income;
  efc: GetProfile_student_household_efc;
  postalCode: GetProfile_student_household_postalCode | null;
}

export interface GetProfile_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetProfile_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetProfile_student_workStudyAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetProfile_student_cashContributionAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetProfile_student_otherScholarshipsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetProfile_student_highSchoolGraduationYear {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetProfile_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetProfile_student_weightedGradePointAverageMaximum {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetProfile_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetProfile_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetProfile_student_psatScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetProfile_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetProfile_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetProfile_student_appliedProducts_product;
}

export interface GetProfile_student {
  __typename: "Student";
  id: string;
  person: GetProfile_student_person | null;
  preferences: GetProfile_student_preferences[];
  highSchool: GetProfile_student_highSchool | null;
  household: GetProfile_student_household | null;
  major: GetProfile_student_major | null;
  collegeSavingsAmount: GetProfile_student_collegeSavingsAmount;
  workStudyAmount: GetProfile_student_workStudyAmount;
  cashContributionAmount: GetProfile_student_cashContributionAmount;
  otherScholarshipsAmount: GetProfile_student_otherScholarshipsAmount;
  highSchoolGraduationYear: GetProfile_student_highSchoolGraduationYear;
  gradePointAverage: GetProfile_student_gradePointAverage;
  weightedGradePointAverageMaximum: GetProfile_student_weightedGradePointAverageMaximum;
  actScore: GetProfile_student_actScore;
  satScore: GetProfile_student_satScore;
  psatScore: GetProfile_student_psatScore;
  appliedProducts: GetProfile_student_appliedProducts[];
}

export interface GetProfile {
  session: GetProfile_session | null;
  student: GetProfile_student;
}

export interface GetProfileVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetStudent
// ====================================================

export interface GetWidgetStudent_session_account_person_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetWidgetStudent_session_account_person_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetWidgetStudent_session_account_person_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetWidgetStudent_session_account_person_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
}

export interface GetWidgetStudent_session_account_person_student_household {
  __typename: "Household";
  postalCode: GetWidgetStudent_session_account_person_student_household_postalCode | null;
}

export interface GetWidgetStudent_session_account_person_student {
  __typename: "Student";
  id: string;
  gradePointAverage: GetWidgetStudent_session_account_person_student_gradePointAverage;
  actScore: GetWidgetStudent_session_account_person_student_actScore;
  satScore: GetWidgetStudent_session_account_person_student_satScore;
  household: GetWidgetStudent_session_account_person_student_household | null;
}

export interface GetWidgetStudent_session_account_person {
  __typename: "Person";
  id: string;
  student: GetWidgetStudent_session_account_person_student | null;
}

export interface GetWidgetStudent_session_account {
  __typename: "Account";
  id: string;
  person: GetWidgetStudent_session_account_person | null;
}

export interface GetWidgetStudent_session {
  __typename: "Session";
  account: GetWidgetStudent_session_account;
}

export interface GetWidgetStudent {
  session: GetWidgetStudent_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCollege
// ====================================================

export interface GetWidgetCollege_college_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetWidgetCollege_college_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetWidgetCollege_college {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  costOfAttendance: GetWidgetCollege_college_costOfAttendance;
  edstimate: GetWidgetCollege_college_edstimate;
}

export interface GetWidgetCollege {
  college: GetWidgetCollege_college;
}

export interface GetWidgetCollegeVariables {
  collegeId: string;
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecommendations
// ====================================================

export interface GetRecommendations_session_account_person {
  __typename: "Person";
  type: PersonType | null;
}

export interface GetRecommendations_session_account {
  __typename: "Account";
  person: GetRecommendations_session_account_person | null;
}

export interface GetRecommendations_session {
  __typename: "Session";
  account: GetRecommendations_session_account;
}

export interface GetRecommendations_student_person {
  __typename: "Person";
  affinities: Affinity[] | null;
}

export interface GetRecommendations_student_normalizedGPA {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetRecommendations_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetRecommendations_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetRecommendations_student_appliedProducts_product;
}

export interface GetRecommendations_student_colleges {
  __typename: "College";
  id: string;
}

export interface GetRecommendations_student_hand_current {
  __typename: "College";
  id: string;
}

export interface GetRecommendations_student_hand {
  __typename: "Hand";
  current: GetRecommendations_student_hand_current[];
}

export interface GetRecommendations_student_highSchool {
  __typename: "HighSchool";
  popularColleges: string[];
}

export interface GetRecommendations_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetRecommendations_student_preferences {
  __typename: "Preference";
  id: string;
  value: number;
}

export interface GetRecommendations_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetRecommendations_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetRecommendations_student_recommendations_colleges_WithheldCollege {
  __typename: "WithheldCollege";
  id: string;
}

export interface GetRecommendations_student_recommendations_colleges_College_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface GetRecommendations_student_recommendations_colleges_College_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetRecommendations_student_recommendations_colleges_College_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface GetRecommendations_student_recommendations_colleges_College_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetRecommendations_student_recommendations_colleges_College_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface GetRecommendations_student_recommendations_colleges_College_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetRecommendations_student_recommendations_colleges_College_effectiveCost {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_logo {
  __typename: "File";
  url: string;
}

export interface GetRecommendations_student_recommendations_colleges_College_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRecommendations_student_recommendations_colleges_College_postalCode_city_state {
  __typename: "State";
  id: string;
  abbreviation: string;
  name: string;
}

export interface GetRecommendations_student_recommendations_colleges_College_postalCode_city {
  __typename: "City";
  id: string;
  name: string;
  state: GetRecommendations_student_recommendations_colleges_College_postalCode_city_state;
}

export interface GetRecommendations_student_recommendations_colleges_College_postalCode {
  __typename: "PostalCode";
  id: string;
  city: GetRecommendations_student_recommendations_colleges_College_postalCode_city;
}

export interface GetRecommendations_student_recommendations_colleges_College {
  __typename: "College";
  id: string;
  name: string;
  admissibility: GetRecommendations_student_recommendations_colleges_College_admissibility;
  admissionUnlikely: GetRecommendations_student_recommendations_colleges_College_admissionUnlikely;
  financialAidAward: number | null;
  coverImageUrl: string | null;
  abbreviation: string;
  edstimate: GetRecommendations_student_recommendations_colleges_College_edstimate;
  averageCostOfAttendance: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: GetRecommendations_student_recommendations_colleges_College_medianEarnings[];
  netEarnings: GetRecommendations_student_recommendations_colleges_College_netEarnings[];
  features: string[];
  satScoreIQR: GetRecommendations_student_recommendations_colleges_College_satScoreIQR | null;
  actScoreIQR: GetRecommendations_student_recommendations_colleges_College_actScoreIQR | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
  debtRemaining: GetRecommendations_student_recommendations_colleges_College_debtRemaining[];
  averageAnnualEarningsAmount: GetRecommendations_student_recommendations_colleges_College_averageAnnualEarningsAmount;
  costOfAttendance: GetRecommendations_student_recommendations_colleges_College_costOfAttendance;
  annualLoanPaymentAmount: GetRecommendations_student_recommendations_colleges_College_annualLoanPaymentAmount;
  valueBenchmark: GetRecommendations_student_recommendations_colleges_College_valueBenchmark;
  valueDelta: GetRecommendations_student_recommendations_colleges_College_valueDelta;
  majors: GetRecommendations_student_recommendations_colleges_College_majors[];
  financialGrade: FinancialGrade;
  calculationsUseAidAward: boolean;
  status: CollegeStatus | null;
  averageGPA: GetRecommendations_student_recommendations_colleges_College_averageGPA;
  averageSATScore: GetRecommendations_student_recommendations_colleges_College_averageSATScore;
  effectiveCost: GetRecommendations_student_recommendations_colleges_College_effectiveCost;
  affordabilityDetermination: AffordabilityDetermination;
  valueDetermination: ValueDetermination;
  logo: GetRecommendations_student_recommendations_colleges_College_logo | null;
  accumulatedEarnings: GetRecommendations_student_recommendations_colleges_College_accumulatedEarnings;
  scholarships: string[];
  postalCode: GetRecommendations_student_recommendations_colleges_College_postalCode;
}

export type GetRecommendations_student_recommendations_colleges = GetRecommendations_student_recommendations_colleges_WithheldCollege | GetRecommendations_student_recommendations_colleges_College;

export interface GetRecommendations_student_recommendations {
  __typename: "Recommendation";
  id: string;
  title: string;
  colleges: GetRecommendations_student_recommendations_colleges[];
}

export interface GetRecommendations_student {
  __typename: "Student";
  id: string;
  person: GetRecommendations_student_person | null;
  normalizedGPA: GetRecommendations_student_normalizedGPA;
  satScore: GetRecommendations_student_satScore;
  appliedProducts: GetRecommendations_student_appliedProducts[];
  colleges: GetRecommendations_student_colleges[];
  hand: GetRecommendations_student_hand;
  highSchool: GetRecommendations_student_highSchool | null;
  major: GetRecommendations_student_major | null;
  preferences: GetRecommendations_student_preferences[];
  gradePointAverage: GetRecommendations_student_gradePointAverage;
  actScore: GetRecommendations_student_actScore;
  recommendations: GetRecommendations_student_recommendations[];
}

export interface GetRecommendations {
  session: GetRecommendations_session | null;
  student: GetRecommendations_student;
}

export interface GetRecommendationsVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSabrinaBotMessages
// ====================================================

export interface GetSabrinaBotMessages_student_sabrinaBotMessages_SabrinaBotTextMessage {
  __typename: "SabrinaBotTextMessage" | "SabrinaBotEndMessage";
  id: string;
  createdAt: any;
  text: string;
  actions: string[] | null;
  selectedAction: string | null;
}

export interface GetSabrinaBotMessages_student_sabrinaBotMessages_SabrinaBotCTAMessage {
  __typename: "SabrinaBotCTAMessage";
  id: string;
  createdAt: any;
  text: string;
  actions: string[] | null;
  selectedAction: string | null;
  callToActionText: string;
  callToActionUrl: string | null;
}

export type GetSabrinaBotMessages_student_sabrinaBotMessages = GetSabrinaBotMessages_student_sabrinaBotMessages_SabrinaBotTextMessage | GetSabrinaBotMessages_student_sabrinaBotMessages_SabrinaBotCTAMessage;

export interface GetSabrinaBotMessages_student {
  __typename: "Student";
  id: string;
  sabrinaBotMessages: GetSabrinaBotMessages_student_sabrinaBotMessages[] | null;
}

export interface GetSabrinaBotMessages {
  student: GetSabrinaBotMessages_student;
}

export interface GetSabrinaBotMessagesVariables {
  studentId: string;
  page: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAppeals
// ====================================================

export interface GetAppeals_session_account {
  __typename: "Account";
  isSuperUser: boolean;
}

export interface GetAppeals_session {
  __typename: "Session";
  account: GetAppeals_session_account;
}

export interface GetAppeals_student_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface GetAppeals_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: GetAppeals_student_appliedProducts_product;
}

export interface GetAppeals_student_colleges_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetAppeals_student_colleges_financialAidAppealLetter {
  __typename: "File";
  id: string;
}

export interface GetAppeals_student_colleges {
  __typename: "College";
  id: string;
  name: string;
  status: CollegeStatus | null;
  edstimate: GetAppeals_student_colleges_edstimate;
  financialAidAward: number | null;
  financialAidAppealAward: number | null;
  financialAidAppealLetter: GetAppeals_student_colleges_financialAidAppealLetter | null;
}

export interface GetAppeals_student {
  __typename: "Student";
  id: string;
  appliedProducts: GetAppeals_student_appliedProducts[];
  colleges: GetAppeals_student_colleges[];
}

export interface GetAppeals {
  session: GetAppeals_session | null;
  student: GetAppeals_student;
}

export interface GetAppealsVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFileDownloadUrl
// ====================================================

export interface GetFileDownloadUrl_file {
  __typename: "File";
  id: string;
  downloadUrl: string;
}

export interface GetFileDownloadUrl {
  file: GetFileDownloadUrl_file;
}

export interface GetFileDownloadUrlVariables {
  studentId: string;
  fileId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReportPage
// ====================================================

export interface GetReportPage_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetReportPage_session_account_emailAddress {
  __typename: "EmailAddress";
  id: string;
  emailAddress: string;
}

export interface GetReportPage_session_account {
  __typename: "Account";
  emailAddress: GetReportPage_session_account_emailAddress | null;
  hasPassword: boolean;
}

export interface GetReportPage_session {
  __typename: "Session";
  account: GetReportPage_session_account;
}

export interface GetReportPage_student_major {
  __typename: "Major";
  id: string;
}

export interface GetReportPage_student_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
}

export interface GetReportPage_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface GetReportPage_student_workStudyAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetReportPage_student_cashContributionAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetReportPage_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetReportPage_student_otherScholarshipsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetReportPage_student_creditScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetReportPage_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetReportPage_student_household_efc {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetReportPage_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
}

export interface GetReportPage_student_household {
  __typename: "Household";
  income: GetReportPage_student_household_income;
  efc: GetReportPage_student_household_efc;
  imputedIncome: number | null;
  postalCode: GetReportPage_student_household_postalCode | null;
}

export interface GetReportPage_student_hand_current_logo {
  __typename: "File";
  url: string;
}

export interface GetReportPage_student_hand_current_loans_payments {
  __typename: "LoanPayment";
  month: number;
  paymentAmount: number;
  remainingPrincipal: number;
  remainingInterest: number;
  remainingTotal: number;
}

export interface GetReportPage_student_hand_current_loans {
  __typename: "Loan";
  id: string;
  createdAt: any;
  updatedAt: any;
  version: any;
  payments: GetReportPage_student_hand_current_loans_payments[];
  provider: string;
  interestRate: number;
  strictPrincipal: number;
  initialPrincipalAmount: number;
  initialInterestAmount: number;
  initialTotalLoanAmount: number;
}

export interface GetReportPage_student_hand_current_loanPrincipalAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetReportPage_student_hand_current_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetReportPage_student_hand_current_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetReportPage_student_hand_current_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_effectiveCost {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_loanInterestRate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_loanPaymentMonths {
  __typename: "ComputedIntValue";
  value: number;
}

export interface GetReportPage_student_hand_current_totalLoanAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_affordabilityDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current_affordabilityBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetReportPage_student_hand_current {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetReportPage_student_hand_current_logo | null;
  loans: GetReportPage_student_hand_current_loans[];
  loanPrincipalAmount: GetReportPage_student_hand_current_loanPrincipalAmount;
  calculationsUseAidAward: boolean;
  financialAidAward: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: GetReportPage_student_hand_current_medianEarnings[];
  netEarnings: GetReportPage_student_hand_current_netEarnings[];
  debtRemaining: GetReportPage_student_hand_current_debtRemaining[];
  averageCostOfAttendance: number | null;
  edstimate: GetReportPage_student_hand_current_edstimate;
  effectiveCost: GetReportPage_student_hand_current_effectiveCost;
  costOfAttendance: GetReportPage_student_hand_current_costOfAttendance;
  loanInterestRate: GetReportPage_student_hand_current_loanInterestRate;
  loanPaymentMonths: GetReportPage_student_hand_current_loanPaymentMonths;
  totalLoanAmount: GetReportPage_student_hand_current_totalLoanAmount;
  affordabilityDetermination: AffordabilityDetermination;
  affordabilityDelta: GetReportPage_student_hand_current_affordabilityDelta;
  valueDetermination: ValueDetermination;
  valueBenchmark: GetReportPage_student_hand_current_valueBenchmark;
  valueDelta: GetReportPage_student_hand_current_valueDelta;
  annualLoanPaymentAmount: GetReportPage_student_hand_current_annualLoanPaymentAmount;
  averageAnnualEarningsAmount: GetReportPage_student_hand_current_averageAnnualEarningsAmount;
  affordabilityBenchmark: GetReportPage_student_hand_current_affordabilityBenchmark;
  financialGrade: FinancialGrade;
}

export interface GetReportPage_student_hand {
  __typename: "Hand";
  current: GetReportPage_student_hand_current[];
}

export interface GetReportPage_student {
  __typename: "Student";
  id: string;
  major: GetReportPage_student_major | null;
  appliedProducts: GetReportPage_student_appliedProducts[];
  onboardingStatus: OnboardingStatus;
  loanStatus: LoanStatus;
  person: GetReportPage_student_person | null;
  workStudyAmount: GetReportPage_student_workStudyAmount;
  cashContributionAmount: GetReportPage_student_cashContributionAmount;
  collegeSavingsAmount: GetReportPage_student_collegeSavingsAmount;
  otherScholarshipsAmount: GetReportPage_student_otherScholarshipsAmount;
  creditScore: GetReportPage_student_creditScore;
  household: GetReportPage_student_household | null;
  hand: GetReportPage_student_hand;
}

export interface GetReportPage {
  majors: GetReportPage_majors[];
  session: GetReportPage_session | null;
  student: GetReportPage_student;
}

export interface GetReportPageVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegisteringStudentAccount
// ====================================================

export interface GetRegisteringStudentAccount_student_highSchoolGraduationYear {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetRegisteringStudentAccount_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetRegisteringStudentAccount_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetRegisteringStudentAccount_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetRegisteringStudentAccount_student_psatScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetRegisteringStudentAccount_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetRegisteringStudentAccount_student_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
  type: PersonType | null;
}

export interface GetRegisteringStudentAccount_student_household_postalCode_city_state {
  __typename: "State";
  abbreviation: string;
}

export interface GetRegisteringStudentAccount_student_household_postalCode_city {
  __typename: "City";
  name: string;
  state: GetRegisteringStudentAccount_student_household_postalCode_city_state;
}

export interface GetRegisteringStudentAccount_student_household_postalCode {
  __typename: "PostalCode";
  id: string;
  postalCode: string;
  city: GetRegisteringStudentAccount_student_household_postalCode_city;
}

export interface GetRegisteringStudentAccount_student_household {
  __typename: "Household";
  postalCode: GetRegisteringStudentAccount_student_household_postalCode | null;
}

export interface GetRegisteringStudentAccount_student {
  __typename: "Student";
  id: string;
  highSchoolGraduationYear: GetRegisteringStudentAccount_student_highSchoolGraduationYear;
  gradePointAverage: GetRegisteringStudentAccount_student_gradePointAverage;
  actScore: GetRegisteringStudentAccount_student_actScore;
  satScore: GetRegisteringStudentAccount_student_satScore;
  psatScore: GetRegisteringStudentAccount_student_psatScore;
  major: GetRegisteringStudentAccount_student_major | null;
  person: GetRegisteringStudentAccount_student_person | null;
  household: GetRegisteringStudentAccount_student_household | null;
}

export interface GetRegisteringStudentAccount {
  student: GetRegisteringStudentAccount_student;
}

export interface GetRegisteringStudentAccountVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRegisteringCollege
// ====================================================

export interface GetRegisteringCollege_college_logo {
  __typename: "File";
  url: string;
}

export interface GetRegisteringCollege_college_affordabilityScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRegisteringCollege_college_valueScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRegisteringCollege_college_earningsScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRegisteringCollege_college_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetRegisteringCollege_college {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  logo: GetRegisteringCollege_college_logo | null;
  affordabilityScore: GetRegisteringCollege_college_affordabilityScore;
  valueScore: GetRegisteringCollege_college_valueScore;
  earningsScore: GetRegisteringCollege_college_earningsScore;
  edstimate: GetRegisteringCollege_college_edstimate;
}

export interface GetRegisteringCollege {
  college: GetRegisteringCollege_college;
}

export interface GetRegisteringCollegeVariables {
  studentId: string;
  collegeId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComparisonCollege
// ====================================================

export interface GetComparisonCollege_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetComparisonCollege_student {
  __typename: "Student";
  id: string;
  major: GetComparisonCollege_student_major | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface GetComparisonCollege_college_costOfAttendance_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type GetComparisonCollege_college_costOfAttendance_from = GetComparisonCollege_college_costOfAttendance_from_FactIntValue | GetComparisonCollege_college_costOfAttendance_from_UserFloatValue | GetComparisonCollege_college_costOfAttendance_from_UserNullableStringValue | GetComparisonCollege_college_costOfAttendance_from_UserNullableIntValue | GetComparisonCollege_college_costOfAttendance_from_UserIntValue | GetComparisonCollege_college_costOfAttendance_from_UserNullableFloatValue | GetComparisonCollege_college_costOfAttendance_from_UserStringValue | GetComparisonCollege_college_costOfAttendance_from_UserNullableBooleanValue | GetComparisonCollege_college_costOfAttendance_from_UserBooleanValue | GetComparisonCollege_college_costOfAttendance_from_SystemNullableIntValue | GetComparisonCollege_college_costOfAttendance_from_SystemIntValue | GetComparisonCollege_college_costOfAttendance_from_SystemNullableFloatValue | GetComparisonCollege_college_costOfAttendance_from_SystemFloatValue | GetComparisonCollege_college_costOfAttendance_from_SystemNullableStringValue | GetComparisonCollege_college_costOfAttendance_from_SystemStringValue | GetComparisonCollege_college_costOfAttendance_from_SystemNullableBooleanValue | GetComparisonCollege_college_costOfAttendance_from_SystemBooleanValue | GetComparisonCollege_college_costOfAttendance_from_ComputedFloatValue | GetComparisonCollege_college_costOfAttendance_from_ComputedNullableIntValue | GetComparisonCollege_college_costOfAttendance_from_ComputedNullableFloatValue | GetComparisonCollege_college_costOfAttendance_from_ComputedIntValue | GetComparisonCollege_college_costOfAttendance_from_ComputedBooleanValue | GetComparisonCollege_college_costOfAttendance_from_ComputedNullableStringValue | GetComparisonCollege_college_costOfAttendance_from_ComputedStringValue | GetComparisonCollege_college_costOfAttendance_from_ComputedNullableBooleanValue;

export interface GetComparisonCollege_college_costOfAttendance {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: GetComparisonCollege_college_costOfAttendance_from[];
  value: number;
}

export interface GetComparisonCollege_college_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface GetComparisonCollege_college_postalCode_city {
  __typename: "City";
  name: string;
  state: GetComparisonCollege_college_postalCode_city_state;
}

export interface GetComparisonCollege_college_postalCode {
  __typename: "PostalCode";
  city: GetComparisonCollege_college_postalCode_city;
}

export interface GetComparisonCollege_college_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface GetComparisonCollege_college_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface GetComparisonCollege_college_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetComparisonCollege_college_averageACTScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface GetComparisonCollege_college_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  mid: number | null;
  high: number | null;
}

export interface GetComparisonCollege_college_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  mid: number | null;
  high: number | null;
}

export interface GetComparisonCollege_college {
  __typename: "College";
  id: string;
  name: string;
  averageCostOfAttendance: number | null;
  costOfAttendance: GetComparisonCollege_college_costOfAttendance;
  postalCode: GetComparisonCollege_college_postalCode;
  /**
   * from 0 to 1
   */
  medianEarnings: GetComparisonCollege_college_medianEarnings[];
  averageGPA: GetComparisonCollege_college_averageGPA;
  averageSATScore: GetComparisonCollege_college_averageSATScore;
  averageACTScore: GetComparisonCollege_college_averageACTScore;
  percentOfFreshmenReceivingAid: number | null;
  satScoreIQR: GetComparisonCollege_college_satScoreIQR | null;
  actScoreIQR: GetComparisonCollege_college_actScoreIQR | null;
  /**
   * from 0 to 1
   */
  admissionRate: number;
  applicationFee: number | null;
  averageTotalLoanAmount: number | null;
  repaymentRate: number;
}

export interface GetComparisonCollege {
  student: GetComparisonCollege_student;
  college: GetComparisonCollege_college;
}

export interface GetComparisonCollegeVariables {
  studentId: string;
  collegeId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEdstimatePresentation
// ====================================================

export interface GetEdstimatePresentation_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetEdstimatePresentation_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetEdstimatePresentation_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetEdstimatePresentation_student_household_efc {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetEdstimatePresentation_student_household_imputedEfc {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_student_household {
  __typename: "Household";
  efc: GetEdstimatePresentation_student_household_efc;
  imputedEfc: GetEdstimatePresentation_student_household_imputedEfc;
}

export interface GetEdstimatePresentation_student {
  __typename: "Student";
  id: string;
  gradePointAverage: GetEdstimatePresentation_student_gradePointAverage;
  actScore: GetEdstimatePresentation_student_actScore;
  satScore: GetEdstimatePresentation_student_satScore;
  household: GetEdstimatePresentation_student_household | null;
}

export interface GetEdstimatePresentation_college_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_trends_value {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_trends {
  __typename: "EdstimateComponentTrends";
  value: GetEdstimatePresentation_college_edstimateComponents_trends_value;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_value {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_efc {
  __typename: "UserFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_satScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents_students {
  __typename: "EdstimateComponentOtherStudent";
  efc: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_efc;
  gradePointAverage: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_gradePointAverage;
  actScore: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_actScore;
  satScore: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_satScore;
  edstimate: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students_edstimate;
}

export interface GetEdstimatePresentation_college_edstimateComponents_otherStudents {
  __typename: "EdstimateComponentOtherStudents";
  value: GetEdstimatePresentation_college_edstimateComponents_otherStudents_value;
  students: GetEdstimatePresentation_college_edstimateComponents_otherStudents_students[];
}

export interface GetEdstimatePresentation_college_edstimateComponents_publishedScholarships_value {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_publishedScholarships_scholarships {
  __typename: "EdstimateComponentPublishedScholarship";
  name: string;
  amount: number;
}

export interface GetEdstimatePresentation_college_edstimateComponents_publishedScholarships {
  __typename: "EdstimateComponentPublishedScholarships";
  value: GetEdstimatePresentation_college_edstimateComponents_publishedScholarships_value;
  scholarships: GetEdstimatePresentation_college_edstimateComponents_publishedScholarships_scholarships[];
}

export interface GetEdstimatePresentation_college_edstimateComponents {
  __typename: "EdstimateComponents";
  trends: GetEdstimatePresentation_college_edstimateComponents_trends | null;
  otherStudents: GetEdstimatePresentation_college_edstimateComponents_otherStudents | null;
  publishedScholarships: GetEdstimatePresentation_college_edstimateComponents_publishedScholarships | null;
}

export interface GetEdstimatePresentation_college {
  __typename: "College";
  id: string;
  name: string;
  /**
   * measured by taking % need met and comparing it to the average
   */
  studentMerit: AidMeasurement;
  studentNeed: AidMeasurement;
  edstimate: GetEdstimatePresentation_college_edstimate;
  edstimateComponents: GetEdstimatePresentation_college_edstimateComponents;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
}

export interface GetEdstimatePresentation {
  student: GetEdstimatePresentation_student;
  college: GetEdstimatePresentation_college;
}

export interface GetEdstimatePresentationVariables {
  studentId: string;
  collegeId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComparisonStudent
// ====================================================

export interface GetComparisonStudent_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetComparisonStudent_student {
  __typename: "Student";
  id: string;
  major: GetComparisonStudent_student_major | null;
}

export interface GetComparisonStudent {
  student: GetComparisonStudent_student;
}

export interface GetComparisonStudentVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEFCField
// ====================================================

export interface GetEFCField_student_household_efc {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetEFCField_student_household {
  __typename: "Household";
  efc: GetEFCField_student_household_efc;
}

export interface GetEFCField_student {
  __typename: "Student";
  id: string;
  household: GetEFCField_student_household | null;
}

export interface GetEFCField {
  student: GetEFCField_student;
}

export interface GetEFCFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGPAField
// ====================================================

export interface GetGPAField_student_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface GetGPAField_student {
  __typename: "Student";
  id: string;
  gradePointAverage: GetGPAField_student_gradePointAverage;
}

export interface GetGPAField {
  student: GetGPAField_student;
}

export interface GetGPAFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSATField
// ====================================================

export interface GetSATField_student_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetSATField_student {
  __typename: "Student";
  id: string;
  satScore: GetSATField_student_satScore;
}

export interface GetSATField {
  student: GetSATField_student;
}

export interface GetSATFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPSATField
// ====================================================

export interface GetPSATField_student_psatScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetPSATField_student {
  __typename: "Student";
  id: string;
  psatScore: GetPSATField_student_psatScore;
}

export interface GetPSATField {
  student: GetPSATField_student;
}

export interface GetPSATFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetACTField
// ====================================================

export interface GetACTField_student_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface GetACTField_student {
  __typename: "Student";
  id: string;
  actScore: GetACTField_student_actScore;
}

export interface GetACTField {
  student: GetACTField_student;
}

export interface GetACTFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHHIField
// ====================================================

export interface GetHHIField_student_household_income {
  __typename: "ComputedFloatValue" | "ComputedNullableFloatValue" | "UserFloatValue" | "UserNullableFloatValue" | "SystemNullableFloatValue" | "SystemFloatValue";
  value: number | null;
}

export interface GetHHIField_student_household {
  __typename: "Household";
  income: GetHHIField_student_household_income;
}

export interface GetHHIField_student {
  __typename: "Student";
  id: string;
  household: GetHHIField_student_household | null;
}

export interface GetHHIField {
  student: GetHHIField_student;
}

export interface GetHHIFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSavingsField
// ====================================================

export interface GetSavingsField_student_collegeSavingsAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetSavingsField_student {
  __typename: "Student";
  id: string;
  collegeSavingsAmount: GetSavingsField_student_collegeSavingsAmount;
}

export interface GetSavingsField {
  student: GetSavingsField_student;
}

export interface GetSavingsFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkStudyField
// ====================================================

export interface GetWorkStudyField_student_workStudyAmount {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface GetWorkStudyField_student {
  __typename: "Student";
  id: string;
  workStudyAmount: GetWorkStudyField_student_workStudyAmount;
}

export interface GetWorkStudyField {
  student: GetWorkStudyField_student;
}

export interface GetWorkStudyFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMajorField
// ====================================================

export interface GetMajorField_student_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface GetMajorField_student {
  __typename: "Student";
  id: string;
  major: GetMajorField_student_major | null;
}

export interface GetMajorField {
  student: GetMajorField_student;
}

export interface GetMajorFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHighSchoolField
// ====================================================

export interface GetHighSchoolField_student_highSchool_postalCode {
  __typename: "PostalCode";
  postalCode: string;
}

export interface GetHighSchoolField_student_highSchool {
  __typename: "HighSchool";
  id: string;
  name: string;
  postalCode: GetHighSchoolField_student_highSchool_postalCode;
}

export interface GetHighSchoolField_student {
  __typename: "Student";
  id: string;
  highSchool: GetHighSchoolField_student_highSchool | null;
}

export interface GetHighSchoolField {
  student: GetHighSchoolField_student;
}

export interface GetHighSchoolFieldVariables {
  studentId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSmartEdstimate
// ====================================================

export interface GetSmartEdstimate_college_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface GetSmartEdstimate_college {
  __typename: "College";
  id: string;
  edstimate: GetSmartEdstimate_college_edstimate;
}

export interface GetSmartEdstimate {
  college: GetSmartEdstimate_college;
}

export interface GetSmartEdstimateVariables {
  studentId: string;
  collegeId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserValueFragment
// ====================================================

export interface UserValueFragment_UserFloatValue {
  __typename: "UserFloatValue";
  floatValue: number;
}

export interface UserValueFragment_UserIntValue {
  __typename: "UserIntValue";
  intValue: number;
}

export interface UserValueFragment_UserStringValue {
  __typename: "UserStringValue";
  stringValue: string;
}

export interface UserValueFragment_UserBooleanValue {
  __typename: "UserBooleanValue";
  booleanValue: boolean;
}

export interface UserValueFragment_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  nullableFloatValue: number | null;
}

export interface UserValueFragment_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  nullableIntValue: number | null;
}

export interface UserValueFragment_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  nullableStringValue: string | null;
}

export interface UserValueFragment_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  nullableBooleanValue: boolean | null;
}

export type UserValueFragment = UserValueFragment_UserFloatValue | UserValueFragment_UserIntValue | UserValueFragment_UserStringValue | UserValueFragment_UserBooleanValue | UserValueFragment_UserNullableFloatValue | UserValueFragment_UserNullableIntValue | UserValueFragment_UserNullableStringValue | UserValueFragment_UserNullableBooleanValue;

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SystemValueFragment
// ====================================================

export interface SystemValueFragment_SystemFloatValue {
  __typename: "SystemFloatValue";
  floatValue: number;
}

export interface SystemValueFragment_SystemIntValue {
  __typename: "SystemIntValue";
  intValue: number;
}

export interface SystemValueFragment_SystemStringValue {
  __typename: "SystemStringValue";
  stringValue: string;
}

export interface SystemValueFragment_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  booleanValue: boolean;
}

export interface SystemValueFragment_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  nullableFloatValue: number | null;
}

export interface SystemValueFragment_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  nullableIntValue: number | null;
}

export interface SystemValueFragment_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  nullableStringValue: string | null;
}

export interface SystemValueFragment_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  nullableBooleanValue: boolean | null;
}

export type SystemValueFragment = SystemValueFragment_SystemFloatValue | SystemValueFragment_SystemIntValue | SystemValueFragment_SystemStringValue | SystemValueFragment_SystemBooleanValue | SystemValueFragment_SystemNullableFloatValue | SystemValueFragment_SystemNullableIntValue | SystemValueFragment_SystemNullableStringValue | SystemValueFragment_SystemNullableBooleanValue;

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ComputedValueFragment
// ====================================================

export interface ComputedValueFragment_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface ComputedValueFragment_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface ComputedValueFragment_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface ComputedValueFragment_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface ComputedValueFragment_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface ComputedValueFragment_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface ComputedValueFragment_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface ComputedValueFragment_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type ComputedValueFragment = ComputedValueFragment_ComputedFloatValue | ComputedValueFragment_ComputedIntValue | ComputedValueFragment_ComputedStringValue | ComputedValueFragment_ComputedBooleanValue | ComputedValueFragment_ComputedNullableFloatValue | ComputedValueFragment_ComputedNullableIntValue | ComputedValueFragment_ComputedNullableStringValue | ComputedValueFragment_ComputedNullableBooleanValue;

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MajorFragment
// ====================================================

export interface MajorFragment {
  __typename: "Major";
  id: string;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollegeFragment
// ====================================================

export interface CollegeFragment_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface CollegeFragment_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface CollegeFragment_netEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface CollegeFragment_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface CollegeFragment_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface CollegeFragment_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface CollegeFragment_averageAnnualEarningsAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_annualLoanPaymentAmount {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_valueBenchmark {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_valueDelta {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface CollegeFragment_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface CollegeFragment_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface CollegeFragment_effectiveCost {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_logo {
  __typename: "File";
  url: string;
}

export interface CollegeFragment_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface CollegeFragment_postalCode_city_state {
  __typename: "State";
  id: string;
  abbreviation: string;
  name: string;
}

export interface CollegeFragment_postalCode_city {
  __typename: "City";
  id: string;
  name: string;
  state: CollegeFragment_postalCode_city_state;
}

export interface CollegeFragment_postalCode {
  __typename: "PostalCode";
  id: string;
  city: CollegeFragment_postalCode_city;
}

export interface CollegeFragment {
  __typename: "College";
  id: string;
  name: string;
  admissibility: CollegeFragment_admissibility;
  admissionUnlikely: CollegeFragment_admissionUnlikely;
  financialAidAward: number | null;
  coverImageUrl: string | null;
  abbreviation: string;
  edstimate: CollegeFragment_edstimate;
  averageCostOfAttendance: number | null;
  /**
   * from 0 to 1
   */
  medianEarnings: CollegeFragment_medianEarnings[];
  netEarnings: CollegeFragment_netEarnings[];
  features: string[];
  satScoreIQR: CollegeFragment_satScoreIQR | null;
  actScoreIQR: CollegeFragment_actScoreIQR | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
  debtRemaining: CollegeFragment_debtRemaining[];
  averageAnnualEarningsAmount: CollegeFragment_averageAnnualEarningsAmount;
  costOfAttendance: CollegeFragment_costOfAttendance;
  annualLoanPaymentAmount: CollegeFragment_annualLoanPaymentAmount;
  valueBenchmark: CollegeFragment_valueBenchmark;
  valueDelta: CollegeFragment_valueDelta;
  majors: CollegeFragment_majors[];
  financialGrade: FinancialGrade;
  calculationsUseAidAward: boolean;
  status: CollegeStatus | null;
  averageGPA: CollegeFragment_averageGPA;
  averageSATScore: CollegeFragment_averageSATScore;
  effectiveCost: CollegeFragment_effectiveCost;
  affordabilityDetermination: AffordabilityDetermination;
  valueDetermination: ValueDetermination;
  logo: CollegeFragment_logo | null;
  accumulatedEarnings: CollegeFragment_accumulatedEarnings;
  scholarships: string[];
  postalCode: CollegeFragment_postalCode;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ValueFragment
// ====================================================

export interface ValueFragment_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface ValueFragment_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface ValueFragment_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface ValueFragment_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface ValueFragment_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface ValueFragment_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface ValueFragment_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface ValueFragment_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface ValueFragment_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface ValueFragment_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface ValueFragment_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface ValueFragment_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface ValueFragment_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface ValueFragment_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface ValueFragment_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface ValueFragment_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface ValueFragment_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface ValueFragment_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface ValueFragment_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface ValueFragment_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface ValueFragment_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface ValueFragment_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface ValueFragment_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface ValueFragment_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface ValueFragment_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type ValueFragment = ValueFragment_FactIntValue | ValueFragment_UserFloatValue | ValueFragment_UserNullableStringValue | ValueFragment_UserNullableIntValue | ValueFragment_UserIntValue | ValueFragment_UserNullableFloatValue | ValueFragment_UserStringValue | ValueFragment_UserNullableBooleanValue | ValueFragment_UserBooleanValue | ValueFragment_SystemNullableIntValue | ValueFragment_SystemIntValue | ValueFragment_SystemNullableFloatValue | ValueFragment_SystemFloatValue | ValueFragment_SystemNullableStringValue | ValueFragment_SystemStringValue | ValueFragment_SystemNullableBooleanValue | ValueFragment_SystemBooleanValue | ValueFragment_ComputedFloatValue | ValueFragment_ComputedNullableIntValue | ValueFragment_ComputedNullableFloatValue | ValueFragment_ComputedIntValue | ValueFragment_ComputedBooleanValue | ValueFragment_ComputedNullableStringValue | ValueFragment_ComputedStringValue | ValueFragment_ComputedNullableBooleanValue;

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ComputedFloatValueFragment
// ====================================================

export interface ComputedFloatValueFragment_from_FactIntValue {
  __typename: "FactIntValue" | "FactFloatValue" | "FactStringValue" | "FactBooleanValue";
  name: string;
}

export interface ComputedFloatValueFragment_from_UserFloatValue {
  __typename: "UserFloatValue";
  name: string;
  floatValue: number;
}

export interface ComputedFloatValueFragment_from_UserNullableStringValue {
  __typename: "UserNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface ComputedFloatValueFragment_from_UserNullableIntValue {
  __typename: "UserNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface ComputedFloatValueFragment_from_UserIntValue {
  __typename: "UserIntValue";
  name: string;
  intValue: number;
}

export interface ComputedFloatValueFragment_from_UserNullableFloatValue {
  __typename: "UserNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface ComputedFloatValueFragment_from_UserStringValue {
  __typename: "UserStringValue";
  name: string;
  stringValue: string;
}

export interface ComputedFloatValueFragment_from_UserNullableBooleanValue {
  __typename: "UserNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface ComputedFloatValueFragment_from_UserBooleanValue {
  __typename: "UserBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface ComputedFloatValueFragment_from_SystemNullableIntValue {
  __typename: "SystemNullableIntValue";
  name: string;
  nullableIntValue: number | null;
}

export interface ComputedFloatValueFragment_from_SystemIntValue {
  __typename: "SystemIntValue";
  name: string;
  intValue: number;
}

export interface ComputedFloatValueFragment_from_SystemNullableFloatValue {
  __typename: "SystemNullableFloatValue";
  name: string;
  nullableFloatValue: number | null;
}

export interface ComputedFloatValueFragment_from_SystemFloatValue {
  __typename: "SystemFloatValue";
  name: string;
  floatValue: number;
}

export interface ComputedFloatValueFragment_from_SystemNullableStringValue {
  __typename: "SystemNullableStringValue";
  name: string;
  nullableStringValue: string | null;
}

export interface ComputedFloatValueFragment_from_SystemStringValue {
  __typename: "SystemStringValue";
  name: string;
  stringValue: string;
}

export interface ComputedFloatValueFragment_from_SystemNullableBooleanValue {
  __typename: "SystemNullableBooleanValue";
  name: string;
  nullableBooleanValue: boolean | null;
}

export interface ComputedFloatValueFragment_from_SystemBooleanValue {
  __typename: "SystemBooleanValue";
  name: string;
  booleanValue: boolean;
}

export interface ComputedFloatValueFragment_from_ComputedFloatValue {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  floatValue: number;
}

export interface ComputedFloatValueFragment_from_ComputedNullableIntValue {
  __typename: "ComputedNullableIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableIntValue: number | null;
}

export interface ComputedFloatValueFragment_from_ComputedNullableFloatValue {
  __typename: "ComputedNullableFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableFloatValue: number | null;
}

export interface ComputedFloatValueFragment_from_ComputedIntValue {
  __typename: "ComputedIntValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  intValue: number;
}

export interface ComputedFloatValueFragment_from_ComputedBooleanValue {
  __typename: "ComputedBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  booleanValue: boolean;
}

export interface ComputedFloatValueFragment_from_ComputedNullableStringValue {
  __typename: "ComputedNullableStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableStringValue: string | null;
}

export interface ComputedFloatValueFragment_from_ComputedStringValue {
  __typename: "ComputedStringValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  stringValue: string;
}

export interface ComputedFloatValueFragment_from_ComputedNullableBooleanValue {
  __typename: "ComputedNullableBooleanValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  nullableBooleanValue: boolean | null;
}

export type ComputedFloatValueFragment_from = ComputedFloatValueFragment_from_FactIntValue | ComputedFloatValueFragment_from_UserFloatValue | ComputedFloatValueFragment_from_UserNullableStringValue | ComputedFloatValueFragment_from_UserNullableIntValue | ComputedFloatValueFragment_from_UserIntValue | ComputedFloatValueFragment_from_UserNullableFloatValue | ComputedFloatValueFragment_from_UserStringValue | ComputedFloatValueFragment_from_UserNullableBooleanValue | ComputedFloatValueFragment_from_UserBooleanValue | ComputedFloatValueFragment_from_SystemNullableIntValue | ComputedFloatValueFragment_from_SystemIntValue | ComputedFloatValueFragment_from_SystemNullableFloatValue | ComputedFloatValueFragment_from_SystemFloatValue | ComputedFloatValueFragment_from_SystemNullableStringValue | ComputedFloatValueFragment_from_SystemStringValue | ComputedFloatValueFragment_from_SystemNullableBooleanValue | ComputedFloatValueFragment_from_SystemBooleanValue | ComputedFloatValueFragment_from_ComputedFloatValue | ComputedFloatValueFragment_from_ComputedNullableIntValue | ComputedFloatValueFragment_from_ComputedNullableFloatValue | ComputedFloatValueFragment_from_ComputedIntValue | ComputedFloatValueFragment_from_ComputedBooleanValue | ComputedFloatValueFragment_from_ComputedNullableStringValue | ComputedFloatValueFragment_from_ComputedStringValue | ComputedFloatValueFragment_from_ComputedNullableBooleanValue;

export interface ComputedFloatValueFragment {
  __typename: "ComputedFloatValue";
  name: string;
  computedAt: any;
  staleAt: any | null;
  from: ComputedFloatValueFragment_from[];
  value: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RecommendationStudentFragment
// ====================================================

export interface RecommendationStudentFragment_person {
  __typename: "Person";
  affinities: Affinity[] | null;
}

export interface RecommendationStudentFragment_normalizedGPA {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationStudentFragment_satScore {
  __typename: "ComputedIntValue" | "UserIntValue" | "SystemIntValue" | "FactIntValue";
  value: number;
}

export interface RecommendationStudentFragment_appliedProducts_product {
  __typename: "Product";
  name: string;
}

export interface RecommendationStudentFragment_appliedProducts {
  __typename: "AppliedStudentProduct";
  id: string;
  expiresAt: any | null;
  renewsAt: any | null;
  product: RecommendationStudentFragment_appliedProducts_product;
}

export interface RecommendationStudentFragment_colleges {
  __typename: "College";
  id: string;
}

export interface RecommendationStudentFragment_hand_current {
  __typename: "College";
  id: string;
}

export interface RecommendationStudentFragment_hand {
  __typename: "Hand";
  current: RecommendationStudentFragment_hand_current[];
}

export interface RecommendationStudentFragment_highSchool {
  __typename: "HighSchool";
  popularColleges: string[];
}

export interface RecommendationStudentFragment_major {
  __typename: "Major";
  id: string;
  name: string;
}

export interface RecommendationStudentFragment_preferences {
  __typename: "Preference";
  id: string;
  value: number;
}

export interface RecommendationStudentFragment_gradePointAverage {
  __typename: "UserNullableStringValue";
  value: string | null;
}

export interface RecommendationStudentFragment_actScore {
  __typename: "UserNullableIntValue";
  value: number | null;
}

export interface RecommendationStudentFragment {
  __typename: "Student";
  person: RecommendationStudentFragment_person | null;
  normalizedGPA: RecommendationStudentFragment_normalizedGPA;
  satScore: RecommendationStudentFragment_satScore;
  appliedProducts: RecommendationStudentFragment_appliedProducts[];
  colleges: RecommendationStudentFragment_colleges[];
  hand: RecommendationStudentFragment_hand;
  highSchool: RecommendationStudentFragment_highSchool | null;
  major: RecommendationStudentFragment_major | null;
  preferences: RecommendationStudentFragment_preferences[];
  gradePointAverage: RecommendationStudentFragment_gradePointAverage;
  actScore: RecommendationStudentFragment_actScore;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RecommendationCollegeFragment
// ====================================================

export interface RecommendationCollegeFragment_logo {
  __typename: "File";
  url: string;
}

export interface RecommendationCollegeFragment_majors {
  __typename: "Major";
  id: string;
  name: string;
}

export interface RecommendationCollegeFragment_postalCode_city_state {
  __typename: "State";
  name: string;
  abbreviation: string;
}

export interface RecommendationCollegeFragment_postalCode_city {
  __typename: "City";
  name: string;
  state: RecommendationCollegeFragment_postalCode_city_state;
}

export interface RecommendationCollegeFragment_postalCode {
  __typename: "PostalCode";
  city: RecommendationCollegeFragment_postalCode_city;
}

export interface RecommendationCollegeFragment_satScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface RecommendationCollegeFragment_actScoreIQR {
  __typename: "InterquartileRange";
  low: number | null;
  high: number | null;
}

export interface RecommendationCollegeFragment_costOfAttendance {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_edstimate {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_affordabilityScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_valueScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_earningsScore {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_accumulatedEarnings {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_debtRemaining {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface RecommendationCollegeFragment_medianEarnings {
  __typename: "EarningsDataPoint";
  year: number;
  value: number;
}

export interface RecommendationCollegeFragment_admissibility {
  __typename: "ComputedFloatValue";
  value: number;
}

export interface RecommendationCollegeFragment_admissionUnlikely {
  __typename: "ComputedBooleanValue";
  value: boolean;
}

export interface RecommendationCollegeFragment_averageGPA {
  __typename: "ComputedNullableFloatValue";
  value: number | null;
}

export interface RecommendationCollegeFragment_averageSATScore {
  __typename: "ComputedNullableIntValue";
  value: number | null;
}

export interface RecommendationCollegeFragment {
  __typename: "College";
  id: string;
  name: string;
  abbreviation: string;
  recommendedReason: string | null;
  logo: RecommendationCollegeFragment_logo | null;
  coverImageUrl: string | null;
  majors: RecommendationCollegeFragment_majors[];
  postalCode: RecommendationCollegeFragment_postalCode;
  features: string[];
  satScoreIQR: RecommendationCollegeFragment_satScoreIQR | null;
  actScoreIQR: RecommendationCollegeFragment_actScoreIQR | null;
  costOfAttendance: RecommendationCollegeFragment_costOfAttendance;
  edstimate: RecommendationCollegeFragment_edstimate;
  financialGrade: FinancialGrade;
  affordabilityScore: RecommendationCollegeFragment_affordabilityScore;
  valueScore: RecommendationCollegeFragment_valueScore;
  earningsScore: RecommendationCollegeFragment_earningsScore;
  accumulatedEarnings: RecommendationCollegeFragment_accumulatedEarnings;
  debtRemaining: RecommendationCollegeFragment_debtRemaining[];
  /**
   * from 0 to 1
   */
  medianEarnings: RecommendationCollegeFragment_medianEarnings[];
  admissibility: RecommendationCollegeFragment_admissibility;
  admissionUnlikely: RecommendationCollegeFragment_admissionUnlikely;
  averageGPA: RecommendationCollegeFragment_averageGPA;
  averageSATScore: RecommendationCollegeFragment_averageSATScore;
  meritAidGenerosity: AidGenerosity | null;
  /**
   * measured by multiplying % of non-need students that get merit by average non-need (~expected value) and comparing it to the average
   */
  needBasedAidGenerosity: AidGenerosity | null;
  /**
   * from 0 to 1
   */
  averageMeritScholarship: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StudentFragment
// ====================================================

export interface StudentFragment_person {
  __typename: "Person";
  firstName: string | null;
  lastName: string | null;
}

export interface StudentFragment {
  __typename: "Student";
  id: string;
  person: StudentFragment_person | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Affinity {
  Affordability = "Affordability",
  Earnings = "Earnings",
  Value = "Value",
}

export enum AffordabilityDetermination {
  Affordable = "Affordable",
  NotAffordable = "NotAffordable",
}

export enum AidGenerosity {
  HIGH = "HIGH",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
}

export enum AidMeasurement {
  HIGH = "HIGH",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
}

export enum BillingPeriod {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export enum CollegeStatus {
  Accepted = "Accepted",
  Appealing = "Appealing",
  Applied = "Applied",
  Attending = "Attending",
  Considering = "Considering",
  NotAppealing = "NotAppealing",
  NotAttending = "NotAttending",
}

export enum CollegeType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export enum EStripePaymentStatus {
  PaymentError = "PaymentError",
  Success = "Success",
}

export enum FinancialGrade {
  A = "A",
  AMINUS = "AMINUS",
  B = "B",
  BMINUS = "BMINUS",
  BPLUS = "BPLUS",
  C = "C",
  CPLUS = "CPLUS",
}

export enum InvitationStatus {
  AccountWithEmailAlreadyExists = "AccountWithEmailAlreadyExists",
  InvalidEmailAddress = "InvalidEmailAddress",
  Invited = "Invited",
}

export enum InviterPermission {
  Edit = "Edit",
  NoAccess = "NoAccess",
  View = "View",
}

export enum LoanStatus {
  FlowCompleted = "FlowCompleted",
  FlowNotStarted = "FlowNotStarted",
  FlowStarted = "FlowStarted",
}

export enum LoginError {
  InvalidCredentials = "InvalidCredentials",
  Other = "Other",
}

export enum MenuLinkStyle {
  Button = "Button",
  Icon = "Icon",
  PrimaryButton = "PrimaryButton",
  PrimaryTextIcon = "PrimaryTextIcon",
  Text = "Text",
  TextIcon = "TextIcon",
}

export enum MenuLocation {
  MobileDrawer = "MobileDrawer",
  Sidebar = "Sidebar",
  Submenu = "Submenu",
  TopNav = "TopNav",
  MarketingNav = "MarketingNav"
}

export enum OnboardingStatus {
  IntroduceNewOnboarding = "IntroduceNewOnboarding",
  NotOnboarded = "NotOnboarded",
  Onboarded = "Onboarded",
}

export enum PersonLoanApplicantParty {
  Cosigner = "Cosigner",
  Student = "Student",
}

export enum PersonType {
  Other = "Other",
  Parent = "Parent",
  Student = "Student",
}

export enum SignupError {
  InvalidEmailAddress = "InvalidEmailAddress",
  PasswordNotComplexEnough = "PasswordNotComplexEnough",
}

export enum Stage {
  Applying = "Applying",
  Looking = "Looking",
  Negotiating = "Negotiating",
  PlanningForPayment = "PlanningForPayment",
}

export enum ValueDetermination {
  GoodValue = "GoodValue",
  NotGoodValue = "NotGoodValue",
}

export interface CollegeWhereUniqueInput {
  id?: string | null;
  alias?: string | null;
  slug?: string | null;
}

export interface PreferenceInput {
  id: string;
  value: number;
}

export interface ProfileUpdateInput {
  accountType?: PersonType | null;
  emailAddress?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  gradePointAverage?: UserNullableStringValueInput | null;
  actScore?: UserNullableIntValueInput | null;
  satScore?: UserNullableIntValueInput | null;
  psatScore?: UserNullableIntValueInput | null;
  efc?: UserNullableFloatValueInput | null;
  householdIncome?: UserNullableFloatValueInput | null;
  postalCodeId?: string | null;
  highSchoolId?: string | null;
  highSchoolGraduationYear?: UserNullableIntValueInput | null;
  collegeSavingsPlanAmount?: UserNullableFloatValueInput | null;
  primaryGoal?: string | null;
  majorId?: string | null;
  topChoiceCollegeId?: string | null;
  cashContributionAmount?: UserNullableFloatValueInput | null;
  workStudyAmount?: UserNullableFloatValueInput | null;
  affinities?: Affinity[] | null;
  weightedGradePointAverageMaximum?: UserNullableStringValueInput | null;
  stage?: Stage | null;
  otherScholarshipsAmount?: UserNullableFloatValueInput | null;
  onboardingStatus?: OnboardingStatus | null;
  preferences?: (PreferenceInput | null)[] | null;
  creditScore?: UserNullableIntValueInput | null;
  loanStatus?: LoanStatus | null;
}

export interface UpdateFinancialAidAppealInput {
  appealAidAward?: UserNullableIntValueInput | null;
  appealLetter?: UploadFileInput | null;
}

export interface UpdateFinancialAidInput {
  aidAward?: UserNullableIntValueInput | null;
  aidLetter?: UploadFileInput | null;
}

export interface UploadFileInput {
  name?: string | null;
  dataUrl: string;
}

export interface UserNullableFloatValueInput {
  value?: number | null;
}

export interface UserNullableIntValueInput {
  value?: number | null;
}

export interface UserNullableStringValueInput {
  value?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
