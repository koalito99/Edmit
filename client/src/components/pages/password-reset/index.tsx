import * as React from 'react';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Card from '@edmit/component-library/src/components/atoms/card';
import { EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { Formik } from 'formik';
import { commonValidations, composeValidators, FieldValidator } from '@edmit/component-library/src/lib/forms';
import { isEmpty } from '@edmit/component-library/src/lib/typescript';

export interface IPasswordResetPageActions {
  resetPassword: (oldPassword: string) => Promise<void>;
}

export interface IPasswordResetPageViewModel {
  resetPasswordError: string | null;
}

interface IPasswordResetFormFields {
  newPassword: string;
  newPasswordConfirmation: string;
}

type PasswordResetPageProps = IPasswordResetPageActions & IPasswordResetPageViewModel;

const PasswordResetPage: React.SFC<PasswordResetPageProps> = props => {
  const validateNewPasswordConfirmation: FieldValidator<IPasswordResetFormFields> = (
    values,
    errors
  ) => {
    if (values.newPasswordConfirmation !== values.newPassword) {
      errors.newPasswordConfirmation = 'Passwords must be the same.';
    }

    return errors;
  };

  return (
    <div className="pv4 pv5-l center mw6 ph3 tc">
      <Card className="pa4">
        <Formik<IPasswordResetFormFields>
          initialValues={{
            newPassword: '',
            newPasswordConfirmation: ''
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validate={values =>
            composeValidators(
              values,
              {},
              commonValidations.password('newPassword'),
              validateNewPasswordConfirmation
            )
          }
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await props.resetPassword(values.newPassword);
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
                <Heading size={EHeadingSize.H3} text={'Reset Your Password'} className="mt0 mb2" />
                <div>
                  <div className="tl mv4">
                    <FormFieldPassword
                      name={'newPassword'}
                      label={'New Password'}
                      value={values.newPassword}
                      placeholder={''}
                      required={true}
                      errorMessage={errors.newPassword}
                      onBlur={() => setFieldTouched('newPassword')}
                      onChange={value => setFieldValue('newPassword', value)}
                    />
                  </div>
                  <div className="tl mv4">
                    <FormFieldPassword
                      name={'newPasswordConfirmation'}
                      label={'Confirm Your New Password'}
                      value={values.newPasswordConfirmation}
                      placeholder={''}
                      required={true}
                      errorMessage={errors.newPasswordConfirmation}
                      onBlur={() => setFieldTouched('newPasswordConfirmation')}
                      onChange={value => setFieldValue('newPasswordConfirmation', value)}
                      onKeyDown={(key, keyCode) => {
                        if (keyCode === 13) {
                          submitForm();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <FormSubmit
                      buttonSize={EButtonSize.Large}
                      submitState={
                        isSubmitting
                          ? ESubmitState.Submitted
                          : submitCount > 0
                            ? isEmpty(errors) && !props.resetPasswordError
                              ? ESubmitState.Succeeded
                              : ESubmitState.Failed
                            : ESubmitState.Default
                      }
                      defaultText={'Set New Password'}
                      submittedText={'Setting New Password'}
                      succeededText={'New Password Set'}
                      failedText={'Failed to Set New Password'}
                      onClick={() => submitForm()}
                    />
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

export default PasswordResetPage;
