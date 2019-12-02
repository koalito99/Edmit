import * as React from 'react';
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

interface IAsyncComponentViewModel {
  componentPromise: PromiseLike<JSX.Element>;
}

type AsyncComponentProps = IAsyncComponentViewModel;

interface IAsyncComponentState {
  Component: JSX.Element | null;
}

export class AsyncComponent extends React.PureComponent<AsyncComponentProps, IAsyncComponentState> {
  readonly state = {
    Component: null
  };

  componentDidMount() {
    const { componentPromise } = this.props;
    Promise.resolve(componentPromise).then(component =>
      this.setState({
        Component: component
      })
    );
  }

  render() {
    const { Component } = this.state;

    if (!Component) {
      return null; // You can return some spinner here
    }

    return Component;
  }
}

export const useScroll = (eventHandler?: { begin?: (to: string, element: any) => void; end?: (to: string, element: any) => void; }) => {
  React.useEffect(() => {
    Events.scrollEvent.register('begin', eventHandler && eventHandler.begin || (() => null));

    Events.scrollEvent.register('end', eventHandler && eventHandler.end || (() => null));

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    }
   }, []);

  return { scroll, scroller }
};

export function usePrevious<T>(value: T): T {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
