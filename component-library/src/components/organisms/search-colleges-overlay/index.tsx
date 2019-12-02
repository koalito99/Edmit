import * as React from 'react';
import { Formik } from 'formik';
import Text from '../../atoms/typography/text';
import SlideoutEditCompareCollege from '../../molecules/slideout-edit-compare-college';
import { ECollegeStatusCompare, ECompareStatus } from '../../../shared';
import { ConnectedSearchCollegesProps } from '../../molecules/search-colleges'

interface ISearchCollegesOverlayViewModel {
  compareStatus: ECompareStatus;
  compareColleges: Array<{
    id: string;
    name: string;
    abbreviation: string;
    logoSrc: string | null;
  }>;
  searchEditActive: boolean;
  searchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  loading: boolean;
}

interface ISearchCollegesOverlayActions {

}

type SearchCollegesOverlayProps = ISearchCollegesOverlayViewModel & ISearchCollegesOverlayActions;

const SearchCollegesOverlay: React.SFC<SearchCollegesOverlayProps> = props => {

  const SearchColleges = props.searchCollegesComponent;
  return (
    <div className={'shadow-4 search-colleges-overlay ' + (props.searchEditActive ? 'show-search-overlay' : '')} >
      <Formik<{ query: string }>
        initialValues={{
          query: ''
        }}
        onSubmit={() => null}
      >
        {({ values, setFieldValue }) => (
          <SearchColleges
            inputValue={values.query}
            onSearch={newQuery => setFieldValue('query', newQuery)}
          />
        )}
      </Formik>


      <div>
        <Text>Compare up to 5</Text>

        {props.compareColleges.map(college => (
          <SlideoutEditCompareCollege
            key={college.id}
            college={{ ...college, statusCompare: ECollegeStatusCompare.Added }}
            compareStatus={props.compareStatus}
            loading={props.loading}
          />
        ))}

        <Text className={'fr brown-color-1 ma0'}>APPLY</Text>
      </div>
    </div>
  )
};

export default SearchCollegesOverlay;
