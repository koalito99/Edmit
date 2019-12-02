import gql from 'graphql-tag';

export const CREATE_ANONYMOUS_SESSION = gql`
  mutation CreateAnonymousSession($fingerprint: String!) {
    createAnonymousSession(fingerprint: $fingerprint) {
      session {
        id
      }
      rawToken
    }
  }
`;

export const LOGIN = gql`
  mutation Login($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) {
      createdSession {
        session {
          id
        }
        rawToken
      }
      error
    }
  }
`;

export const APPLY_PRODUCT = gql`
  mutation ApplyProduct($token: String!) {
    applyProduct(token: $token) {
      status
    }
  }
`;

export const SET_HAND = gql`
  mutation SetHand($studentId: ID!, $colleges: [ID!]!) {
    setHand(studentId: $studentId, colleges: $colleges) {
      id
    }
  }
`;

export const CREATE_CREDIBLE_PREFILL_REQUEST = gql`
  mutation CreateCrediblePrefillRequest($studentId: String!, $collegeId: String!, $loanApplicantParty: PersonLoanApplicantParty!) {
    createCrediblePrefillRequest(input: {
      studentId: $studentId,
      collegeId: $collegeId,
      loanApplicantParty: $loanApplicantParty
    }) {
      id
    }
  }
`;

export const CREATE_PASSWORD_RESET = gql`
  mutation CreatePasswordReset($emailAddress: String!) {
    createPasswordReset(input: { emailAddress: $emailAddress }) {
      success
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($emailAddress: String, $password: String) {
    signup(emailAddress: $emailAddress, password: $password) {
      error
      account {
        id
      }
    }
  }
`;

export const ADD_TO_MY_COLLEGES = gql`
  mutation AddToMyColleges($studentId: ID!, $collegesWhere: [CollegeWhereUniqueInput!]!) {
    addToMyColleges(studentWhere: { id: $studentId }, collegesWhere: $collegesWhere) {
      id
      colleges {
        id
      }
    }
  }
`;

export const REMOVE_FROM_MY_COLLEGES = gql`
  mutation RemoveFromMyColleges($studentId: ID!, $collegesWhere: [CollegeWhereUniqueInput!]!) {
    removeFromMyColleges(studentWhere: { id: $studentId }, collegesWhere: $collegesWhere) {
      id
      colleges {
        id
      }
    }
  }
`;

export const ADD_TO_HAND = gql`
  mutation AddToHand($studentId: ID!, $collegesWhere: [CollegeWhereUniqueInput!]!) {
    addToHand(studentWhere: { id: $studentId }, collegesWhere: $collegesWhere) {
      id
      hand {
        current {
          id
        }
      }
    }
  }
`;

export const REMOVE_FROM_HAND = gql`
  mutation RemoveFromHand($studentId: ID!, $collegesWhere: [CollegeWhereUniqueInput!]!) {
    removeFromHand(studentWhere: { id: $studentId }, collegesWhere: $collegesWhere) {
      id
      hand {
        current {
          id
        }
      }
    }
  }
`;

export const CREATE_INVITATION = gql`
  mutation CreateInvitation(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $personType: String!
  ) {
    createInvitation(
      input: {
        firstName: $firstName
        lastName: $lastName
        emailAddress: $emailAddress
        personType: $personType
      }
    ) {
      status
      invitation {
        id
      }
    }
  }
`;

export const COMPLETE_INVITATION = gql`
  mutation CompleteInvitation($invitationId: ID!, $inviterPermission: InviterPermission!) {
    completeInvitation(invitationId: $invitationId, inviterPermission: $inviterPermission) {
      id
      permission
    }
  }
`;

export const CREATE_SESSION_FROM_TOKEN = gql`
  mutation CreateSessionFromToken($accountToken: String!) {
    createSessionFromToken(token: $accountToken) {
      session {
        id
      }
      rawToken
    }
  }
`;

export const PURCHASE_PRODUCT = gql`
  mutation PurchaseProduct(
    $studentId: ID!
    $stripeToken: String!
    $productId: String!
    $coupon: String
  ) {
    submitStripePayment2(
      studentWhere: { id: $studentId }
      input: {
        stripeToken: $stripeToken
        productId: $productId
        coupon: $coupon
      }
    ) {
      status
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: ProfileUpdateInput!) {
    updateProfile(data: $data) {
      id
    }
  }
`;

export const INVITE_PARENT = gql`
  mutation InviteParent($emailAddress: String!) {
    inviteParent(emailAddress: $emailAddress) {
      id
    }
  }
`;

export const DISMISS_RECOMMENDATION = gql`
  mutation DismissRecommendation($studentId: ID!, $collegeId: ID!, $reason: String!) {
    dismissRecommendation(studentId: $studentId, collegeId: $collegeId, reason: $reason) {
      id

      recommendations {
        id
        title
        colleges {
          __typename
          ... on Node {
            id
          }
          ... on College {
            name
            abbreviation
            recommendedReason
            logo {
              url
            }
            majors {
              id
            }
            postalCode {
              city {
                name
                state {
                  name
                  abbreviation
                }
              }
            }
            features
            costOfAttendance(studentId: $studentId) {
              value
            }
            edstimate(studentId: $studentId) {
              value
            }
            fitScore(studentId: $studentId) {
              value
            }
            affordabilityScore(studentId: $studentId) {
              value
            }
            valueScore(studentId: $studentId) {
              value
            }
            earningsScore(studentId: $studentId) {
              value
            }
            affordabilityDetermination(studentId: $studentId)
            valueDetermination(studentId: $studentId)

            accumulatedEarnings(studentId: $studentId) {
              value
            }
            debtRemaining(
              studentId: $studentId
              yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
            ) {
              year
              value
            }
            medianEarnings(
              studentId: $studentId
              yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
            ) {
              year
              value
            }

            admissibility(studentId: $studentId) {
              value
            }
            admissionUnlikely(studentId: $studentId) {
              value
            }

            averageGPA {
              value
            }

            averageSATScore {
              value
            }
          }
        }
      }
    }
  }
`;

export const MARK_NOTIFICATIONS_SEEN = gql`
  mutation MarkNotificationsSeen($ids: [ID!]!) {
    markNotificationsSeen(ids: $ids) {
      notifications {
        id
        lastSeenAt
      }
    }
  }
`;

export const UPDATE_COLLEGE_APPLICATION_STATUS = gql`
  mutation UpdateCollegeApplicationStatus(
    $studentId: ID!
    $collegeId: ID!
    $status: CollegeStatus!
  ) {
    updateApplicationStatus(
      studentWhere: { id: $studentId }
      collegeWhere: { id: $collegeId }
      status: $status
    ) {
      id
      colleges {
        id
        status(studentId: $studentId)
      }
    }
  }
`;

export const UPDATE_FINANCIAL_AID = gql`
  mutation UpdateFinancialAid($studentId: ID!, $collegeId: ID!, $input: UpdateFinancialAidInput!) {
    updateFinancialAid(
      studentWhere: { id: $studentId }
      collegeWhere: { id: $collegeId }
      input: $input
    ) {
      id
      colleges {
        id
        financialAidAward(studentId: $studentId)
        #        financialAidLetter(studentId: $studentId) {
        #          url
        #        }
      }
    }
  }
`;

export const UPDATE_FINANCIAL_AID_APPEAL = gql`
  mutation UpdateFinancialAidAppeal($studentId: ID!, $collegeId: ID!, $input: UpdateFinancialAidAppealInput!) {
    updateFinancialAidAppeal(
      studentWhere: { id: $studentId }
      collegeWhere: { id: $collegeId }
      input: $input
    ) {
      id
      colleges {
        id
        financialAidAppealAward(studentId: $studentId)
        financialAidAppealLetter(studentId: $studentId) {
          id
        }
      }
    }
  }
`;

// TODO: Use message fragment
export const SELECT_SABRINA_BOT_MESSAGE_ACTION = gql`
  mutation SelectSabrinaBotMessageAction(
    $studentId: ID!
    $messageId: ID!
    $action: String!
    $url: String!
  ) {
    selectSabrinaBotMessageAction(
      studentWhere: { id: $studentId }
      messageId: $messageId
      action: $action
      url: $url
    ) {
      id
      sabrinaBotMessages(page: $url) {
        id
        createdAt
        text
        actions
        selectedAction

        ... on SabrinaBotCTAMessage {
          callToActionText
          callToActionUrl
        }
      }
    }
  }
`;

export const CHECK_TIP = gql`
    mutation CheckTip(
        $studentId: ID!
        $tipId: ID!
    ) {
        checkTip (
            studentId: $studentId
            tipId: $tipId
        ) {
            id
        }
    }
`;

export const DISMISS_TIP = gql`
    mutation DismissTip(
        $studentId: ID!
        $tipId: ID!
    ) {
        dismissTip (
            studentId: $studentId
            tipId: $tipId
        ) {
            id
        }
    }
`;