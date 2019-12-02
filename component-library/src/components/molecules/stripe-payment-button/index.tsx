import * as React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { EButtonSize } from '../../atoms/button';

const stripeToken = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (stripeToken === null || stripeToken === undefined) {
  throw Error('unexpected - missing stripe token');
}

interface IStripePaymentButtonViewModel {
  amountInCents: number;
  name: string;
  description: string;
  emailAddress: string;
  text: JSX.Element | string;
  purchaseProduct: (token: string, name: string, emailAddress: string) => void;
  purchasing?: boolean;

  color?: string;

  style?: React.CSSProperties;
  className?: string;
}

type StripePaymentButtonProps = IStripePaymentButtonViewModel;

const StripePaymentButton: React.SFC<StripePaymentButtonProps> = props => {
  return (
    <span>
      <StripeCheckout
        allowRememberMe={false}
        amount={props.amountInCents}
        email={props.emailAddress}
        name={props.name}
        description={props.description}
        stripeKey={stripeToken}
        token={(token: { id: string; email: string }) =>
          props.purchaseProduct(token.id, token.email, token.email)
        }
      >
        <FormSubmit
          defaultText={props.text}
          submittedText={'Charging...'}
          succeededText={'Charged.'}
          failedText={'Transaction Failed.'}
          buttonSize={EButtonSize.Large}
          submitState={props.purchasing ? ESubmitState.Submitted : ESubmitState.Default}

          color={props.color}
          style={props.style}
          className={props.className}
        />
      </StripeCheckout>
    </span>
  );
};

export default StripePaymentButton;
