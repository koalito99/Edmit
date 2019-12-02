import * as React from 'react';
import Icon, { EIconName } from '../icon';
import { NavLink } from 'react-router-dom';

export interface INavdrawerLinkViewModel {
  to: string;
  iconName?: EIconName;
  label: string;
  children?: any;
  onClick?: () => void;
  onClickOverride?: (to: string) => void;
}

type NavdrawerLinkProps = INavdrawerLinkViewModel;

const NavdrawerLink: React.SFC<NavdrawerLinkProps> = props => (
  <NavLink
    to={props.to}
    onClick={e => {
      if (props.onClickOverride) {
        e.preventDefault();
        return props.onClickOverride(props.to);
      }

      return props.onClick && props.onClick();
    }}
    className="lato pa3 no-underline fw7 gray-dim hover-crimson hover-bg-offwhite relative"
    activeClassName="nav-link-active"
  >
    {props.iconName && <Icon name={props.iconName} className="mr1" />}
    {props.label}
    {props.children}
  </NavLink>
);

export default NavdrawerLink;
