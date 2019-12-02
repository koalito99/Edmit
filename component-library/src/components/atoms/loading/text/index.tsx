import * as React from 'react';

export enum ELoadingTextSize {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  P = 'P',
  Button = 'Button'
}

export enum ELoadingTextTheme {
  Light = 'Light',
  Dark = 'Dark'
}

export interface ITextViewModel {
  size?: ELoadingTextSize;
  theme?: ELoadingTextTheme;
  width: number;
}

type TextProps = ITextViewModel;

const LoadingText: React.SFC<TextProps> = props => {
  const defaultClassNames =
    'pulse br1 ' + (props.theme === ELoadingTextTheme.Dark ? 'bg-black-30 ' : 'bg-gray-light ');
  let loadingText = null;

  switch (props.size) {
    case ELoadingTextSize.H1:
      loadingText = (
        <h1 className={defaultClassNames + 'pv4 mv3'} style={{ width: `${props.width}%` }} />
      );
      break;
    case ELoadingTextSize.H2:
      loadingText = (
        <h2 className={defaultClassNames + 'pv3 mv3'} style={{ width: `${props.width}%` }} />
      );
      break;
    case ELoadingTextSize.H3:
      loadingText = (
        <h3 className={defaultClassNames + 'pv3 mv3'} style={{ width: `${props.width}%` }} />
      );
      break;
    case ELoadingTextSize.H4:
      loadingText = (
        <h4 className={defaultClassNames + 'pv2 mv3'} style={{ width: `${props.width}%` }} />
      );
      break;
    case ELoadingTextSize.P:
      loadingText = (
        <p className={defaultClassNames + 'pv2 mv3'} style={{ width: `${props.width}%` }} />
      );
      break;
    case ELoadingTextSize.Button:
      loadingText = (
        <p className={defaultClassNames + 'pt3 pb4 mv4 br2'} style={{ width: `${props.width}%` }} />
      );
      break;
    default:
      loadingText = (
        <div
          className={defaultClassNames + 'pv2 mv0'}
          style={{ display: 'inline-block', width: `${props.width}%` }}
        />
      );
      break;
  }

  return loadingText;
};

export default LoadingText;
