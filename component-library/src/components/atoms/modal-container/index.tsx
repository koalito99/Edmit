import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

export interface IModalContainerViewModel {
  children: any;
  maxWidth?: number;
  maxHeight?: number | string;
  isOpen: boolean;

  style?: React.CSSProperties;
  className?: string;
}

export interface IModalContainerActions {
  onClickOut?: () => void;
}

type ModalContainerProps = IModalContainerViewModel & IModalContainerActions;

const ModalContainer: React.SFC<ModalContainerProps> = props => {
  if (typeof window == "undefined") return <span />

  return (
    <div>
      {ReactDOM.createPortal(
        <ReactModal
          isOpen={props.isOpen}
          overlayClassName="fixed z-10000 top-0 left-0 right-0 bottom-0 flex justify-center items-center pa3 ph4-l ph5-xl overflow-y-scroll"
          className={
            'z-10001 w-100 center bg-white shadow-modal br2 relative outline-0 lato mw8 ' +
            props.className
          }
          style={{ content: { maxWidth: props.maxWidth, maxHeight: props.maxHeight, overflowY: 'scroll', margin: 'auto', ...props.style } }}
          onRequestClose={props.onClickOut}
          appElement={window.document.getElementById('root')!}
          closeTimeoutMS={200}
        >
          {props.children}
        </ReactModal>,
        window.document.getElementById('modal-root') as HTMLElement
      )}
    </div>
  );
};

export default ModalContainer;
