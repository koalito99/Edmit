import * as React from 'react';
import ModalContainer from '../../atoms/modal-container';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

export interface IDialogViewModel {
  header: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  clickoutEnabled?: boolean;
  isOpen: boolean;
}

export interface IDialogActions {
  onConfirm?: () => any | void;
  onCancel?: () => any | void;
}

type DialogProps = IDialogViewModel & IDialogActions;

const Dialog: React.SFC<DialogProps> = props => {
  return (
    <ModalContainer
      maxWidth={480}
      isOpen={props.isOpen}
      onClickOut={props.clickoutEnabled ? props.onCancel : undefined}
    >
      <div className="bg-white br2">
        <div className="pa3 mb1">
          <Heading size={EHeadingSize.H4} text={props.header} className="mt0 mb2"/>
          <Text className="mv0 t-medium">{props.text}</Text>
        </div>
        <div className="bg-offwhite bt b--gray-light br2 br--bottom pa3">
          <div className="tr nl2 nr2">
            {props.onCancel && (
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
                text={props.cancelButtonText || 'cancel'}
                spacing={true}
                onClick={props.onCancel}
              />
            )}
            {props.onConfirm && (
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={props.confirmButtonText || 'confirm'}
                spacing={true}
                onClick={props.onConfirm}
              />
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Dialog;
