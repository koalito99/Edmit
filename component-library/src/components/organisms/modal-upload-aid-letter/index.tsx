import * as React from 'react';
import Modal from '../../molecules/modal';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import FormFieldCurrency from '../../atoms/form/form-field-currency';
import FormFieldFile from '../../atoms/form/form-field-file';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import { Formik } from 'formik';
import { composeValidators } from '../../../lib/forms';
import { AppealsAmountField, AppealsSubmitButton } from '../../../../../client/src/testIds/ids';

export interface IUploadAidLetterModalViewModel {
  college: {
    name: string;
  };
  isOpen: boolean;
}

export interface IUploadAidLetterModalActions {
  onSubmit: (values: { aidAmount: number | null; aidLetter: File | null }) => void;
  onCancel: () => void;
}

type UploadAidLetterModalProps = IUploadAidLetterModalViewModel & IUploadAidLetterModalActions;

const UploadAidLetterModal = (props: UploadAidLetterModalProps) => (
  <Modal
    maxWidth={480}
    modalHeadingText={
      <>
        <Heading
          size={EHeadingSize.H4}
          text={'Add your financial aid details for'}
          className={'white mt0 mb2'}
        />
        <Heading size={EHeadingSize.H3} text={props.college.name} className={'white mv0'} />
      </>
    }
    onClose={props.onCancel}
    onClickOut={props.onCancel}
    isOpen={props.isOpen}
  >
    <Formik<{
      aidAmount: number | null;
      aidLetter: File | null;
    }>
      initialValues={{
        aidAmount: null,
        aidLetter: null
      }}
      validate={values =>
        composeValidators(values, {}, (vals, err) => {
          if (vals.aidAmount === null) {
            err.aidAmount = 'Aid amount is required';
          }

          return err;
        })
      }
      onSubmit={(values, formikActions) => {
        props.onSubmit({
          aidAmount: values.aidAmount,
          aidLetter: values.aidLetter
        });
      }}
    >
      {({ values, errors, submitForm, setFieldValue }) => (
        <>
          <div className="bg-offwhite ph2 pv3 pa4-ns">
            <Text className="mt0 tc">
              Tell us how much you received in grants and scholarships.
            </Text>
            <div className="tc">
              <div className="mw5 center">
                <FormFieldCurrency
                  testId={AppealsAmountField}
                  name={'aid-award-amount'}
                  label={''}
                  value={values.aidAmount || undefined}
                  placeholder={0}
                  required={false}
                  className={'tc'}
                  onChange={newValue => setFieldValue('aidAmount', newValue)}
                  errorMessage={errors.aidAmount}
                />
              </div>
              <Text className="t-small i mb4">
                To compare accurately, don't include loans (you'll have to pay those back!) or work study.
              </Text>
              <Text className="t-small i mb4">
                Want a second opinion on your letter and whether it's fair? Upload it here (include all of the pages, especially the ones that show your costs). We'll personally review it for you and reach out to answer any questions you have.
              </Text>
              <FormFieldFile
                name={'upload-fin-aid-letter'}
                label={''}
                value={values.aidLetter}
                onChange={newValue => setFieldValue('aidLetter', newValue)}
                errorMessage={errors.aidLetter}
              />
            </div>
          </div>
          <div className="bg-gray-light ph2 ph4-ns pv2 pv3-ns br2 br-bottom">
            <div className="flex flex-row justify-between items-center content-center">
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
                text={'Cancel'}
                onClick={props.onCancel}
              />
              <FormSubmit
                testId={AppealsSubmitButton}
                buttonSize={EButtonSize.Medium}
                submitState={ESubmitState.Default}
                defaultText={'Submit'}
                submittedText={'Submitted'}
                succeededText={'Succeeded'}
                failedText={'Failed'}
                onClick={submitForm}
              />
            </div>
          </div>
        </>
      )}
    </Formik>
  </Modal>
);

export default UploadAidLetterModal;
