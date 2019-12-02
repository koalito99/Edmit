import * as React from 'react';
import LollipopGraph from '../../molecules/graph/lollipop';
import { dataLoadingDivergingGraph } from '../../atoms/loading/data';

export interface ILollipopChartConfiguration {
  measures: Array<{
    measure: string;
    value: number;
  }>;
  mini?: boolean;
  loading: boolean;
}

type LollipopChartViewModel = ILollipopChartConfiguration;

const LollipopChart: React.SFC<LollipopChartViewModel> = props => (
  <div>
    {props.loading ? (
      <div>
        <LollipopGraph
          measures={dataLoadingDivergingGraph.map(measure => ({
            measure: measure.abbreviation,
            value: measure.value
          }))}
          mini={props.mini}
          loading={true}
        />
      </div>
    ) : (
      <div>
        <LollipopGraph measures={props.measures} mini={props.mini} loading={false} />
      </div>
    )}
  </div>
);

export default LollipopChart;
