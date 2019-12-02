import * as React from 'react';
import { ESteppedWizardStepVisibleState } from '@edmit/component-library/src/components/organisms/wrapper-stepped-wizard'
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon'

export interface ITipCardProps {
  visibleState?: ESteppedWizardStepVisibleState;
  onBack?: () => void;
  onContinue?: () => void;
}

const TipCard: React.SFC<ITipCardProps> = props => {
  const visibleState = props.visibleState || ESteppedWizardStepVisibleState.OPEN;

  return (
    <div
      className="w-100 relative"
      style={{
        left: `${
          visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED
            ? '150%'
            : visibleState === ESteppedWizardStepVisibleState.OPENED
            ? '-150%'
            : '0'
          }`,
        transition: 'left 500ms cubic-bezier(.59, .01, .16, 1)',
        zIndex:
          visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED ||
          visibleState === ESteppedWizardStepVisibleState.OPENED
            ? 0
            : 1
      }}
    >
      <div className={"flex justify-between"}>
        <div className={"pointer"} onClick={props.onBack}>
          <Icon name={EIconName.ChevronLeft} onClick={() => {}} className={"ml2 mt4"} />
        </div>
        <div className={"ph3 ph4-ns w-100"}>
          {props.children}
        </div>
        <div className={"pointer"} onClick={props.onContinue}>
          <Icon name={EIconName.ChevronRight} onClick={() => {}} className={"mr2 mt4"} />
        </div>
      </div>
    </div>
  );
};

export default TipCard;
