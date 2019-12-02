import * as React from 'react';
import SearchColleges, { ConnectedSearchCollegesProps } from '@edmit/component-library/src/components/molecules/search-colleges'
import {
  SearchColleges as SearchCollegesQuery,
  SearchCollegesVariables
} from '../../../graphql/generated';
import { ECollegeStatusMyColleges } from '@edmit/component-library/src/shared';
import { SEARCH_COLLEGES } from '../../../graphql/queries';
import { Query } from 'react-apollo';

const ConnectedSearchColleges: React.SFC<ConnectedSearchCollegesProps> = props => {
  return (
    <Query<SearchCollegesQuery, SearchCollegesVariables>
      query={SEARCH_COLLEGES}
      variables={{
        searchString: props.inputValue
      }}
      skip={props.inputValue === ''}
    >
      {searchCollegesQuery => (
        <SearchColleges
          {...props}
          options={
            !searchCollegesQuery.loading && searchCollegesQuery.data != null
              ? searchCollegesQuery.data.colleges.map(college => ({
                  collegeStatusMyColleges: props.myColleges.some(
                    myCollege => myCollege.id === college.id
                  )
                    ? ECollegeStatusMyColleges.Added
                    : ECollegeStatusMyColleges.NotAdded,
                  id: college.id,
                  location: `${college.postalCode.city.name}, ${
                    college.postalCode.city.state.abbreviation
                  }`,
                  name: college.name
                }))
              : []
          }
          isLoading={searchCollegesQuery.loading}
        />
      )}
    </Query>
  );
  // return (
  //   <Query<SearchCollegesQuery, SearchCollegesVariables>
  //     query={SEARCH_COLLEGES}
  //     variables={{
  //       searchString: props.inputValue
  //     }}
  //   >
  //     {searchCollegesQuery => (
  //       <SearchColleges
  //         {...props}
  //         options={
  //           !searchCollegesQuery.loading && searchCollegesQuery.data != null
  //             ? searchCollegesQuery.data.colleges.map(college => ({
  //                 collegeStatusMyColleges: props.myColleges.some(
  //                   myCollege => myCollege.id === college.id
  //                 )
  //                   ? ECollegeStatusMyColleges.Added
  //                   : ECollegeStatusMyColleges.NotAdded,
  //                 id: college.id,
  //                 label: college.name,
  //                 sublabel: `${college.postalCode.city.name}, ${
  //                   college.postalCode.city.state.abbreviation
  //                 }`,
  //                 value: ''
  //               }))
  //             : []
  //         }
  //         isLoading={searchCollegesQuery.loading}
  //       />
  //     )}
  //   </Query>
  // );
};

export default ConnectedSearchColleges;
