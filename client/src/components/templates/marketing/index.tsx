import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/rc-slider.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';

import MarketingNav from '@edmit/component-library/src/components/organisms/nav-marketing';
import MarketingMenuNav from '@edmit/component-library/src/components/organisms/nav-menu-marketing';
import Footer from '@edmit/component-library/src/components/molecules/footer'
import { WiredModals } from '../../../containers/organisms/modals'
import { ContainedModalControllerProps } from '../../../containers/organisms/modal-controller'

export interface IMarketingTemplateViewModel {
  user: {
    firstName: string;
    lastName: string;
    profileProgress: number;
  } | null;
  mobileMenuShown: boolean;
  modalController: React.ComponentType<Partial<ContainedModalControllerProps>>;
}

export interface IMarketingTemplateActions {
  switchStudent: (studentId: string) => void;
  setMobileMenuShown: (shown: boolean) => void;
  onLogin: () => void;
  onSignup: () => void;
  onClickLogo: () => void;
}

type MarketingTemplateProps = IMarketingTemplateViewModel & IMarketingTemplateActions;

export const MarketingTemplate: React.SFC<MarketingTemplateProps> = props => {
  const ModalController = props.modalController;

  return (
    <div className="lato" style={{ paddingTop: '48px' }}>
      <div className="bg-offwhite bg-app-layout" />
      <ModalController />
      <MarketingNav
        user={props.user}
        switchStudent={props.switchStudent}
        onLogin={props.onLogin}
        onSignup={props.onSignup}
        onToggleMobileMenu={() => props.setMobileMenuShown(!props.mobileMenuShown)}
        onClickLogo={props.onClickLogo}
      />
      <div className="dn-l">
        <MarketingMenuNav user={props.user} active={props.mobileMenuShown} />
      </div>
      <div className="marketing-nav-footer-offset">{props.children}
        <Footer /></div>
      <WiredModals />
    </div>
  );
};

export default MarketingTemplate;
