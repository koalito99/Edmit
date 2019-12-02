import * as React from 'react';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';

// import NotificationBadge from '../badge-notification';

export interface INavbarLinkViewModel {
  to: string;
  iconName?: EIconName;
  label: string;
  children?: any;
}

type NavbarLinkProps = INavbarLinkViewModel;

const NavbarLink: React.SFC<NavbarLinkProps> = props => (
  <a
    href={props.to}
    className="lato inline-flex self-stretch items-center ph2 no-underline fw7 t-medium gray-dim hover-crimson relative"
  >
    {props.iconName && <Icon name={props.iconName} className="mr1" />}
    {props.label}
    {props.children}
    {/* <NotificationBadge badgeCount={2} /> */}
  </a>
);

export default NavbarLink;
