import * as React from 'react';
import Select, { components } from 'react-select';
import { OptionProps } from 'react-select/lib/components/Option';
import Icon, { EIconName } from '../icon';
import { hexGrayLight } from '../colors';
import Text from '../typography/text';
import { uniqBy } from 'lodash';

//See index.stories.tsx in 'molecules/search'

// const SelectArrow = () => <Icon name={EIconName.ChevronDown} className="gray-muted icon-large" />;

// interface ISearchOptionProps {
//   option: ISearchOption;
//   onSelect: (option: ISearchOption, event: any) => void;
//   isFocused: boolean;
// }

// type GoalValueOptionProps = ISearchOption;

// const GoalValueOption: React.SFC<GoalValueOptionProps> = props => (
//   <div className="Select-value">
//     <div className="flex flex-row items-center justify-between pa2 pointer">
//       <div className="flex flex-row items-center">
//         <Avatar
//           type={EAvatarType.Colleges}
//           theme={EAvatarTheme.Offwhite}
//           size={EAvatarSize.Small}
//           logoSrc={props.avatarLogoSrc}
//         />
//         <Text className="mv0 ml2 t-medium black fw7 ">{props.label}</Text>
//       </div>
//       <div className="pr2">
//         <span className="merriweather fw7 f4 lh-solid">
//           {props.collegeFitScore &&
//             (props.collegeFitScore > 90 ? (
//               <span style={{ color: hexGreen }}>{props.collegeFitScore}</span>
//             ) : props.collegeFitScore < 75 ? (
//               <span style={{ color: hexRed }}>{props.collegeFitScore}</span>
//             ) : (
//               <span style={{ color: hexYellow }}>{props.collegeFitScore}</span>
//             ))}
//         </span>
//       </div>
//     </div>
//   </div>
// );

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon name={EIconName.Search} className="gray-muted icon-large" />
      </components.DropdownIndicator>
    )
  );
};

export interface ISearchViewModel<IOption> {
  name: string;
  placeholder: string;
  getLabel?: (option: IOption) => string;
  disabled?: boolean;
  selected?: IOption | null;
  options: IOption[];
  optionComponent?: React.ComponentType<IOption>;
  emptyResultsMessage?: string;
  clearable?: boolean;
  isLoading?: boolean;
  disablePortal?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export interface ISearchActions<IOption> {
  onSelected?: (option: IOption) => void;
  onClear?: () => void;
  onSearch: (query: string) => void;
}

type SearchProps<IOption> = ISearchViewModel<IOption> & ISearchActions<IOption>;

class Search<IOption> extends React.Component<SearchProps<IOption>> {
  render() {
    if (typeof window == "undefined") return <span />

    const OptionComponent = this.props.optionComponent;
    const Option: React.SFC<OptionProps<any> & { data: any }> = customOptionProps => (
      <components.Option  {...customOptionProps}>
        {OptionComponent ? (
          <OptionComponent {...customOptionProps.data} />
        ) : (
            <div data-testid={"option"} data-testlabel={customOptionProps.getValue()} className={'flex flex-row items-center justify-between pa2 '}>
              <div className="flex flex-row items-center">
                <div>
                  <Text className="mv0 t-medium black fw7 ">{customOptionProps.data.label}</Text>
                </div>
              </div>
            </div>
          )}
      </components.Option>
    );

    const getLabel = this.props.getLabel || ((opt: IOption) => (opt as any).label);

    const SingleValue = (props: any) => {
      return (
        components.SingleValue && (
          <components.SingleValue {...props}>
            {this.props.selected ? getLabel(this.props.selected!) : props.children}
          </components.SingleValue>
        )
      );
    };

    return (
      <Select<IOption>
        placeholder={this.props.placeholder || 'Search...'}
        options={uniqBy(
          this.props.options.map(option => Object.assign({ label: getLabel(option) }, option)),
          'label'
        )}
        value={this.props.selected}
        menuPortalTarget={!this.props.disablePortal ? (window.document ? window.document.getElementById('search-root') : null) : null}
        styles={{
          control: base => ({
            ...base,
            backgroundColor: 'white',
            border: `1px solid ${hexGrayLight} !important`,
            boxShadow: 'none',
            cursor: 'text',
            paddingBottom: '.25rem',
            paddingTop: '.25rem',
            ...this.props.style
          }),
          indicatorSeparator: () => ({
            display: 'none'
          }),
          menu: base => ({
            ...base,
            border: `1px solid ${hexGrayLight} !important`,
            boxShadow: 'none',
            zIndex: 10
          }),
          menuPortal: base => ({ ...base, zIndex: 10002 }),
          option: (base, { isFocused }) => ({
            ...base,
            cursor: 'pointer',
            ...(isFocused
              ? {
                backgroundColor: hexGrayLight
              }
              : {})
          }),
          singleValue: base => ({
            ...base,
            cursor: 'text'
          })
        }}
        components={{ Option, DropdownIndicator, SingleValue }}
        onInputChange={(query: string) => {
          this.props.onSearch(query);
          return query;
        }}
        onChange={((option: IOption, actionMeta: any) => {
          if (actionMeta.action === 'clear' && this.props.onClear) {
            this.props.onClear();
            return;
          }

          if (option === null && this.props.onSearch) {
            this.props.onSearch('');
          } else if (this.props.onSelected && JSON.stringify(option) !== JSON.stringify([])) {
            this.props.onSelected(option);
          }
        }) as any}
        isMulti={false}
        isOptionSelected={() => false}
        isDisabled={this.props.disabled}
        isClearable={this.props.clearable}
        isLoading={this.props.isLoading}
        className={this.props.className}
      />
    );
  }
}

export default Search;
