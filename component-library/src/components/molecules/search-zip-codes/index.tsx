import * as React from 'react';
import Search, { ISearchActions, ISearchViewModel } from '../../atoms/search';
import { Subtract } from '../../../lib/typescript'
// import { OptionProps } from 'react-select/lib/components/Option';

export interface ISearchZipCodesOption {
  id: string;
  label: string;

}

type SearchZipCodesViewModel = Subtract<
  ISearchViewModel<ISearchZipCodesOption>,
  {
    name: string;
    placeholder: string;
    disabled?: boolean;
    value?: string;
    emptyResultsMessage?: string;
    optionComponent: any;
  }
> & {
  placeholder?: string;
  defaultOption?: ISearchZipCodesOption;
};

type SearchZipCodesActions = ISearchActions<ISearchZipCodesOption>;

type SearchZipCodesProps = SearchZipCodesViewModel & SearchZipCodesActions;

const SearchZipCodes: React.SFC<SearchZipCodesProps> = props => {
  return (
    <Search<ISearchZipCodesOption>
      {...props}
      disabled={false}
      emptyResultsMessage={'No zip codes found'}
      name={'search-zip-codes'}
      placeholder={props.placeholder || 'Search zip codes'}
      options={props.defaultOption ? [...props.options, props.defaultOption] : props.options}
    />
  );
};

export type ConnectedSearchZipCodesProps = Subtract<SearchZipCodesProps,
  {
    options: any;
    isLoading: any;
  }
> & {
  inputValue: string;
};

export default SearchZipCodes;
