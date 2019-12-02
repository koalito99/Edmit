import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Subtract } from '@edmit/component-library/src/lib/typescript';

export type WithSatisfiedRouter<T> = Subtract<T, RouteComponentProps<any>>;

class ScrollToTopComponent extends React.Component<RouteComponentProps<any>> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter(ScrollToTopComponent);
