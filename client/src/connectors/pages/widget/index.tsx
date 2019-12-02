import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import WidgetPage from '../../../components/pages/widget';
import { GET_WIDGET_COLLEGE, GET_WIDGET_STUDENT } from '../../../graphql/queries';
import {
  GetWidgetCollege,
  GetWidgetCollegeVariables,
  GetWidgetStudent,
  UpdateProfile,
  UpdateProfileVariables
} from '../../../graphql/generated';
// import { ProvidedRequirementValue } from '../../../graphql/helpers';
import ConnectedSearchColleges from '../../molecules/search-colleges';
import { UPDATE_PROFILE } from '../../../graphql/mutations';
import SearchColleges, {
  ISearchCollegeOption
} from '@edmit/component-library/src/components/molecules/search-colleges';
import SearchZipCodes from '@edmit/component-library/src/components/molecules/search-zip-codes';
import ConnectedSearchZipCodes from '../../molecules/search-zip-codes';
import { isUserValue } from '../../../graphql/helpers';

interface IConnectedWidgetPageViewModel {
  searchCollege: string;
  selectedCollege: ISearchCollegeOption | null;
}

interface IConnectedWidgetPageActions {
  setSearchCollegeString: (query: string) => void;
  selectCollege: (college: ISearchCollegeOption | null) => void;
  onGetStarted: () => void;
}

type ConnectedWidgetPageProps = IConnectedWidgetPageViewModel & IConnectedWidgetPageActions;

const ConnectedWidgetPage: React.SFC<ConnectedWidgetPageProps> = props => {
  return (
    <Query<GetWidgetStudent> query={GET_WIDGET_STUDENT}>
      {studentQuery => (
        <Query<GetWidgetCollege, GetWidgetCollegeVariables>
          query={GET_WIDGET_COLLEGE}
          variables={{
            collegeId: props.selectedCollege ? props.selectedCollege.id : '',
            studentId:
              (studentQuery.data &&
                studentQuery.data.session &&
                studentQuery.data.session.account.person &&
                studentQuery.data.session.account.person.student &&
                studentQuery.data.session.account.person.student.id) ||
              ''
          }}
          skip={props.selectedCollege === null || studentQuery.data === null}
        >
          {firstCollegeQuery => (
            <Mutation<UpdateProfile, UpdateProfileVariables> mutation={UPDATE_PROFILE}>
              {updateProfile => {
                if (
                  studentQuery.loading ||
                  studentQuery.data === null ||
                  (props.selectedCollege !== null &&
                    (firstCollegeQuery.loading === true || firstCollegeQuery.data === null))
                ) {
                  return (
                    <WidgetPage
                      college={null}
                      values={{
                        actScore: null,
                        gradePointAverage: null,
                        satScore: null,
                        selectedZipCode: null
                      }}
                      searchCollegesComponent={
                        <SearchColleges options={[]} onSearch={() => null} />
                      }
                      searchZipCodesComponent={() => (
                        <SearchZipCodes options={[]} onSearch={() => null} />
                      )}
                      onPersonalizeEdstimate={async () => {
                        return;
                      }}
                      onGetStarted={props.onGetStarted}
                      loading={true}
                    />
                  );
                }

                const college = firstCollegeQuery.data ? firstCollegeQuery.data.college : null;

                const studentData =
                  (studentQuery.data!.session &&
                    studentQuery.data!.session!.account.person &&
                    studentQuery.data!.session!.account.person!.student) ||
                  null;

                return (
                  <WidgetPage
                    college={
                      college
                        ? {
                            abbreviation: college.abbreviation,
                            costOfAttendance: college.costOfAttendance.value,
                            edstimate: college.edstimate.value,
                            name: college.name
                          }
                        : null
                    }
                    values={
                      studentData
                        ? {
                            actScore: isUserValue(studentData.actScore)
                              ? studentData.actScore.value
                              : null,
                            gradePointAverage: isUserValue(studentData.gradePointAverage)
                              ? studentData.gradePointAverage.value
                              : null,
                            satScore: isUserValue(studentData.satScore)
                              ? studentData.satScore.value
                              : null,
                            selectedZipCode:
                              studentData.household && studentData.household.postalCode
                                ? {
                                    id: studentData.household.postalCode.id,
                                    label: studentData.household.postalCode.postalCode
                                  }
                                : null
                          }
                        : {
                            actScore: null,
                            gradePointAverage: null,
                            satScore: null,
                            selectedZipCode: null
                          }
                    }
                    searchCollegesComponent={
                      <ConnectedSearchColleges
                        inputValue={props.searchCollege}
                        selected={props.selectedCollege || undefined}
                        myColleges={[]}
                        onSearch={searchQuery => props.setSearchCollegeString(searchQuery)}
                        onSelected={selectedCollege => props.selectCollege(selectedCollege)}
                      />
                    }
                    searchZipCodesComponent={ConnectedSearchZipCodes}
                    onPersonalizeEdstimate={async values => {
                      await updateProfile({
                        variables: {
                          data: {
                            actScore: {
                              value: values.actScore
                            },
                            gradePointAverage: {
                              value: values.gradePointAverage
                            },
                            postalCodeId: values.selectedZipCode
                              ? values.selectedZipCode.id
                              : undefined,
                            satScore: {
                              value: values.satScore
                            }
                          }
                        }
                      });

                      firstCollegeQuery.refetch();
                    }}
                    onGetStarted={props.onGetStarted}
                    loading={false}
                  />
                );
              }}
            </Mutation>
          )}
        </Query>
      )}
    </Query>
  );
};

export default ConnectedWidgetPage;
