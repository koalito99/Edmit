import * as React from 'react';
import Modal from '@edmit/component-library/src/components/molecules/modal';
import { ProductCard } from '@edmit/component-library/src/components/molecules/product-card';
import { FREE, PaywallContext, usePaywall } from '../../../hooks/paywall';
import { hexBlue, hexGrayDim, hexGrayLight } from '@edmit/component-library/src/components/atoms/colors';
import DetailedIcon, { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import {
  Nullable,
  ProductId,
  StripeToken,
  useBooleanState,
  useNullableState,
  normalizeId
} from '@edmit/component-library/src/lib/models';
import Banner from '@edmit/component-library/src/components/atoms/banner';
import Slider from 'react-slick';
import StripePaymentLogo from '../../../assets/stripe/secure-stripe-payment-logo-v3.png';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import { EButtonSize } from '@edmit/component-library/src/components/atoms/button';
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  injectStripe,
  PostalCodeElement,
  ReactStripeElements
} from 'react-stripe-elements';
import { doNothingFn, IProduct } from '@edmit/component-library/src/shared'
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID, EDMIT_PLUS_MONTHLY_PRODUCT_ID } from '@edmit/component-library/src/lib/payment'
import FormFieldToggle from '@edmit/component-library/src/components/atoms/form/form-field-toggle'

type OnProductSelectedFn = (id: ProductId) => void;

interface IPurchaseModalOwnProps { }

type Props = State;
type WiredProps = IPurchaseModalOwnProps;

type CheckoutFormProps = ReactStripeElements.InjectedStripeProps & {
  purchaseProduct: (stripeToken: StripeToken) => Promise<void>;
  couponCode: Nullable<string>;
  setCouponCode: (v: string) => void;
  setPaymentErrorShown: (v: boolean) => void;
  paymentErrorShown: boolean;
};

enum EStripeField {
  Card,
  Expiry,
  CVC,
  PostalCode
}

interface IStripeFieldBooleanMap {
  [EStripeField.Card]?: boolean;
  [EStripeField.Expiry]?: boolean;
  [EStripeField.CVC]?: boolean;
  [EStripeField.PostalCode]?: boolean;
}

const normalizeProductId = (id: ProductId) => id.toLowerCase();

const productA = normalizeProductId(EDMIT_PLUS_MONTHLY_PRODUCT_ID);
const productB = normalizeProductId(EDMIT_PLUS_ANNUAL_PRODUCT_ID);

const CheckoutForm: React.FC<CheckoutFormProps> = props => {
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

  const submitPayment = async (formEvent: React.FormEvent) => {
    if (!props.stripe) throw Error('unexpected - stripe not injected');

    formEvent.preventDefault();

    setSubmitting(true);

    const { token, error } = await props.stripe.createToken();

    if (!token || !token.id || error) throw Error(`unexpected - payment error - ${error}`);

    try {
      props.setPaymentErrorShown(false);
      await props.purchaseProduct(token.id);
      setSubmitting(false);
      await window.analytics.track('Item Purchased');

      window.location.href = '/profile';
      return Promise.resolve();
    } catch (error) {
      props.setPaymentErrorShown(true);
      setSubmitting(false);
      console.log(error);
      return Promise.reject();
    }
  };

  return (
    <form onSubmit={submitPayment}>
      <div className="pv2">
        <img src={StripePaymentLogo} alt="Stripe Payment Info" width={300} />
      </div>

      <div className="pv2">
        <Text className="mv1 fw7 t-medium black">
          Credit card number
          <span className="crimson">*</span>
        </Text>
        <CardNumberElement
          {...stripeElementProps}
          onChange={e => setFieldComplete(EStripeField.Card, e.complete)}
        />
      </div>

      <div className="pv2 w-50">
        <Text className="mv1 fw7 t-medium black">
          Expiration date
          <span className="crimson">*</span>
        </Text>
        <CardExpiryElement
          {...stripeElementProps}
          onChange={e => setFieldComplete(EStripeField.Expiry, e.complete)}
        />
      </div>

      <div className="pv2 w-50">
        <Text className="mv1 fw7 t-medium black">
          CVC
          <span className="crimson">*</span>
        </Text>
        <CardCVCElement
          {...stripeElementProps}
          onChange={e => setFieldComplete(EStripeField.CVC, e.complete)}
        />
      </div>

      <div className="pv2 w-50">
        <Text className="mv1 fw7 t-medium black">
          Billing zip code
          <span className="crimson">*</span>
        </Text>
        <PostalCodeElement
          {...stripeElementProps}
          onChange={e => setFieldComplete(EStripeField.PostalCode, e.complete)}
        />
      </div>

      <div className="pv2">
        <Text className="mv1 fw7 t-medium black">Coupon code</Text>
        <input
          className={
            'db w-100 pa1 input-reset bg-transparent gray-dim pv1 ba bw1 shadow-none b--gray-light t-medium lato outline-0'
          }
          onChange={e => props.setCouponCode(e.target.value)}
          value={props.couponCode || ''}
          required={false}
        />
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
      </div>
    </form>
  );
};

const InjectedStripeForm = injectStripe(CheckoutForm);

const PrevArrow: React.SFC<any> = props => {
  const { onClick, currentSlide } = props;

  if (currentSlide !== 0) {
    return (
      <div
        className="flex absolute flex-column items-center justify-center"
        style={{ top: 0, bottom: 0, left: -45, width: 45 }}
        onClick={onClick}
      >
        <span className="icon-carousel gray-muted dim">
          <Icon name={EIconName.ChevronLeft} />
        </span>
      </div>
    );
  } else {
    return null;
  }
};

const NextArrow: React.SFC<any> = props => {
  const { onClick, currentSlide, slideCount } = props;

  if (currentSlide + 1 < slideCount) {
    return (
      <div
        className="flex absolute flex-column items-center justify-center"
        style={{ top: 0, bottom: 0, right: -45, width: 45 }}
        onClick={onClick}
      >
        <span className="icon-carousel gray-muted dim">
          <Icon name={EIconName.ChevronRight} />
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export const PricingLabel: React.FC<{
  cost: React.ReactChild;
  interval: React.ReactChild;
  subtext?: React.ReactChild;
  subtextAbove?: boolean;
  allBlack?: boolean;
}> = props => {
  const subtext = <span className={'db f6 mv0 lh-solid tr relative ' + (!props.allBlack ? 'crimson' : '')} style={{ top: 5 }}>{props.subtext}</span>;

  return (
    <div className={'flex justify-center mb2'}>
      <Text className={'inline-flex'}>
        <span className={'mt2 dib ' + (props.allBlack ? 'black' : '')}>
          {props.subtextAbove && subtext}
          <span className={'db f2'}><span className={'black'}>{props.cost}</span> <span className="f3">{props.interval}</span></span>
          {!props.subtextAbove && subtext}
        </span>
      </Text>
    </div>
  );
};

const PaymentModalBody: React.FC<Props> = props => {
  let pricingLabel: JSX.Element | null = null;

  const productId = props.selectedProductId;

  if (!productId) return null;

  const product = props.products.find(p => p.id === productId);

  if (!product) return null;

  if (product.id === productA) {
    pricingLabel = <PricingLabel cost={'$10'} interval={'per month'} subtext={'plus a $30 one-time fee'} allBlack />;
  } else if (product.id === productB) {
    pricingLabel = <PricingLabel cost={'$99'} interval={'per year'} subtext={'30% off'} subtextAbove />;
  }

  return (
    <>
      <div>
        <Text className={'mt0'}>Our secure checkout takes just two minutes.</Text>
      </div>
      <div className="flex">
        <div className="w-100 w-50-l">
          <Elements>
            <>
              <InjectedStripeForm {...props} />
              {props.paymentErrorShown && (
                <p className="red">There was an error processing your payment.</p>
              )}
            </>
          </Elements>
        </div>
        <div className="dn db-ns w-100 w-60-l mr4-ns ml4-ns">
          {pricingLabel}
          <ProductCard
            logoUrl={null}
            product={product}
            isCurrentPlan={true}
            ctaText={`Get ${product.name}`}
            onCallToActionClicked={doNothingFn}
          />
          <PurchaseToggle {...props} />
        </div>
      </div>
    </>
  );
};

export const PurchaseToggle: React.FC<{
  setSelectedProductId: (id: Nullable<string>) => any;
  selectedProductId: Nullable<string>;
}> = props => {
  const [selected, setSelected] = React.useState(props.selectedProductId);
  const toggle = () => {
    switch (selected && normalizeId(selected)) {
      case productA:
        setSelected(productB);
        break;
      case productB:
        setSelected(productA);
        break;
      default:
        throw Error('undefined product ID');
    }
  };

  React.useEffect(() => {
    props.setSelectedProductId(selected);
  }, [selected]);

  return (
    <div className={'mb3'}>
      <div className={'flex justify-center items-center'}>
        <div className="tr w-40 mt1 pr2 lh-copy">
          <p className={'mv0'}>Monthly</p>
        </div>
        <FormFieldToggle
          name="toggle"
          label={''}
          checked={selected === productB}
          optionLeftLabel={''}
          optionRightLabel={''}
          onClick={() => toggle()}
          className={'w-20'}
          color={'bg-silver'}
        />
        <div className="tl w-40 mt1 pl2 lh-copy">
          <p className={'mv0'}>Annual{'  '}<span className={'f6 crimson'}>30% off</span></p>
        </div>
      </div>
    </div>
  );
};
const PurchaseModalBody: React.FC<Props> = props => {
  const { appliedProductIds, plans } = props;

  const options = plans.map(product => {
    const isCurrentPlan =
      appliedProductIds.includes(product.id) || (product.id === FREE && !props.hasEdmitPlus);

    return (
      <ProductCard
        logoUrl={null}
        key={product.id}
        product={product}
        isCurrentPlan={isCurrentPlan}
        ctaText={`Get ${product.name}`}
        ctaLoading={false}
        onCallToActionClicked={() => props.onProductSelected(product.id)}
      />
    );
  });

  const slider = (
    <div
      className="w-100 center pt2 pb3 pb4-ns"
      style={{
        paddingLeft: 45,
        paddingRight: 45
      }}
    >
      <Slider
        infinite={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {options
          .map((o, index) => (
            <div key={index} className={'w-100'}>
              {o}
            </div>
          ))
          .reverse()}
      </Slider>
    </div>
  );

  const table = (
    <div className="flex flex-column flex-row-l justify-center content-center items-center items-start-l">
      {options}
    </div>
  );

  return (
    <>
      <div className="dn-ns">{slider}</div>
      <div className="dn db-m db-l">{table}</div>
    </>
  );
};

enum EPurchaseModalState {
  PlanSelection,
  PaymentInformation,
  Success
}

type SetCurrentProductIndexFn = (index: number) => void;

interface IPurchaseModalOwnState {
  plans: IProduct[];
  mode: EPurchaseModalState;
  onProductSelected: OnProductSelectedFn;
  selectedProductId: Nullable<ProductId>;
  currentProductIndex: number;
  setCurrentProductIndex: SetCurrentProductIndexFn;
  purchaseProduct: (token: StripeToken) => Promise<void>;
  couponCode: Nullable<string>;
  setCouponCode: (v: string) => void;
  paymentErrorShown: boolean;
  setPaymentErrorShown: (v: boolean) => void;
}

type State = PaywallContext & IPurchaseModalOwnState;

export type PurchaseState = State;

export const usePurchaseModal = (): State => {
  const paywall = usePaywall();
  const { selectedProductId } = paywall;
  const [mode, setMode] = React.useState(EPurchaseModalState.PlanSelection);
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);
  const [couponCode, setCouponCode] = useNullableState<string>(null);
  const [paymentErrorShown, setPaymentErrorShown] = useBooleanState();

  React.useEffect(() => {
    if (!!selectedProductId) {
      setMode(EPurchaseModalState.PaymentInformation);
    }
  }, [selectedProductId]);

  const onProductSelected = (id: ProductId) => {
    paywall.setSelectedProductId(id);
  };

  const whitelist = [paywall.freeProductId, EDMIT_PLUS_MONTHLY_PRODUCT_ID, EDMIT_PLUS_ANNUAL_PRODUCT_ID].map(normalizeProductId);

  const plans = paywall.products
    .filter(p => !!p.period)
    .filter(p => whitelist.includes(normalizeProductId(p.id)));

  const reset = () => {
    setPaymentErrorShown(false);
    setMode(EPurchaseModalState.PlanSelection);
    paywall.setSelectedProductId(null);
  };

  const closePlanSelectionModal = () => {
    paywall.closePlanSelectionModal();
    reset();
  };

  const purchaseProduct = async (stripeToken: StripeToken) => {
    setPaymentErrorShown(false);
    if (!selectedProductId) throw Error('unexpected - no product selected to purchase');
    return paywall.purchaseProduct(selectedProductId, stripeToken, couponCode);
  };

  return {
    ...paywall,
    setPaymentErrorShown,
    plans,
    paymentErrorShown,
    mode,
    onProductSelected,
    closePlanSelectionModal,
    selectedProductId,
    currentProductIndex,
    purchaseProduct,
    setCurrentProductIndex,
    setCouponCode,
    couponCode
  };
};

const PurchaseModal: React.FC<Props> = props => {
  const edmitGuaranteeBanner = (
    <Banner
      messageText={
        <div className={'flex justify-center items-center'}>
          <div className={'f4 f3-ns lh-title mr2 tl'}>
            The average Edmit family saves <span style={{ color: hexBlue }}>$5k</span> in college
            costs
          </div>
          <DetailedIcon name={EDetailedIconName.Guarantee} width={225} />
        </div>
      }
      rounded
      backgroundColor={hexGrayLight}
      foregroundColor={hexGrayDim}
      closeButtonColor={hexGrayDim}
    />
  );

  const body = {
    [EPurchaseModalState.PlanSelection]: (
      <>
        <div className={'mb2'}>{edmitGuaranteeBanner}</div>
        <PurchaseModalBody {...props} />
      </>
    ),
    [EPurchaseModalState.PaymentInformation]: <PaymentModalBody {...props} />
  };

  return (
    <Modal
      maxWidth={1000}
      modalHeadingText={`Upgrade${
        props.planSelectionReason ? ` ${props.planSelectionReason}` : ''
        }`}
      onClose={props.closePlanSelectionModal}
      isOpen={props.planSelectionModalOpen}
    >
      <div className={`bg-offwhite br2 br-bottom`}>
        <div className={'w-100 pa3'}>{body[props.mode]}</div>
      </div>
    </Modal>
  );
};

export const WiredPurchaseModal: React.FC<WiredProps> = props => {
  const state = usePurchaseModal();

  return <PurchaseModal {...state} />;
};

export default PurchaseModalBody;
