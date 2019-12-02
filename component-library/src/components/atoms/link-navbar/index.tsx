import * as React from 'react';
import Icon, { EIconName } from '../icon';
import { NavLink } from 'react-router-dom';

// import NotificationBadge from '../badge-notification';

export interface INavbarLinkViewModel {
  to: string;
  iconName?: EIconName;
  label: string;
  children?: any;
  isSubmenu?: boolean;
}

export interface INavbarLinkActions {
  onClick?: () => void;
  onClickOverride?: (to: string) => void;
}

type NavbarLinkProps = INavbarLinkViewModel & INavbarLinkActions;

const NavbarLink: React.SFC<NavbarLinkProps> = props => (
  <NavLink
    to={props.to}
    className={`lato inline-flex self-stretch no-underline fw7 t-medium gray-dim hover-crimson relative ${props.isSubmenu ? 'ph2' : 'items-center ph3'}`}
    activeClassName="nav-link-active"
    onClick={e => {
      if (props.onClickOverride) {
        e.preventDefault();
        return props.onClickOverride(props.to);
      }

      return props.onClick && props.onClick();
    }}
  >
    {props.iconName && <Icon name={props.iconName} className="mr1" />}
    {props.label}
    {props.children}
    {/* <NotificationBadge badgeCount={2} /> */}
  </NavLink>
);

export default NavbarLink;
