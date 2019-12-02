import * as React from 'react';
import Navbar from '../../molecules/navbar';
import Logo, { ELogoColor } from '../../atoms/logo';

const RegistrationNav = () => (
  <Navbar fixed={true} top={0} zIndex={999} className="flex flex-row justify-between items-center">
    <div className="mr3 flex-shrink-0">
      <Logo color={ELogoColor.Crimson} width={72} />
    </div>
  </Navbar>
);

export default RegistrationNav;
