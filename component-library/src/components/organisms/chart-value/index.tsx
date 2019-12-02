import * as React from 'react';
import Header from '../../molecules/header';
import { EHeadingSize } from '../../atoms/typography/heading';
import ValueGraph from '../../molecules/graph/value';
import { IComputedRequirement } from '../../../shared';
import { dataLoadingValueGraph } from '../../atoms/loading/data';

export interface IValueChartConfiguration {
  colleges: Array<{
    abbreviation: string;
    value: IComputedRequirement<number>;
  }>;
  loading: boolean;
}

type ValueChartViewModel = IValueChartConfiguration;

const ValueChart: React.SFC<ValueChartViewModel> = props => (
  <div>
    {props.loading ? (
      <div>
        <Header size={EHeadingSize.H4} text={'Relative Value Index'} loading={props.loading} />
        <ValueGraph
          colleges={dataLoadingValueGraph.map(college => ({
            abbreviation: college.abbreviation,
            value: college.value.value
          }))}
          loading={props.loading}
        />
      </div>
    ) : (
      <div>
        <Header size={EHeadingSize.H4} text={'Relative Value Index'} />
        <ValueGraph
          colleges={props.colleges.map(college => ({
            abbreviation: college.abbreviation,
            value: college.value.value
          }))}
          loading={props.loading}
        />
      </div>
    )}
  </div>
);

export default ValueChart;
