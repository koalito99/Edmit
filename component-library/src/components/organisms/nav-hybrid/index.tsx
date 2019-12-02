import * as React from 'react';
import Navbar from '../../molecules/navbar';
import Logo, { ELogoColor } from '../../atoms/logo';

const HybridNav = () => (
  <Navbar fixed={true} top={0} zIndex={999} className="flex flex-row justify-between items-center">
    <div className="mr3 flex-shrink-0">
      <a href="/my-colleges"><Logo color={ELogoColor.Crimson} width={72} /></a>
    </div>
  </Navbar>
);

export default HybridNav;
