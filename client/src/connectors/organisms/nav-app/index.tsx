import * as React from 'react';
import Navbar from '@edmit/component-library/src/components/molecules/navbar';
import Logo, { ELogoColor } from '@edmit/component-library/src/components/atoms/logo';
import DropdownNotifications from '@edmit/component-library/src/components/molecules/dropdown-notifications';
import { ExtractPropsFromComponent } from '@edmit/component-library/src/lib/typescript';
import withSizes from 'react-sizes';
import { ConnectedSearchStudentsProps } from '@edmit/component-library/src/components/molecules/search-students'
import { ConnectedTopMenu } from '../sidebar';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import { usePaywall } from '../../../hooks/paywall';

export interface IAppNavViewModel {
  student: {
    profileProgress: number; // 0 to 1
    firstName: string;
    lastName: string;
  } | null;

  user: {
    superUser: boolean;
    outboundInvitationCount: number;
    notifications: ExtractPropsFromComponent<typeof DropdownNotifications>['notifications'];
  } | null;

  isMobile?: boolean;

  switchStudentSearchComponent: React.ComponentType<Partial<ConnectedSearchStudentsProps>>;

  loading: boolean;
}

export interface IAppNavActions {
  switchStudent?: (studentId: string) => void;
  onToggleMobileMenu: () => void;
  onSignup: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onUpgrade: (reason: string | null) => void;
  onConsult: () => void;
  onAskQuestion: () => void;
  onInvite: () => void;
  onCompleteSignup: () => void;
  onClickLogo: () => void;
  onOpenProfileCompletionModal: () => void;
  onMarkNotificationsAsRead: (ids: string[]) => void;

  navLinkOnClickOverride?: (to: string) => void;
}

type AppNavProps = IAppNavViewModel & IAppNavActions;

const AppNav: React.FC<AppNavProps> = props => {
  // const { hasEdmitPlus, organizationLogoUrl, openPlanSelectionModal, setSelectedProductId, hasEdmitPlusLoading } = usePaywall();

  // const openPaywallModal = () => {
  //   setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
  //   openPlanSelectionModal('to Edmit Plus');
  // }

  // const openCalendar = () => {
  //   window.location.href = "https://calendly.com/edmit-advising/edmit-consultation";
  // }
  const paywall = usePaywall()

  return (
    <Navbar
      fixed={true}
      top={0}
      zIndex={999}
      classNameContainer="nav-app"
      className="flex flex-row justify-between items-center"
    >
      <div className="mr3 flex-shrink-0">
        <div className="flex flex-end">
          <div>
            <Logo color={ELogoColor.Crimson} width={72} onClick={props.onClickLogo} />
          </div>
          {paywall.organizationLogoUrl && (
            <div className="pl3">
              <img style={{ height: 30 }} className="h-100" src={paywall.organizationLogoUrl} />
            </div>
          )}
        </div>
      </div>
      <span className="dn inline-flex-l self-stretch-l">
        <ConnectedTopMenu />
      </span>
      {/* <NavbarLink to="/my-colleges" label="College List" onClickOverride={props.navLinkOnClickOverride} />
        <NavbarLink to="/recommendations" label="Recommendations" onClickOverride={props.navLinkOnClickOverride} />
        <NavbarLink to="/onboarding" label="Tour" onClickOverride={props.navLinkOnClickOverride} />
        <NavbarLink to="/report" label="Report" onClickOverride={props.navLinkOnClickOverride} />
        <NavbarLink to="/appeals" label="Aid Letters" onClickOverride={props.navLinkOnClickOverride} />
        {!hasEdmitPlus && <Button onClick={openPaywallModal}
          size={EButtonSize.Medium}
          type={EButtonType.Primary}
          text={'Schedule a Consult'}
        />}
        {hasEdmitPlus && <Button onClick={openCalendar}
          size={EButtonSize.Medium}
          type={EButtonType.Primary}
          text={'Schedule a Consult'}
        />}
      </span>
      <span className="flex-auto" />
      <span className="flex-auto dn-l" />
      {!props.loading && (
        <span className="dn inline-flex-l self-stretch-l">
          {props.user != null && props.student != null ? (
            <span className="inline-flex self-stretch items-center relative">
              {organizationLogoUrl ? (<img style={{ maxHeight: 30 }} src={organizationLogoUrl} />) : (<span />)}
              <DropdownProfile
                organizationLogoUrl={organizationLogoUrl}
                user={props.user}
                student={props.student}
                hasEdmitPlus={hasEdmitPlus}
                onLogout={props.onLogout}
                onCompleteSignup={props.onCompleteSignup}
                switchStudentSearchComponent={props.switchStudentSearchComponent}
                navLinkOnClickOverride={props.navLinkOnClickOverride}
              />
              {(!hasEdmitPlusLoading && !hasEdmitPlus) &&
                <Button
                  size={EButtonSize.Medium}
                  type={EButtonType.Secondary}
                  text={'Free Month'}
                  onClick={props.onInvite}
                  icon={{
                    name: EIconName.Gift,
                    position: EButtonIconPosition.Left
                  }}
                />
              }
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
      )}
      <span className="dib dn-l">
        {(!hasEdmitPlus && !hasEdmitPlusLoading) &&
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Secondary}
            text={''}
            onClick={props.onInvite}
            icon={{
              name: EIconName.Gift,
              position: EButtonIconPosition.Right
            }}
          />
        }
      </span>*/}
      <span className="dib dn-l" onClick={props.onToggleMobileMenu}>
        <Text className="mv0 inline-flex self-stretch items-center ml2 fw7 t-medium hover-crimson pointer">
          Menu
          <Icon name={EIconName.Menu} className="ml1 icon-large" />
        </Text>
      </span>
    </Navbar>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 960
});

export default withSizes(mapSizesToProps)(AppNav) as typeof AppNav;
