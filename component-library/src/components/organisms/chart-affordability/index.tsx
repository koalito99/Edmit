import * as React from 'react';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import AffordabilityGraph, {
  IAffordabilityGraphViewModel
} from '../../molecules/graph/affordability';

export interface IAffordabilityChartViewModel {
  colleges: Array<{
    id: string;
    netCostOfAttendance: {
      totalBeforeMultiplication: number;
    };
    abbreviation: string;
    name: string;
    affordability: number;
    logoSrc: string | null;
  }>;
  affordabilityBenchmark: number;

  activeCollegeId?: string | null;

  form?: JSX.Element;

  loading: boolean;
}

export interface IAffordabilityChartActions {
  onSetActiveCollegeId?: (activeCollegeId: string | null) => void;
}

type AffordabilityChartProps = IAffordabilityChartViewModel & IAffordabilityChartActions;

const AffordabilityChart: React.SFC<AffordabilityChartProps> = props => {
  const highestPrice = Math.max(
    ...props.colleges.map(college => college.netCostOfAttendance.totalBeforeMultiplication * 4)
  );
  const reachablePrice = props.affordabilityBenchmark * 1.2;
  const startYellow = props.affordabilityBenchmark * 1.5;
  const yellowStartPoint = 1 - startYellow / (highestPrice * 1.2);
  const yellowMidPoint = 1 - reachablePrice / (highestPrice * 1.2);
  const greenStartPoint = 1 - props.affordabilityBenchmark / (highestPrice * 1.2);

  const points: IAffordabilityGraphViewModel['points'] = props.colleges.map(college => {
    const total = college.netCostOfAttendance.totalBeforeMultiplication * 4;
    const percentage = (1 - total / (highestPrice * 1.2)) * 100;
    return {
      ...college,
      percentage
    };
  });

  const Graph: React.SFC = () => {
    if (props.activeCollegeId !== undefined) {
      return (
        <AffordabilityGraph
          beginningOfYellow={yellowStartPoint * 100}
          middleOfYellow={yellowMidPoint * 100}
          endOfYellow={greenStartPoint * 100}
          benchmark={props.affordabilityBenchmark}
          points={points}
          activePointId={props.activeCollegeId}
          onSetActivePointId={props.onSetActiveCollegeId || (() => null)}
          loading={props.loading}
        />
      );
    } else {
      return (
        <AffordabilityGraph
          beginningOfYellow={yellowStartPoint * 100}
          middleOfYellow={yellowMidPoint * 100}
          endOfYellow={greenStartPoint * 100}
          benchmark={props.affordabilityBenchmark}
          points={points}
          loading={props.loading}
        />
      );
    }
  };

  return (
    <div>
      {props.loading ? (
        <div>
          <Header size={EHeadingSize.H4} text={''} loading={props.loading}>
            <div className="dn db-l nt3 nb3" style={{ width: 300 }}>
              {props.form}
            </div>
          </Header>
          <Graph />
        </div>
      ) : (
        <div>
          <Header size={EHeadingSize.H4} text={''}>
            {props.form}
          </Header>
          <Graph />
        </div>
      )}
    </div>
  );
};

export default AffordabilityChart;
