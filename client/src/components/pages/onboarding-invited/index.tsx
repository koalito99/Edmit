import * as React from 'react';
import withSizes from 'react-sizes';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import { ECollegeStatusMyColleges } from '@edmit/component-library/src/shared';
import SteppedWizardWrapper, {
  ESteppedWizardStepVisibleState
} from '@edmit/component-library/src/components/organisms/wrapper-stepped-wizard-registration';
import { commonValidations, composeValidators, FieldValidator } from '@edmit/component-library/src/lib/forms';
import OnboardingCard from '@edmit/component-library/src/components/organisms/card-onboarding';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';

export enum EOnboardingInvitedStep {
  Password,
  Personalize
}

export interface IOnboardingInvitedPageViewModel {
  activeStep: EOnboardingInvitedStep;

  inviter: {
    firstName: string;
    lastName: string;
  };

  selectedZipCode: ISearchZipCodesOption | null;
  searchZipCodeComponent: JSX.Element;

  collegeOptions: Array<{
    admissionUnlikely: boolean;
    collegeInfo: {
      collegeAbbreviation: string;
      collegeLogoSrc: string | null;
      collegeName: string;
    };
    collegeIsActive: boolean;
    collegeStatusMyColleges: ECollegeStatusMyColleges;
    edstimatePrice: number;
    firstYearEarnings: number;
    fitScore: number;
    id: string;
    stickerPrice: number;
  }>;

  loading: boolean;
}

export interface IOnboardingInvitedPageActions {
  onContinue: () => void;
  onPrevious: () => void;
  goToMyColleges: () => void;
  updateProfile: (
    values: Partial<
      IPasswordFormFields & IPersonalizeFormFields & { zipCode: ISearchZipCodesOption | null }
    >,
    shouldRefetch?: boolean
  ) => Promise<void>;
  completeInvite: (
    input: { inviterPermissionsType: 'view' | 'edit' | 'no-access' }
  ) => Promise<void>;
  addToList: (collegeId: string, shouldRefetch?: boolean) => Promise<void>;
}

type OnboardingInvitedPageProps = IOnboardingInvitedPageViewModel &
  IOnboardingInvitedPageActions & {
    isMobile: boolean;
  };

interface IPasswordFormFields {
  password: string | null;
}

interface IPersonalizeFormFields {
  gpaScore: string | null;
  satScore: number | null;
  actScore: number | null;
  psatScore: number | null;
}

class OnboardingInvitedPage extends React.Component<OnboardingInvitedPageProps> {
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

    const headerSize = this.props.isMobile ? EHeadingSize.H4 : EHeadingSize.H3;

    const passwordOnboardingCard = (visibleState: ESteppedWizardStepVisibleState) => (
      <OnboardingCard<IPasswordFormFields>
        visibleState={visibleState}
        progressAmount={25}
        validateForm={fields =>
          composeValidators(fields, {}, commonValidations.password('password'))
        }
        onboardingCardContent={({ values, errors, setFieldValue, setFieldTouched, touched }) => (
          <div>
            <Heading
              size={headerSize}
              text={`${this.props.inviter.firstName} ${
                this.props.inviter.lastName
                } invited you to join Edmit.`}
              className="mt0 mb2 tc"
            />
            <Text className="mt0 mb4 tc measure-wide center">
              To claim your account, we have a few questions to get you started. This will only take
              a couple minutes.
            </Text>
            <div className="center mw6">
              <FormFieldPassword
                className="mb4"
                name={'password'}
                label={'Set your password'}
                required={true}
                value={values.password || ''}
                errorMessage={(touched.password && errors.password) || undefined}
                onBlur={() => setFieldTouched('password')}
                onChange={async value => {
                  setFieldTouched('password');
                  setFieldValue('password', value);
                }}
              />
            </div>
          </div>
        )}
        onContinue={formik => formik.submitForm()}
        continueText={'Continue'}
        onSubmit={async values => {
          await this.props.updateProfile({
            password: values.password
          });
          await this.props.completeInvite({
            inviterPermissionsType: 'no-access'
          });
          onContinue();
        }}
        initialValues={{
          password: null
        }}
      />
    );

    const validateSatScore: FieldValidator<IPersonalizeFormFields> = (values, errors) => {
      if (!values.satScore) {
        return errors;
      }
      if (values.satScore % 10 !== 0) {
        errors.satScore = 'SAT score must be a multiple of 10.';
      }
      if (values.satScore < 400) {
        errors.satScore = 'SAT score must be over 400.';
      }
      if (values.satScore > 1600) {
        errors.satScore = 'SAT score must be below 1600.';
      }
      return errors;
    };

    const validateActScore: FieldValidator<IPersonalizeFormFields> = (values, errors) => {
      if (!values.actScore) {
        return errors;
      }
      if (values.actScore < 10) {
        errors.satScore = 'ACT score must be over 10.';
      }
      if (values.actScore > 36) {
        errors.satScore = 'ACT score must be below 36.';
      }
      return errors;
    };

    const validatePsatScore: FieldValidator<IPersonalizeFormFields> = (values, errors) => {
      if (!values.psatScore) {
        return errors;
      }
      if (values.psatScore % 10 !== 0) {
        errors.psatScore = 'PSAT score must be a multiple of 10.';
      }
      if (values.psatScore < 320) {
        errors.satScore = 'PSAT score must be over 320.';
      }
      if (values.psatScore > 1520) {
        errors.satScore = 'PSAT score must be below 1520.';
      }
      return errors;
    };


    const personalizeOnboardingCard = (visibleState: ESteppedWizardStepVisibleState) => (
      <OnboardingCard<IPersonalizeFormFields>
        visibleState={visibleState}
        progressAmount={75}
        validateForm={fields => composeValidators(fields, {}, validateSatScore, validateActScore, validatePsatScore)}
        onboardingCardContent={({ values, errors, setFieldValue, touched, setFieldTouched }) => (
          <div>
            <Heading size={headerSize} text={`Personalize your profile.`} className="mt0 mb2 tc" />
            <Text className="mt0 mb4 tc measure-wide center">
              Help us personalize your profile by providing the information below.
            </Text>
            <div className="center mw6">
              <div className="mv3">
                <FormFieldText
                  name={'gpa-score'}
                  label={'GPA'}
                  required={false}
                  value={values.gpaScore || ''}
                  errorMessage={(touched.gpaScore && errors.gpaScore) || undefined}
                  onBlur={() => setFieldTouched('gpaScore')}
                  onChange={value => {
                    setFieldTouched('gpaScore');
                    setFieldValue('gpaScore', value);
                  }}
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
                    errorMessage={(touched.actScore && errors.actScore) || undefined}
                    onBlur={() => setFieldTouched('actScore')}
                    onChange={value => {
                      setFieldTouched('actScore');
                      setFieldValue('actScore', value);
                    }}
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
                    onChange={value => {
                      setFieldTouched('satScore');
                      setFieldValue('satScore', value);
                    }}
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
                    onChange={value => {
                      setFieldTouched('psatScore');
                      setFieldValue('psatScore', value);
                    }}
                  />
                </div>
              </div>
              <div className="mv3">
                <Text className="mv0 fw7 t-medium black">Home Zip Code</Text>
                <div className="form-field">{this.props.searchZipCodeComponent}</div>
              </div>
            </div>
          </div>
        )}
        onContinue={formik => formik.submitForm()}
        continueText={'Continue'}
        onSubmit={async values => {
          await this.props.updateProfile(
            {
              actScore: values.actScore,
              gpaScore: values.gpaScore,
              psatScore: values.psatScore,
              satScore: values.satScore,
              zipCode: this.props.selectedZipCode
            },
            true
          );
          this.props.goToMyColleges();
        }}
        initialValues={{
          actScore: null,
          gpaScore: null,
          psatScore: null,
          satScore: null
        }}
      />
    );

    return (
      <PageContainer className="pv5-l mh0">
        <SteppedWizardWrapper<EOnboardingInvitedStep>
          activeStep={this.props.activeStep}
          // order={[EOnboardingInvitedStep.Password, EOnboardingInvitedStep.Personalize]}
          initialLoading={this.props.loading}
          steps={[
            {
              render: ({ visibleState }) => passwordOnboardingCard(visibleState),
              step: EOnboardingInvitedStep.Password
            },
            {
              render: ({ visibleState }) => personalizeOnboardingCard(visibleState),
              step: EOnboardingInvitedStep.Personalize
            }
          ]}
        />
      </PageContainer>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 960
});

export default withSizes(mapSizesToProps)(OnboardingInvitedPage) as React.SFC<
  Subtract<OnboardingInvitedPageProps, { isMobile: any }>
>;
