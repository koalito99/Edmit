import * as React from 'react';
import { useRef } from 'react';
import deepmerge from 'deepmerge';
import LoadingSpinner from '../../atoms/loading/spinner';

export enum ESteppedWizardStepVisibleState {
  NOT_YET_OPENED = 'NOT_YET_OPENED',
  OPEN = 'OPEN',
  OPENED = 'OPENED'
}

export interface ISteppedWizardWrapperViewModel<EWizardStep, WizardStepState> {
  debugMode?: boolean;
  activeStep: EWizardStep;
  order?: EWizardStep[];
  initialLoading?: boolean;
  defaultStepState?: WizardStepState;
  steps: Array<{
    step: EWizardStep;
    submitFuncKey?: string;
    render: (props: {
      visibleState: ESteppedWizardStepVisibleState;
      currentStep: EWizardStep;
      setStepState: (state: WizardStepState) => void;
    }) => JSX.Element;
  }>;
  children?: (childProps: {
    wizardComponent: JSX.Element;
    saveCurrentData: () => void;
    currentStepState: WizardStepState;
  }) => React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

type SteppedWizardWrapperProps<EWizardStep, WizardStepState = {}> = ISteppedWizardWrapperViewModel<
  EWizardStep,
  WizardStepState
>;

class WrappedStepWizardWrapper<EWizardStep, WizardStepState> extends React.Component<
  SteppedWizardWrapperProps<EWizardStep, WizardStepState>
  > {
  public componentWillReceiveProps(
    nextProps: SteppedWizardWrapperProps<EWizardStep, WizardStepState>
  ) {
    Object.keys(nextProps).filter(key => {
      return nextProps[key] !== this.props[key];
    });
  }

  public render() {
    return <SteppedWizardWrapper<EWizardStep, WizardStepState> {...this.props} />;
  }
}

const SteppedWizardWrapper: <EWizardStep, WizardStepState = {}>(
  p: SteppedWizardWrapperProps<EWizardStep, WizardStepState>
) => any = <EWizardStep, WizardStepState>(
  props: SteppedWizardWrapperProps<EWizardStep, WizardStepState>
) => {
    const order = props.order || props.steps.map(e => e.step);

    const [stepState, setStepState] = React.useState(props.defaultStepState);

    const currentStepRef = useRef<{
      index: number;
      element: any;
    } | null>(null);

    const stepAsArray = (step: EWizardStep | EWizardStep[]): EWizardStep[] => {
      if (Array.isArray(step)) {
        return step;
      } else {
        return [step];
      }
    };

    const stepIsOn = (step: EWizardStep | EWizardStep[]): boolean => {
      return stepAsArray(step).indexOf(props.activeStep) > -1 || Boolean(props.debugMode);
    };

    const stepHasPassed = (step: EWizardStep | EWizardStep[]) => {
      return (
        stepAsArray(step).every(
          s => order.indexOf(props.activeStep) > order.indexOf(s)
        ) || Boolean(props.debugMode)
      );
    };

    const stateForStep = (step: EWizardStep | EWizardStep[]) => {
      return stepIsOn(step)
        ? ESteppedWizardStepVisibleState.OPEN
        : stepHasPassed(step)
          ? ESteppedWizardStepVisibleState.OPENED
          : ESteppedWizardStepVisibleState.NOT_YET_OPENED;
    };

    const wizardComponent = (
      <div
        key="wizardComponent"
        style={{
          ...(!props.debugMode
            ? {
              display: 'grid',
              gridTemplateColumns: '1fr'
            }
            : { display: 'flex', flexDirection: 'column' })
          , ...props.style
        }}

        className={props.className}
      >
        {!props.debugMode && props.initialLoading !== undefined && (
          <div
            style={{
              gridColumnStart: 1,
              gridRowStart: 1,
              opacity: props.initialLoading ? 1 : 0,
              transition: 'opacity 200ms'
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        {props.steps.map((step, i) => (
          <div
            key={i}
            style={{
              gridColumnStart: 1,
              gridRowStart: 1,
              ...(i === 0 && !props.debugMode
                ? {
                  opacity: props.initialLoading ? 0 : 1,
                  transform: `scale(${props.initialLoading ? 1.25 : 1})`,
                  transition: 'opacity 300ms ease 0.4s, transform 500ms ease 0.4s'
                }
                : undefined)
            }}
          >
            <div className="center">
              {stateForStep(step.step) === ESteppedWizardStepVisibleState.OPEN && (
                <step.render
                  key={i}
                  currentStep={props.activeStep}
                  setStepState={setStepState}
                  visibleState={stateForStep(step.step)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );

    const saveCurrentData = async () => {
      const submitKey =
        (currentStepRef.current && props.steps[currentStepRef.current.index].submitFuncKey) ||
        'submit';

      if (currentStepRef.current && currentStepRef.current.element[submitKey]) {
        await currentStepRef.current.element[submitKey]();
      }
    };

    if (props.children) {
      return props.children({
        currentStepState: deepmerge<WizardStepState>(
          props.defaultStepState || {},
          (stepState as any) || {}
        ),
        saveCurrentData,
        wizardComponent
      });
    } else {
      return wizardComponent;
    }
  };

export default WrappedStepWizardWrapper;
