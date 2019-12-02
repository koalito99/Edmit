import * as React from 'react';
import { Query } from 'react-apollo';
import SearchStudents, { ConnectedSearchStudentsProps } from '@edmit/component-library/src/components/molecules/search-students'
import { SEARCH_STUDENTS } from '../../../graphql/queries';
import {
  SearchStudents as SearchStudentsQuery,
  SearchStudentsVariables
} from '../../../graphql/generated';

const ConnectedSearchStudents: React.SFC<ConnectedSearchStudentsProps> = props => {
  return (
    <Query<SearchStudentsQuery, SearchStudentsVariables>
      query={SEARCH_STUDENTS}
      variables={{
        searchString: props.inputValue
      }}
      skip={props.inputValue === ''}
    >
      {searchStudentsQuery => (
        <SearchStudents
          {...props}
          options={
            !searchStudentsQuery.loading && searchStudentsQuery.data != null
              ? searchStudentsQuery.data.students.map(student => ({
                  firstName: (student.person && student.person.firstName) || '',
                  id: student.id,
                  lastName: (student.person && student.person.lastName) || ''
                }))
              : []
          }
          isLoading={searchStudentsQuery.loading}
        />
      )}
    </Query>
  );
};

export default ConnectedSearchStudents;
