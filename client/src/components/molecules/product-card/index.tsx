import * as React from 'react';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Card from '@edmit/component-library/src/components/atoms/card';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID, EPurchaseProduct, BCFU_PRODUCT_ID, EDMIT_PLUS_MONTHLY_PRODUCT_ID, EDMIT_PLUS_DCU_PRODUCT_ID, AAACU_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { Subtract } from '@edmit/component-library/src/lib/typescript';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import { BillingPeriod } from '../../../graphql/generated';
import { normalizeId } from '@edmit/component-library/src/lib/models';
import { hexBlue, hexCrimson, hexGreen } from '@edmit/component-library/src/components/atoms/colors';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import { IProduct, edstimateCopy } from '@edmit/component-library/src/shared';
import EdmitTooltip, { ETooltipType } from '@edmit/component-library/src/components/molecules/tooltip';

const FREE = 'free';

type OnCallToActionClickedFn = () => void;

const PlanOptionTemplate: React.FC<
  Subtract<IPlanOptionProps, { purchaseProduct: any }> & {
    title: React.ReactChild;
    description: React.ReactChild;
    callToAction: string;
    cost: string;
    costTimeframe: string;
    color?: string | null;
    preferredColor?: string;
    callToActionDisabled?: boolean;
    onCallToActionClicked: OnCallToActionClickedFn;
  }
> = props => {
  return (
    <div className={"w-100 mb4 mb0-l mh3-l " + props.className} style={{ maxWidth: 490, ...props.style }}>
      <Card
        className="w-100 h-100 mb3 pt3 pt4-ns flex flex-column justify-between"
        style={
          props.preferredColor
            ? { boxShadow: `0 4px 12px rgba(0, 0, 0, .05), 0 0 0pt 10pt ${props.preferredColor}` }
            : {}
        }
      >
        <div>
          <div className={'ph3 ph4-ns bb b--light-gray pb4'}>
            {props.logoUrl && (
              <div className="tc center w-100 pb3">
                <img style={{ width: "30%" }} src={props.logoUrl} />
              </div>
            )}
            <Heading size={EHeadingSize.H1} text={props.title} className="mt0 mb1 tc" />
            {props.pricingShown && (
              <Text className="mt2 mb4 tc light-gray">
                <span className="merriweather fw4 f3 nl3 mr1">
                  {props.cost && (
                    <>
                      <sup className="f6" style={{ top: '-.5em' }}>
                        $
                    </sup>
                      {props.cost}
                    </>
                  )}
                </span>
                <span className="f5">{props.costTimeframe}</span>
              </Text>
            )}
            {props.pricing}
            <Text className="mt0 mb2 f4 tc">
              {props.description}
            </Text>
          </div>
          {!props.mini &&
            <div className={'bb b--light-gray'}>
              {React.Children.map(props.children, (child, i) => (
                <div
                  key={i}
                  className={`pv1 ph2 mh3 mh4-ns ${
                    i !== React.Children.count(props.children) - 1 ? 'bb b--light-gray' : ''
                    }`}
                >
                  <Text className={'tc'}>{child}</Text>
                </div>
              ))}
            </div>}
        </div>
        {!props.mini && !props.hideCurrentPlanBar && (props.href ? (
          <div className="w-100">
            {props.isCurrentPlan ? (
              <Button
                size={EButtonSize.Large}
                type={EButtonType.Secondary}
                text={'Current Plan'}
                className={'w-100 pv3 mv0'}
                color={props.color || hexCrimson}
                disabled={true}
              />
            ) : (
                <a href={props.href} target={props.hrefTarget}>
                  <Button
                    text={props.callToAction}
                    size={EButtonSize.Large}
                    type={EButtonType.Primary}
                    color={props.color || hexCrimson}
                    className={'w-100 pv3 mv0'}
                  />
                </a>
              )}
          </div>
        ) : (
            <div className="w-100">
              {props.isCurrentPlan ? <Text /> : (
                <Button
                  onClick={props.onCallToActionClicked}
                  text={props.callToAction}
                  size={EButtonSize.Large}
                  type={EButtonType.Primary}
                  color={props.color || hexCrimson}
                  className={'w-100 pv3 mv0'}
                />
              )}
            </div>
          ))}
      </Card>
    </div>
  );
};

const miniFeaturesForProduct = (product: IProduct): Array<{ name: string, tooltip?: string }> => {
  switch (normalizeId(product.id)) {
    case normalizeId(FREE):
      return [
        {
          name: 'Access to admissions and pricing data on over 2,000 colleges'
        }
      ];
    case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
    case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
      return [
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        }
      ];
    default:
      return [];
  }
}

const miniDescriptionForProduct = (product: IProduct): string => {
  switch (normalizeId(product.id)) {
    case normalizeId(FREE):
      return `A FREE report with your personalized ${edstimateCopy}`;
    case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
    case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
      return `Includes a 30-minute telephone consult with an Edmit advisor and unlimited email and chat support`
    default:
      return '';
  }
}

const miniCallToActionForProduct = (product: IProduct): string => {
  switch (normalizeId(product.id)) {
    case normalizeId(FREE):
      return `Try Edmit Free`;
    case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
    case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
      return `Buy Edmit Plus`
    default:
      return '';
  }
}

const featuresForProduct = (product: IProduct): Array<{ name: string, tooltip?: string }> => {
  switch (normalizeId(product.id)) {
    case normalizeId(FREE):
      return [
        {
          name: 'Access to admissions and pricing data on over 2,000 colleges'
        },
        {
          name: 'Personalized merit and financial aid estimates'
        },
        {
          name: 'Comprehensive college cost comparison tool'
        }
      ];
    case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
    case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
      return [
        {
          name: '30-minute phone consult with an Edmit Advisor',
          tooltip: 'Edmit’s professional guidance gives you peace of mind that you’re making the best decisions when it comes to paying for college.'
        },
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        },
        {
          name: 'Personalized merit and financial aid estimates',
          tooltip:
            'Personalized strategy to get more merit and financial aid overall. We’re with you every step of the way.'
        },
        {
          name: 'Comprehensive college cost comparison tool',
          tooltip:
            'Get a 100% personalized college payment plan and preview different monthly budgets to get you there'
        }
      ];
    case normalizeId(BCFU_PRODUCT_ID):
      return [
        {
          name: '30-minute phone consult with an Edmit Advisor',
          tooltip: 'Edmit’s professional guidance gives you peace of mind that you’re making the best decisions when it comes to paying for college.'
        },
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        },
        {
          name: 'Personalized merit and financial aid estimates',
          tooltip:
            'Personalized strategy to get more merit and financial aid overall. We’re with you every step of the way.'
        },
        {
          name: 'Comprehensive college cost comparison tool',
          tooltip:
            'Get a 100% personalized college payment plan and preview different monthly budgets to get you there'
        }
      ];
    case normalizeId(AAACU_PRODUCT_ID):
      return [
        {
          name: "First 6 months free! Then it's just $5 per month - that's a 50% discount. You'll only be billed after your first 6 months and you can cancel any time."
        },
        {
          name: '30-minute phone consult with an Edmit Advisor',
          tooltip: 'Edmit’s professional guidance gives you peace of mind that you’re making the best decisions when it comes to paying for college.'
        },
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        },
        {
          name: 'Personalized merit and financial aid estimates',
          tooltip:
            'Personalized strategy to get more merit and financial aid overall. We’re with you every step of the way.'
        },
        {
          name: 'Comprehensive college cost comparison tool',
          tooltip:
            'Get a 100% personalized college payment plan and preview different monthly budgets to get you there'
        }
      ];
    case normalizeId(EDMIT_PLUS_DCU_PRODUCT_ID):
      return [
        {
          name: '30-minute phone consult with an Edmit Advisor',
          tooltip: 'Edmit’s professional guidance gives you peace of mind that you’re making the best decisions when it comes to paying for college.'
        },
        {
          name: 'Personalized College Reports and Recommendations',
          tooltip:
            'Find the best reach and safety schools for your family’s budget. You’ll understand the value of different colleges, including by specific majors.'
        },
        {
          name: 'Personalized merit and financial aid estimates',
          tooltip:
            'Personalized strategy to get more merit and financial aid overall. We’re with you every step of the way.'
        },
        {
          name: 'Comprehensive college cost comparison tool',
          tooltip:
            'Get a 100% personalized college payment plan and preview different monthly budgets to get you there'
        }
      ];
    default:
      return [];
  }
};

interface IPlanOptionProps {
  isCurrentPlan: boolean;
  hideCurrentPlanBar?: boolean;
  currentlyPurchasing?: boolean;
  purchaseProduct: (purchase: {
    productType: EPurchaseProduct;
    productId: string;
    emailAddress: string;
    stripeToken: string;
  }) => Promise<void>;
  forPremiumEnhancements?: string;
  isMobile?: boolean;
  dismiss?: () => void;
  href?: string;
  hrefTarget?: string;
  logoUrl: string | null;

  mini?: boolean;

  style?: React.CSSProperties;
  className?: string;
  pricingShown?: boolean | null;
  pricing?: JSX.Element | null;
}

interface IProductCardProps {
  product: IProduct;
  isCurrentPlan: boolean;
  hideCurrentPlanBar?: boolean;
  ctaText: string;
  ctaLoading?: boolean;
  preferredColor?: string;
  ctaDisabled?: boolean;
  onCallToActionClicked: OnCallToActionClickedFn;
  href?: string;
  hrefTarget?: string;
  logoUrl: string | null;
  pricingShown?: boolean | null;

  mini?: boolean;

  style?: React.CSSProperties;
  className?: string;
  pricing?: JSX.Element | null;
}

const periodCopy = (product: IProduct) => {
  if (!product.period || product.amount === 0) return null;

  switch (product.period) {
    case BillingPeriod.Monthly:
      return 'per month';
    case BillingPeriod.Yearly:
      return 'per year';
    default:
      throw Error(`unexpected - unknown billing period - ${product.period}`);
  }
};

// const descriptionForProduct = (product: IProduct) => {
//   if (product.description) return product.description;

//   switch (normalizeId(product.id)) {
//     case FREE.toLowerCase():
//       return 'The average Edmit family saves $5k in college costs';
//     case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
//     case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
//       return 'The average Edmit family saves $5k in college costs';
//     case normalizeId(BCFU_PRODUCT_ID):
//       return 'The average Edmit family saves $5k in college costs';
//     default:
//       return null;
//   }
// };

const colorForProduct = (product: IProduct) => {
  switch (normalizeId(product.id)) {
    case normalizeId(FREE):
      return hexGreen;
    case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
    case normalizeId(EDMIT_PLUS_MONTHLY_PRODUCT_ID):
      return hexBlue;
    case normalizeId(BCFU_PRODUCT_ID):
    case normalizeId(AAACU_PRODUCT_ID):
      return hexBlue;
    default:
      return null;
  }
};

const costForProduct = (product: IProduct) =>
  product.amount > 0 ? String(product.amount / 100) : '';

export const ProductCard: React.FC<IProductCardProps> = props => {
  const description = props.mini ? miniDescriptionForProduct(props.product) : null
  const cta = props.mini ? miniCallToActionForProduct(props.product) : props.ctaText

  return (
    <PlanOptionTemplate
      isCurrentPlan={props.isCurrentPlan}
      hideCurrentPlanBar={props.hideCurrentPlanBar}
      title={props.product.name}
      cost={costForProduct(props.product)}
      color={colorForProduct(props.product)}
      costTimeframe={periodCopy(props.product) || ''}
      description={description || ''}
      callToAction={cta}
      callToActionDisabled={props.ctaDisabled}
      onCallToActionClicked={props.onCallToActionClicked}
      href={props.href}
      hrefTarget={props.hrefTarget}
      logoUrl={props.product && props.product.organization && props.product.organization.logoUrl}
      style={props.style}
      className={props.className}
      pricingShown={props.pricingShown}
      pricing={props.pricing}
    >
      {!!props.mini && (
        miniFeaturesForProduct(props.product).map((feature, index) => (
          <span key={index}>
            {feature.name}&nbsp;
            {feature.tooltip && <EdmitTooltip type={ETooltipType.Info} text={feature.tooltip} />}
          </span>
        ))
      )}
      {!props.mini && (
        featuresForProduct(props.product).map((feature, index) => (
          <span key={index}>
            {feature.name}&nbsp;
            {feature.tooltip && <EdmitTooltip type={ETooltipType.Info} text={feature.tooltip} />}
          </span>
        ))
      )}
    </PlanOptionTemplate>
  );
};
