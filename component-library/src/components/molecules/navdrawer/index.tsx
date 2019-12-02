import * as React from 'react';

export interface INavdrawerViewModel {
  children?: any;
  top: number;
  right?: boolean;
  active: boolean;
  zIndex: number;
  classNameContainer?: string;
  minWidth: number;
}

type NavdrawerProps = INavdrawerViewModel;

const Navdrawer: React.SFC<NavdrawerProps> = props => (
  <nav
    className={
      'bg-white fixed nav-drawer ' +
      (props.active ? 'shadow-nav-drawer ' : ' ') +
      props.classNameContainer
    }
    style={{
      height: `calc(100vh - ${props.top}px)`,
      left: props.right ? '' : props.active ? 0 : '-100%',
      minWidth: props.minWidth,
      opacity: props.active ? 1 : 0.5,
      right: props.right ? (props.active ? 0 : '-100%') : '',
      top: props.top,
      zIndex: props.zIndex
    }}
  >
    <div className="h-100 flex flex-column overflow-y-scroll">{props.children}</div>
  </nav>
);

export default Navdrawer;
