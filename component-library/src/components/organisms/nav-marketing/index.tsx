import * as React from 'react';
import Navbar from '../../molecules/navbar';
import NavbarLink from '../../atoms/link-navbar';
import Logo, { ELogoColor } from '../../atoms/logo';
import Text from '../../atoms/typography/text';
import Icon, { EIconName } from '../../atoms/icon';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';

export interface IMarketingNavViewModel {
  user: {
    firstName: string;
    lastName: string;
    profileProgress: number;
  } | null;
}

export interface IMarketingNavActions {
  switchStudent?: (studentId: string) => void;
  onToggleMobileMenu: () => void;
  onSignup: () => void;
  onLogin: () => void;
  onClickLogo: () => void;
}

type MarketingNavProps = IMarketingNavViewModel & IMarketingNavActions;

const MarketingNav: React.SFC<MarketingNavProps> = props => (
  <Navbar
    fixed={true}
    top={0}
    zIndex={999}
    classNameContainer="nav-marketing"
    className="flex flex-row justify-between items-center"
  >
    <div className="mr3 flex-shrink-0">
      <Logo color={ELogoColor.Crimson} width={72} onClick={props.onClickLogo} />
    </div>
    <span className="flex-auto" />
    <span className="dn inline-flex-l self-stretch-l">
      {props.user ? (
        <span className="inline-flex self-stretch items-center">
          <NavbarLink to="/profile" label="">
            <div className="nav-avatar">
              <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.Offwhite}
                size={EAvatarSize.XSmall}
                initials={`${props.user.firstName.charAt(0)}${props.user.lastName.charAt(0)}`}
              />
            </div>
          </NavbarLink>
        </span>
      ) : (
          <span className="inline-flex self-stretch items-center">
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              text={'Log in'}
              onClick={props.onLogin}
            />
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Primary}
              text={'Sign up free'}
              spacing={true}
              onClick={props.onSignup}
            />
          </span>
        )}
    </span>
    <span className="dib dn-l" onClick={props.onToggleMobileMenu}>
      <Text className="mv0 inline-flex self-stretch items-center ph2 fw7 t-medium hover-crimson pointer">
        Menu
        <Icon name={EIconName.Menu} className="ml1 icon-large" />
      </Text>
    </span>
  </Navbar>
);

export default MarketingNav;
