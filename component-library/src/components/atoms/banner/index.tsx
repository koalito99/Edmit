import * as React from 'react';
import Icon, { EIconName } from '../icon';
import Text from '../typography/text';
import {hexCrimson, hexCrimsonDark, hexWhite} from '../colors';

export interface IBannerViewModel {
  messageText: JSX.Element | string;

  actionText?: string;

  secondaryNavActive?: boolean;
  rounded?: boolean;

  backgroundColor?: string;
  foregroundColor?: string;
  closeButtonColor?: string;

  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  className?: string;
  innerClassName?: string;
  textClassName?: string;
}

export interface IBannerActions {
  onClick?: () => void;
  onClose?: () => void;
}

type BannerProps = IBannerViewModel & IBannerActions;

const Banner = (props: BannerProps) => {
  const foregroundColor = props.foregroundColor || hexWhite;
  const backgroundColor = props.backgroundColor || hexCrimson;

  return (
    <div
      className={'relative flex items-center justify-center w-100 ' + props.className}
      style={{
        backgroundColor,
        borderRadius: props.rounded ? 5: 0,
        marginBottom: props.secondaryNavActive ? -48 : 0,
        marginTop: props.secondaryNavActive ? 48 : 0,
        ...props.style
      }}
    >
      <div className={"flex-row justify-center items-center pa2 ph3-l shadow-Banner inline-flex flex-grow-1 " + props.innerClassName} style={props.innerStyle}>
        <Text className={ props.textClassName || "mv0 t-small" } style={{ color: foregroundColor }}>
          {props.messageText}
        </Text>
        { props.actionText && <span
          className="pointer dim flex flex-row items-center nowrap mr3-ns"
          onClick={props.onClick}
        >
          <Text className="mv0 ml2 ml3-ns fw7 t-small" style={{ color: foregroundColor }}>
            {props.actionText}
          </Text>
          <Icon
            name={EIconName.ArrowRight}
            className="icon-medium ml1"
            style={{ color: foregroundColor }}
          />
        </span> }
        { props.onClose && <Icon
          name={EIconName.Close}
          className="absolute-ns right-0-ns pa1 lh-solid icon-large pointer dim"
          style={{ color: props.closeButtonColor || hexCrimsonDark }}
          onClick={props.onClose}
        /> }
      </div>
    </div>
  );
};

export default Banner;
