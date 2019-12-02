// based on https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ClickAwayListener/ClickAwayListener.js
// MIT License

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EventListener, { EventListenerProps } from 'react-event-listener';

function ownerDocument(node: Element | Text) {
  return (node && node.ownerDocument) || document;
}

interface IClickAwayListenerProps {
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: (e: any) => void;
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: 'onTouchStart' | 'onTouchEnd' | false;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
class ClickAwayListener extends React.Component<IClickAwayListenerProps> {
  defaultProps = {
    mouseEvent: 'onMouseUp',
    touchEvent: 'onTouchEnd',
  };

  mounted = false;

  moved = false;

  node: Element | Text | null = null;

  componentDidMount() {
    // Finds the first child when a component returns a fragment.
    // https://github.com/facebook/react/blob/036ae3c6e2f056adffc31dfb78d1b6f0c63272f0/packages/react-dom/src/__tests__/ReactDOMFiber-test.js#L105
    this.node = ReactDOM.findDOMNode(this);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleClickAway = (event: any) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!this.mounted) {
      return;
    }

    // Do not act if user performed touchmove
    if (this.moved) {
      this.moved = false;
      return;
    }

    // The child might render null.
    if (!this.node) {
      return;
    }

    const doc = ownerDocument(this.node);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !this.node.contains(event.target)
    ) {
      this.props.onClickAway(event);
    }
  };

  handleTouchMove = () => {
    this.moved = true;
  };

  render() {
    const { children, mouseEvent, touchEvent, onClickAway, ...other } = this.props;
    const listenerProps: EventListenerProps<"document"> = { target: "document" };
    if (mouseEvent !== false) {
      listenerProps[mouseEvent] = this.handleClickAway;
    }
    if (touchEvent !== false) {
      listenerProps[touchEvent] = this.handleClickAway;
      listenerProps.onTouchMove = this.handleTouchMove;
    }

    return (
      <React.Fragment>
        {children}
        <EventListener {...listenerProps} {...other} />
      </React.Fragment>
    );
  }
}

export default ClickAwayListener;