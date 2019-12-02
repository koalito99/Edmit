import * as React from 'react';
import ModalContainer from '../../atoms/modal-container';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Icon, { EIconName } from '../../atoms/icon';

export interface IModalViewModel {
  children?: any;
  maxWidth: number;
  maxHeight?: number | string;
  modalHeadingText?: JSX.Element | string;
  isOpen: boolean;

  color?: string;

  style?: React.CSSProperties;
  className?: string;
}

export interface IModalActions {
  onClose: () => any | void;
  onClickOut?: () => void;
}

type ModalProps = IModalViewModel & IModalActions;

const Modal: React.SFC<ModalProps> = props => (
  <ModalContainer
    maxWidth={props.maxWidth}
    maxHeight={props.maxHeight}
    isOpen={props.isOpen}
    onClickOut={props.onClickOut}
    style={props.style}
    className={props.className}
  >
    <div>
      <Icon
        name={EIconName.Close}
        className={'absolute top-0 right-0 pa1 icon-xlarge pointer dim '}
        style={{ color: 'rgba(0, 0, 0, 0.2)' }}
        onClick={props.onClose}
      />
      {props.modalHeadingText && (
        <div className="bg-crimson pa3 ph4-l br2 br--top" style={{ backgroundColor: props.color }}>
          <Heading size={EHeadingSize.H3} text={props.modalHeadingText} className="mv2 white tc" />
        </div>
      )}
      {props.children}
    </div>
  </ModalContainer>
);

export default Modal;
