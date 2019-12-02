import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export interface ILinkViewModel {
  children: any;
  to: string;
  className?: any;
  onClick?: () => void;
  onClickOverride?: (to: string) => void;
  nonRouter?: boolean;
  colorClassNames?: string;
  style?: React.CSSProperties;
}

type LinkProps = ILinkViewModel;

const TextLink: React.SFC<LinkProps> = (props, context: any) => {
  const isInsideRouter = context.router;

  if (isInsideRouter && !props.nonRouter) {
    return (
      <Link
        className={`no-underline fw7 ${!props.colorClassNames ? "crimson hover-crimson-dark" : props.colorClassNames} pointer ` + props.className}
        style={props.style}
        onClick={e => {
          if (props.onClickOverride) {
            e.preventDefault();
            return props.onClickOverride(props.to);
          }

          return props.onClick && props.onClick();
        }}
        to={props.to}
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <a
        className={`no-underline fw7 ${!props.colorClassNames ? "crimson hover-crimson-dark pointer" : props.colorClassNames} ` + props.className}
        style={props.style}
        onClick={e => {
          if (props.onClickOverride) {
            e.preventDefault();
            return props.onClickOverride(props.to);
          }

          return props.onClick && props.onClick();
        }}
        href={props.to}
        target="_blank"
      >
        {props.children}
      </a>
    );
  }
};

TextLink.contextTypes = {
  router: PropTypes.object
};

export default TextLink;
