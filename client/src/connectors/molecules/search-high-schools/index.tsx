import * as React from 'react';
import SearchHighSchools, { ConnectedSearchHighSchoolsProps } from '@edmit/component-library/src/components/molecules/search-high-schools'
import {
  SearchHighSchools as SearchHighSchoolsQuery,
  SearchHighSchoolsVariables
} from '../../../graphql/generated';
import { Query } from 'react-apollo';
import { SEARCH_HIGH_SCHOOLS } from '../../../graphql/queries';

const ConnectedSearchHighSchools: React.SFC<ConnectedSearchHighSchoolsProps> = props => {
  return (
    <Query<SearchHighSchoolsQuery, SearchHighSchoolsVariables>
      query={SEARCH_HIGH_SCHOOLS}
      variables={{
        searchString: props.inputValue
      }}
      skip={props.inputValue === ''}
    >
      {searchHighSchoolsQuery => (
        <SearchHighSchools
          {...props}
          options={
            !searchHighSchoolsQuery.loading && searchHighSchoolsQuery.data != null
              ? searchHighSchoolsQuery.data.highSchools.map(highSchool => ({
                  id: highSchool.id,
                  name: highSchool.name,
                  zipCode: highSchool.postalCode.postalCode
                }))
              : []
          }
          isLoading={searchHighSchoolsQuery.loading}
        />
      )}
    </Query>
  );
};

export default ConnectedSearchHighSchools;
