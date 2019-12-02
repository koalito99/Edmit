import gql from 'graphql-tag';

const UserValueFragment = gql`
  fragment UserValueFragment on UserValue {
    ... on UserFloatValue {
      floatValue: value
    }
    ... on UserIntValue {
      intValue: value
    }
    ... on UserStringValue {
      stringValue: value
    }
    ... on UserBooleanValue {
      booleanValue: value
    }

    ... on UserNullableFloatValue {
      nullableFloatValue: value
    }
    ... on UserNullableIntValue {
      nullableIntValue: value
    }
    ... on UserNullableStringValue {
      nullableStringValue: value
    }
    ... on UserNullableBooleanValue {
      nullableBooleanValue: value
    }
  }
`;

const SystemValueFragment = gql`
  fragment SystemValueFragment on SystemValue {
    ... on SystemFloatValue {
      floatValue: value
    }
    ... on SystemIntValue {
      intValue: value
    }
    ... on SystemStringValue {
      stringValue: value
    }
    ... on SystemBooleanValue {
      booleanValue: value
    }

    ... on SystemNullableFloatValue {
      nullableFloatValue: value
    }
    ... on SystemNullableIntValue {
      nullableIntValue: value
    }
    ... on SystemNullableStringValue {
      nullableStringValue: value
    }
    ... on SystemNullableBooleanValue {
      nullableBooleanValue: value
    }
  }
`;

const ComputedValueFragment = gql`
  fragment ComputedValueFragment on ComputedValue {
    name
    computedAt
    staleAt

    ... on ComputedFloatValue {
      floatValue: value
    }
    ... on ComputedIntValue {
      intValue: value
    }
    ... on ComputedStringValue {
      stringValue: value
    }
    ... on ComputedBooleanValue {
      booleanValue: value
    }

    ... on ComputedNullableFloatValue {
      nullableFloatValue: value
    }
    ... on ComputedNullableIntValue {
      nullableIntValue: value
    }
    ... on ComputedNullableStringValue {
      nullableStringValue: value
    }
    ... on ComputedNullableBooleanValue {
      nullableBooleanValue: value
    }
  }
`;

const MajorFragment = gql`
  fragment MajorFragment on Major {
    id
    name
  }
`;


export const CollegeFragment = gql`
  fragment CollegeFragment on College {
    id
    name
    admissibility(studentId: $studentId) {
      value
    }
    admissionUnlikely(studentId: $studentId) {
      value
    }
    financialAidAward(studentId: $studentId)
    coverImageUrl
    id
    abbreviation
    edstimate(studentId: $studentId) {
      value
    }
    averageCostOfAttendance
    medianEarnings(
      studentId: $studentId
      yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ) {
      year
      value
    }
    netEarnings(
      studentId: $studentId
      yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ) {
      year
      value
    }
    features
    satScoreIQR {
      low
      high
    }
    actScoreIQR {
      low
      high
    }
    averageMeritScholarship
    meritAidGenerosity
    needBasedAidGenerosity
    debtRemaining(
      studentId: $studentId
      yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ) {
      year
      value
    }
    averageAnnualEarningsAmount(studentId: $studentId) {
      value
    }
    costOfAttendance(studentId: $studentId) {
      value
    }
    annualLoanPaymentAmount(studentId: $studentId) {
      value
    }
    valueBenchmark(studentId: $studentId) {
      value
    }
    valueDelta(studentId: $studentId) {
      value
    }
    majors {
      ...MajorFragment
    }
    financialGrade(studentId: $studentId)
    calculationsUseAidAward(studentId: $studentId)
    status(studentId: $studentId)
    averageGPA {
      value
    }
    averageSATScore {
      value
    }
    effectiveCost(studentId: $studentId) {
      value
    }
    affordabilityDetermination(studentId: $studentId)
    valueDetermination(studentId: $studentId)
    logo {
      url
    }
    accumulatedEarnings(studentId: $studentId) {
      value
    }
    scholarships(studentId: $studentId)
    postalCode {
      id
      city {
        id
        name
        state {
          id
          abbreviation
          name
        }
      }
    }
  }
  ${MajorFragment}
`;

const ValueFragment = gql`
  fragment ValueFragment on Value {
    name
    ...UserValueFragment
    ...SystemValueFragment
    ...ComputedValueFragment
  }
  ${UserValueFragment}
  ${SystemValueFragment}
  ${ComputedValueFragment}
`;

const ComputedFloatValueFragment = gql`
  fragment ComputedFloatValueFragment on ComputedFloatValue {
    name
    computedAt
    staleAt
    from {
      ...ValueFragment
    }
    value
  }
  ${ValueFragment}
`;

const RecommendationStudentFragment = gql`
    fragment RecommendationStudentFragment on Student {
        person {
            affinities
        }
        normalizedGPA {
            value
        }
        satScore {
            value
        }

        appliedProducts {
            id
            expiresAt
            renewsAt
            product {
                name
            }
        }
        colleges {
            id
        }
        hand {
            current {
                id
            }
        }
        highSchool {
            popularColleges
        }
        major {
            id
            name
        }
        preferences {
            id
            value
        }

        gradePointAverage {
            value
        }
        satScore {
            value
        }
        actScore {
            value
        }
    }
`

export const GET_MAJORS = gql`
  query GetMajors {
    majors {
      id
      name
    }
  }
`;

export const GET_COLLEGE_COMPARISON = gql`
  query GetCollegeComparison($studentId: ID!) {
    session {
      account {
        person {
          type
        }
      }
    }

    student(where: { id: $studentId }) {
      id
      gradePointAverage {
        value
      }
      normalizedGPA {
        value
      }
      actScore {
        value
      }
      satScore {
        value
      }
      psatScore {
        value
      }
      major {
        id
        name
      }
      collegeSavingsAmount {
        value
      }
      household {
        income {
          value
        }
      }
      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
        }
      }
      hand {
        current {
          id
          name
          abbreviation
          logo {
            url
          }
          scholarships(studentId: $studentId)
          gpaDifference(studentId: $studentId) {
            value
          }

          satScoreDifference(studentId: $studentId) {
            value
          }

          majors {
            id
          }

          averageGPA {
            value
          }
          averageSATScore {
            value
          }
          averageACTScore {
            value
          }
          averageHHI
          publishedTuition

          admissionUnlikely(studentId: $studentId) {
            value
          }
          accumulatedEarnings(studentId: $studentId) {
            value
          }
          medianEarnings(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          netEarnings(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          debtRemaining(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          repaymentRate
          edstimate(studentId: $studentId) {
            ...ComputedFloatValueFragment
          }
          admissibility(studentId: $studentId) {
            ...ComputedFloatValueFragment
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
          costOfAttendance(studentId: $studentId) {
            ...ComputedFloatValueFragment
          }

          financialAidAward(studentId: $studentId)
        }
        recent {
          id
          name
          abbreviation
          logo {
            url
          }
          edstimate(studentId: $studentId) {
            value
          }
          admissibility(studentId: $studentId) {
            value
          }
          costOfAttendance(studentId: $studentId) {
            value
          }
        }
      }
    }
  }

  ${ComputedFloatValueFragment}
`;

export const GET_MODAL_CONTROLLER = gql`
  query GetModalController($studentId: ID!) {
    student(where: { id: $studentId }) {
      id

      cashContributionAmount {
        value
      }
      collegeSavingsAmount {
        value
      }
      appliedProducts {
        id
      }

      gradePointAverage {
        value
      }
      weightedGradePointAverageMaximum {
        value
      }

      highSchoolGraduationYear {
        value
      }
      major {
        id
      }
      highSchool {
        id
        name
        postalCode {
          postalCode
        }
      }

      person {
        type
      }

      household {
        income {
          value
        }
      }

      hand {
        current {
          id
          abbreviation
          name
          logo {
            url
          }
        }
      }
    }

    majors {
      id
      name
    }
  }
`;

export const GET_ONBOARDING_FORM_STUDENT = gql`
  query GetOnboardingFormStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      highSchoolGraduationYear {
        value
      }
      gradePointAverage {
        value
      }
      actScore {
        value
      }
      satScore {
        value
      }
      psatScore {
        value
      }
      major {
        id
        name
      }
      person {
        firstName
        lastName
        type
      }
      household {
        postalCode {
          id
          postalCode
          city {
            name
            state {
              abbreviation
            }
          }
        }
      }
      colleges {
        id
        name
        edstimate(studentId: $studentId) {
          value
        }
      }
    }
  }
`;

export const GET_ONBOARDING_PAGE = gql`
  query GetOnboardingPage($studentId: ID!) {
    majors {
      id
      name
    }

    student(where: { id: $studentId }) {
      id
      major {
        id
        name
      }
      person {
        firstName
        lastName
        type
      }
      household {
        income {
          value
        }
      }

      workStudyAmount {
        value
      }
      cashContributionAmount {
        value
      }
      collegeSavingsAmount {
        value
      }

      colleges {
        id
        abbreviation
        name
        edstimate(studentId: $studentId) {
          value
        }
        averageCostOfAttendance
        medianEarnings(
          studentId: $studentId
          yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        ) {
          year
          value
        }
        netEarnings(
          studentId: $studentId
          yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        ) {
          year
          value
        }
        debtRemaining(
          studentId: $studentId
          yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        ) {
          year
          value
        }
        averageAnnualEarningsAmount(studentId: $studentId) {
          value
        }
        costOfAttendance(studentId: $studentId) {
          value
        }
        annualLoanPaymentAmount(studentId: $studentId) {
          value
        }
        valueBenchmark(studentId: $studentId) {
          value
        }
        valueDelta(studentId: $studentId) {
          value
        }
        financialGrade(studentId: $studentId)
      }
    }
  }
`;

export const GET_ONBOARDING_INVITED_STUDENT = gql`
  query GetOnboardingInvitedStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      highSchoolGraduationYear {
        value
      }
     
      person {
        firstName
        lastName
        type
      }
      household {
        postalCode {
          id
          postalCode
          city {
            name
            state {
              abbreviation
            }
          }
        }
      }
      
    }
  }
`;

export const GET_REGISTERING_STUDENT = gql`
  query GetRegisteringStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      person {
        firstName
        lastName
      }
    }
  }
`;

export const GET_INBOUND_INVITATIONS = gql`
  query GetInboundInvitations {
    session {
      account {
        inboundInvitations {
          id
          inviter {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const GET_MY_COLLEGES = gql`
  query GetMyColleges($studentId: ID!) {
    student(where: { id: $studentId }) {
      id

      person {
        type
        affinities
      }

      major {
        id
      }

      hand {
        current {
          id
        }
      }
        
      tips {
          id
          title
          dismissable
          userCheckable
          checked
          
          ... on TextTip {
              text
          }

          ... on FormTip {
              text
          }
          ... on LinkTip {
              text
          }
      }

      normalizedGPA {
        value
      }
      satScore {
        value
      }

      appliedProducts {
        expiresAt
        renewsAt
        product {
          name
        }
      }

      onboardingStatus

      loanStatus
        
      ...RecommendationStudentFragment
        
      bestPublicCollege {
          ...CollegeFragment
      }

      overallGrade

      colleges {
        ...CollegeFragment
      }
    }
  }
  ${CollegeFragment}
  ${RecommendationStudentFragment}
`;

export const SEARCH_COLLEGES = gql`
  query SearchColleges($searchString: String!) {
    colleges(where: { searchString: $searchString }) {
      id
      name
      postalCode {
        city {
          name
          state {
            name
            abbreviation
          }
        }
      }
    }
  }
`;

export const SEARCH_MY_COLLEGES = gql`
  query SearchMyColleges($searchString: String!, $studentId: ID!) {
    student(where: { id: $studentId }) {
      colleges(where: { searchString: $searchString }) {
        id
        name
        logo {
          url
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
        financialGrade(studentId: $studentId)
      }
    }
  }
`;

export const CREDIBLE_PREFILL_REQUEST = gql`
  query CrediblePrefillRequest($id: ID!) {
    crediblePrefillRequest(id: $id) {
      link
    }
  }
`;

export const MENUS = gql`
  query Menus {
    session {
      account {
        person {
          student {
            id
            menus {
              menus{
                location
                sections {
                  title
                  links{
                    icon
                    ... on MenuDivider {
                      icon
                    }
                    ... on MenuLink{
                      icon
                      label
                      link
                      style
                      submenu {
                        location
                        
                      }
                    }
                    ...on LockableMenuLink {
                      icon
                      label
                      link
                      style
                      submenu {
                        location
                        
                      }
                      lockedLink
                      logicCheckKey
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_HIGH_SCHOOLS = gql`
  query SearchHighSchools($searchString: String!) {
    highSchools(where: { searchString: $searchString }) {
      id
      name
      postalCode {
        city {
          name
          state {
            name
            abbreviation
          }
        }
        postalCode
      }
    }
  }
`;

export const SEARCH_POSTAL_CODES = gql`
  query SearchPostalCodes($searchString: String!) {
    postalCodes(where: { searchString: $searchString }) {
      id
      postalCode
      city {
        name
        state {
          name
          abbreviation
        }
      }
    }
  }
`;

export const SEARCH_STUDENTS = gql`
  query SearchStudents($searchString: String!) {
    students(where: { searchString: $searchString }) {
      id
      person {
        firstName
        lastName
      }
    }
  }
`;

export const VALIDATE_SESSION = gql`
  query ValidateSession {
    session {
      id
      account {
        id
        emailAddress {
          emailAddress
        }
        person {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession {
    session {
      expiresAt
      account {
        emailAddress {
          id
          emailAddress
        }
        hasPassword

        outboundInvitations {
          id
          permission
        }

        notifications {
          id
          title
          message
          effectiveAt
          link
          lastSeenAt
        }

        isSuperUser

        person {
          firstName
          lastName

          affinities

          parent {
            id
            children {
              ...StudentFragment
            }
          }

          counselor {
            id
            students {
              ...StudentFragment
            }
          }

          student {
            ...StudentFragment
          }
        }
      }
    }
  }

  fragment StudentFragment on Student {
    id
    person {
      firstName
      lastName
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      version
      amount
      period
      organization {
        id
        name
        logoUrl
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer {
    session {
      account {
        emailAddress {
          emailAddress
        }
        person {
          firstName
          lastName
        }
      }
    }
  }
`

export const GET_CURRENT_STUDENT = gql`
  query GetCurrentStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
        }
      }
    }
  }
`;

export const GET_APPLIED_PRODUCTS_FOR_STUDENT = gql`
  query GetAppliedProductsForStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
          organization {
            logoUrl
          }
        }
      }
    }
  }
`;

export const GET_COLLEGE = gql`
  query GetCollege($collegeSlug: String!, $studentId: ID!) {
    college(where: { slug: $collegeSlug }) {
      id
      name
      url
      logo {
        url
      }
      type
      abbreviation
      postalCode {
        city {
          name
          state {
            name
            abbreviation
            slug
          }
        }
      }
      costOfAttendance(studentId: $studentId) {
        value
        ...ComputedFloatValueFragment
      }
      medianEarnings(
        studentId: $studentId
        yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      ) {
        year
        value
      }
      netEarnings(
        studentId: $studentId
        yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      ) {
        year
        value
      }
      debtRemaining(
        studentId: $studentId
        yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      ) {
        year
        value
      }
      repaymentRate
      meetFinancialAid
      averageMeritScholarship
      averagePrice
      publishedTuition
    }
  }

  ${ ComputedFloatValueFragment}
`;

export const GET_FINANCIAL_PLANNER = gql`
  query GetFinancialPlanner($studentId: ID!) {
    session {
      account {
        person {
          type
        }
      }
    }

    student(where: { id: $studentId }) {
      id
      person {
        firstName
        lastName
      }

      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
        }
      }

      workStudyAmount {
        value
      }
      cashContributionAmount {
        value
      }
      collegeSavingsAmount {
        value
      }
      topChoice {
        id
        name
        abbreviation

        postalCode {
          city {
            name
            state {
              name
              abbreviation
            }
          }
        }

        financialAidAward(studentId: $studentId)

        costOfAttendance(studentId: $studentId) {
          value
        }
        edstimate(studentId: $studentId) {
          value
        }
        medianEarnings(
          studentId: $studentId
          yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        ) {
          year
          value
        }
      }
    }
  }
`;

export const GET_LABS = gql`
  query GetLabs {
    colleges {
      id
      name
      logo {
        url
      }
    }
  }
`;

export const GET_METRO_AREA_COLLEGES = gql`
  query GetMetroAreaColleges($studentId: ID!, $metroAreaSlug: String!) {
    metroArea(where: { slug: $metroAreaSlug }) {
      id
      name
      colleges {
        id
        name
        abbreviation
        logo {
          url
        }
        url
        urlSlugs
        postalCode {
          city {
            name
            state {
              name
              abbreviation
            }
          }
        }
        costOfAttendance(studentId: $studentId) {
          value
        }
        edstimate(studentId: $studentId) {
          value
        }
        firstYearEarnings: medianEarnings(studentId: $studentId, yearsAfterGraduation: [0]) {
          value
        }
      }
    }
  }
`;

export const GET_STATE_COLLEGES = gql`
  query GetStateColleges($studentId: ID!, $stateSlug: String!) {
    state(where: { slug: $stateSlug }) {
      id
      name
      colleges {
        id
        name
        abbreviation
        logo {
          url
        }
        url
        urlSlugs
        postalCode {
          city {
            name
            state {
              name
              abbreviation
            }
          }
        }
        costOfAttendance(studentId: $studentId) {
          value
        }
        firstYearEarnings: medianEarnings(studentId: $studentId, yearsAfterGraduation: [0]) {
          value
        }
      }
    }
  }
`;

export const GET_METRO_AREAS = gql`
  query GetMetroAreas {
    metroAreas {
      id
      abbreviation
      name
      slug
    }
  }
`;

export const GET_STATES = gql`
  query GetStates {
    states {
      id
      abbreviation
      name
      slug
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($studentId: ID!) {
    session {
      account {
        emailAddress {
          id
          emailAddress
        }
        person {
          firstName
          lastName
          type

          parent {
            id
            household {
              efc {
                value
              }
              income {
                value
              }
            }
          }

          counselor {
            id
          }
        }
      }
    }

    student(where: { id: $studentId }) {
      id
      person {
        firstName
        lastName
        type
      }

      preferences {
        id
        value
      }
      highSchool {
        id
        name
        postalCode {
          city {
            name
            state {
              name
              abbreviation
            }
          }
          postalCode
        }
      }

      household {
        income {
          value
        }
        efc {
          value
        }
        postalCode {
          id
          postalCode
        }
      }

      major {
        id
        name
      }
      collegeSavingsAmount {
        value
      }
      workStudyAmount {
        value
      }
      cashContributionAmount {
        value
      }
      otherScholarshipsAmount {
        value
      }
      highSchoolGraduationYear {
        value
      }
      gradePointAverage {
        value
      }
      weightedGradePointAverageMaximum {
        value
      }
      actScore {
        value
      }
      satScore {
        value
      }
      psatScore {
        value
      }
      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
        }
      }
    }
  }
`;

export const GET_WIDGET_STUDENT = gql`
  query GetWidgetStudent {
    session {
      account {
        id
        person {
          id
          student {
            id
            gradePointAverage {
              value
            }
            actScore {
              value
            }
            satScore {
              value
            }

            household {
              postalCode {
                id
                postalCode
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_WIDGET_COLLEGE = gql`
  query GetWidgetCollege($collegeId: ID!, $studentId: ID!) {
    college(where: { id: $collegeId }) {
      id
      name
      abbreviation
      costOfAttendance(studentId: $studentId) {
        value
      }
      edstimate(studentId: $studentId) {
        value
      }
    }
  }
`;

export const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($studentId: ID!) {
    session {
      account {
        person {
          type
        }
      }
    }

    student(where: { id: $studentId }) {
      id

      ...RecommendationStudentFragment
      
      recommendations {
        id
        title
        colleges {
          __typename
          ... on Node {
            id
          }
          ... on College {
            ...CollegeFragment
          }
        }
      }
    }
  }
  ${CollegeFragment}
  ${RecommendationStudentFragment}
`;

export const GET_SABRINA_BOT_MESSAGES = gql`
  query GetSabrinaBotMessages($studentId: ID!, $page: String!) {
    student(where: { id: $studentId }) {
      id

      sabrinaBotMessages(page: $page) {
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

export const GET_APPEALS = gql`
  query GetAppeals($studentId: ID!) {
    session {
      account {
        isSuperUser
      }
    }
    student(where: { id: $studentId }) {
      id

      appliedProducts {
        id
        expiresAt
        renewsAt
        product {
          name
        }
      }

      colleges {
        id
        name
        status(studentId: $studentId)

        edstimate(studentId: $studentId) {
          value
        }

        financialAidAward(studentId: $studentId)
        financialAidAppealAward(studentId: $studentId)
        financialAidAppealLetter(studentId: $studentId) {
          id
        }
      }
    }
  }
`;

export const GET_FILE_DOWNLOAD_URL = gql`
  query GetFileDownloadUrl($studentId: ID!, $fileId: ID!) {
    file(where: { id: $fileId }) {
      id
      downloadUrl(studentId: $studentId)
    }
  }
`;

export const GET_REPORT_PAGE = gql`
  query GetReportPage($studentId: ID!) {
    majors {
      id
      name
    }
    session {
      account {
        emailAddress {
          id
          emailAddress
        }
        hasPassword
      }
    }
    student(where: { id: $studentId }) {
      id

      major {
        id
      }

      appliedProducts {
        id
      }

      onboardingStatus

      loanStatus

      person {
        firstName
        lastName
      }

      workStudyAmount {
        value
      }
      cashContributionAmount {
        value
      }
      collegeSavingsAmount {
        value
      }
      otherScholarshipsAmount {
        value
      }
      creditScore {
        value
      }
      household {
        income {
          __typename
          value
        }
        efc {
          __typename
          value
        }
        imputedIncome
        postalCode {
          id
          postalCode
        }
      }
      hand {
        current {
          id
          name
          abbreviation
          logo {
            url
          }
          loans(studentId: $studentId) {
            id
            createdAt
            updatedAt
            version
            payments {
              month
              paymentAmount
              remainingPrincipal
              remainingInterest
              remainingTotal
            }

            provider
            interestRate

            strictPrincipal
            initialPrincipalAmount
            initialInterestAmount
            initialTotalLoanAmount
          }
          loanPrincipalAmount(studentId: $studentId) {
            value
          }
          calculationsUseAidAward(studentId: $studentId)
          financialAidAward(studentId: $studentId)
          medianEarnings(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          netEarnings(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          debtRemaining(
            studentId: $studentId
            yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          ) {
            year
            value
          }
          averageCostOfAttendance
          edstimate(studentId: $studentId) {
            value
          }
          effectiveCost(studentId: $studentId) {
            value
          }
          financialAidAward(studentId: $studentId)
          costOfAttendance(studentId: $studentId) {
            value
          }
          loanInterestRate(studentId: $studentId) {
            value
          }
          loanPaymentMonths(studentId: $studentId) {
            value
          }
          totalLoanAmount(studentId: $studentId) {
            value
          }
          affordabilityDetermination(studentId: $studentId)
          affordabilityDelta(studentId: $studentId) {
            value
          }
          valueDetermination(studentId: $studentId)
          financialAidAward(studentId: $studentId)
          valueBenchmark(studentId: $studentId) {
            value
          }
          valueDelta(studentId: $studentId) {
            value
          }
          annualLoanPaymentAmount(studentId: $studentId) {
            value
          }
          averageAnnualEarningsAmount(studentId: $studentId) {
            value
          }
          affordabilityBenchmark(studentId: $studentId) {
            value
          }
          financialGrade(studentId: $studentId)
        }
      }
    }
  }

  ${'' /*ComputedFloatValueFragment*/}
`;

export const GET_REGISTERING_STUDENT_ACCOUNT = gql`
  query GetRegisteringStudentAccount($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      highSchoolGraduationYear {
        value
      }
      gradePointAverage {
        value
      }
      actScore {
        value
      }
      satScore {
        value
      }
      psatScore {
        value
      }
      major {
        id
        name
      }
      person {
        firstName
        lastName
        type
      }
      household {
        postalCode {
          id
          postalCode
          city {
            name
            state {
              abbreviation
            }
          }
        }
      }
    }
  }
`;

export const GET_REGISTERING_COLLEGE = gql`
  query GetRegisteringCollege($studentId: ID!, $collegeId: ID!) {
    college(where: { id: $collegeId }) {
      id
      name
      abbreviation
      logo {
        url
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
      edstimate(studentId: $studentId) {
        value
      }
    }
  }
`;


export const GET_COMPARISON_COLLEGE = gql`
  query GetComparisonCollege($studentId: ID!, $collegeId: ID!) {
    student(where: { id: $studentId }) {
      id
      major {
        id
        name
      }
    }
    college(where: { id: $collegeId }) {
      id
      name
      averageCostOfAttendance
      costOfAttendance(studentId: $studentId) {
        ...ComputedFloatValueFragment
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
      medianEarnings(
        studentId: $studentId
        yearsAfterGraduation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      ) {
        year
        value
      }
      averageGPA {
        value
      }
      averageSATScore {
        value
      }
      averageACTScore {
        value
      }

      percentOfFreshmenReceivingAid
      satScoreIQR {
        low
        mid
        high
      }
      actScoreIQR {
        low
        mid
        high
      }
      admissionRate
      applicationFee
      averageTotalLoanAmount
      repaymentRate
    }
  }

  ${ComputedFloatValueFragment}
`;


export const GET_EDSTIMATE_PRESENTATION = gql`
query GetEdstimatePresentation($studentId: ID!, $collegeId: ID!) {
  student(where: { id: $studentId }) {
    id

    gradePointAverage {
      value
    }
    actScore {
      value
    }
    satScore {
      value
    }
    
    household {
      efc {
        value
      }
      imputedEfc {
        value
      }
    }
  }
  college(where: { id: $collegeId }) {
    id
    name
    studentMerit(studentId: $studentId)
    studentNeed(studentId: $studentId)
    edstimate(studentId: $studentId) {
      value
    }
    edstimateComponents(studentId: $studentId) {
      trends {
        value {
          value
        }
      }
      otherStudents {
        value {
          value
        }
        students {
          efc {
            value
          }
          gradePointAverage {
            value
          }
          actScore {
            value
          }
          satScore {
            value
          }
          edstimate {
            value
          }
        }
      }
      publishedScholarships {
        value {
          value
        }
        scholarships {
          name
          amount
        }
      }
    }
    meritAidGenerosity
    needBasedAidGenerosity
  }
}
`;

export const GET_COMPARISON_STUDENT = gql`
  query GetComparisonStudent($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      major {
        id
        name
      }
    }
  }
`;

export const GET_EFC_FIELD = gql`
  query GetEFCField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      household {
        efc {
          value
        }
      }
    }
  }
`

export const GET_GPA_FIELD = gql`
  query GetGPAField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      gradePointAverage {
        value
      }
    }
  }
`

export const GET_SAT_FIELD = gql`
  query GetSATField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      satScore {
        value
      }
    }
  }
`

export const GET_PSAT_FIELD = gql`
  query GetPSATField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      psatScore {
        value
      }
    }
  }
`

export const GET_ACT_FIELD = gql`
  query GetACTField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      actScore {
        value
      }
    }
  }
`

export const GET_HHI_FIELD = gql`
  query GetHHIField($studentId: ID!) {
    student(where: { id: $studentId }) {
      id
      household {
        income {
          value
        }
      }
    }
  }
`

export const GET_SAVINGS_FIELD = gql`
    query GetSavingsField($studentId: ID!) {
        student(where: { id: $studentId }) {
            id
            collegeSavingsAmount {
                value
            }
        }
    }
`

export const GET_WORK_STUDY_FIELD = gql`
    query GetWorkStudyField($studentId: ID!) {
        student(where: { id: $studentId }) {
            id
            workStudyAmount {
                value
            }
        }
    }
`

export const GET_MAJOR_FIELD = gql`
    query GetMajorField($studentId: ID!) {
        student(where: { id: $studentId }) {
            id
            major {
                id
                name
            }
        }
    }
`

export const GET_HIGH_SCHOOL_FIELD = gql`
    query GetHighSchoolField($studentId: ID!) {
        student(where: { id: $studentId }) {
            id
            highSchool {
                id
                name
                postalCode {
                    postalCode
                }
            }
        }
    }
`

export const GET_SMART_EDSTIMATE = gql`
  query GetSmartEdstimate($studentId: ID!, $collegeId: ID!) {
    college(where: { id: $collegeId }) {
      id
      edstimate(studentId: $studentId) {
        value
      }
    }
  }
`