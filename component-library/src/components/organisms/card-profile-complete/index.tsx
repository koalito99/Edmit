import * as React from 'react';
import Card from '../../atoms/card';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import ProgressCircle from '../../atoms/progress-circle';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import FormFieldNumber from '../../atoms/form/form-field-number';
import FormFieldText from '../../atoms/form/form-field-text';
import FormFieldToggle from '../../../components/atoms/form/form-field-toggle';
import FormFieldCurrency from '../../atoms/form/form-field-currency';
import { Formik } from 'formik';
import { EProfileCompleteFieldType } from '../../../shared'

export interface ICompleteProfileCardViewModel {
  values: {
    [name: string]: {
      type: EProfileCompleteFieldType;
      label: string | null;
      description: string | null;
    };
  };
  activeFieldIndex: number;
  profileProgress: number; // 0 - 1
}

export interface ICompleteProfileCardActions {
  onContinue: () => void;
  onSkip: () => void;
  onDismiss: () => void;
}

type CompleteProfileCardProps = ICompleteProfileCardViewModel & ICompleteProfileCardActions;

const CompleteProfileCard = (props: CompleteProfileCardProps) => {
  const activeFieldName = Object.keys(props.values)[props.activeFieldIndex];
  const activeField = props.values[activeFieldName];
  const activeFieldLabel = activeField.label || activeFieldName;

  return (
    <Formik<{ [P in keyof ICompleteProfileCardViewModel['values']]: any | null }>
      initialValues={props.values.main}
      onSubmit={values => {
        // HEY
        props.onContinue();
      }}
      render={mainForm => {
        let formField: JSX.Element | null = null;

        switch (activeField.type) {
          case 'STRING':
            formField = (
              <FormFieldText
                name={activeFieldName}
                label={activeFieldLabel}
                value={mainForm.values[activeFieldName] || ''}
                placeholder={''}
                required={false}
                onChange={value => mainForm.setFieldValue(activeFieldName, value)}
                onBlur={() => mainForm.setFieldTouched(activeFieldName)}
              />
            );
            break;
          case 'BOOLEAN':
            formField = (
              <FormFieldToggle
                name={activeFieldLabel}
                label={activeFieldLabel}
                checked={mainForm.values[activeFieldName]}
                optionLeftLabel={''}
                optionRightLabel={''}
                onClick={() =>
                  mainForm.setFieldValue(activeFieldName, !mainForm.values[activeFieldName])
                }
              />
            );
            break;
          case 'NUMBER':
            formField = (
              <FormFieldNumber
                name={activeFieldLabel}
                label={activeFieldLabel}
                value={mainForm.values[activeFieldName] || undefined}
                placeholder={0}
                required={false}
                onChange={value => mainForm.setFieldValue(activeFieldName, value)}
                onBlur={() => mainForm.setFieldTouched(activeFieldName)}
              />
            );
            break;
          case 'CURRENCY':
            formField = (
              <FormFieldCurrency
                name={activeFieldLabel}
                label={activeFieldLabel}
                value={mainForm.values[activeFieldName] || undefined}
                placeholder={0}
                required={false}
                onChange={value => mainForm.setFieldValue(activeFieldName, value)}
                onBlur={() => mainForm.setFieldTouched(activeFieldName)}
              />
            );
            break;
        }

        return (
          <Card className="w-100">
            <div className="flex flex-row items-center justify-between pa3">
              <span className="flex-auto mr4">
                {props.profileProgress === 1 ? (
                  <div>
                    <Heading
                      size={EHeadingSize.H4}
                      text={'Your Edmit profile is complete!'}
                      className="mv0"
                    />
                    <Text className="mv0 t-medium">
                      When we add more fields, you'll see them appear on your Profile.
                    </Text>
                  </div>
                ) : (
                  <div>
                    <Heading
                      size={EHeadingSize.H4}
                      text={'Complete your profile'}
                      className="mv0"
                    />
                    <Text className="mv0 t-medium">
                      Let us know more about you so we can improve the accuracy of Edstimates™ we
                      show you.
                    </Text>
                  </div>
                )}
              </span>
              {props.profileProgress === 1 && (
                <Button
                  size={EButtonSize.Medium}
                  type={EButtonType.Secondary}
                  text={'Dismiss'}
                  spacing={true}
                  onClick={props.onDismiss}
                />
              )}
              <span style={{ flex: '0 0 48px', maxWidth: '48px', maxHeight: '48px' }}>
                <ProgressCircle height={32} progressPercentage={props.profileProgress * 100} />
              </span>
            </div>
            {props.profileProgress !== 1 && (
              <div className="flex-l flex-row-l items-center-l pa3 bt b-solid b--gray-light">
                <div className="flex-auto mb3 mb0-l mr3-l">
                  {formField}
                  <Text className="t-small i mt2 mb0">{activeField.description}</Text>
                </div>
                <div className="nr2">
                  <FormSubmit
                    buttonSize={EButtonSize.Medium}
                    submitState={ESubmitState.Default}
                    defaultText={'Submit'}
                    submittedText={'Submitted'}
                    succeededText={'Succeeded'}
                    failedText={'Failed'}
                    onClick={() => mainForm.submitForm()}
                  />
                  <Button
                    size={EButtonSize.Medium}
                    type={EButtonType.Secondary}
                    text={'Skip'}
                    spacing={true}
                    onClick={props.onSkip}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      }}
    />
  );
};

export default CompleteProfileCard;
