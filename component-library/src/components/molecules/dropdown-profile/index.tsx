import * as React from 'react';
import DropdownWrapper from '../../atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '../../atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '../../atoms/dropdown/dropdown-wrapper-menu';
import DropdownFooterWrapper from '../../atoms/dropdown/dropdown-wrapper-footer';
import Icon, { EIconName } from '../../atoms/icon';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import NavbarLink from '../../atoms/link-navbar';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import TextLink from '../../atoms/link-text';
// import SearchStudents from '../../molecules/search-students';
import { ECaretPosition, IEdmitPlusStatusProps } from '../../../shared'
import Text, { ETextType } from '../../atoms/typography/text';
import { Formik } from 'formik';
import { ConnectedSearchStudentsProps } from '../search-students'

export interface IDropdownProfileViewModel {
  student: {
    profileProgress: number; // 0 to 1
    firstName: string;
    lastName: string;
  };

  user: {
    superUser: boolean;
    outboundInvitationCount: number;
  };

  switchStudentSearchComponent: React.ComponentType<Partial<ConnectedSearchStudentsProps>>;
}

export interface IDropdownProfileActions {
  onLogout: () => any | void;
  onCompleteSignup: () => any | void;
  navLinkOnClickOverride?: (to: string) => void;
}

type DropdownProfileProps = IEdmitPlusStatusProps & IDropdownProfileViewModel & IDropdownProfileActions;

const DropdownProfile: React.SFC<DropdownProfileProps> = props => {
  const SwitchSearchStudents = props.switchStudentSearchComponent;
  return (
    <DropdownWrapper
      className="inline-flex self-stretch items-center"
      trigger={
        <DropdownLinkWrapper className="inline-flex self-stretch items-center">
          <NavbarLink to="/profile" label="" onClickOverride={props.navLinkOnClickOverride}>
            <Avatar
              type={EAvatarType.User}
              theme={EAvatarTheme.Offwhite}
              size={EAvatarSize.XSmall}
              // initials={`${props.user.firstName.charAt(0)}${props.user.lastName.charAt(0)}`}
              badge={
                props.hasEdmitPlus ? (
                  <Icon name={EIconName.EdmitPlus} className="icon-small crimson" />
                ) : (
                  undefined
                )
              }
            />
          </NavbarLink>
        </DropdownLinkWrapper>
      }
    >
      <DropdownMenuWrapper
        top={'36px'}
        right={'6px'}
        theme={EDropdownMenuTheme.White}
        caretPosition={ECaretPosition.Right}
      >
        <div style={{ minWidth: '240px' }}>
          <div className="pa2 flex flex-row">
            <Avatar
              type={EAvatarType.User}
              theme={EAvatarTheme.Offwhite}
              size={EAvatarSize.Medium}
              initials={`${props.student.firstName.charAt(0)}${props.student.lastName.charAt(0)}`}
              badge={
                props.hasEdmitPlus ? (
                  <Icon name={EIconName.EdmitPlus} className="icon-small crimson" />
                ) : (
                  undefined
                )
              }
            />
            <div className="mv3 ml2">
              <TextLink to="/profile" onClickOverride={props.navLinkOnClickOverride}>
                {props.student.firstName + ' ' + props.student.lastName}
              </TextLink>
            </div>
          </div>
          {props.user.superUser && (
            <div className="pa2 bt b--gray-light">
              <Text type={ETextType.Label} className="mt0 mb2 tc">
                Switch to
              </Text>
              <div className="search-small-container">
                <Formik<{ searchString: string }>
                  initialValues={{ searchString: '' }}
                  onSubmit={() => null}
                >
                  {({ values, setFieldValue }) => (
                    <SwitchSearchStudents
                      inputValue={values.searchString}
                      onSearch={newValue => setFieldValue('searchString', newValue)}
                      disablePortal
                    />
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
        <DropdownFooterWrapper>
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Secondary}
            text={'Log out'}
            onClick={props.onLogout}
          />
        </DropdownFooterWrapper>
      </DropdownMenuWrapper>
    </DropdownWrapper>
  );
};

export default DropdownProfile;
