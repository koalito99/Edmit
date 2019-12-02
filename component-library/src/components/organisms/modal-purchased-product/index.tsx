import * as React from 'react';
import Modal from '../../molecules/modal';
import Text from '../../atoms/typography/text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import { EPurchaseProduct } from '../../../lib/payment';

export interface IPurchasedProductModalViewModel {
  product: EPurchaseProduct;
  isOpen: boolean;
}

export interface IPurchasedProductModalActions {
  onClose: () => any | void;
}

type PurchasedProductModalProps = IPurchasedProductModalViewModel & IPurchasedProductModalActions;

const PurchasedProductModal = (props: PurchasedProductModalProps) => (
  <Modal
    maxWidth={640}
    modalHeadingText={`Welcome to Edmit Plus`}
    onClose={props.onClose}
    onClickOut={props.onClose}
    isOpen={props.isOpen}
  >
    <div className="bg-offwhite pa3 pa4-ns br2 br-bottom flex flex-column items-center">
      <Text className="tc mt0 mb4">
        You now have access to all of Edmit as well as our advising network.  Any questions?  You can reach us by email at advisor@edmit.me.
      </Text>
      <Button
        type={EButtonType.Primary}
        size={EButtonSize.Large}
        text={'Return to Edmit'}
        className="w5"
        onClick={props.onClose}
      />
      {props.product === EPurchaseProduct.PREMIUM ? (
        <img src="https://tracking.edvisors.com/aff_goal?a=l&goal_id=145" width="1" height="1" />
      ) : null}
      {props.product === EPurchaseProduct.PLUS_ANNUAL ? (
        <img src="https://tracking.edvisors.com/aff_l?offer_id=1123" width="1" height="1" />
      ) : null}
    </div>
  </Modal>
);

export default PurchasedProductModal;
