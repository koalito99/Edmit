import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import { RouteComponentProps } from 'react-router';
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-text';
import FormFieldEmail from '@edmit/component-library/src/components/atoms/form/form-field-email';
import FormFieldPassword from '@edmit/component-library/src/components/atoms/form/form-field-password';
import { useSignup, useUpdateProfile } from '../../../components/pages/report/shared';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  injectStripe,
  PostalCodeElement,
  ReactStripeElements
} from 'react-stripe-elements';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import StripePaymentLogo from '../../../assets/stripe/secure-stripe-payment-logo-v3.png';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import { EAtomicBoolean, ProductId, StripeToken, useAtomicBoolean, normalizeId } from '@edmit/component-library/src/lib/models';
import { PaywallContext, usePaywall } from '../../../hooks/paywall';
import { ProductCard } from '../../../components/molecules/product-card';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID, BCFU_PRODUCT_ID, EDMIT_PLUS_MONTHLY_PRODUCT_ID, EDMIT_PLUS_DCU_PRODUCT_ID, AAACU_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { PricingLabelForProduct } from '../pricing';
import { doNothingFn } from '@edmit/component-library/src/shared';
import { useAuthentication } from '../../../hooks/auth';

enum EStripeField {
  Card,
  Expiry,
  CVC,
  PostalCode
}

type CheckoutFormProps = ReactStripeElements.InjectedStripeProps & {
  paywall: PaywallContext;
} & RouteComponentProps<{ productId: string }>;

interface IStripeFieldBooleanMap {
  [EStripeField.Card]?: boolean;
  [EStripeField.Expiry]?: boolean;
  [EStripeField.CVC]?: boolean;
  [EStripeField.PostalCode]?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = props => {
  const authentication = useAuthentication()

  const updateProfileMutation = useUpdateProfile();
  const signupMutation = useSignup();

  const selectedProductId = props.match.params.productId;

  const [paymentErrorShown, setPaymentErrorShown] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [couponCode, setCouponCode] = React.useState('');

  // const accountId = session.data && session.data.session && session.data.session.account.id

  const existingEmailAddress = authentication.emailAddress

  const existingFirstName = authentication.firstName

  const existingLastName = authentication.lastName

  const { value: accountRegistered, setTrue: setAccountRegistered } = useAtomicBoolean(
    EAtomicBoolean.False
  );

  const purchaseProduct = async (stripeToken: StripeToken) => {
    setPaymentErrorShown(false);
    if (!selectedProductId) throw Error('unexpected - no product selected to purchase');
    return props.paywall.purchaseProduct(selectedProductId, stripeToken, couponCode);
  };

  const register = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    setPaymentErrorShown(false);
    setSubmitting(true);

    if (!props.stripe) throw Error('unexpected - stripe not injected');

    const { token, error } = await props.stripe.createToken();
    if (!token || !token.id || error) throw Error(`unexpected - payment error - ${error}`);

    if (accountRegistered === EAtomicBoolean.False) {
      const signup = await signupMutation.mutate({
        emailAddress: emailAddress || existingEmailAddress,
        password
      });

      if (signup && signup.signup && signup.signup.error) {
        return;
      }

      setAccountRegistered();

      await updateProfileMutation.mutate({
        data: {
          firstName: firstName || existingFirstName,
          lastName: lastName || existingLastName
        }
      });
    }

    try {
      await purchaseProduct(token.id);
      setSubmitting(false);
      await window.analytics.track('Item Purchased');
      await window.analytics.track(`Edmit Product Purchased - ${normalizeProductId(selectedProductId)}`)

      // window.analytics.identify(accountId, {
      //   'edmit_lifecycle_stage': 'Edmit Customer'
      // })

      window.location.href = '/signup';
      return Promise.resolve();
    } catch (error) {
      setPaymentErrorShown(true);
      setSubmitting(false);
      console.log(error);
      return Promise.reject();
    }
  };

  const [complete, setComplete] = React.useState<IStripeFieldBooleanMap>({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  const setFieldComplete = (field: EStripeField, isComplete: boolean) =>
    setComplete({
      ...complete,
      [field]: isComplete
    });

  const stripeElementProps = {
    placeholder: '',
    style: {
      base: {
        fontSize: '13pt',
        color: '#495057'
      }
    },
    className:
      'db w-100 pa1 input-reset bg-transparent gray-dim pv1 ba bw1 shadow-none b--gray-light t-medium lato outline-0'
  };

  const cardInfoComplete =
    complete[EStripeField.Card] &&
    complete[EStripeField.Expiry] &&
    complete[EStripeField.CVC] &&
    complete[EStripeField.PostalCode];

  const loggedIn = !!existingEmailAddress && !!existingFirstName && !!existingLastName;

  return (
    <form onSubmit={register}>
      <div>
        {loggedIn && (
          <div className={"mb4"}>
            <div className={"mb2"}>
              Logged in as {existingFirstName} {existingLastName}
            </div>
            <div>
              <Button
                onClick={() => authentication.logout(window.location.pathname)}
                text={'Sign up for a new account instead'}
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
              />
            </div>
          </div>
        )}
        {!loggedIn && (
          <>
            <div className={'mb4'}>
              <Button
                onClick={() =>
                  (window.location.href = `/login?returnTo=${window.location.pathname}`)
                }
                text={'Login to existing account'}
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
              />
            </div>
            <div className={'flex flex-wrap'}>
              <div className={'w-100 w-50-l pv2 pr0 pr4-l'}>
                <FormFieldText
                  label={'First name'}
                  value={firstName}
                  required={true}
                  onChange={setFirstName}
                  disabled={accountRegistered === EAtomicBoolean.True}
                />
              </div>
              <div className={'w-100 w-50-l pv2 pr0 pr4-l'}>
                <FormFieldText
                  label={'Last name'}
                  value={lastName}
                  required={true}
                  onChange={setLastName}
                  disabled={accountRegistered === EAtomicBoolean.True}
                />
              </div>
              <div className={'w-100 w-50-l pv2 pr0 pr4-l'}>
                <FormFieldEmail
                  label={'Email address'}
                  value={emailAddress}
                  required={true}
                  onChange={setEmailAddress}
                  disabled={accountRegistered === EAtomicBoolean.True}
                />
              </div>
              <div className={'w-100 w-50-l pv2 pr0 pr4-l'}>
                <FormFieldPassword
                  label={'Password'}
                  value={password}
                  required={true}
                  onChange={setPassword}
                  disabled={accountRegistered === EAtomicBoolean.True}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <div className={'w-100 flex-l flex-wrap'}>
          <div className="pv2 flex-grow-1 pr0 pr4-l w-70-l">
            <Text className="mv1 fw7 t-medium black">
              Credit card number
              <span className="crimson">*</span>
            </Text>
            <CardNumberElement
              {...stripeElementProps}
              onChange={e => setFieldComplete(EStripeField.Card, e.complete)}
            />
          </div>

          <div className="pv2 w-50 w-30-l pr0 pr4-l">
            <Text className="mv1 fw7 t-medium black">
              CVC
              <span className="crimson">*</span>
            </Text>
            <CardCVCElement
              {...stripeElementProps}
              onChange={e => setFieldComplete(EStripeField.CVC, e.complete)}
            />
          </div>

          <div className="pv2 w-50 pr0 pr4-l">
            <Text className="mv1 fw7 t-medium black">
              Expiration date
              <span className="crimson">*</span>
            </Text>
            <CardExpiryElement
              {...stripeElementProps}
              onChange={e => setFieldComplete(EStripeField.Expiry, e.complete)}
            />
          </div>

          <div className="pv2 w-50 pr0 pr4-l">
            <Text className="mv1 fw7 t-medium black">
              Billing zip code
              <span className="crimson">*</span>
            </Text>
            <PostalCodeElement
              {...stripeElementProps}
              onChange={e => setFieldComplete(EStripeField.PostalCode, e.complete)}
            />
          </div>
        </div>

        <div className="pv2 w-100 pr0 pr4-l">
          <Text className="mv1 fw7 t-medium black">Coupon code</Text>
          <input
            className={
              'db w-100 input-reset bg-transparent gray-dim pv1 ba bw1 shadow-none b--gray-light t-medium lato outline-0'
            }
            onChange={e => setCouponCode(e.target.value)}
            value={couponCode || ''}
            required={false}
          />
        </div>
      </div>

      <div className="pv2">
        <img src={StripePaymentLogo} alt="Stripe Payment Info" width={300} />
      </div>

      <div className="pt4">
        <FormSubmit
          defaultText={'Complete Purchase'}
          submittedText={'Charging...'}
          succeededText={'Charged.'}
          failedText={'Transaction Failed.'}
          buttonSize={EButtonSize.Large}
          submitState={isSubmitting ? ESubmitState.Submitted : ESubmitState.Default}
          disabled={!cardInfoComplete || isSubmitting}
        />
        {paymentErrorShown && <p className="red">There was an error processing your payment.</p>}
      </div>
    </form>
  );
};

const normalizeProductId = (id: ProductId) => id.toLowerCase();

const InjectedStripeForm = injectStripe(CheckoutForm);

export const WiredPurchasePage: React.FC<RouteComponentProps<{ productId: string }>> = props => {
  const paywall = usePaywall();

  const whitelist = [EDMIT_PLUS_DCU_PRODUCT_ID, AAACU_PRODUCT_ID, BCFU_PRODUCT_ID, paywall.freeProductId, EDMIT_PLUS_MONTHLY_PRODUCT_ID, EDMIT_PLUS_ANNUAL_PRODUCT_ID].map(normalizeProductId);

  const plans = paywall.products
    .filter(p => !!p.period)
    .filter(p => whitelist.includes(normalizeProductId(p.id)));

  const matchingProduct = plans.filter(
    p => normalizeProductId(p.id) === normalizeProductId(props.match.params.productId)
  )[0];

  const labelForProduct = matchingProduct && <PricingLabelForProduct productId={matchingProduct.id} />

  return (
    <>
      <PageContainer>
        <h2>Upgrade to Edmit Plus</h2>
        {matchingProduct && (
          <ProductCard
            logoUrl={matchingProduct.organization && matchingProduct.organization.logoUrl}
            product={matchingProduct}
            isCurrentPlan={true}
            hideCurrentPlanBar={true}
            ctaText={`Get ${matchingProduct.name}`}
            onCallToActionClicked={doNothingFn}
            className={'w-100 db dn-l'}
            style={{ maxWidth: '100%' }}
            mini
            pricingShown={(
              normalizeId(matchingProduct.id) === normalizeId(BCFU_PRODUCT_ID) ||
              normalizeId(matchingProduct.id) === normalizeId(EDMIT_PLUS_DCU_PRODUCT_ID) ||
              normalizeId(matchingProduct.id) === normalizeId(AAACU_PRODUCT_ID)
            )}
            pricing={labelForProduct || <span />}
          />
        )}
        <div className={'flex flex-column flex-row-l justify-between'}>
          <div className={'flex-grow-1'}>
            <Elements>
              <>
                <InjectedStripeForm {...props} paywall={paywall} />
              </>
            </Elements>
          </div>
          <div className={'ml0 ml3-l'}>
            {matchingProduct && (
              <ProductCard
                logoUrl={matchingProduct.organization && matchingProduct.organization.logoUrl}
                product={matchingProduct}
                isCurrentPlan={true}
                hideCurrentPlanBar={true}
                ctaText={`Get ${matchingProduct.name}`}
                onCallToActionClicked={doNothingFn}
                className={'center dn db-l'}
                pricingShown={(
                  normalizeId(matchingProduct.id) === normalizeId(BCFU_PRODUCT_ID) ||
                  normalizeId(matchingProduct.id) === normalizeId(EDMIT_PLUS_DCU_PRODUCT_ID) ||
                  normalizeId(matchingProduct.id) === normalizeId(AAACU_PRODUCT_ID)
                )}
                pricing={labelForProduct || <span />}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
};
