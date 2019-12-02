import * as React from 'react';
import Search, { ISearchActions, ISearchViewModel } from '../../atoms/search';
import Text, { ETextType } from '../../atoms/typography/text';
import { Subtract } from '../../../lib/typescript'

export interface ISearchHighSchoolOption {
  id: string;
  name: string;
  zipCode: string;
}

const HighSchoolSearchComponent: React.SFC<ISearchHighSchoolOption> = props => (
  <div className={'flex flex-row items-center justify-between pa2 '}>
    <div className="flex flex-row items-center">
      <div>
        <Text className="mv0 t-medium black fw7">{props.name}</Text>
        <Text type={ETextType.Caption} className="mv0">
          in {props.zipCode}
        </Text>
      </div>
    </div>
  </div>
);

type SearchHighSchoolsViewModel = Subtract<
  ISearchViewModel<ISearchHighSchoolOption>,
  {
    name: string;
    placeholder: string;
    disabled?: boolean;
    value?: string;
    emptyResultsMessage?: string;
    optionComponent: any;
  }
> & {
  defaultOption?: ISearchHighSchoolOption;
};

type SearchHighSchoolsActions = ISearchActions<ISearchHighSchoolOption>;

type SearchHighSchoolsProps = SearchHighSchoolsViewModel & SearchHighSchoolsActions;

class SearchHighSchools extends React.Component<SearchHighSchoolsProps> {
  render() {
    return (
      <Search<ISearchHighSchoolOption>
        {...this.props}
        options={
          this.props.defaultOption
            ? [...this.props.options, this.props.defaultOption]
            : this.props.options
        }
        getLabel={opt => opt.name}
        disabled={false}
        emptyResultsMessage={'No high schools found'}
        name={'search-high-schools'}
        placeholder={'Search high schools'}
        optionComponent={HighSchoolSearchComponent}
      />
    );
  }
}

export type ConnectedSearchHighSchoolsProps = Subtract<SearchHighSchoolsProps,
  {
    options: any;
    isLoading: any;
  }
  > & {
  inputValue: string;
};

export default SearchHighSchools;
