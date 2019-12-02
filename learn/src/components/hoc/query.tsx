import * as React from 'react'

import '../components/layout.css'
import { StaticQuery } from 'gatsby';

interface IStaticQueryFetcherProps<Query> {
  query: string;
  children: (props: Query) => React.ReactChild;
}

export const StaticDataFetcher = <Query extends {}>(props: IStaticQueryFetcherProps<Query>) => (
  <>
    <StaticQuery
      query={ this.props.query }
    >
      { data => this.props.children(data) }
    </StaticQuery>
  </>
);
