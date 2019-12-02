import * as React from 'react';
import Icon, { EIconName } from '../icon';
import { EMicrosoftBrowser, getMicrosoftBrowserType } from '../../../lib/ie';

export enum EAvatarType {
  User = 'User',
  College = 'College'
}

export enum EAvatarTheme {
  White = 'White',
  Offwhite = 'Offwhite',
  Crimson = 'Crimson',
  CrimsonDark = 'CrimsonDark'
}

export enum EAvatarSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large'
}

export interface IAvatarViewModel {
  type: EAvatarType;
  theme: EAvatarTheme;
  size: EAvatarSize;
  initials?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoTitle?: string;
  icon?: EIconName;
  topRightIcon?: EIconName;
  badge?: JSX.Element;
  loading?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

export interface IAvatarActions {
  onClick?: () => void;
}

type AvatarProps = IAvatarViewModel & IAvatarActions;

const Avatar: React.SFC<AvatarProps> = props => {
  let avatar = null;

  switch (props.type) {
    case EAvatarType.User:
      avatar = props.initials ? (
        <span className="lh-zero fw7">{props.initials.substring(0, 3)}</span>
      ) : !props.icon ? (
        <Icon name={EIconName.Profile} className={"icon-medium"} />
      ) : (
            <Icon name={props.icon} className="icon-large" />
          );
      break;
    case EAvatarType.College:
      const microsoftBrowserType = getMicrosoftBrowserType();
      const microsoftBrowserIsIE =
        microsoftBrowserType === EMicrosoftBrowser.IE9 ||
        microsoftBrowserType === EMicrosoftBrowser.IE10 ||
        microsoftBrowserType === EMicrosoftBrowser.IE11;

      avatar =
        props.logoSrc != null && !microsoftBrowserIsIE ? (
          <img
            className={`br-100`}
            src={props.logoSrc}
            alt={props.logoAlt}
            title={props.logoTitle}
          />
        ) : (
            props.initials && <span className="lh-zero fw7">{props.initials.substring(0, 3)}</span>
          );
      break;
    default:
      break;
  }

  return (
    <div
      className={
        'relative br-100 inline-flex justify-center items-center lato ba ' +
        (props.theme === EAvatarTheme.White ? 'bg-white b--gray-light gray-dim ' : '') +
        (props.theme === EAvatarTheme.Offwhite ? 'bg-offwhite b--gray-light gray-dim ' : '') +
        (props.theme === EAvatarTheme.Crimson ? 'bg-crimson b--crimson-dark white ' : '') +
        (props.theme === EAvatarTheme.CrimsonDark ? 'bg-crimson-dark b--crimson-dark white ' : '') +
        (props.size === EAvatarSize.XSmall ? `t-small ${props.initials ? 'pa2' : 'pa1'} ` : '') +
        (props.size === EAvatarSize.Small
          ? `w2 h2 t-small ${props.initials ? 'pa1' : 'pa1'} `
          : '') +
        (props.size === EAvatarSize.Large
          ? `w3 h3 t-large ${props.initials ? 'pa3' : 'pa1'} `
          : '') +
        (props.onClick ? 'pointer ' : '') +
        ' ' +
        props.className
      }
      style={{
        ...(props.size === EAvatarSize.Medium
          ? { width: 48, height: 48, padding: props.initials ? 12 : 4, fontSize: 18 }
          : props.size === EAvatarSize.XSmall
            ? { width: 28, height: 28 }
            : {}),
        ...props.style
      }}
      onClick={props.onClick}
    >
      {props.loading !== true && avatar}
      {props.topRightIcon && (
        <span className="absolute" style={{ top: '-15%', right: '-2.5%' }}>
          <Icon name={props.topRightIcon} className="icon-medium crimson" />
        </span>
      )}
      {props.badge && (
        <div
          className="absolute"
          style={{
            right: props.size === EAvatarSize.XSmall ? '-15%' : '-10%',
            top: props.size === EAvatarSize.XSmall ? '-15%' : '-5%',
            transform: `scale(${props.size === EAvatarSize.XSmall ? 1 : 1.5})`
          }}
        >
          {props.badge}
        </div>
      )}
    </div>
  );
};

export default Avatar;
