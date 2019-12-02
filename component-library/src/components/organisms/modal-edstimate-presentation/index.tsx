import * as React from 'react';
import Modal from '../../molecules/modal';
import EdstimatePresentation, { IEdstimatePresentationData } from '../edstimate-presentation'

type IEdstimatePresentationModalViewModel = IEdstimatePresentationData & {
  isOpen: boolean;
  style?: React.CSSProperties;
  className?: string;
}

interface IEdstimatePresentationModalActions {
  onClose: () => any | void;
}

type EdstimatePresentationModalProps = IEdstimatePresentationModalViewModel &
  IEdstimatePresentationModalActions;

const EdstimatePresentationModal: React.FC<EdstimatePresentationModalProps> = props => {
  const { isOpen, onClose, style, className, ...otherProps } = props;

  return (
    <Modal
      maxWidth={900}
      maxHeight={800}
      // modalHeadingText={`Welcome to Edmit Plus`}
      onClose={onClose}
      onClickOut={onClose}
      isOpen={isOpen}
      style={style}
      className={className}
    >
      <EdstimatePresentation {...otherProps} singleOptionOpen={true} className="bg-offwhite pa3 pa4-ns br2 br-bottom" />
    </Modal>
  );
};

export default EdstimatePresentationModal;
