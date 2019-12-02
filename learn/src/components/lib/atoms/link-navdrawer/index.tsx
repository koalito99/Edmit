import * as React from 'react';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';

export interface INavdrawerLinkViewModel {
  to: string;
  iconName?: EIconName;
  label: string;
  children?: any;
  onClick?: () => void;
}

type NavdrawerLinkProps = INavdrawerLinkViewModel;

const NavdrawerLink: React.SFC<NavdrawerLinkProps> = props => (
  <a
    href={props.to}
    onClick={props.onClick}
    className="lato pa3 no-underline fw7 gray-dim hover-crimson hover-bg-offwhite relative"
  >
    {props.iconName && <Icon name={props.iconName} className="mr1" />}
    {props.label}
    {props.children}
  </a>
);

export default NavdrawerLink;
