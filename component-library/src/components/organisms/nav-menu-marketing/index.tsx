import * as React from 'react';
import Navdrawer from '../../molecules/navdrawer';
import NavdrawerLink from '../../atoms/link-navdrawer';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Text from '../../atoms/typography/text';
import TextLink from '../../atoms/link-text';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';

export interface IMarketingMenuNavViewModel {
  user: {
    firstName: string;
    lastName: string;
    profileProgress: number;
  } | null;
  active: boolean;
}

export interface IMarketingMenuNavActions {
  onSignup?: () => any | void;
  onLogin?: () => any | void;
  onLogout?: () => any | void;
}

type MarketingMenuNavProps = IMarketingMenuNavViewModel & IMarketingMenuNavActions;

const MarketingMenuNav: React.SFC<MarketingMenuNavProps> = props => (
  <Navdrawer
    top={48}
    active={props.active}
    zIndex={998}
    minWidth={280}
    classNameContainer="nav-menu-marketing"
  >
    <NavdrawerLink to="/" label="Home" />
    <NavdrawerLink to="/features" label="Features" />
    <NavdrawerLink to="/pricing" label="Pricing" />
    <NavdrawerLink to="/browse" label="Browse" />
    <span className="flex-auto" />
    <div className="bt b--gray-light">
      {props.user ? (
        <div className="flex flex-column relative">
          <div className="pa2 flex flex-row items-center">
            <div className="mr2">
              <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.Offwhite}
                size={EAvatarSize.Medium}
                initials={`${props.user.firstName.charAt(0)}${props.user.lastName.charAt(0)}`}
              />
            </div>
            <div>
              <Text className="black mv0 fw7 t-medium">
                {props.user.firstName + ' ' + props.user.lastName}
              </Text>
              <TextLink to="/profile">Go to Profile</TextLink>
            </div>
          </div>
          <div className="pa3 bt b--gray-light bg-offwhite">
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              text={'Log out'}
              onClick={props.onLogout}
            />
          </div>
        </div>
      ) : (
        <div className="pa3 bg-offwhite">
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={'Sign up'}
            spacing={true}
            onClick={props.onSignup}
          />
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Secondary}
            text={'Log in'}
            onClick={props.onLogin}
          />
        </div>
      )}
    </div>
  </Navdrawer>
);

export default MarketingMenuNav;
