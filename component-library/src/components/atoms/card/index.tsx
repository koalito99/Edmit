import * as React from 'react';

export interface ICardViewModel {
  children: any;
  style?: React.CSSProperties;
  className?: string;
  tabIndex?: number;
}

type CardProps = ICardViewModel;

const Card: React.SFC<CardProps> = props => (
  <div
    className={'shadow-card bg-white ba br2 b--gray-light ' + props.className}
    style={props.style}
    tabIndex={props.tabIndex}
  >
    {props.children}
  </div>
);

export default Card;
