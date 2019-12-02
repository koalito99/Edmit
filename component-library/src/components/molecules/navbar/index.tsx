import * as React from 'react';

export interface INavbarViewModel {
  fixed: boolean;
  children?: any;
  top?: number;
  zIndex?: number;
  classNameContainer?: string;
  className?: string;
  height?: number;
  styleContainer?: React.CSSProperties;
  style?: React.CSSProperties;
}

type NavbarProps = INavbarViewModel;

const Navbar: React.SFC<NavbarProps> = props => (
  <nav
    className={
      'ph3 bg-white w-100 center shadow-nav ' + (props.fixed ? 'fixed ' : '') + props.classNameContainer
    }
    style={{ ...props.fixed ? { top: props.top, zIndex: props.zIndex } : {}, ...props.styleContainer }}
  >
    <div
      className={'center ' + props.className}
      style={{
        height: props.height ? props.height : 48,
        userSelect: "none",
        ...props.style
      }}
    >
      {props.children}
    </div>
  </nav>
);

export default Navbar;
