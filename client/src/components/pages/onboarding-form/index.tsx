import * as React from 'react';
import withSizes from 'react-sizes';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text, { ETextType } from '@edmit/component-library/src/components/atoms/typography/text';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldEmail from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number';
import { SignupError } from '../../../graphql/generated';
import { commonValidations, composeValidators, FieldValidator } from '@edmit/component-library/src/lib/forms';
import DetailedIcon, { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import {
  ConnectedSearchZipCodesProps,
  ISearchZipCodesOption,
} from '@edmit/component-library/src/components/molecules/search-zip-codes'
import { Formik } from 'formik';
import Card from '@edmit/component-library/src/components/atoms/card';
import { EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import {
  ConnectedSearchCollegesProps,
  ISearchCollegeOption,
} from '@edmit/component-library/src/components/molecules/search-colleges'
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import { EGoal, EPersonType } from '@edmit/component-library/src/shared'
import { Nullable, StudentId } from "@edmit/component-library/src/lib/models";

export interface IOnboardingFormPageViewModel {
  initialValues: FormFields;

  searchZipCodeComponent: React.ComponentType<ConnectedSearchZipCodesProps>;
  searchCollegesComponent: React.ComponentType<ConnectedSearchCollegesProps>;

  studentId: Nullable<StudentId>;
  cityName: string;
  stateAbbreviation: string;
  isSaving: boolean;
  isMobile?: boolean;
}

export interface IOnboardingFormPageActions {
  goToMyColleges: () => void;
  updateProfile: (
    values: Subtract<
      FormFields,
      { emailAddress: any; password: any } & ICollegeSelectionFormFields
    > &
      IFitScorePrioritizationOnboardingFormFields
  ) => Promise<void>;
  signup: (emailAddress: string, password: string) => Promise<{ errors: any[] | null }>;
  addToList: (collegeId: string) => Promise<void>;
}

type OnboardingFormPageProps = IOnboardingFormPageViewModel & IOnboardingFormPageActions;

type FormFields = IAccountOnboardingFormFields &
  IMeritProfileFormFields &
  IZipCodeInputFormFields &
  IRegistrationFormFields &
  ICollegeSelectionFormFields;

interface IAccountOnboardingFormFields {
  accountType: EPersonType | null;
}

interface IFitScorePrioritizationOnboardingFormFields {
  fitScorePriorities: Array<{ content: EGoal; id: string }>;
}

interface IMeritProfileFormFields {
  gradePointAverage: string | null;
  actScore: number | null;
  satScore: number | null;
  psatScore: number | null;
}

interface ICollegeSelectionFormFields {
  firstCollege: ISearchCollegeOption | null;
  secondCollege?: ISearchCollegeOption | null;
}

interface IRegistrationFormFields {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  password: string | null;
}

interface IZipCodeInputFormFields {
  zipCode: ISearchZipCodesOption | null;
}

class OnboardingFormPage extends React.Component<OnboardingFormPageProps> {
  render() {
    const headerSize = this.props.isMobile ? EHeadingSize.H4 : EHeadingSize.H3;

    const validateAccountType: FieldValidator<IAccountOnboardingFormFields> = (values, errors) => {
      if (!values.accountType) {
        errors.accountType = 'You must specify an account type.';
      }
      return errors;
    };

    const validateZipCode: FieldValidator<IZipCodeInputFormFields> = (values, errors) => {
      if (!values.zipCode) {
        errors.zipCode = 'You must specify a zip code.';
      }
      return errors;
    };

    const validateCollegeSelection: FieldValidator<ICollegeSelectionFormFields> = (
      values,
      errors
    ) => {
      if (!values.firstCollege) {
        errors.firstCollege = 'You must specify a college.';
      }
      return errors;
    };

    const validateFirstName: FieldValidator<IRegistrationFormFields> = (values, errors) => {
      if (!values.firstName) {
        errors.firstName = 'Enter your first name.';
      }
      if (values.firstName && values.firstName.length < 2) {
        errors.firstName = 'Enter your first name.';
      }
      return errors;
    };

    const validateLastName: FieldValidator<IRegistrationFormFields> = (values, errors) => {
      if (!values.lastName) {
        errors.lastName = 'Enter your last name.';
      }
      if (values.lastName && values.lastName.length < 2) {
        errors.lastName = 'Enter your last name.';
      }
      return errors;
    };

    const validateEmailAddress: FieldValidator<IRegistrationFormFields> = (values, errors) => {
      if (!values.emailAddress) {
        errors.emailAddress = 'Enter your email address.';
      }
      if (values.emailAddress && values.emailAddress.length < 4) {
        errors.emailAddress = 'Enter a valid email address.';
      }
      return errors;
    };

    const validatePassword: FieldValidator<IRegistrationFormFields> = (values, errors) => {
      if (!values.password) {
        errors.password = 'Enter a password.';
      }
      if (values.password && values.password.length < 6) {
        errors.password = "Enter a password that's at least six characters.";
      }
      return errors;
    };

    return (
      <PageContainer className="pv5-l mh0">
        <Formik<
          FormFields &
          IFitScorePrioritizationOnboardingFormFields & {
            searchZipCodesQuery: string;
            searchFirstCollegeQuery: string;
            searchSecondCollegeQuery: string;
          }
        >
          initialValues={{
            ...this.props.initialValues,
            fitScorePriorities: [
              { id: '0', content: EGoal.Affordability },
              { id: '1', content: EGoal.Earnings },
              { id: '2', content: EGoal.Value }
            ],
            searchFirstCollegeQuery: '',
            searchSecondCollegeQuery: '',
            searchZipCodesQuery: ''
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            await this.props.updateProfile({
              accountType: values.accountType,
              actScore: values.actScore,
              firstName: values.firstName,
              fitScorePriorities: values.fitScorePriorities,
              gradePointAverage: values.gradePointAverage,
              lastName: values.lastName,
              psatScore: values.psatScore,
              satScore: values.satScore,
              zipCode: values.zipCode!
            });

            const { errors } = await this.props.signup(values.emailAddress!, values.password!);

            if (errors !== null && errors.length > 0) {
              for (const error of errors) {
                switch (error) {
                  case SignupError.InvalidEmailAddress:
                    setFieldError('emailAddress', 'Your email address is invalid or an account with that email already exists.');
                    break;
                  case SignupError.PasswordNotComplexEnough:
                    setFieldError('password', 'Your password must be at least six characters.');
                    break;
                }
              }

              return;
            }

            await this.props.addToList(values.firstCollege!.id);
            if (values.secondCollege) {
              await this.props.addToList(values.secondCollege.id);
            }

            this.props.goToMyColleges();
          }}
          validate={values =>
            composeValidators(
              values,
              {},
              validateAccountType,
              validateZipCode,
              validateCollegeSelection,
              commonValidations.sat('satScore'),
              commonValidations.act('actScore'),
              commonValidations.psat('psatScore'),
              validateFirstName,
              validateLastName,
              validateEmailAddress,
              validatePassword
            )
          }
        >
          {({
            values,
            touched,
            errors,
            setFieldValue: sFV,
            setFieldTouched,
            isSubmitting,
            submitForm,
            submitCount
          }) => {
            const ACCOUNT_TYPE = 'accountType';

            const setFieldValue = (field: string, value: any) => {
              sFV(field, value);
              setFieldTouched(field);
            };

            return (
              <Card className={'pa4 pa5-ns'}>
                {/* Account type */}
                <div className={'mb4 mb5-ns'}>
                  <Heading
                    size={headerSize}
                    text={`Get personalized college pricing and recommendations with an Edmit account.`}
                    className="mt0 mb4 tc"
                  />
                  {/*<Heading
                    size={headerSize}
                    text={`Edmit will help you understand your college financial fit.`}
                    className="mt0 mb2 tc"
                  />*/}
                  <div className="center mw6">
                    <div className="mt2 mt4-ns">
                      <Text className="mt0 mb2 fw7 t-medium black">I am a...</Text>
                      <div className="flex flex-column flex-row w-100 nl1 nr1">
                        <div
                          style={{ minWidth: 0, flexBasis: 0 }}
                          className={`mb2 mb0-ns flex-grow-1 ba bw1 br2 pointer hover-b--crimson hover-shadow-button pv1 pv3-ns ph2 mh1 tc ${
                            values.accountType === EPersonType.STUDENT
                              ? 'b--crimson '
                              : 'b--gray-light'
                            }`}
                          onClick={() => setFieldValue(ACCOUNT_TYPE, EPersonType.STUDENT)}
                        >
                          <DetailedIcon name={EDetailedIconName.UserStudent} width={60} />
                          <Text className="t-medium mb0">Student</Text>
                        </div>
                        <div
                          style={{ minWidth: 0, flexBasis: 0 }}
                          className={`mb2 mb0-ns flex-grow-1 ba bw1 b--gray-light br2 pointer hover-b--crimson hover-shadow-button pv1 pv3-ns ph2 mh1 tc ${
                            values.accountType === EPersonType.PARENT
                              ? 'b--crimson '
                              : 'b--gray-light'
                            }`}
                          onClick={() => setFieldValue(ACCOUNT_TYPE, EPersonType.PARENT)}
                        >
                          <DetailedIcon name={EDetailedIconName.UserParent} width={60} />
                          <Text className="t-medium mb0">Parent</Text>
                        </div>
                        <div
                          style={{ minWidth: 0, flexBasis: 0 }}
                          className={`mb2 mb0-ns flex-grow-1 ba bw1 b--gray-light br2 pointer hover-b--crimson hover-shadow-button pv1 pv3-ns ph2 mh1 tc ${
                            values.accountType === EPersonType.OTHER
                              ? 'b--crimson '
                              : 'b--gray-light'
                            }`}
                          onClick={() => setFieldValue(ACCOUNT_TYPE, EPersonType.OTHER)}
                        >
                          <DetailedIcon name={EDetailedIconName.UserOther} width={60} />
                          <Text className="t-medium mb0">Other</Text>
                        </div>
                      </div>
                      {touched.accountType &&
                        errors.accountType && (
                          <Text type={ETextType.Error}>{errors.accountType}</Text>
                        )}
                    </div>
                  </div>
                </div>
                {/* Zip Code */}
                <div className={'mb4 mb5-ns'}>
                  <div className="center mw6">
                    <Text className="mt0 mb0 fw7 t-medium black">What's your zip code?</Text>
                    <div className="center mw6">
                      <div className="mt2">
                        {
                          <this.props.searchZipCodeComponent
                            inputValue={values.searchZipCodesQuery}
                            onSearch={newQuery => setFieldValue('searchZipCodesQuery', newQuery)}
                            onSelected={zipCode => setFieldValue('zipCode', zipCode)}
                            selected={values.zipCode || undefined}
                          />
                        }
                        {touched.searchZipCodesQuery &&
                          errors.zipCode && <Text type={ETextType.Error}>{errors.zipCode}</Text>}
                      </div>
                    </div>
                  </div>
                </div>
                {/* College Selection */}
                <div className={'mb4 mb5-ns'}>
                  {/* values.firstCollege != null ? (
                    <>
                      { values.zipCode &&
                      <Heading
                        size={headerSize}
                        text={`Here’s the average financial fit score for students in ${
                          values.zipCode!.label
                          }.`}
                        className="mt0 mb2 tc"
                      />}
                      <Heading
                        size={headerSize}
                        text={`Personalize your fit score further on the next page.`}
                        className="mt0 mb2 tc"
                      />
                    </>
                  ) : (
                    <Heading size={headerSize} text={`Let's start with a college`}
                             className="mt0 mb2 tc"/>
                  ) */}
                  <div className="mt2 mt4-ns mh0 mh3-ns mh5-ns flex flex-column flex-row justify-center flex-wrap flex-nowrap-ns">
                    <div className="flex-grow-1 mb1 mb3-ns mh1 mh3-ns mw6">
                      <Text className="mt0 mb2 fw7 t-medium black">Choose a college</Text>
                      {
                        <this.props.searchCollegesComponent
                          inputValue={values.searchFirstCollegeQuery}
                          onSearch={newQuery => setFieldValue('searchFirstCollegeQuery', newQuery)}
                          onSelected={college => setFieldValue('firstCollege', college)}
                          selected={values.firstCollege || undefined}
                          myColleges={[]}
                        />
                      }
                      {touched.searchFirstCollegeQuery &&
                        errors.firstCollege && (
                          <Text type={ETextType.Error}>{errors.firstCollege}</Text>
                        )}
                    </div>
                    {values.firstCollege != null && (
                      <div className="flex-grow-1 mb1 mb3-ns mh0 mh3-ns mw6">
                        <Text className="mt0 mb2 fw7 t-medium black">
                          Choose another college to compare with{' '}
                          <span className="i gray-dim fw4 t-small">(optional)</span>
                        </Text>
                        <this.props.searchCollegesComponent
                          inputValue={values.searchSecondCollegeQuery}
                          onSearch={newQuery => setFieldValue('searchSecondCollegeQuery', newQuery)}
                          onSelected={college => setFieldValue('secondCollege', college)}
                          selected={values.secondCollege || undefined}
                          myColleges={[]}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Personalize Pt. I */}
                <div className={'mb4 mb5-ns'}>
                  <div className="center mw6">
                    <Text className="mt0 mb0 fw7 t-medium black">
                      Personalize your Financial Fit
                    </Text>
                    <div className="mt2 w-100 flex flex-column flex-row-l justify-center items-center">
                      <div className="ba br2 b--gray-light ph3">
                        <div className="mv3 mw5">
                          <FormFieldText
                            name={'gpa-score'}
                            label={'GPA'}
                            required={false}
                            value={values.gradePointAverage || ''}
                            errorMessage={
                              (touched.gradePointAverage && errors.gradePointAverage) || undefined
                            }
                            onBlur={() => setFieldTouched('gradePointAverage')}
                            onChange={value => setFieldValue('gradePointAverage', value)}
                          />
                          <Text className="t-small i mt2 mb0">
                            Enter your GPA as it appears on your transcript (weighted or
                            unweighted).
                          </Text>
                        </div>
                        <div className="flex flex-row nl3 nr3 mv1 mv3-ns">
                          <div className="w-third mh3">
                            <FormFieldNumber
                              name={'act-score'}
                              label={'ACT'}
                              required={false}
                              value={values.actScore || undefined}
                              errorMessage={(touched.actScore && errors.actScore) || undefined}
                              onBlur={() => setFieldTouched('actScore')}
                              onChange={value => setFieldValue('actScore', value)}
                            />
                          </div>
                          <div className="w-third mh3">
                            <FormFieldNumber
                              name={'sat-score'}
                              label={'SAT'}
                              required={false}
                              value={values.satScore || undefined}
                              errorMessage={(touched.satScore && errors.satScore) || undefined}
                              onBlur={() => setFieldTouched('satScore')}
                              onChange={value => setFieldValue('satScore', value)}
                            />
                          </div>
                          <div className="w-third mh3">
                            <FormFieldNumber
                              name={'psat-score'}
                              label={'PSAT'}
                              required={false}
                              value={values.psatScore || undefined}
                              errorMessage={(touched.psatScore && errors.psatScore) || undefined}
                              onBlur={() => setFieldTouched('psatScore')}
                              onChange={value => setFieldValue('psatScore', value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Create Account */}
                <div className={'mb4 mb5-ns'}>
                  <div className="center mw6">
                    <div className="mt2 mt4-ns">
                      <FormFieldText
                        name={'first-name'}
                        label={'First Name'}
                        required={true}
                        value={values.firstName || ''}
                        errorMessage={(touched.firstName && errors.firstName) || undefined}
                        onBlur={() => setFieldTouched('firstName')}
                        onChange={value => setFieldValue('firstName', value)}
                      />
                    </div>
                    <div className="mv2 mv4-ns">
                      <FormFieldText
                        name={'last-name'}
                        label={'Last Name'}
                        required={true}
                        value={values.lastName || ''}
                        errorMessage={(touched.lastName && errors.lastName) || undefined}
                        onBlur={() => setFieldTouched('lastName')}
                        onChange={value => setFieldValue('lastName', value)}
                      />
                    </div>
                    <div className="mv2 mv4-ns">
                      <FormFieldEmail
                        name={'email'}
                        label={'Email'}
                        required={true}
                        value={values.emailAddress || ''}
                        errorMessage={(touched.emailAddress && errors.emailAddress) || undefined}
                        onBlur={() => setFieldTouched('emailAddress')}
                        onChange={value => setFieldValue('emailAddress', value)}
                      />
                    </div>
                    <div className="mv2 mv4-ns">
                      <FormFieldPassword
                        name={'password'}
                        label={'Password'}
                        required={true}
                        value={values.password || ''}
                        errorMessage={(touched.password && errors.password) || undefined}
                        onBlur={() => setFieldTouched('password')}
                        onChange={value => setFieldValue('password', value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={'flex justify-center items-center mb3'}>
                  <FormSubmit
                    defaultText={'Complete Signup'}
                    submittedText={'Signing up'}
                    succeededText={'Signed up'}
                    failedText={'Fix Above Errors'}
                    submitState={
                      isSubmitting
                        ? ESubmitState.Submitted
                        : submitCount > 0
                          ? errors !== {}
                            ? ESubmitState.Failed
                            : ESubmitState.Succeeded
                          : ESubmitState.Default
                    }
                    buttonSize={EButtonSize.Large}
                    onClick={submitForm}
                  />
                </div>
              </Card>
            );
          }}
        </Formik>
      </PageContainer>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(OnboardingFormPage) as typeof OnboardingFormPage;
