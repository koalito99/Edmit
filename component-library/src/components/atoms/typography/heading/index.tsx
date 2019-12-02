import * as React from 'react';

export enum EHeadingSize {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5'
}

export interface IHeadingViewModel {
  size: EHeadingSize;
  text: string | any; // Support using <Truncate>
  noStyle?: boolean;
  noColor?: boolean;

  className?: string;
  style?: React.CSSProperties;

  testId?: string;
}

type HeadingProps = IHeadingViewModel;

const Heading: React.SFC<HeadingProps> = props => {
  const defaultClassNames = `merriweather fw4 ${!props.noColor ? 'black' : ''} `;

  let heading = null;

  switch (props.size) {
    case EHeadingSize.H1:
      heading = (
        <h1 data-testid={props.testId} className={(props.noStyle === true ? '' : defaultClassNames) + props.className} style={props.style}>
          {props.text}

        </h1>
      );
      break;
    case EHeadingSize.H2:
      heading = (
        <h2 data-testid={props.testId} className={(props.noStyle === true ? '' : defaultClassNames) + props.className} style={props.style}>
          {props.text}
        </h2>
      );
      break;
    case EHeadingSize.H3:
      heading = (
        <h3 data-testid={props.testId} className={(props.noStyle === true ? '' : defaultClassNames) + props.className} style={props.style}>
          {props.text}
        </h3>
      );
      break;
    case EHeadingSize.H4:
      heading = (
        <h4 data-testid={props.testId} className={(props.noStyle === true ? '' : defaultClassNames) + props.className} style={props.style}>
          {props.text}
        </h4>
      );
      break;
    case EHeadingSize.H5:
      heading = (
        <h5 data-testid={props.testId} className={(props.noStyle === true ? '' : defaultClassNames) + props.className} style={props.style}>
          {props.text}
        </h5>
      );
      break;
    default:
      break;
  }

  return <span>{heading}</span>;
};

export default Heading;
