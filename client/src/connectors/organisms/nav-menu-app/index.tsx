import * as React from 'react';
import Navdrawer from '@edmit/component-library/src/components/molecules/navdrawer';
// import NotificationBadge from '../../atoms/badge-notification';
// import { hexGrayDim } from '../../atoms/colors';
import { ConnectedSearchStudentsProps } from '@edmit/component-library/src/components/molecules/search-students'
import { IEdmitPlusStatusProps } from '@edmit/component-library/src/shared';
import { ConnectedNavDrawerMenu } from '../sidebar';
import { usePaywall } from '../../../hooks/paywall';

export interface IAppMenuNavViewModel {
  student: {
    profileProgress: number; // 0 to 1
    firstName: string;
    lastName: string;
  } | null;

  user: {
    superUser: boolean;
    outboundInvitationCount: number;
  } | null;

  active: boolean;
  switchStudentSearchComponent: React.ComponentType<Partial<ConnectedSearchStudentsProps>>;
}

export interface IAppMenuNavActions {
  onLogout: () => void;
  onSignup: () => void;
  onLogin: () => void;
  onHotline: () => void;
  onConsult: () => void;
  onInvite: () => void;
  onCompleteSignup: () => void;
  onCloseMobileMenu: () => void;
  navLinkOnClickOverride?: (to: string) => void;
}

type AppMenuNavProps = IEdmitPlusStatusProps & IAppMenuNavViewModel & IAppMenuNavActions;

const AppMenuNav: React.SFC<AppMenuNavProps> = props => {
  // const SwitchSearchStudents = props.switchStudentSearchComponent;

  // const { setSelectedProductId, openPlanSelectionModal } = usePaywall();

  // const openCalendar = () => {
  //   window.location.href = "https://calendly.com/edmit-advising/edmit-consultation";
  // }

  // const openPaywallModal = () => {
  //   setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
  //   openPlanSelectionModal('to Edmit Plus');
  //   props.onCloseMobileMenu();
  // }

  const paywall = usePaywall()

  return (
    <Navdrawer
      top={48}
      right={true}
      active={props.active}
      zIndex={998}
      minWidth={280}
      classNameContainer="nav-menu-app"
    >
      <div className="pa3">
        {paywall.organizationLogoUrl && (<img src={paywall.organizationLogoUrl} />)}
        <ConnectedNavDrawerMenu />
      </div>
    </Navdrawer>
  );
};

export default AppMenuNav;
