import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';

import AppNav from '../../../connectors/organisms/nav-app';
import AppMenuNav from '../../../connectors/organisms/nav-menu-app';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import { ExtractPropsFromComponent } from '@edmit/component-library/src/lib/typescript';
import { WiredModals } from "../../../containers/organisms/modals";
import { usePaywall } from "../../../hooks/paywall";
import { ConnectedSearchStudentsProps } from '@edmit/component-library/src/components/molecules/search-students'
import Footer from '@edmit/component-library/src/components/molecules/footer'
import { ConnectedSidebar } from '../../../connectors/organisms/sidebar';

export interface IAppTemplateViewModel {
  studentId: string | null;
  loading: boolean;
  student: {
    profileProgress: number; // 0 to 1
    firstName: string;
    lastName: string;
  } | null;

  user: {
    superUser: boolean;
    outboundInvitationCount: number;
    notifications: NonNullable<ExtractPropsFromComponent<typeof AppNav>['user']>['notifications'];
  } | null;

  iconName?: EIconName;

  mobileMenuShown: boolean;

  switchStudentSearchComponent: React.ComponentType<Partial<ConnectedSearchStudentsProps>>;

  modalController?: JSX.Element;
  sabrinaBot: JSX.Element;
}

export interface IAppTemplateActions {
  switchStudent: (studentId: string) => void;
  setMobileMenuShown: (shown: boolean) => void;

  onLogin: () => void;
  onLogout: () => void;
  onSignup: () => void;
  onClickLogo: () => void;
  onConsult: () => void;
  onAskQuestion: () => void;
  onMarkNotificationsAsRead: (ids: string[]) => void;

  setHotlineModalShown: (shown: boolean) => void;
  openPurchaseModal: (reason: string | null) => void;
  showInviteModal: () => void;
  showProfileCompletionModal: () => void;

  navLinkOnClickOverride?: (to: string) => void;
}

type AppTemplateProps = IAppTemplateViewModel & IAppTemplateActions;

export const AppTemplate: React.SFC<AppTemplateProps> = props => {
  const paywall = usePaywall();

  const appSidebarStyle = {
    background: "#EDEDED",
    minWidth: "300px"
  }

  return (
    <div style={{ paddingTop: '48px' }}>
      <div className="bg-offwhite bg-app-layout" />
      {props.iconName && <Icon name={props.iconName} className={'bg-icon'} />}
      <AppNav
        loading={props.loading}
        user={props.user}
        student={props.student}
        onLogin={props.onLogin}
        onLogout={props.onLogout}
        onSignup={props.onSignup}
        onToggleMobileMenu={() => props.setMobileMenuShown(!props.mobileMenuShown)}
        onUpgrade={props.openPurchaseModal}
        onConsult={props.onConsult}
        onAskQuestion={props.onAskQuestion}
        onCompleteSignup={() => null}
        onClickLogo={props.onClickLogo}
        onInvite={props.showInviteModal}
        onOpenProfileCompletionModal={props.showProfileCompletionModal}
        onMarkNotificationsAsRead={props.onMarkNotificationsAsRead}
        switchStudentSearchComponent={props.switchStudentSearchComponent}
        navLinkOnClickOverride={props.navLinkOnClickOverride}
      />
      <div className="w-100 fixed flex">
        <div style={appSidebarStyle} className="pa3 w-25 dn db-l">
          <ConnectedSidebar />
        </div>
        <div id="mainDiv" className="flex-auto w-75-l overflow-y-auto vh-100">
          <div className="db dn-l">
            <AppMenuNav
              hasEdmitPlus={paywall.hasEdmitPlus}
              organizationLogoUrl={null}
              user={props.user}
              student={props.student}
              active={props.mobileMenuShown}
              onHotline={() => props.setHotlineModalShown(true)}
              onConsult={props.onConsult}
              onLogin={props.onLogin}
              onLogout={props.onLogout}
              onSignup={props.onSignup}
              onCompleteSignup={() => {
                props.setMobileMenuShown(!props.mobileMenuShown);
              }}
              onCloseMobileMenu={() => {
                props.setMobileMenuShown(false);
              }}
              onInvite={props.showInviteModal}
              switchStudentSearchComponent={props.switchStudentSearchComponent}
              navLinkOnClickOverride={props.navLinkOnClickOverride}
            />
          </div>
          <div className="app-nav-marketing-footer-offset">
            {props.children}
            <Footer />
            <div
              className={'fixed z-999'}
              style={{ top: 75, bottom: 25, right: 40, pointerEvents: 'none' }}
            >
              {props.sabrinaBot}
            </div>
          </div>
          {props.modalController}
          <WiredModals />
        </div>
      </div>
    </div >
  );
};

export default AppTemplate;
