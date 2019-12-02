import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/rc-slider.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';

import HybridNav from '@edmit/component-library/src/components/organisms/nav-hybrid';
import { ContainedModalControllerProps } from '../../../containers/organisms/modal-controller';
import Footer from '@edmit/component-library/src/components/molecules/footer'
import { ConnectedSidebar } from '../../../connectors/organisms/sidebar';

interface IHybridTemplateViewModel {
  known: boolean;
  modalController: React.ComponentType<Partial<ContainedModalControllerProps>>;
}

type HybridTemplateProps = IHybridTemplateViewModel;

export const HybridTemplate: React.SFC<HybridTemplateProps> = props => {
  const ModalController = props.modalController;

  const appSidebarStyle = {
    background: "#EDEDED"
  }

  return (
    <div className="lato" style={{ paddingTop: '36px' }}>
      <div className="bg-offwhite bg-app-layout" />
      <ModalController />
      <HybridNav />
      <div className="w-100 fixed flex">
        {props.known && (
          <div style={appSidebarStyle} className={`${(props.known ? "w-25" : "")} pa3 dn db-l`}>
            <ConnectedSidebar />
          </div>
        )}
        <div className={`${(props.known ? "w-75-l" : "w-100")} overflow-y-auto vh-100`}>
          <div className="onboarding-nav-footer-offset">
            {props.children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HybridTemplate;
