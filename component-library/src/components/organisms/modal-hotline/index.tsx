import * as React from 'react';
import Modal from '../../molecules/modal';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

export interface IHotlineModalViewModel {
  isOpen: boolean;
  edmitPlusUser: boolean;
}

export interface IHotlineModalActions {
  onClose: () => void;
  onUpgrade: () => void;
  onConsult: () => void;
  onAskQuestion: () => void;
}

type HotlineModalProps = IHotlineModalViewModel & IHotlineModalActions;

const HotlineModal = (props: HotlineModalProps) => {
  return (
    <Modal maxWidth={480} onClose={props.onClose} onClickOut={props.onClose} isOpen={props.isOpen}>
      <div className="pa4">
        <div>
          <Text className="mt0 mb2 fw7 t-medium">
            {!props.edmitPlusUser
              ? 'Expert advice about the dollars & cents of college.'
              : 'What questions do you have? We’re standing by!'}
          </Text>
          <Text className="mv0 t-medium">
            {!props.edmitPlusUser
              ? 'Upgrade for unlimited Q&A via email or chat, or access to affordable phone consultations (starting at $30).'
              : 'Get unlimited answers via chat and email (free); you can also schedule a  phone consultation ($30 for 30 min).'}
          </Text>
        </div>
        <div className={'pt4 flex flex-column flex-row-ns items-center'}>
          {!props.edmitPlusUser ? (
            <Button
              size={EButtonSize.Large}
              type={EButtonType.Primary}
              text={'Upgrade'}
              className={'w-100'}
              onClick={props.onUpgrade}
            />
          ) : (
            <>
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={'Ask a Question'}
                className={'mr1-ns mb2 w-100 w-auto-ns'}
                onClick={() => {
                  window.location.hash = '#hotline-bot';
                  setTimeout(() => {
                    window.location.hash = '';
                  }, 500);
                }}
              />
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={'Schedule a Consult'}
                className={'mb2 w-100 w-auto-ns'}
                onClick={props.onConsult}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HotlineModal;
