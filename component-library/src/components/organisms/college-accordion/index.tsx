import * as React from 'react';
import Card from '../../atoms/card';
import Text, { ETextType } from '../../atoms/typography/text';
import Icon, { EIconName } from '../../atoms/icon';
import { hexGrayLight } from '../../atoms/colors';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';

export interface ICollegeDetailCardViewModel {
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  imageSrc?: string | null;
  abbreviation: string;
  maxHeight?: number;
  highlighter?: string;
  expanded: boolean;
  disabled?: boolean;
  disabledContent?: JSX.Element;

  style?: React.CSSProperties;
  className?: string;
}

export interface ICollegeDetailCardActions {
  onOpen: (opened: boolean) => void;
}

type CollegeDetailCardProps = ICollegeDetailCardViewModel & ICollegeDetailCardActions;

export const CollegeDetailCard: React.SFC<CollegeDetailCardProps> = props => {
  return (
    <div className={'relative ' + props.className} style={props.style}>
      <Card style={{ opacity: !props.disabled ? 1 : 0.5 }}>
        <div
          className={'pointer flex justify-between items-center ph3 pv2 bl bw2 shadow-1 ' + props.highlighter}
          onClick={() => props.onOpen(!props.expanded)}
        >
          <div>
            <Avatar
              type={EAvatarType.College}
              theme={EAvatarTheme.Offwhite}
              size={EAvatarSize.Small}
              initials={!props.imageSrc && props.abbreviation || undefined}
              logoSrc={props.imageSrc || undefined}
              className={"mr2"}
            />
            <Text type={ETextType.Label} className={"dib"}>{props.title}</Text>
          </div>
          <div className={"flex items-center"}>
            <span className="dn db-ns">
              <Text type={ETextType.Label} className={'i ' + props.subtitleColor}>{props.subtitle}</Text>
            </span>
            <Icon name={props.expanded ? EIconName.ChevronUp : EIconName.ChevronDown} />
          </div>
        </div>
        <div
          style={{
            maxHeight: props.expanded ? props.maxHeight || 2000 : 0,
            opacity: props.expanded ? 1 : 0,
            overflowY: 'hidden',
            transition: 'max-height 400ms, opacity 400ms'
          }}
        >
          <div className={'mt3'}>{props.children}</div>
        </div>
      </Card>
      <div
        className={'absolute top-0 bottom-0 left-0 right-0'}
        style={{
          backgroundColor: hexGrayLight,
          opacity: 0.2,
          visibility: !props.disabled ? 'hidden' : 'visible'
        }}
      >
        {props.disabledContent}
      </div>
    </div>
  );
};
