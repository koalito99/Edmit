import * as React from 'react';
import withSizes from 'react-sizes';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Text, { ETextType } from '@edmit/component-library/src/components/atoms/typography/text';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldEmail from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import { SignupError } from '../../../graphql/generated';
import {
  academicInfoValidator,
  commonValidations,
  composeValidators,
  FieldValidator
} from '@edmit/component-library/src/lib/forms';
import RegistrationCard from '@edmit/component-library/src/components/organisms/card-registration';
import SteppedWizardWrapper, {
  ESteppedWizardStepVisibleState
} from '@edmit/component-library/src/components/organisms/wrapper-stepped-wizard-registration';
import {
  ConnectedSearchCollegesProps,
  ISearchCollegeOption
} from '@edmit/component-library/src/components/molecules/search-colleges';
import {
  ConnectedSearchZipCodesProps,
  ISearchZipCodesOption
} from '@edmit/component-library/src/components/molecules/search-zip-codes';
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select';
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number';
import { Nullable, StudentId, normalizeId } from '@edmit/component-library/src/lib/models';
import { EGoal, EPersonType } from '@edmit/component-library/src/shared';
import { usePaywall } from '../../../hooks/paywall';
import { AAACU_PRODUCT_ID, BCFU_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import EdmitTooltip, { ETooltipType } from '@edmit/component-library/src/components/molecules/tooltip';
import { SignupStudentYearDropdownParent, SignupStudentYearDropdownStudent, SignupZipCodeField, SignupCollegeField, SignupGPAField, SignupACTField, SignupSATField, SigunupPSATField, SignupFirstNameField, SignupLastNameField, SignupEmailField, SignupPasswordField, SignupAccountType } from '../../../testIds/ids';

export enum ERegistrationStepNew {
  Registration = 0,
  PersonTypeAndZip = 1,
  Personalize = 2,
  Colleges = 3,
  Purchase = 4
}

export interface IOnboardingPageNewViewModel {
  activeStep: ERegistrationStepNew;
  onboardingColleges: Array<{
    id: string;
    name: string;
    edstimate: number;
  }>;

  initialValues: AllFields;

  searchZipCodeComponent: React.ComponentType<Partial<ConnectedSearchZipCodesProps>>;

  firstSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  secondSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;

  studentId: Nullable<StudentId>;
  cityName: string;
  stateAbbreviation: string;

  loading: boolean;
  token: string | null;
  productToApply: any | null;
  isMobile?: boolean;
}

// convenience types since there's a lot of nesting going on up there ^^^^
export interface IOnboardingPageNewActions {
  onContinue: () => void;
  onPrevious: () => void;
  onCompletedSignup: () => void;
  refetchOnboardingColleges: () => void;
  refetchProfile: () => void;
  updateProfile: (
    input: Partial<
      AllFields &
      IAffinitiesOnboardingFormFields & {
        zipCodeId: string | null;
      }
    >,
    initialValues: Partial<AllFields>
  ) => Promise<void>;
  signup: (emailAddress: string, password: string) => Promise<{ errors: any[] | null }>;
  applyProduct: (token: string) => Promise<void>;
  addToList: (collegeId: string, refetch?: boolean) => Promise<void>;
}

type OnboardingPageNewProps = IOnboardingPageNewViewModel & IOnboardingPageNewActions;

type AllFields = IAccountTypeFormFields & IPersonalizeProfileFormFields & IRegistrationFormFields;

interface IAccountTypeFormFields {
  accountType: EPersonType;
  studentYear: 'Senior' | 'Junior' | 'Other';
}

interface IAffinitiesOnboardingFormFields {
  affinities: Array<{ content: EGoal; id: string }>;
}

interface IPersonalizeProfileFormFields {
  gradePointAverage: string | null;
  actScore: number | null;
  satScore: number | null;
  psatScore: number | null;
}

interface IRegistrationFormFields {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  password: string | null;
}

interface IZipCodeFormFields {
  zipCodeQuery: string | null;
  zipCode: ISearchZipCodesOption | null;
  testId?: string;
}

interface ICollegesFormFields {
  firstCollegeQuery: string | null;
  firstCollege: ISearchCollegeOption | null;
  secondCollegeQuery: string | null;
  secondCollege: ISearchCollegeOption | null;
}

const StandardCopy: React.FC = (props) => {
  return (
    <>
      <Heading size={EHeadingSize.H4} text={"Why you'll love it"} className="lh-copy mt0 mb4 mb2-l tc tl-l" />
      <Text>
        <ul>
          <li className={'mv2'}>Compare college costs and find the best values</li>
          <li className={'mv2'}>See what merit scholarships and financial aid you might receive</li>
          <li className={'mv2'}>Get personalized college recommendations</li>
        </ul>
      </Text>
    </>
  )
}

const productSignUpCopy = (id: string) => {
  switch (id) {
    case normalizeId(BCFU_PRODUCT_ID):
    case normalizeId(AAACU_PRODUCT_ID):
      return [
        {
          name: "First 6 months free! Then it's just $5 per month - that's a 50% discount. You'll only be billed after your first 6 months and you can cancel any time."
        },
        {
          name: '30-minute phone consult with an Edmit Advisor',
          tooltip: 'Edmit’s professional guidance gives you peace of mind that you’re making the best decisions when it comes to paying for college.'
        },
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        },
        {
          name: 'Personalized merit and financial aid estimates',
          tooltip:
            'Personalized strategy to get more merit and financial aid overall. We’re with you every step of the way.'
        },
        {
          name: 'Comprehensive college cost comparison tool',
          tooltip:
            'Get a 100% personalized college payment plan and preview different monthly budgets to get you there'
        }
      ];
    default:
      return [];
  }
}

const SignUpInformation: React.FC<IOnboardingPageNewViewModel> = (props) => {
  const paywall = usePaywall()

  const products = paywall.products.filter(
    (product) => product.id === props.productToApply
  )

  const product = products[0]

  const features = product ? productSignUpCopy(product.id) : []

  return (
    props.token ? (
      <>
        {product.organization ? (
          product.organization.logoUrl ? (
            <img style={{ height: "50px" }} src={product.organization.logoUrl} />) : <span />
        ) : <span />}
        <Heading size={EHeadingSize.H4} text={product.name} className="lh-copy mt1 mb4 mb2-l tc tl-l" />
        <Text>
          <ul>
            {features.map((f) =>
              <li>
                {f.name}&nbsp;
                {(f.tooltip && <EdmitTooltip type={ETooltipType.Info} text={f.tooltip} />)}
              </li>
            )}
          </ul>
        </Text>

      </>
    ) : (
        <StandardCopy />
      )
  )
}

class OnboardingPageNew extends React.Component<OnboardingPageNewProps> {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    const onContinue = () => {
      scroll.scrollToTop({
        duration: 300
      });

      setTimeout(this.props.onContinue, 300);
    };

    const validateZipCode: FieldValidator<IZipCodeFormFields> = (values, errors) => {
      if (!values.zipCode) {
        errors.zipCode = 'You must specify a zip code.';
      }
      return errors;
    };

    const newPersonTypeAndZipCodeOnboardingCard = (
      visibleState: ESteppedWizardStepVisibleState
    ) => (
        <RegistrationCard<IZipCodeFormFields & IAccountTypeFormFields>
          visibleState={visibleState}
          progressAmount={20}
          heading={headerSize => (
            <>
              <Heading
                size={headerSize}
                text={'Tell us who you are so we can personalize the site for you.'}
                className={'mt0'}
              />
            </>
          )}
          validateForm={fields => composeValidators(fields, {}, validateZipCode)}
          onboardingCardContent={({ values, errors, touched, setFieldValue }) => {
            const studentYearSelect = (
              <FormFieldSelect
                required={false}
                style={{
                  display: 'inline-block',
                  fontSize: 19,
                  fontWeight: 400,
                  marginBottom: 10,
                  width: 200
                }}
                className={'merriweather fw4 black'}
                value={values.studentYear}
                onSelect={newValue => setFieldValue('studentYear', newValue)}
              >
                <option value={'Senior'}>Senior</option>
                <option value={'Junior'}>Junior</option>
                <option value={'Other'}>Other</option>
              </FormFieldSelect>
            );

            return (
              <div>
                <div className="center mw6 ph5-l">
                  <div className="mt2 mt4-ns">
                    <Heading
                      size={EHeadingSize.H4}
                      text={
                        <span>
                          I am a{' '}
                          <FormFieldSelect
                            required={false}
                            style={{
                              display: 'inline-block',
                              fontSize: 19,
                              fontWeight: 400,
                              marginBottom: 10,
                              width: 200
                            }}
                            testId={SignupAccountType}
                            className={'merriweather fw4 black'}
                            value={values.accountType}
                            onSelect={newValue => setFieldValue('accountType', newValue)}
                          >
                            <option value={EPersonType.STUDENT}>Student</option>
                            <option value={EPersonType.PARENT}>Parent</option>
                          </FormFieldSelect>{' '}
                          {values.accountType === EPersonType.PARENT ? (
                            <span data-testid={SignupStudentYearDropdownParent}>
                              <>of a {studentYearSelect} in</>
                            </span>
                          ) : (
                              <span data-testid={SignupStudentYearDropdownStudent}>
                                <>in {studentYearSelect} year of</>
                              </span>
                            )}{' '}
                          high school located in{' '}
                          <div data-testid={SignupZipCodeField} className={'dib'} style={{ width: 250 }} >
                            <this.props.searchZipCodeComponent
                              inputValue={values.zipCodeQuery || ''}
                              placeholder={'Zip Code'}
                              onSearch={newQuery => setFieldValue('zipCodeQuery', newQuery)}
                              onSelected={selected => setFieldValue('zipCode', selected)}
                            />
                          </div>
                        </span>
                      }
                    />
                    {touched.zipCode && errors.zipCode && (
                      <Text type={ETextType.Caption}>{errors.zipCode}</Text>
                    )}
                  </div>
                  {/*<div className={'relative w-100 flex justify-end mt2'}>
                  <SabrinaMiniBot
                    open={Boolean(values.zipCode)}>{`Got it, thanks! We use your zipcode to estimate your household income. You can update your income and EFC in your profile which improves our financial aid estimates for you.`}</SabrinaMiniBot>
                </div>*/}
                </div>
              </div >
            );
          }
          }
          continueDisabled={({ values }) => values.zipCode == null}
          onContinue={formik => formik.submitForm()}
          continueText={'Continue'}
          onSubmit={async values => {
            await this.props.updateProfile(
              {
                accountType: values.accountType,
                studentYear: values.studentYear,
                zipCodeId: (values.zipCode && values.zipCode.id) || null
              },
              this.props.initialValues
            );

            await this.props.refetchProfile();
            onContinue();
          }}
          initialValues={{
            accountType: this.props.initialValues.accountType,
            studentYear: this.props.initialValues.studentYear,
            zipCode: null,
            zipCodeQuery: null
          }}
        />
      );

    const validateCollegeSelection: FieldValidator<ICollegesFormFields> = (values, errors) => {
      if (!values.firstCollege) {
        errors.firstCollege = 'You must specify a college.';
      }
      return errors;
    };

    const collegesOnboardingCard = (visibleState: ESteppedWizardStepVisibleState) => (
      <RegistrationCard<ICollegesFormFields>
        visibleState={visibleState}
        progressAmount={80}
        validateForm={fields => composeValidators(fields, {}, validateCollegeSelection)}
        heading={headerSize => (
          <>
            <Heading
              size={headerSize}
              text={"Enter a college you're considering to get started."}
              className={'mt0'}
            />
          </>
        )}
        onboardingCardContent={({
          values,
          errors,
          touched,
          setFieldValue: sFV,
          setFieldTouched
        }) => {
          const setFieldValue = (field: string, value: any) => {
            sFV(field, value);
            setFieldTouched(field);
          };

          return (
            <div>
              <div className="mt2 mt4-ns mh0 mh3-ns mh5-ns flex flex-column flex-row justify-center flex-wrap flex-nowrap-ns">
                <div className="flex-grow-1 mb1 mb3-ns mh1 mh3-ns mw6" data-testid={SignupCollegeField}>
                  <Text className="mt0 mb2 fw7 t-medium black">Choose a college</Text>
                  <this.props.firstSearchCollegesComponent
                    inputValue={values.firstCollegeQuery || ''}
                    onSearch={newQuery => setFieldValue('firstCollegeQuery', newQuery)}
                    selected={values.firstCollege || undefined}
                    onSelected={selected => setFieldValue('firstCollege', selected)}
                    clearable={!values.secondCollege}
                    onClear={() => setFieldValue('firstCollege', null)}
                  />
                  <Text type={ETextType.Caption}>
                    {touched.firstCollegeQuery && errors.firstCollege}
                  </Text>
                  {/* <FormFieldSelect name={'applicationStatus'} label={''} required={false} value={cellProps.value} onSelect={newStatus => {
                    if (props.onChangeApplicationStatus) { props.onChangeApplicationStatus(cellProps.original.id, newStatus as ECollegeApplicationStatus) }
                    if (props.onRemove && newStatus === ECollegeApplicationStatus.NotAttending) { props.onRemove({ id: cellProps.original.id, name: cellProps.original.collegeInfo.collegeName }) }
                  }}>
                    { Object.keys(ECollegeApplicationStatus).map(key => (
                      <option value={ECollegeApplicationStatus[key]}>{ ECollegeApplicationStatus[key] }</option>
                    )) }
                  </FormFieldSelect> */}
                </div>
              </div>
              {/*<div className={'relative w-100 flex justify-end mt2'}>
                <SabrinaMiniBot open={Boolean(values.firstCollege && values.secondCollege)}>OK, great. We’ll start your
                  college list with personalized prices based on our data.</SabrinaMiniBot>
              </div>*/}
            </div >
          );
        }
        }
        continueDisabled={({ values }) => !Boolean(values.firstCollege)}
        onContinue={formik => formik.submitForm()}
        continueText={'Finish'}
        onSubmit={async values => {
          await this.props.addToList(values.firstCollege!.id);
          this.props.onCompletedSignup();
        }}
        initialValues={{
          firstCollege: null,
          firstCollegeQuery: null,
          secondCollege: null,
          secondCollegeQuery: null
        }}
      />
    );

    const personalizeOnboardingCard = (visibleState: ESteppedWizardStepVisibleState) => (
      <RegistrationCard<IPersonalizeProfileFormFields>
        visibleState={visibleState}
        progressAmount={66}
        heading={headerSize => (
          <>
            <Heading
              size={headerSize}
              text={"Share your student's GPA and test scores so we can estimate your merit aid."}
              className={'mt0'}
            />
          </>
        )}
        onboardingCardContent={(
          {
            isSubmitting,
            values,
            setFieldValue,
            errors,
            setFieldTouched: sft,
            submitForm,
            submitCount
          },
          collegeList
        ) => {
          const setFieldTouched = (fieldName: string) => {
            sft(fieldName);
            submitForm();
          };

          return (
            <div>
              <div className="mt2 mt4-ns w-100">
                <div>
                  <div className="ba br2 b--gray-light ph3">
                    <div className="mv3 mw5">
                      <FormFieldText
                        name={'gpa-score'}
                        label={'GPA'}
                        required={false}
                        value={values.gradePointAverage || ''}
                        errorMessage={errors.gradePointAverage}
                        onBlur={() => setFieldTouched('gradePointAverage')}
                        onChange={value => setFieldValue('gradePointAverage', value)}
                        testId={SignupGPAField}
                      />
                      <Text className="t-small i mt2 mb0">
                        Enter your GPA as it appears on your transcript (weighted or unweighted).
                      </Text>
                    </div>
                    <div className="flex flex-row nl3 nr3 mv1 mv3-ns">
                      <div className="w-third mh3">
                        <FormFieldNumber
                          name={'act-score'}
                          label={'ACT'}
                          required={false}
                          value={values.actScore || undefined}
                          errorMessage={errors.actScore}
                          onBlur={() => setFieldTouched('actScore')}
                          onChange={value => setFieldValue('actScore', value)}
                          testId={SignupACTField}
                        />
                      </div>
                      <div className="w-third mh3">
                        <FormFieldNumber
                          name={'sat-score'}
                          label={'SAT'}
                          required={false}
                          value={values.satScore || undefined}
                          errorMessage={errors.satScore}
                          onBlur={() => setFieldTouched('satScore')}
                          onChange={value => setFieldValue('satScore', value)}
                          testId={SignupSATField}
                        />
                      </div>
                      <div className="w-third mh3">
                        <FormFieldNumber
                          name={'psat-score'}
                          label={'PSAT'}
                          required={false}
                          value={values.psatScore || undefined}
                          errorMessage={errors.psatScore}
                          onBlur={() => setFieldTouched('psatScore')}
                          onChange={value => setFieldValue('psatScore', value)}
                          testId={SigunupPSATField}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
        onContinue={({ submitForm }) => submitForm()}
        continueDisabled={({ values }) => !values.satScore && !values.actScore && !values.psatScore}
        onSubmit={async values => {
          await this.props.updateProfile(
            {
              actScore: values.actScore,
              gradePointAverage: values.gradePointAverage,
              psatScore: values.psatScore,
              satScore: values.satScore
            },
            this.props.initialValues
          );
          await this.props.refetchProfile();
          this.props.refetchOnboardingColleges();
          this.props.onContinue();
        }}
        validateForm={values =>
          composeValidators(
            values,
            {},
            academicInfoValidator('satScore', 'actScore', 'psatScore'),
            commonValidations.sat('satScore'),
            commonValidations.act('actScore'),
            commonValidations.psat('psatScore')
          )
        }
        continueText={'Continue'}
        initialValues={this.props.initialValues}
      />
    );

    const registrationOnboardingCard = (visibleState: ESteppedWizardStepVisibleState) => (
      <RegistrationCard<IRegistrationFormFields>
        visibleState={visibleState}
        progressAmount={0}
        heading={`Sign up for personalized advice about paying for college.`}
        onboardingCardContent={({ values, setFieldValue, errors, touched, setFieldTouched }) => (
          <div className={"flex flex-column flex-row-l justify-center-l items-stretch ph5-l pt4 pt5-l "}>
            <div className={"flex-grow-1"}>
              <div className={"ml4 mr4 ml5-ns mr5-ns ml0-l mr5-l"}>
                <div>
                  <FormFieldText
                    name={'first-name'}
                    label={'First Name'}
                    required={true}
                    value={values.firstName || ''}
                    errorMessage={(touched.firstName && errors.firstName) || undefined}
                    onBlur={() => setFieldTouched('firstName')}
                    onChange={value => setFieldValue('firstName', value)}
                    testId={SignupFirstNameField}
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
                    testId={SignupLastNameField}
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
                    testId={SignupEmailField}
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
                    testId={SignupPasswordField}
                  />
                </div>
              </div>
            </div>
            <div className={"dn db-l mh4 br br1 b--gray-light"} />
            <div className={"dn db-l w-40"}>
              {<SignUpInformation {...this.props} />}
              {/*<div className={'mt3 mt5-l ml2 ml4-l'}>
            <Testimonial
              author={{ name: 'K., Maryland' }}
              Wrapper={'div'}
              testimonialTextClassName={"gray-dim"}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              We appreciate your personal attention, advice, and guidance! Kathryn is off to
              Fordham!
            </Testimonial>
            <Testimonial
              author={{ name: 'L., Vermont' }}
              Wrapper={'div'}
              testimonialTextClassName={"gray-dim"}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              We got another $8,200 from RIT! Thank you for your help!
            </Testimonial>
          </div>*/}
            </div>
          </div>
        )}
        continueDisabled={({ values }) =>
          !Boolean(values.firstName && values.lastName && values.emailAddress && values.password)
        }
        onContinue={({ submitForm }) => submitForm()}
        continueText={'Create Account'}
        onSubmit={async (values, { setFieldError }) => {
          const { firstName, lastName, emailAddress, password } = values;

          await this.props.updateProfile(
            {
              firstName,
              lastName
            },
            this.props.initialValues
          );

          const { errors } = await this.props.signup(emailAddress!, password!);

          await window.analytics.track('Email Provided (2.5)');

          if (errors !== null && errors.length > 0) {
            for (const error of errors) {
              switch (error) {
                case SignupError.InvalidEmailAddress:
                  setFieldError(
                    'emailAddress',
                    'Your email address is invalid or an account with that email already exists.'
                  );
                  break;
                case SignupError.PasswordNotComplexEnough:
                  setFieldError('password', 'Your password must be at least six characters.');
                  break;
              }
            }

            return;
          }

          if (this.props.token) {
            await this.props.applyProduct(this.props.token)
            await window.analytics.track('Item Purchased');
            await window.analytics.track(`Edmit Product Purchased - ${normalizeId(this.props.productToApply)}`)
          }

          this.props.onContinue();
        }}
        validateForm={values =>
          composeValidators(
            values,
            {},
            commonValidations.firstName('firstName'),
            commonValidations.lastName('lastName'),
            commonValidations.emailAddress('emailAddress'),
            commonValidations.password('password')
          )
        }
        initialValues={this.props.initialValues}
      />
    );

    return (
      <PageContainer className="pv5-l mh0 ">
        <SteppedWizardWrapper<ERegistrationStepNew>
          activeStep={this.props.activeStep}
          steps={[
            {
              render: ({ visibleState }) => registrationOnboardingCard(visibleState),
              step: ERegistrationStepNew.Registration,
              name: "registration"
            },
            {
              render: ({ visibleState }) => newPersonTypeAndZipCodeOnboardingCard(visibleState),
              step: ERegistrationStepNew.PersonTypeAndZip,
              name: "demographics"
            },
            {
              render: ({ visibleState }) => personalizeOnboardingCard(visibleState),
              step: ERegistrationStepNew.Personalize,
              name: "personalize"
            },
            {
              render: ({ visibleState }) => collegesOnboardingCard(visibleState),
              step: ERegistrationStepNew.Colleges,
              name: "colleges"
            }
          ]}
          initialLoading={this.props.loading}
          className={"mt5-l"}
        />
      </PageContainer>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(OnboardingPageNew) as typeof OnboardingPageNew;
