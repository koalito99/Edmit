import * as React from 'react';
import '../../../css/tachyons.css';
import '../../../css/react-select.css';
import '../../../css/react-table.css';
import '../../../css/rc-slider.css';
import '../../../css/edmit-theme.css';
import '../../../css/edmit-components.css';

import RegistrationNav from '@edmit/component-library/src/components/organisms/nav-registration';
import { ContainedModalControllerProps } from '../../../containers/organisms/modal-controller';
import Footer from '@edmit/component-library/src/components/molecules/footer'

interface IRegistrationTemplateViewModel {
  modalController: React.ComponentType<Partial<ContainedModalControllerProps>>;
}

type RegistrationTemplateProps = IRegistrationTemplateViewModel;

export const RegistrationTemplate: React.SFC<RegistrationTemplateProps> = props => {
  const ModalController = props.modalController;

  return (
    <div className="lato bg-offwhite" style={{ paddingTop: '36px' }}>
      <ModalController />
      <RegistrationNav />
      <div className="registration-nav-footer-offset">
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default RegistrationTemplate;
