import * as React from 'react';
import { hexCrimson } from '../colors';

export interface INotificationBadgeViewModel {
  badgeCount?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  borderColor?: string | null;
}

type NotificationBadgeProps = INotificationBadgeViewModel;

const NotificationBadge = (props: NotificationBadgeProps) => {
  const foregroundColor = props.foregroundColor || 'white';
  const backgroundColor = props.backgroundColor || hexCrimson;
  const borderColor = props.borderColor || 'white';

  return (
    <span
      className={'ba bw1 br-pill flex items-center justify-center'}
      style={{
        ...(props.badgeCount
          ? {
              fontSize: 8,
              height: 12,
              left: -1,
              lineHeight: 0,
              top: 9,
              width: 12
            }
          : {
              height: 6,
              left: 4,
              top: 13,
              width: 6
            }),
        backgroundColor,
        ...(props.borderColor === null
          ? {
              border: 'none'
            }
          : {
              borderColor
            }),
        color: foregroundColor
      }}
    >
      {props.badgeCount && props.badgeCount}
    </span>
  );
};

export default NotificationBadge;
