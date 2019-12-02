import * as React from 'react';
import LoadingSpinner from '../../atoms/loading/spinner';

// import Slider from 'rc-slider';

export enum ESteppedWizardStepVisibleState {
  NOT_YET_OPENED = 'NOT_YET_OPENED',
  OPEN = 'OPEN',
  OPENED = 'OPENED'
}

export interface ISteppedWizardWrapperViewModel<EWizardStep> {
  debugMode?: boolean;
  activeStep: EWizardStep;
  initialLoading?: boolean;
  steps: Array<{
    step: EWizardStep;
    submitFuncKey?: string;
    render: (
      props: {
        visibleState: ESteppedWizardStepVisibleState;
      }
    ) => JSX.Element;
    name?: string | null
  }>;
  children?: (
    childProps: { wizardComponent: JSX.Element; saveCurrentData: () => void }
  ) => React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

type SteppedWizardWrapperProps<EWizardStep> = ISteppedWizardWrapperViewModel<EWizardStep>;

class SteppedWizardWrapper<EWizardStep> extends React.Component<
  SteppedWizardWrapperProps<EWizardStep>
  > {
  currentStep: {
    index: number;
    rendered: any;
  } | null = null;

  render() {
    const stepIsOn = (step: EWizardStep): boolean => {
      return this.props.activeStep === step || Boolean(this.props.debugMode);
    };

    const stepHasPassed = (step: EWizardStep) => {
      return this.props.activeStep > step || Boolean(this.props.debugMode);
    };

    const stateForStep = (step: EWizardStep) => {
      return stepIsOn(step)
        ? ESteppedWizardStepVisibleState.OPEN
        : stepHasPassed(step)
          ? ESteppedWizardStepVisibleState.OPENED
          : ESteppedWizardStepVisibleState.NOT_YET_OPENED;
    };

    const wizardComponent = (
      <div
        style={
          {
            ...(!this.props.debugMode
              ? {
                display: 'grid',
                gridTemplateColumns: '1fr'
              }
              : { display: 'flex', flexDirection: 'column' }),
            ...this.props.style
          }
        }
        className={this.props.className}
      >
        {!this.props.debugMode && (
          <div
            style={{
              gridColumnStart: 1,
              gridRowStart: 1,
              opacity: this.props.initialLoading ? 1 : 0,
              transition: 'opacity 200ms'
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        {this.props.steps.map((step, i) => (
          <div
            key={i}
            style={{
              gridColumnStart: 1,
              gridRowStart: 1,
              ...(i === 0 && !this.props.debugMode
                ? {
                  opacity: this.props.initialLoading ? 0 : 1,
                  transform: `scale(${this.props.initialLoading ? 1.25 : 1})`,
                  transition: 'opacity 300ms ease 0.4s, transform 500ms ease 0.4s'
                }
                : undefined)
            }}
          >
            <div className="flex justify-center" data-testid={step.name || step.step}>
              {React.cloneElement(
                step.render({ visibleState: stateForStep(step.step) }),
                stepIsOn(step.step)
                  ? { ref: (el: any) => (this.currentStep = { index: i, rendered: el }) }
                  : {}
              )}
            </div>
          </div>
        ))}
      </div>
    );

    const submitCurrentData = async () => {
      const submitKey =
        (this.currentStep && this.props.steps[this.currentStep.index].submitFuncKey) || 'submit';
      if (this.currentStep && this.currentStep.rendered[submitKey]) {
        await this.currentStep.rendered[submitKey]();
      }
    };

    if (this.props.children) {
      return this.props.children({
        saveCurrentData: submitCurrentData,
        wizardComponent
      });
    } else {
      return wizardComponent;
    }
  }
}

export default SteppedWizardWrapper;