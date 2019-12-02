import * as React from 'react';

interface IInfoBarrierViewModel {
  enabled: boolean;

  dialog: React.ReactElement<any>;

  style?: React.CSSProperties;
  className?: string;
}

interface IInfoBarrierActions {}

type InfoBarrierProps = IInfoBarrierViewModel & IInfoBarrierActions;

export const InfoBarrier: React.FC<InfoBarrierProps> = props => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr', ...props.style }} className={"relative " + props.className}>
      <div style={{ gridColumnStart: 1,
        gridRowStart: 1, zIndex: 0, filter: props.enabled ? 'blur(10px)' : undefined }}>{props.children}</div>
      {props.enabled && (
        <div
          style={{
            gridColumnStart: 1,
            gridRowStart: 1,
            zIndex: 1
          }}
          className={"flex justify-center items-center pa1 pa4-ns"}
        >
            {props.dialog}
        </div>
      )}
    </div>
  );
};
