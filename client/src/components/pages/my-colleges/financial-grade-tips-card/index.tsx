import * as React from 'react';
import SteppedWizardWrapper, {
  ESteppedWizardStepVisibleState
} from '@edmit/component-library/src/components/organisms/wrapper-stepped-wizard';
import TipCard from './tip-card';
import { MyCollegesCard } from '../shared';
import { EDetailedIconName } from '@edmit/component-library/src/components/atoms/icon-detailed';
import Button, {
  EButtonSize,
  EButtonType
} from '@edmit/component-library/src/components/atoms/button';
import FormFieldCheckbox from '@edmit/component-library/src/components/atoms/form/form-field-checkbox';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import { hexOffwhite } from '@edmit/component-library/src/components/atoms/colors';
import { Element, scroller } from "react-scroll";
import withSizes from "react-sizes"

function useFinancialGradeTipsCardState(
  tips: IFinancialGradeTipsCardViewModel['tips'],
  initialTipId?: string
) {
  const order = tips.map(e => e.id);
  const getInitialId = () => {
    const firstUncheckedIndex = tips.findIndex(t => !t.checked)
    return tips[firstUncheckedIndex > -1 ? firstUncheckedIndex : 0].id
  }

  const [currentTip, setCurrentTip] = React.useState<string | null>(
    initialTipId || (order.length > 0 ? getInitialId() : null)
  );

  const [localTips, setLocalTips] = React.useState(tips); // for checking locally, before sent to server

  React.useEffect(() => {
    setLocalTips(tips);
  }, [tips]);

  React.useEffect(() => {
    if (currentTip === null && order.length > 0) {
      setCurrentTip(getInitialId());
    }
  }, [order.length]);

  return {
    tips: localTips,
    checkTip: (tipId: string, checked: boolean) => {
      setLocalTips(oldTips => {
        const index = oldTips.findIndex(t => t.id === tipId);
        return [
          ...oldTips.slice(0, index),
          {
            ...oldTips[index],
            checked
          },
          ...oldTips.slice(index + 1)
        ];
      });
    },
    currentTip,
    setCurrentTip,
    order,
    goToNextTip: () =>
      currentTip && setCurrentTip(order[(order.indexOf(currentTip)! + 1) % order.length]),
    goToPreviousTip: () =>
      currentTip &&
      setCurrentTip(
        order[(((order.indexOf(currentTip)! - 1) % order.length) + order.length) % order.length]
      )
  };
}

interface IFinancialGradeTipsCardViewModel {
  tips: Array<{
    id: string;
    title: string;
    text?: string;
    render: React.ComponentType<{
      visibleState: ESteppedWizardStepVisibleState;
      currentStep: string;
    }>;
    checked: boolean;
    dismissable: boolean;
    userCheckable: boolean;
  }>;

  loading: boolean;

  isMobile?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IFinancialGradeTipsCardActions {
  dismissTip(id: string): void;
  checkTip(id: string): void;
}

type FinancialGradeTipsCardProps = IFinancialGradeTipsCardViewModel &
  IFinancialGradeTipsCardActions;

function FinancialGradeTipsCard(props: FinancialGradeTipsCardProps) {
  const state = useFinancialGradeTipsCardState(props.tips);

  return (
    <MyCollegesCard
      iconName={EDetailedIconName.Lightbulb}
      heading={`Tips for Improving your Financial Grade`}
      loading={props.loading}
      style={props.style}
      className={props.className}
    >
      <div className={'flex flex-wrap'}>
        <div className={'mt3 w-100 w-40-l'}>
          {state.tips.map(child => {
            return (
              <div key={child.id}
                className={'mv0 mv1-l br2 pv1 ph2'}
                style={{
                  backgroundColor: child.id === state.currentTip ? hexOffwhite : undefined
                }}
              >
                <div className={"flex"}>
                  <FormFieldCheckbox
                    checked={child.checked}
                    onChange={newValue => {
                      if (child.userCheckable) {
                        // if (child.hijackChecking) return child.hijackChecking(newValue);
                        state.checkTip(child.id, newValue);
                        props.checkTip(child.id);
                      }
                    }}
                    required={false}
                    className={"mt2"}
                  />
                  <div className={"pointer flex-grow-1"} onClick={() => {
                    state.setCurrentTip(child.id)
                    if (props.isMobile) {
                      scroller.scrollTo('tipArea', {
                        duration: 1500,
                        delay: 100,
                        smooth: true,
                        offset: -150
                      })
                    }
                  }}>
                    <Text className={'ml1 mv0'}>{child.title}</Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'mt4 w-100 w-60-l'}>
          <Element name="tipArea">
            <SteppedWizardWrapper<string, {}>
              activeStep={state.currentTip!}
              steps={state.tips.map(tipEntry => ({
                step: tipEntry.id,
                render: renderProps => {
                  const TipRender = tipEntry.render;

                  return (
                    <TipCard
                      key={tipEntry.id}
                      visibleState={renderProps.visibleState}
                      onContinue={state.goToNextTip}
                      onBack={state.goToPreviousTip}
                    >
                      <div key={tipEntry.id} className={"w-100"}>
                        {tipEntry.text && <Text className={'tc mt0'}>{tipEntry.text}</Text>}
                        <div key={tipEntry.id} className={"w-100"}>
                          <TipRender key={tipEntry.id} {...renderProps} />
                        </div>
                      </div>
                    </TipCard>
                  );
                }
              }))}
              initialLoading={state.currentTip === null}
              className={'w-100 mt3'}
            />
            <div className={'flex justify-center'}>
              <Button
                text={'Dismiss'}
                size={EButtonSize.Medium}
                type={EButtonType.Secondary}
                disabled={
                  state.currentTip && state.tips.find(tip => tip.id === state.currentTip)
                    ? !state.tips.find(tip => tip.id === state.currentTip)!.dismissable
                    : false
                }
                onClick={() => {
                  props.dismissTip(state.currentTip!);
                  state.setCurrentTip(null);
                }}
              />
            </div>
          </Element>
        </div>
      </div>
    </MyCollegesCard>
  );
}
const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});
export default withSizes(mapSizesToProps)(FinancialGradeTipsCard) as typeof FinancialGradeTipsCard;
