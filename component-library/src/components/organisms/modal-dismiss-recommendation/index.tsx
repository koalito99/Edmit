import * as React from 'react';
import Modal from '../../molecules/modal';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import { Formik } from 'formik';
import { FormikErrors } from '../../../lib/forms';

export interface IDismissRecommendationModalViewModel {
  reasons: Array<{
    title: string;
  }>;
  isOpen: boolean;
}

export interface IDismissRecommendationModalActions {
  onDismiss: (reason: string) => void;
  onClose: () => void;
}

type DismissRecommendationModalProps = IDismissRecommendationModalViewModel &
  IDismissRecommendationModalActions;

// tslint:disable:jsx-no-lambda

const DismissRecommendationModal = (props: DismissRecommendationModalProps) => {
  return (
    <Modal
      maxWidth={620}
      modalHeadingText={`Help us improve our recommendations`}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onClickOut={props.onClose}
    >
      <Formik<{ reason: string | null }>
        validate={values => {
          const errors: FormikErrors<{ reason: string | null }> = {};
          if (!values.reason) {
            errors.reason = 'Select a reason to hide recommendation.';
          }
          return errors;
        }}
        initialValues={{
          reason: null
        }}
        onSubmit={values => {
          if (values.reason) {
            props.onDismiss(values.reason);
          }
        }}
        render={({ submitForm, errors, setFieldValue }) => {
          return (
            <div className="bg-offwhite ph2 pv3 pa4-ns tc br2 br-bottom">
              <Heading
                className="mt0 mb3 t-medium"
                size={EHeadingSize.H4}
                text={`Please select a reason why you dismissed this college:`}
              />
              <div className="tl mb3">
                <fieldset className="input-reset pa0 ma0 bn">
                  {props.reasons.map((reason: any, index: any, values: any) => (
                    <div
                      className="flex flex-row items-center relative mb2 bg-white ba bw1 b--gray-light br2 hover-b--crimson hover-shadow-button"
                      onClick={() => setFieldValue('reason', reason.title)}
                    >
                      <input
                        className="input-radio pointer flex-shrink-0 absolute left-1"
                        type="radio"
                        id={`recommended-reason-${index}`}
                        name={`recommended-reason`}
                      />
                      <label
                        htmlFor={`recommended-reason-${index}`}
                        className="flex-auto pl3 pv2 pr2 pa3-ns pointer"
                      >
                        <Text style={{ paddingLeft: '1.5rem' }} className="mv0 t-medium">
                          {reason.title}
                        </Text>
                      </label>
                    </div>
                  ))}
                </fieldset>
              </div>
              <p>{errors.reason}</p>
              <Button
                size={EButtonSize.Large}
                type={EButtonType.Primary}
                text={`Submit & Close`}
                onClick={() => submitForm()}
              />
            </div>
          );
        }}
      />
    </Modal>
  );
};

export default DismissRecommendationModal;
