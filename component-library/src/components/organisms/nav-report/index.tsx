import * as React from 'react';
import Navbar from '../../molecules/navbar';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Icon, { EIconName } from '../../atoms/icon';

interface IReportNavViewModel {
  colleges: Array<{
    id: string;
    abbreviation: string;
    logoSrc: string | null;
    name: string;
  }>;
}

interface IReportNavActions {
  onOpenCollegeSearchOverlay: () => void;
}

type ReportNavProps = IReportNavViewModel & IReportNavActions;

const ReportNav: React.SFC<ReportNavProps> = props => (
  <Navbar
    fixed={true}
    top={48}
    zIndex={997}
    height={66}
    classNameContainer="nav-compare"
  >
    <div className="w-100 flex" style={{ height: 66 }}>
        <div className={"flex"}>
          {props.colleges.map(college => <div key={college.id} className="flex flex-zero items-stretch br b--light-gray">
            <Avatar
              type={EAvatarType.College}
              theme={EAvatarTheme.Offwhite}
              size={EAvatarSize.Medium}
              initials={!college.logoSrc && college.abbreviation || undefined}
              logoSrc={college.logoSrc || undefined}
              className={'box-topSecHeader'}
            />
            <div className={"flex items-center"}><p className="text-topSecHeader lato fw6 t-medium gray-dim hover-crimson" style={{ margin: 0, maxHeight: '65%', lineHeight: 1.25 }}>{college.name}</p></div>
          </div>)}
        </div>
        <div className="flex-shrink-0 flex-grow-1 mr3-ns b--light-gray pointer" onClick={props.onOpenCollegeSearchOverlay}>
          <Icon name={EIconName.Plus} className="icon-xxlarge green fl-ns mt1-ns ml2-ns mr1-ns" />
          <div className="pt1-ns pv2-ns pb2-ns">
            <span className="text-addCollege lato fw6 t-medium gray-dim hover-crimson relative db">Add or Edit Colleges</span>
          </div>
        </div>

    </div>
  </Navbar>
);

export default ReportNav;