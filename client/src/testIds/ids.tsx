const testId = (...part: string[]) => {
    return part.join("-")
}

const loanTestId = (...part: string[]) => testId("loan", ...part)

export const NavbarPrefix = "navbar-"

export const LoanCalculateLoanPayments = "loan-calculate-loan-payments"
export const LoanNextButton = loanTestId("next-button")
export const LoanEFCField = "loan-efc-field"
export const LoanEFCCheckbox = "loan-efc-checkbox"
export const LoanHHIField = "loan-hhi-field"
export const LoanUploadAidLetterButton = "loan-upload-aid-letter-button"
export const LoanNextStepReport = "loan-next-step-report"
export const LoanNextStepConsult = "loan-next-step-consult"
export const LoanNextStepBudget = "loan-next-step-budget"
export const LoanNextStepLoans = "loan-next-step-loans"
export const LoanNextStepSimpleTuition = "loan-next-step-simple-tuition"
export const LoanNextStepCredible = "loan-next-step-credible"
export const LoanSavingsSlider = "loan-savings-slider"
export const LoanACCSlider = "loan-acc-slider"
export const LoanASWSlider = "loan-asw-slider"
export const LoanScholarshipsSlider = "loan-scholarships-slider"

export const LoginEmailField = "login-email-field"
export const LoginPasswordField = "login-password-field"
export const LoginSubmitButton = "login-submit-button"

export const SignupAccountType = "signup-account-type-dropdown"
export const SignupStudentYearDropdownParent = "signup-student-year-dropdown-parent"
export const SignupStudentYearDropdownStudent = "signup-student-year-dropdown-student"
export const SignupZipCodeField = "signup-zip-code-field"
export const SignupCollegeField = "signup-college-field"
export const SignupGPAField = "signup-gpa-field"
export const SignupACTField = "signup-act-field"
export const SignupSATField = "signup-sat-field"
export const SigunupPSATField = "signup-psat-field"
export const SignupFirstNameField = "signup-first-name-field"
export const SignupLastNameField = "signup-last-name-field"
export const SignupEmailField = "signup-email-field"
export const SignupPasswordField = "signup-password-field"
export const SignupSubmitButton = "signup-submit-button"

export const AppealsUploadAidLetterButton = "appeals-upload-aid-letter-button"
export const AppealsAmountField = "appeals-amount-field"
export const AppealsSubmitButton = "appeals-submit-button"

export const RecommendationsShowHideButton = "recommendations-show-hide-button"
export const RecommendationsAddButton = "recommendations-add-button"
export const RecommendationsLoadMoreButton = "recommendations-load-more-button"
export const RecommendationsDismissButton = "recommendations-dismiss-button"

export const ProfileGPAFieldUW = "profile-gpa-field-uw"
export const ProfileGPAFieldW = "profile-gpa-field-w"
export const ProfileGPAToggle = "profile-gpa-toggle"
export const ProfileACTField = "profile-act-field"
export const ProfileSATField = "profile-sat-field"
export const ProfilePSATField = "profile-psat-field"
export const ProfileHHIField = "profile-hhi-field"
export const ProfileSavingsField = "profile-savings-field"
export const ProfileEFCField = "profile-efc-field"
export const ProfileACCField = "profile-acc-field"
export const ProfileASWField = "profile-asw-field"
export const ProfileScholarshipsField = "profile-scholarships-field"
export const ProfileSaveButton = "profile-save-button"

export const MyCollegesCardViewReportButton = "my-colleges-view-report-button"