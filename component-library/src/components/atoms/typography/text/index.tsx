import * as React from 'react';

export enum ETextType {
  Label = 'Label',
  Caption = 'Caption',
  Error = 'Error'
}

export interface ITextViewModel {
  type?: ETextType;

  className?: string;
  style?: React.CSSProperties;
}

type TextProps = ITextViewModel;

const Text: React.SFC<TextProps> = props => {
  let text = null;

  switch (props.type) {
    case ETextType.Label:
      text = (
        <p className={'lato gray-dim t-small ttu tracked ' + props.className} style={props.style}>
          {props.children}
        </p>
      );
      break;
    case ETextType.Caption:
      text = (
        <p className={'lato gray-dim t-medium i ' + props.className} style={props.style}>
          {props.children}
        </p>
      );
      break;
    case ETextType.Error:
      text = (
        <p className={'lato t-medium red-error ' + props.className} style={props.style}>
          {props.children}
        </p>
      );
      break;
    default:
      text = (
        <p className={'lato gray-dim ' + props.className} style={props.style}>
          {props.children}
        </p>
      );
      break;
  }

  return text;
};

export default Text;
