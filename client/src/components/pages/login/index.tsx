import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Text, { ETextType } from '@edmit/component-library/src/components/atoms/typography/text';
import TextLink from '@edmit/component-library/src/components/atoms/link-text';
import Card from '@edmit/component-library/src/components/atoms/card';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import FormFieldEmail from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { Formik } from 'formik';
import { LoginError } from '../../../graphql/generated';
import { composeValidators, FieldValidator } from '@edmit/component-library/src/lib/forms';
import { isEmpty } from '@edmit/component-library/src/lib/typescript';
import { LoginEmailField, LoginPasswordField, LoginSubmitButton } from '../../../testIds/ids';

export interface ILoginPageActions {
  login: (emailAddress: string, password: string) => Promise<void>;
  requestPasswordReset: (emailAddress: string) => Promise<void>;
}

export interface ILoginPageViewModel {
  error: LoginError | null;
}

interface ILoginFormFields {
  emailAddress: string;
  password: string;
  resettingPassword: boolean;
}

type LoginPageProps = ILoginPageActions & ILoginPageViewModel;

const LoginPage: React.SFC<LoginPageProps> = props => {
  const errorMessageMap = {
    [LoginError.InvalidCredentials]: 'Your credentials are invalid.',
    [LoginError.Other]: 'An error occurred logging in.'
  };

  const errorMessage = props.error ? errorMessageMap[props.error] : null;

  const validateEmailAddress: FieldValidator<ILoginFormFields> = (values, errors) => {
    if (values.emailAddress === '') {
      errors.emailAddress = 'An email address is required.';
    }
    return errors;
  };

  const validatePassword: FieldValidator<ILoginFormFields> = (values, errors) => {
    if (values.password === '' && !values.resettingPassword) {
      errors.password = 'A password is required.';
    }

    return errors;
  };

  return (
    <div className="pv4 pv5-l center mw6 ph3 tc">
      <Card className="pa4">
        <Formik<ILoginFormFields>
          initialValues={{
            emailAddress: '',
            password: '',
            resettingPassword: false
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validate={values => composeValidators(values, {}, validateEmailAddress, validatePassword)}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (!values.resettingPassword) {
              await props.login(values.emailAddress, values.password);
            } else {
              await props.requestPasswordReset(values.emailAddress);
            }
            setSubmitting(false);
          }}
          render={({
            values,
            errors,
            setFieldTouched,
            setFieldValue,
            submitForm,
            isSubmitting,
            submitCount,
            resetForm
          }) => {
            return (
              <>
                <Heading
                  size={EHeadingSize.H3}
                  text={!values.resettingPassword ? 'Login to Edmit' : 'Reset Your Password'}
                  className="mt0 mb2"
                />
                <Text className="mv0">
                  Don't have an Edmit account?{' '}
                  <TextLink to="signup" className="nowrap">
                    Create an account
                  </TextLink>
                  .
                </Text>
                <div>
                  <div className="tl mv4">
                    <FormFieldEmail
                      name={'email'}
                      testId={LoginEmailField}
                      label={'Email Address'}
                      value={values.emailAddress}
                      placeholder={''}
                      required={true}
                      errorMessage={errors.emailAddress}
                      onBlur={() => setFieldTouched('emailAddress')}
                      onChange={value => setFieldValue('emailAddress', value)}
                      onKeyDown={(key, keyCode) => {
                        if (keyCode === 13) {
                          submitForm();
                        }
                      }}
                    />
                    {values.resettingPassword && (
                      <Text type={ETextType.Caption}>
                        Please enter your email address. We will send you an email to reset your
                        password.
                      </Text>
                    )}
                  </div>
                  {!values.resettingPassword && (
                    <div className="tl mv4">
                      <FormFieldPassword
                        name={'password'}
                        label={'Password'}
                        testId={LoginPasswordField}
                        value={values.password}
                        placeholder={''}
                        required={true}
                        errorMessage={errors.password}
                        onBlur={() => setFieldTouched('password')}
                        onChange={value => setFieldValue('password', value)}
                        onKeyDown={(key, keyCode) => {
                          if (keyCode === 13) {
                            submitForm();
                          }
                        }}
                      />
                      <div className="mt2 f6">
                        <a
                          className={'no-underline fw7 crimson hover-crimson-dark pointer'}
                          onClick={() => {
                            resetForm({
                              emailAddress: values.emailAddress,
                              password: values.password,
                              resettingPassword: true
                            });
                          }}
                          target="_blank"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  )}
                  {errorMessage}
                  <div>
                    {!values.resettingPassword ? (
                      <span data-testid={LoginSubmitButton}>
                        <FormSubmit
                          buttonSize={EButtonSize.Large}
                          submitState={
                            isSubmitting
                              ? ESubmitState.Submitted
                              : submitCount > 0
                                ? isEmpty(errors) && !errorMessage
                                  ? ESubmitState.Succeeded
                                  : ESubmitState.Failed
                                : ESubmitState.Default
                          }
                          defaultText={'Log In'}
                          submittedText={'Logging in'}
                          succeededText={'Logged in'}
                          failedText={'Failed to login'}
                          onClick={() => submitForm()}
                        />
                      </span>
                    ) : (
                        <div className={'flex justify-between'}>
                          <Button
                            text={'Go Back'}
                            size={EButtonSize.Medium}
                            type={EButtonType.Secondary}
                            onClick={() => {
                              resetForm({
                                emailAddress: values.emailAddress,
                                password: values.password,
                                resettingPassword: false
                              });
                            }}
                          />
                          <FormSubmit
                            buttonSize={EButtonSize.Large}
                            submitState={
                              isSubmitting
                                ? ESubmitState.Submitted
                                : submitCount > 0
                                  ? isEmpty(errors) && !errorMessage
                                    ? ESubmitState.Succeeded
                                    : ESubmitState.Failed
                                  : ESubmitState.Default
                            }
                            defaultText={'Reset Password'}
                            submittedText={'Sending Request'}
                            succeededText={'Request Sent'}
                            failedText={'Failed to send Reset Request'}
                            onClick={() => submitForm()}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
