import * as React from 'react';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import DivergingGraph from '../../molecules/graph/diverging';
import { dataLoadingDivergingGraph } from '../../atoms/loading/data';

export interface IDivergingChartConfiguration {
  title: string;
  measures: Array<{
    measure: string;
    value: number;
  }>;
  loading: boolean;
}

type DivergingChartViewModel = IDivergingChartConfiguration;

const DivergingChart: React.SFC<DivergingChartViewModel> = props => (
  <div>
    {props.loading ? (
      <div>
        <Header size={EHeadingSize.H4} text={'Diverging Chart'} loading={props.loading} />
        <DivergingGraph
          measures={dataLoadingDivergingGraph.map(measure => ({
            measure: measure.abbreviation,
            value: measure.value
          }))}
          loading={props.loading}
        />
      </div>
    ) : (
      <div>
        <Header size={EHeadingSize.H4} text={props.title} />
        <DivergingGraph measures={props.measures} loading={props.loading} />
      </div>
    )}
  </div>
);

export default DivergingChart;
