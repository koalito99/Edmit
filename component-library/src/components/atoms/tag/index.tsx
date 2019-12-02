import * as React from 'react';
import {
  hexGrayDim,
  hexOffwhite,
  hexRedDark,
  hexRedLight,
  hexYellowLight,
  hexYellowDark,
  hexGreenLight,
  hexGreenDark
} from '../colors';
import Icon, { EIconName } from '../icon';
import Text from '../typography/text';

export enum ETagType {
  Good = 'Good',
  Average = 'Average',
  Poor = 'Poor'
}

export interface ITagViewModel {
  iconName?: EIconName;
  type?: ETagType;
  className?: string;
  label: string;
}

type TagProps = ITagViewModel;

const Tag: React.SFC<TagProps> = props => {
  let fgColor = '';
  let bgColor = '';

  switch (props.type) {
    case ETagType.Good:
      fgColor = hexGreenDark;
      bgColor = hexGreenLight;
      break;
    case ETagType.Average:
      fgColor = hexYellowDark;
      bgColor = hexYellowLight;
      break;
    case ETagType.Poor:
      fgColor = hexRedDark;
      bgColor = hexRedLight;
      break;
    default:
      fgColor = hexGrayDim;
      bgColor = hexOffwhite;
      break;
  }

  return (
    <div
      className={`br2 pv1 ph2 inline-flex flex-row items-center ${props.className}`}
      style={{ backgroundColor: bgColor }}
    >
      {props.iconName && (
        <Icon
          name={props.iconName}
          className="icon-large"
          style={{ color: fgColor, cursor: 'auto' }}
        />
      )}
      <Text className="mv0 mh1 t-medium fw7" style={{ color: fgColor }}>
        {props.label}
      </Text>
    </div>
  );
};

export default Tag;
