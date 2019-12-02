import * as React from 'react';
import numeral from 'numeral';
import {
  hexGrayLoading1,
  hexGrayLoading2,
  hexGrayLoading3,
  hexGreen,
  hexRed,
  hexYellow
} from '../../../atoms/colors';
import LoadingText from '../../../atoms/loading/text';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../../atoms/avatar';
import { withState } from 'recompose';

interface IAffordabilityGraphPointViewModel {
  percentage: number;
  id: string;
  name: string;
  logoSrc: string | null;
  abbreviation: string;
}

const Gradient: React.SFC<any> = props => {
  const red = props.loading ? hexGrayLoading1 : hexRed;
  const yellow = props.loading ? hexGrayLoading2 : hexYellow;
  const green = props.loading ? hexGrayLoading3 : hexGreen;

  return (
    <div
      className="relative w-100 h3 z-1"
      style={{
        background: `linear-gradient(to right, ${red} 0%, ${red} ${
          props.gradientPoints.red
          }%, ${yellow} ${props.gradientPoints.yellow}%, ${green} ${
          props.gradientPoints.green
          }%, ${green} 100%)`
      }}
    >
      <span className="dn db-ns absolute gray-dim t-label mv1 left-0" style={{ top: '100%' }}>
        {props.loading ? (
          <div className="pt1" style={{ width: 100 }}>
            <LoadingText width={100} />
          </div>
        ) : (
            <span>
              Less
            <br />
              Affordable
          </span>
          )}
      </span>
      <span className="dn db-ns absolute gray-dim t-label mv1 tr right-0" style={{ top: '100%' }}>
        {props.loading ? (
          <div className="pt1" style={{ width: 100 }}>
            <LoadingText width={100} />
          </div>
        ) : (
            <span>
              More
            <br />
              Affordable
          </span>
          )}
      </span>
    </div>
  );
};

const LabelBenchmark: React.SFC<{ percentile: number; amount: number }> = props => {
  const benchmarkTextOffsetPercentage =
    props.percentile < 10 ? 10 : props.percentile > 90 ? 90 : 50;

  return (
    <div
      className="absolute mb2 z-2"
      style={{
        left: `${props.percentile}%`,
        transform: `translateX(-${props.percentile}%)`,
        width: '.0625rem'
      }}
    >
      <span className="relative">
        <span
          className="f5 gray-dim fw7 pb2 nowrap absolute"
          style={{
            left: `${benchmarkTextOffsetPercentage}%`,
            transform: `translateX(-${benchmarkTextOffsetPercentage}%)`
          }}
        >
          <span className="dn dib-ns">Benchmark:</span> {numeral(props.amount).format('$0,0')}
        </span>
        <span
          className="f5 gray-dim fw7 pb2 nowrap absolute"
          style={{ left: `50%`, transform: 'translateX(-50%) translateY(15px)' }}
        >
          <span className="affordability-benchmark-line" />
        </span>
      </span>
    </div>
  );
};

interface ILabelViewModel {
  active: boolean;
  hovering: boolean;
  editing: boolean;
  percentile: number;
  college: {
    id: string;
    name: string;
    abbreviation: string;
    logoSrc: string | null;
  };
}

interface ILabelActions {
  onClick: () => void;
  onHover: (hovering: boolean) => boolean;
}

type LabelProps = ILabelViewModel & ILabelActions;

const StatelessLabel: React.SFC<LabelProps> = props => {
  const reversed = props.percentile > 50;
  const expanded = props.active || (!props.active && props.hovering);

  return (
    <div className={`relative ${props.hovering ? 'z-5' : expanded ? 'z-3' : 'z-2'}`}>
      <div
        className={`js-label-group absolute mt2 ba bw1 b--crimson `}
        style={{ left: `${props.percentile}%`, transform: `translateX(-${props.percentile}%)` }}
      >
        <span
          className={`relative affordability-group-line ${
            expanded ? 'affordability-group-line-active' : ''
            } `}
        />
        <div className="absolute dib pointer" style={{ userSelect: 'none', left: -26, top: -5 }}>
          <div
            key={props.college.id}
            className={
              `relative flex flex-row${
              reversed ? '-reverse' : ''
              } items-center ba bw1 br-pill shadow-card f5 ` +
              (expanded
                ? `b--crimson bg-crimson hover-bg-crimson-dark hover-b--crimson-dark`
                : `b--gray-light hover-b--crimson`)
            }
            style={{
              transition: 'background-color 400ms',
              zIndex: props.hovering ? 8 : undefined,
              ...(reversed ? { transform: 'translateX(-100%)', left: 26 * 2 } : {})
            }}
            onClick={props.onClick}
          >
            <div
              onMouseEnter={() => props.onHover && props.onHover(true)}
              onMouseLeave={() => props.onHover && props.onHover(false)}
            >
              <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Medium}
                initials={
                  props.college.logoSrc == null
                    ? props.college.abbreviation.substring(0, 2)
                    : undefined
                }
                logoSrc={props.college.logoSrc || undefined}
              />
            </div>
            <span
              className={`nowrap fw7 white overflow-hidden ${
                expanded && !(props.active && props.editing && !props.hovering) ? 'ph2' : ''
                }`}
              style={{
                maxWidth: expanded && !(props.active && props.editing && !props.hovering) ? 300 : 0,
                transition: 'max-width 400ms, padding 400ms'
              }}
            >
              {props.college.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = withState('hovering', 'onHover', false)(StatelessLabel);

export interface IAffordabilityGraphViewModel {
  beginningOfYellow: number;
  middleOfYellow: number;
  endOfYellow: number;
  benchmark: number;
  points: IAffordabilityGraphPointViewModel[];
  activePointId?: string | null;
  loading: boolean;
}

export interface IAffordabilityGraphActions {
  onSetActivePointId?: (activePointId: string | null) => void;
}

interface IAffordabilityGraphState {
  labelContainerHeight: number;
  activePointId: string | null;
  editing: boolean;
}

type AffordabilityGraphProps = IAffordabilityGraphViewModel & IAffordabilityGraphActions;

export class AffordabilityGraph extends React.Component<
  AffordabilityGraphProps,
  IAffordabilityGraphState
  > {
  constructor(props: AffordabilityGraphProps) {
    super(props);
    this.state = {
      activePointId: null,
      editing: false,
      labelContainerHeight: 0
    };
  }

  componentDidMount() {
    const labelGroups = Array.from(window.document.getElementsByClassName('js-label-group'));
    const heights = [];

    for (const group of labelGroups) {
      heights.push(group.clientHeight);
    }

    this.setState({ labelContainerHeight: Math.max(...heights) });
  }

  componentDidUpdate(prevProps: AffordabilityGraphProps) {
    if (this.props.points !== prevProps.points) {
      const labelGroups = Array.from(window.document.getElementsByClassName('js-label-group'));
      const heights = [];

      for (const group of labelGroups) {
        heights.push(group.clientHeight);
      }

      this.setState({ labelContainerHeight: Math.max(...heights) });
    }

    if (
      this.props.activePointId !== undefined &&
      this.props.activePointId !== this.state.activePointId
    ) {
      this.setState({
        activePointId: this.props.activePointId
      });
    }
  }

  render() {
    const labelBenchmark = this.props.endOfYellow < 0 ? 0 : this.props.endOfYellow;

    return (
      <div
        className="pb3 mt1"
        onMouseEnter={() =>
          this.setState({
            editing: true
          })
        }
        onMouseLeave={() =>
          this.setState({
            editing: false
          })
        }
      >
        <div className="relative overflow-x-visible" style={{ height: '36px' }}>
          {!this.props.loading && (
            <LabelBenchmark percentile={labelBenchmark} amount={this.props.benchmark} />
          )}
        </div>
        <Gradient
          gradientPoints={{
            green: this.props.endOfYellow,
            red: this.props.beginningOfYellow,
            yellow: this.props.middleOfYellow
          }}
          loading={this.props.loading}
        />
        <div
          className="relative"
          style={{ minHeight: '32px', height: `${this.state.labelContainerHeight}px` }}
        >
          {!this.props.loading &&
            this.props.points.map(point => {
              return (
                <Label
                  key={point.id}
                  percentile={point.percentage}
                  college={point}
                  active={this.state.activePointId === point.id}
                  editing={this.state.editing}
                  onClick={() => {
                    const activePointId = point.id !== this.state.activePointId ? point.id : null;

                    this.setState({
                      activePointId
                    });
                    if (this.props.onSetActivePointId) {
                      this.props.onSetActivePointId(activePointId);
                    }
                  }}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default AffordabilityGraph;
