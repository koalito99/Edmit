import * as React from 'react';
import Modal from '../../molecules/modal';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

export interface IPostOnboardingModalViewModel {
  isOpen: boolean;
  maxColleges: number;
}

export interface IPostOnboardingModalActions {
  onClose: () => any | void;
}

type PostOnboardingModalProps = IPostOnboardingModalViewModel & IPostOnboardingModalActions;

const PostOnboardingModal: React.FC<PostOnboardingModalProps> = props => (
  <Modal
    maxWidth={640}
    modalHeadingText={`Great! You can now view your report.`}
    onClose={props.onClose}
    onClickOut={props.onClose}
    isOpen={props.isOpen}
  >
    <div className="bg-offwhite pa3 pa4-ns br2 br-bottom flex flex-column items-center">
      <Text className="tc mt0 mb4">
        {props.maxColleges > 1 ? `You can now compare up to ${props.maxColleges} colleges to find your best fit.` : `You can now view one college in your report`}
      </Text>
      <Button
        type={EButtonType.Primary}
        size={EButtonSize.Large}
        text={'View Report'}
        className="w5"
        onClick={props.onClose}
      />
    </div>
  </Modal>
);

export default PostOnboardingModal;
