import * as React from "react";
import {ESteppedWizardStepVisibleState} from "@edmit/component-library/src/components/organisms/wrapper-stepped-wizard";

export interface IOnboardingAreaProps {
  visibleState?: ESteppedWizardStepVisibleState;
  content: JSX.Element;
}

export const OnboardingArea: React.SFC<IOnboardingAreaProps> = props => {
  const visibleState = props.visibleState || ESteppedWizardStepVisibleState.OPEN;

  return (
    <div
      className="w-100 relative"
      style={{
        left: `${
          visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED
            ? '125%'
            : visibleState === ESteppedWizardStepVisibleState.OPENED
            ? '-125%'
            : '0'
          }`,
        // overflow: 'hidden',
        transition: 'left 500ms cubic-bezier(.59, .01, .16, 1)',
        zIndex:
          visibleState === ESteppedWizardStepVisibleState.OPEN
            ? 1
            : 0
      }}
    >
      {props.content}
    </div>
  );
};