import * as React from 'react';
import SearchZipCodes, { ConnectedSearchZipCodesProps } from '@edmit/component-library/src/components/molecules/search-zip-codes'
import {
  SearchPostalCodes as SearchPostalCodesQuery,
  SearchPostalCodesVariables
} from '../../../graphql/generated';
import { Query } from 'react-apollo';
import { SEARCH_POSTAL_CODES } from '../../../graphql/queries';

const ConnectedSearchZipCodes: React.SFC<ConnectedSearchZipCodesProps> = props => {
  return (
    <Query<SearchPostalCodesQuery, SearchPostalCodesVariables>
      query={SEARCH_POSTAL_CODES}
      variables={{
        searchString: props.inputValue
      }}
      skip={props.inputValue === ''}
    >
      {searchZipCodesQuery => (
        <SearchZipCodes
          {...props}
          options={
            !searchZipCodesQuery.loading && searchZipCodesQuery.data != null
              ? searchZipCodesQuery.data.postalCodes.map(postalCode => ({
                  id: postalCode.id,
                  label: postalCode.postalCode
                }))
              : []
          }
          isLoading={searchZipCodesQuery.loading}
        />
      )}
    </Query>
  );
};

export default ConnectedSearchZipCodes;
