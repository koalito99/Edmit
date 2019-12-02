import * as React from 'react';
import Search, { ISearchActions, ISearchViewModel } from '../../atoms/search';
import { Subtract } from '../../../lib/typescript'
import Text from '../../atoms/typography/text';

export interface ISearchStudentOption {
  id: string;
  firstName: string;
  lastName: string;
}

const StudentSearchComponent: React.SFC<ISearchStudentOption> = props => (
  <div className={'flex flex-row items-center justify-between pa2 '}>
    <div className="flex flex-row items-center">
      <div>
        <Text className="mv0 t-medium black fw7">
          {props.firstName} {props.lastName}
        </Text>
      </div>
    </div>
  </div>
);

type SearchStudentsViewModel = Subtract<
  ISearchViewModel<ISearchStudentOption>,
  {
    name: string;
    placeholder: string;
    disabled?: boolean;
    value?: string;
    emptyResultsMessage?: string;
    optionComponent: any;
  }
> & {
  defaultOption?: ISearchStudentOption;
};

type SearchStudentsActions = ISearchActions<ISearchStudentOption>;

type SearchStudentsProps = SearchStudentsViewModel & SearchStudentsActions;

class SearchStudents extends React.Component<SearchStudentsProps> {
  render() {
    return (
      <Search<ISearchStudentOption>
        {...this.props}
        disabled={false}
        getLabel={opt => `${opt.firstName} ${opt.lastName}`}
        emptyResultsMessage={'No students found'}
        name={'search-students'}
        placeholder={'Search students'}
        optionComponent={StudentSearchComponent}
      />
    );
  }
}

export type ConnectedSearchStudentsProps = Subtract<SearchStudentsProps,
  {
    options: any;
    isLoading: any;
  }
  > & {
  inputValue: string;
};

export default SearchStudents;
