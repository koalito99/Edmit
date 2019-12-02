import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExtractPropsFromComponent } from '../../../lib/typescript';
import Toast from '../../atoms/toast';

export enum EToastOverlayPosition {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

type ToastOverlayProps = ExtractPropsFromComponent<typeof Toast> & {
  isOpen: boolean;
  position?: EToastOverlayPosition;
};

const ToastOverlay: React.SFC<ToastOverlayProps> = props => {
  const position = props.position || EToastOverlayPosition.TOP;
  if (typeof window == "undefined") return <span />

  return (
    <div>
      {ReactDOM.createPortal(
        <div
          className={`fixed z-max z-0 top--1 left-0 right-0 bottom-0 flex justify-center items-${
            position === EToastOverlayPosition.TOP ? 'start' : 'end'
            } pa3 pa5-l`}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              opacity: props.isOpen ? 1 : 0,
              pointerEvents: props.isOpen ? 'initial' : 'none',
              transform: `translateY(${
                props.isOpen ? '0px' : `${position === EToastOverlayPosition.TOP ? '-' : ''}50%`
                })`,
              transition: `transform 200ms, opacity 200ms`
            }}
          >
            <Toast {...props} />
          </div>
        </div>,
        window.document.getElementById('toast-root') as HTMLElement
      )}
    </div>
  );
};

export default ToastOverlay;
