import * as React from 'react';

import { ProductCard } from '../../../components/molecules/product-card';
import { hexBlue, hexGrayDim, hexGrayLight } from '@edmit/component-library/src/components/atoms/colors';
import DetailedIcon, { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import Banner from '@edmit/component-library/src/components/atoms/banner';
import { normalizeId } from '@edmit/component-library/src/lib/models';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID, EDMIT_PLUS_MONTHLY_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { PurchaseState, PricingLabel, PurchaseToggle, usePurchaseModal, } from '../../../connectors/organisms/modal-purchase';
import { FREE } from '../../../hooks/paywall';


const productA = normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID);
const productB = normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID);


export const PricingLabelForProduct: React.FC<{ productId: string }> = (props) => {
  switch (props.productId) {
    case productA:
      return <PricingLabel cost={'$10'} interval={'per month'} subtext={'plus a $30 one-time fee'} allBlack />;
    case productB:
      return <PricingLabel cost={'$99'} interval={'per year'} subtext={'30% off'} subtextAbove />;
    default:
      return null;
  }
}

const PricingPage: React.FC<PurchaseState & { mini?: boolean }> = props => {
  const { plans } = props;

  React.useEffect(
    () => {
      props.setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
    }, []
  )

  const options = plans
    .filter(p => p.id === FREE)
    .map(p => {
      return (
        <ProductCard
          logoUrl={null}
          key={p.id}
          product={p}
          isCurrentPlan={false}
          ctaText={`Get ${p.name}`}
          ctaLoading={false}
          href={'/signup'}
          hrefTarget={'_parent'}
          onCallToActionClicked={() => null}
          mini={props.mini}
        />
      );
    });

  const productId = props.selectedProductId && normalizeId(props.selectedProductId);

  const edmitGuaranteeBanner = (
    <Banner
      messageText={
        <div className={'flex justify-center items-center mv3'}>
          <div className={'f3 lh-title mr2 tl'}>
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

  const product = plans.filter(
    (plan) => productId && normalizeId(plan.id) === normalizeId(productId)
  )[0]

  const labelForProduct = productId && <PricingLabelForProduct productId={productId} />

  const table = (
    <div className="flex flex-column flex-row-l justify-center content-center items-center items-start-l">
      {options}
      {product && (
        <div className="flex flex-column">
          <ProductCard
            logoUrl={null}
            key={product.id}
            product={product}
            isCurrentPlan={false}
            ctaText={`Get ${product.name}`}
            ctaLoading={false}
            href={`/purchase/${product.id}`}
            hrefTarget={'_parent'}
            onCallToActionClicked={() => null}
            pricingShown={!labelForProduct}
            pricing={labelForProduct || <span />}
            mini={props.mini}
          />
          <PurchaseToggle {...props} />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={'mh3 mb4'}>{edmitGuaranteeBanner}</div>
      <div>{table}</div>
    </>
  );
};

export const WiredPricingPage: React.FC = props => {
  const state = usePurchaseModal();

  const mini = window.location.search.indexOf("mini") > -1

  return (
    <>
      <PricingPage {...state} mini={mini} />
    </>
  );
};
