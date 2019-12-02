import * as React from 'react';
import Icon, { EIconName } from '../icon';
import Text from '../typography/text';

export interface IToastViewModel {
  iconName: EIconName;
  messageText: JSX.Element | string;
  foregroundColor?: string;
  backgroundColor: string;
  actionText?: string;
  onClick?: any;
  className?: string;
}

type ToastProps = IToastViewModel;

const Toast = (props: ToastProps) => {
  const foregroundColor = props.foregroundColor || 'white';

  return (
    <div className={'flex items-center justify-center ph3 ' + props.className}>
      <div
        className={'flex-column flex-row-ns items-center br2 pa2 ph3-l shadow-toast inline-flex '}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <Icon
          name={props.iconName}
          className="icon-xlarge mr1 mr3-ns"
          style={{ color: foregroundColor }}
        />
        <Text className="mv0 tc tl-ns t-medium measure-wide" style={{ color: foregroundColor }}>
          {props.messageText}
        </Text>
        {(props.actionText && window.location.pathname.indexOf("/my-colleges") === -1) && (
          <Text className="mv0 ml1 ml3-ns fw7 t-medium" style={{ color: foregroundColor }}>
            <span className="pointer dim" onClick={props.onClick}>
              {props.actionText}
            </span>
          </Text>
        )}
      </div>
    </div>
  );
};

export default Toast;
