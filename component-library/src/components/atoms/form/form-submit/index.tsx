import * as React from 'react';

import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../button';
import { EIconName } from '../../icon';

export enum ESubmitState {
  Default = 'Default',
  Submitted = 'Submitted',
  Succeeded = 'Succeeded',
  Failed = 'Failed'
}

export interface IFormSubmitViewModel {
  defaultText: JSX.Element | string;
  submittedText: JSX.Element | string;
  succeededText: JSX.Element | string;
  failedText: string;
  disabled?: boolean;
  onClick?: () => any | void;
  buttonSize: EButtonSize;
  submitState: ESubmitState;

  color?: string;
  style?: React.CSSProperties;
  className?: string;

  testId?: string;
}

type FormSubmitProps = IFormSubmitViewModel;

const FormSubmit: React.SFC<FormSubmitProps> = props => {
  const { defaultText, submittedText, succeededText, failedText } = props;

  let buttonText: JSX.Element | string = '';
  let buttonIcon;

  switch (props.submitState) {
    case ESubmitState.Default:
      buttonText = defaultText;
      buttonIcon = undefined;
      break;
    case ESubmitState.Submitted:
      buttonText = submittedText;
      buttonIcon = EIconName.Loading;
      break;
    case ESubmitState.Succeeded:
      buttonText = succeededText;
      buttonIcon = EIconName.Success;
      break;
    case ESubmitState.Failed:
      buttonText = failedText;
      buttonIcon = EIconName.Error;
      break;
    default:
      break;
  }

  return (
    <Button
      testId={props.testId}
      size={props.buttonSize}
      type={EButtonType.Primary}
      onClick={props.onClick}
      disabled={props.disabled}
      icon={
        buttonIcon && {
          className: props.submitState === ESubmitState.Submitted ? 'icon-animated-loading' : '',
          name: buttonIcon,
          position: EButtonIconPosition.Right
        }
      }
      text={buttonText}

      color={props.color}
      style={props.style}
      className={props.className}
    />
  );
};

export default FormSubmit;
