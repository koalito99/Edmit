import * as React from 'react';
import SearchMyColleges from '@edmit/component-library/src/components/molecules/search-my-colleges';
import {
  SearchMyColleges as SearchMyCollegesQuery,
  SearchMyCollegesVariables
} from '../../../graphql/generated';
import { Query } from 'react-apollo';
import { SEARCH_MY_COLLEGES } from '../../../graphql/queries';
import { ECollegeStatusMyColleges } from '@edmit/component-library/src/shared';
import { ConnectedSearchMyCollegesProps } from '@edmit/component-library/src/components/molecules/search-my-colleges'
import { fromGQLFinancialGrade } from '../../../graphql/helpers'

const ConnectedSearchMyColleges: React.SFC<ConnectedSearchMyCollegesProps> = props => {
  return (
    <Query<SearchMyCollegesQuery, SearchMyCollegesVariables>
      query={SEARCH_MY_COLLEGES}
      variables={{
        searchString: props.inputValue,
        studentId: props.studentId
      }}
      skip={props.inputValue === ''}
    >
      {searchMyCollegesQuery => (
        <SearchMyColleges
          {...props}
          options={
            !searchMyCollegesQuery.loading && searchMyCollegesQuery.data != null
              ? searchMyCollegesQuery.data.student.colleges.map(college => ({
                  collegeFinancialGrade: fromGQLFinancialGrade(college.financialGrade),
                  collegeStatusMyColleges: ECollegeStatusMyColleges.Added,
                  id: college.id,
                  location: `${college.postalCode.city.name}, ${
                    college.postalCode.city.state.abbreviation
                  }`,
                  logoSrc: (college.logo && college.logo.url) || '',
                  name: college.name
                }))
              : []
          }
          isLoading={searchMyCollegesQuery.loading}
        />
      )}
    </Query>
  );
};

export default ConnectedSearchMyColleges;
