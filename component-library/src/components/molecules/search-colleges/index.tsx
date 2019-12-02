import * as React from 'react';
import Search, { ISearchActions, ISearchViewModel } from '../../atoms/search';
import { Subtract } from '../../../lib/typescript'
import { ECollegeStatusMyColleges } from '../../../shared';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Text from '../../atoms/typography/text';
import { FitChip } from '../graph/fit';
import Icon, { EIconName } from '../../atoms/icon';

export interface ISearchCollegeOption {
  id: string;
  abbreviation?: string;
  name: string;
  location: string;
  logoSrc?: string;
  slug?: string;
  collegeStatusMyColleges?: ECollegeStatusMyColleges;
  collegeFitScore?: number;

  testId?: string;
}

const CollegeSearchComponent: React.SFC<ISearchCollegeOption> = props => (
  <div className={'flex flex-row items-center justify-between pa2 '}>
    <div className="flex flex-row items-center">
      <div className="mr2">
        {props.logoSrc ? (
          <Avatar
            type={EAvatarType.College}
            theme={EAvatarTheme.Offwhite}
            size={EAvatarSize.Small}
            logoSrc={props.logoSrc}
          />
        ) : props.abbreviation ? (
          <Avatar
            type={EAvatarType.User}
            theme={EAvatarTheme.Offwhite}
            size={EAvatarSize.Small}
            initials={props.abbreviation.substring(0, 2)}
          />
        ) : null}
      </div>
      <div>
        <Text className="mv0 t-medium black fw7 ">{props.name}</Text>
        {props.location && <Text className="mv0 t-small">{props.location}</Text>}
      </div>
    </div>
    <div>
      {props.collegeFitScore && (
        <FitChip admissionUnlikely={false} totalFitScore={90} loading={false} />
      )}
      {props.collegeStatusMyColleges && (
        <div>
          {props.collegeStatusMyColleges === ECollegeStatusMyColleges.Added && (
            <Icon name={EIconName.Success} className="crimson icon-large" disabled={false} />
          )}
          {props.collegeStatusMyColleges === ECollegeStatusMyColleges.NotAdded && (
            <Icon name={EIconName.Add} className="gray-muted icon-large" />
          )}
        </div>
      )}
    </div>
  </div>
);

export type SearchCollegesViewModel = Subtract<
  ISearchViewModel<ISearchCollegeOption>,
  {
    name: string;
    placeholder: string;
    emptyResultsMessage?: string;
    optionComponent: any;
    testId?: string;
  }
> & {
  defaultOption?: ISearchCollegeOption;
  testId?: string;
};

export type SearchCollegesActions = ISearchActions<ISearchCollegeOption>;

type SearchCollegesProps = SearchCollegesViewModel & SearchCollegesActions;

class SearchColleges extends React.Component<SearchCollegesProps> {
  render() {
    return (
      <Search<ISearchCollegeOption>
        {...this.props}
        testId={this.props.testId}
        emptyResultsMessage={'No colleges found'}
        name={'search-colleges'}
        getLabel={opt => opt.name}
        disabled={this.props.disabled}
        placeholder={'Search colleges'}
        options={
          this.props.defaultOption
            ? [...this.props.options, this.props.defaultOption]
            : this.props.options
        }
        optionComponent={CollegeSearchComponent}
      />
    );
  }
}

export type ConnectedSearchCollegesProps = Subtract<SearchCollegesProps,
  {
    options: any;
    isLoading: any;
  }
> & {
  myColleges: Array<{ id: string }>;
  inputValue: string;
};

export default SearchColleges;
