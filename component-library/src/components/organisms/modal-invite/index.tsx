import * as React from 'react';
import Modal from '../../molecules/modal';
import Text, { ETextType } from '../../atoms/typography/text';
import DetailedIcon, { EDetailedIconName } from '../../atoms/icon-detailed';
import FormFieldText from '../../atoms/form/form-field-email';
import FormFieldEmail from '../../atoms/form/form-field-email';
import { EButtonSize } from '../../atoms/button';
import { Formik } from 'formik';
import { composeValidators, FieldValidator } from '../../../lib/forms';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import Toast from '../../atoms/toast';
import { EIconName } from '../../atoms/icon';
import { hexCrimson } from '../../atoms/colors';

interface IInviteFormFields {
  accountType: 'student' | 'parent' | 'other' | null;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
}

export interface IInviteModalViewModel {
  isOpen: boolean;
  initialValues?: IInviteFormFields;
}

export interface IInviteModalActions {
  onClose: () => void;
  onInvite: (values: { [P in keyof IInviteFormFields]: NonNullable<IInviteFormFields[P]> }) => void;
}

type InviteModalProps = IInviteModalViewModel & IInviteModalActions;

const validateAccountType: FieldValidator<IInviteFormFields> = (values, errors) => {
  if (!values.accountType) {
    errors.accountType = 'You must specify an account type.';
  }
  return errors;
};

const validateFirstName: FieldValidator<IInviteFormFields> = (values, errors) => {
  if (!values.firstName) {
    errors.firstName = 'Enter a first name.';
  }
  if (values.firstName && values.firstName.length < 2) {
    errors.firstName = 'Enter a first name.';
  }
  return errors;
};

const validateLastName: FieldValidator<IInviteFormFields> = (values, errors) => {
  if (!values.lastName) {
    errors.lastName = 'Enter a last name.';
  }
  if (values.lastName && values.lastName.length < 2) {
    errors.lastName = 'Enter a last name.';
  }
  return errors;
};

const validateEmailAddress: FieldValidator<IInviteFormFields> = (values, errors) => {
  if (!values.emailAddress) {
    errors.emailAddress = 'Enter an email address.';
  }
  if (values.emailAddress && values.emailAddress.length < 4) {
    errors.emailAddress = 'Enter a valid email address.';
  }
  return errors;
};

const InviteModal = (props: InviteModalProps) => (
  <Modal
    maxWidth={640}
    modalHeadingText={`Give a month, get a month!`}
    onClose={props.onClose}
    onClickOut={props.onClose}
    isOpen={props.isOpen}
  >
    <Formik<IInviteFormFields>
      initialValues={
        props.initialValues || {
          accountType: null,
          emailAddress: null,
          firstName: null,
          lastName: null
        }
      }
      onSubmit={async (values, { setSubmitting }) => {
        if (props.onInvite) {
          setSubmitting(true);
          await props.onInvite({
            accountType: values.accountType!,
            emailAddress: values.emailAddress!,
            firstName: values.firstName!,
            lastName: values.lastName!
          });
          setSubmitting(false);
        }
      }}
      validate={values =>
        composeValidators(
          values,
          {},
          validateAccountType,
          validateFirstName,
          validateLastName,
          validateEmailAddress
        )
      }
      render={formikProps => {
        const {
          values,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          submitForm,
          errors,
          touched
        } = formikProps;

        return (
          <div className="bg-offwhite pa3 pa4-ns br2 br-bottom flex flex-column items-center">
            <Toast
              messageText={`Invite someone to Edmit and you'll both get a month of Edmit Plus free!`}
              iconName={EIconName.Gift}
              backgroundColor={hexCrimson}
              className="nl3 nr3 nt2 nt3-ns mb3"
            />
            <Text className="tc mt0 mb4">
              Please select who you want to invite and fill out the form below.
            </Text>
            <div className="center w-100 mw6">
              <div>
                <div className="flex flex-column flex-row w-100 nl1 nr1">
                  <div
                    style={{ minWidth: 0, flexBasis: 0 }}
                    className={`mb2 mb0-ns flex-grow-1 bg-white ba bw1 b--gray-light br2 pointer hover-b--crimson hover-shadow-button pv1 pv2-ns ph2 mh1 tc ${
                      values.accountType === 'student' ? 'b--crimson ' : 'b--gray-light'
                    }`}
                    onClick={() => setFieldValue('accountType', 'student')}
                  >
                    <DetailedIcon name={EDetailedIconName.UserStudent} width={60} />
                    <Text className="mv0">Student</Text>
                  </div>
                  <div
                    style={{ minWidth: 0, flexBasis: 0 }}
                    className={`mb2 mb0-ns flex-grow-1 bg-white ba bw1 b--gray-light br2 pointer hover-b--crimson hover-shadow-button pv1 pv2-ns ph2 mh1 tc ${
                      values.accountType === 'parent' ? 'b--crimson ' : 'b--gray-light'
                    }`}
                    onClick={() => setFieldValue('accountType', 'parent')}
                  >
                    <DetailedIcon name={EDetailedIconName.UserParent} width={60} />
                    <Text className="mv0">Parent</Text>
                  </div>
                  <div
                    style={{ minWidth: 0, flexBasis: 0 }}
                    className={`mb2 mb0-ns flex-grow-1 bg-white ba bw1 b--gray-light br2 pointer hover-b--crimson hover-shadow-button pv1 pv2-ns ph2 mh1 tc ${
                      values.accountType === 'other' ? 'b--crimson ' : 'b--gray-light'
                    }`}
                    onClick={() => setFieldValue('accountType', 'other')}
                  >
                    <DetailedIcon name={EDetailedIconName.UserOther} width={60} />
                    <Text className="mv0">Other</Text>
                  </div>
                </div>
                {errors.accountType && <Text type={ETextType.Caption}>{errors.accountType}</Text>}
              </div>
              <div className="mt2 mt4-ns">
                <FormFieldText
                  name={'first-name'}
                  label={'First Name'}
                  required={true}
                  value={values.firstName || ''}
                  errorMessage={(touched.firstName && errors.firstName) || undefined}
                  onBlur={() => setFieldTouched('firstName')}
                  onChange={value => {
                    setFieldTouched('firstName');
                    setFieldValue('firstName', value);
                  }}
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
                  onChange={value => {
                    setFieldTouched('lastName');
                    setFieldValue('lastName', value);
                  }}
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
                  onChange={value => {
                    setFieldTouched('emailAddress');
                    setFieldValue('emailAddress', value);
                  }}
                />
              </div>
            </div>
            <FormSubmit
              buttonSize={EButtonSize.Large}
              defaultText={'Send invitation'}
              submittedText={'Sending invitation'}
              succeededText={'Sent invitation'}
              failedText={'Failed to send invitation'}
              submitState={isSubmitting ? ESubmitState.Submitted : ESubmitState.Default}
              onClick={submitForm}
            />
          </div>
        );
      }}
    />
  </Modal>
);

export default InviteModal;
