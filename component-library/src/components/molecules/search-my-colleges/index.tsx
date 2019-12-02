import * as React from 'react';
import Search, { ISearchActions, ISearchViewModel } from '../../atoms/search';
import { Subtract } from '../../../lib/typescript'
import { ECollegeStatusMyColleges, EFinancialGrade } from '../../../shared'

export interface ISearchMyCollegesOption {
  id?: string;
  value?: string;
  label?: string;
  sublabel?: string;
  slug?: string;
  collegeStatusMyColleges?: ECollegeStatusMyColleges;
  collegeFinancialGrade?: EFinancialGrade;
  avatarInitials?: string;
  avatarLogoSrc?: string;
}

export type SearchCollegesViewModel = Subtract<
  ISearchViewModel<ISearchMyCollegesOption>,
  {
    name: string;
    placeholder: string;
    disabled?: boolean;
    value?: string;
    emptyResultsMessage?: string;
    optionComponent: any;
  }
> & {
  defaultOption?: ISearchMyCollegesOption;
};

export type SearchMyCollegesActions = ISearchActions<ISearchMyCollegesOption>;

type SearchMyCollegesProps = SearchCollegesViewModel & SearchMyCollegesActions;

class SearchMyColleges extends React.Component<SearchMyCollegesProps> {
  render() {
    return (
      <Search<ISearchMyCollegesOption>
        {...this.props}
        clearable={false}
        emptyResultsMessage={'No colleges found'}
        name={'search-my-colleges'}
        placeholder={'Search My Colleges'}
      />
    );
  }
}

export type ConnectedSearchMyCollegesProps = Subtract<SearchMyCollegesProps,
  {
    options: any;
    isLoading: any;
  }
  > & {
  inputValue: string;
  studentId: string;
};

export default SearchMyColleges;
