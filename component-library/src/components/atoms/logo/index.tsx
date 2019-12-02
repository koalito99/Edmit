import * as React from 'react';

import EdmitLogoCrimson from '../../../assets/logo/Edmit-Logo-Crimson.png';
import EdmitLogoWhite from '../../../assets/logo/Edmit-Logo-White.png';

export enum ELogoColor {
  White = 'White',
  Crimson = 'Crimson'
}

export interface ILogoViewModel {
  color: ELogoColor;
  width: number;
}

export interface ILogoActions {
  onClick?: () => void;
}

type LogoProps = ILogoViewModel & ILogoActions;

const Logo: React.SFC<LogoProps> = props => {
  let logoSource = null;

  switch (props.color) {
    case ELogoColor.Crimson:
      logoSource = EdmitLogoCrimson;
      break;
    case ELogoColor.White:
      logoSource = EdmitLogoWhite;
      break;
    default:
      break;
  }

  return (
    <img
      src={logoSource || undefined}
      alt="Edmit"
      className={`dib h-auto ${props.onClick && 'pointer'}`}
      width={props.width}
      onClick={props.onClick}
    />
  );
};

export default Logo;
