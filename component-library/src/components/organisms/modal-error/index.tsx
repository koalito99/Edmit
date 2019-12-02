import * as React from 'react';
import Modal from '../../molecules/modal';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

export interface IErrorModalViewModel {
  heading: string;
  bodyTitle: string;
  bodyCopy: string;
  buttonText: string;
  isOpen: boolean;
}

export interface IErrorModalActions {
  onClose: () => any | void;
}

type ErrorModalProps = IErrorModalViewModel & IErrorModalActions;

const ErrorModal = (props: ErrorModalProps) => (
  <Modal
    maxWidth={560}
    modalHeadingText={props.heading}
    onClose={props.onClose}
    onClickOut={props.onClose}
    isOpen={props.isOpen}
  >
    <div className="bg-gray-light ph2 pv3 pa4-ns tc br2 br-bottom">
      <Heading size={EHeadingSize.H4} text={props.bodyTitle} className="mt0 mb2" />
      <Text className="mt0 mb3 measure center">{props.bodyCopy}</Text>
      <Button
        size={EButtonSize.Medium}
        type={EButtonType.Primary}
        text={props.buttonText}
        onClick={props.onClose}
      />
    </div>
  </Modal>
);

export default ErrorModal;
