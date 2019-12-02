import * as React from 'react';
import Icon, { EIconName } from '../../atoms/icon';

export interface IProgressNavIconViewModel {
  active: boolean;
  iconName?: EIconName;
  label?: React.ReactChild;
  rightDash?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface IProgressNavIconActions {
  onClick?: () => void;
}

type ProgressNavIconProps = IProgressNavIconViewModel & IProgressNavIconActions;

const ProgressNavIcon = (props: ProgressNavIconProps) => (
  <div className={`flex flex-column items-center justify-center ${props.className}`}>
    <span
      className={`flex items-center justify-center`}
      style={{
        cursor: props.onClick ? 'pointer' : 'default',
        height: 40,
        userSelect: 'none',
        width: 40,
        ...props.style
      }}
      onClick={props.onClick}
    >
      <div
        className={`flex items-center justify-center br-pill ${
          props.active ? 'bg-crimson' : 'bg-gray-light'
          }`}
        style={{
          height: props.iconName ? '100%' : '50%',
          width: props.iconName ? '100%' : '50%'
        }}
      >
        {props.iconName && (
          <Icon
            name={props.iconName}
            className={`icon-xlarge ${props.active ? 'white' : 'gray-dim'}`}
            style={{ cursor: props.onClick ? 'pointer' : 'default' }}
          />
        )}
      </div>
    </span>
    <span className={'lato gray-dim f7 ttu w-100 mt2 mh2 tc'}>{props.label}</span>
  </div>
);

interface IProgressNavViewModel<EProgressStep> {
  steps: Array<{
    iconName?: EIconName;
    step: EProgressStep[];
    label?: React.ReactChild;
  }>;

  activeStep: EProgressStep;

  style?: React.CSSProperties;
  className?: string;
}

type ProgressNavProps<EProgressStep> = IProgressNavViewModel<EProgressStep>;

class ProgressNav<EProgressStep> extends React.Component<ProgressNavProps<EProgressStep>> {
  render() {
    const getCurrentStep = (
      step: EProgressStep
    ): ProgressNavProps<EProgressStep>['steps'][0] | null => {
      return this.props.steps.find(s => s.step.includes(this.props.activeStep)) || null;
    };

    const currentStep = getCurrentStep(this.props.activeStep);

    return (
      <div style={this.props.style} className={this.props.className}>
        <div className={'mh3 mh3-ns mt4 mb4'}>
          <div className="flex dn-ns items-center justify-center">
            <ProgressNavIcon
              iconName={(currentStep && currentStep.iconName) || undefined}
              active={true}
              label={(currentStep && currentStep.label) || undefined}
            />
          </div>
          <div className="dn flex-ns items-start justify-center mb4">
            <div className="w-100 flex items-start justify-center" style={{ maxWidth: 600 }}>
              {this.props.steps.map((step, i) => {
                return (
                  <>
                    <div key={i} style={{ flexGrow: 1, flexBasis: 0 }}>
                      <ProgressNavIcon
                        iconName={step.iconName}
                        active={step.step.includes(this.props.activeStep)}
                        label={step.label}
                      />

                    </div>
                    {i !== this.props.steps.length - 1 && (
                      <span
                        className="w2 bb bw1 b--gray-light"
                        style={{ marginTop: 20, marginLeft: -15, marginRight: -15 }}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressNav;
