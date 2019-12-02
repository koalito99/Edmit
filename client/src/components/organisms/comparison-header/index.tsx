import * as React from 'react';

import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Navbar from '@edmit/component-library/src/components/molecules/navbar';
// import { useScroll } from '../../../hooks/scroll'
import { useScroll } from '../../../hooks/scroll';
import { ConnectedSearchCollegesProps } from '@edmit/component-library/src/components/molecules/search-colleges'

interface ICompareHeaderCollege {
  id: string;
  name: string;
  location: string;
  color: string;
}

interface ICompareHeaderViewModel {
  leftCollege: ICompareHeaderCollege | null;
  rightCollege: ICompareHeaderCollege | null;

  leftSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  rightSearchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
}

type CompareHeaderProps = ICompareHeaderViewModel;

const CollegeDetail: React.FC<{
  college: ICompareHeaderCollege | null;
  searchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  collapsed: boolean;
}> = props => {
  const SearchColleges = props.searchCollegesComponent;

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <div className={'center w-40 tc ph1 ' + (!props.collapsed ? 'pv3' : 'pv1')}>
        <div className="w-70-ns ma-auto">
          {props.college ? (
            <>
              {/*
        <Text className={"t-large " + (props.collapsed && "mv0")} style={{ color: props.college.color }}>{props.college.name} &nbsp;<Icon name={EIconName.Edit} className="t-large" /></Text>
*/}
              <SearchColleges
                selected={props.college}
                inputValue={searchQuery}
                myColleges={[]}
                onSearch={setSearchQuery}
              />
              {!props.collapsed && <Text className="t-medium i">{props.college.location}</Text>}
            </>
          ) : (
              <SearchColleges inputValue={searchQuery} myColleges={[]} onSearch={setSearchQuery} />
            )}
        </div>
      </div>
    </>
  );
};

const CompareHeader: React.SFC<CompareHeaderProps> = props => {
  const scrollPos = useScroll();
  const collapsed = scrollPos > 150;

  return (
    <Navbar
      fixed={true}
      top={22}
      zIndex={997}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        maxWidth: 'unset',
        userSelect: 'unset'
      }}
    >
      <div className={'flex flex-wrap bg-white mt4 w-100'}>
        <CollegeDetail
          college={props.leftCollege}
          searchCollegesComponent={props.leftSearchCollegesComponent}
          collapsed={collapsed}
        />
        <div className="relative ma0 center w-10 tc">
          <div className="line absolute top-0 bottom-0 bg-moon-gray z-1" />
          <div className="wordwrapper tc absolute left-0 right-0 z-2 top-50">
            <div className="bg-white i">VS</div>
          </div>
        </div>
        <CollegeDetail
          college={props.rightCollege}
          searchCollegesComponent={props.rightSearchCollegesComponent}
          collapsed={collapsed}
        />
      </div>
      <div>{props.children}</div>
    </Navbar>
  );
};

export default CompareHeader;
