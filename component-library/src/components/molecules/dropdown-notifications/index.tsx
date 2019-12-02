import * as React from 'react';
import withSizes from 'react-sizes';
import DropdownWrapper from '../../atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '../../atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '../../atoms/dropdown/dropdown-wrapper-menu';
import DropdownHeaderWrapper from '../../atoms/dropdown/dropdown-wrapper-header';
import NotificationBadge from '../../atoms/badge-notification';
import Icon, { EIconName } from '../../atoms/icon';
import Text, { ETextType } from '../../atoms/typography/text';
import { ECaretPosition } from '../../../shared';
import { ExtractPropsFromComponent, Subtract } from '../../../lib/typescript';
import TextLink from '../../atoms/link-text';
import { withState } from 'recompose';

interface IStaticNotificationCardViewModel {
  messageText: string;
  actionText: string;
}

interface IStaticNotificationCardActions {
  onClick?: () => void;
}

type StaticNotificationCardProps = IStaticNotificationCardViewModel &
  IStaticNotificationCardActions;

const StaticNotificationCard: React.SFC<StaticNotificationCardProps> = props => {
  return (
    <div className={'bb b--light-gray pt2 pb2'}>
      <Text className="mv0 t-medium di">{props.messageText}</Text>
      <span
        className="dib ml1 nowrap fw7 t-medium underline gray-dim hover-crimson pointer"
        onClick={props.onClick}
      >
        {props.actionText}
      </span>
    </div>
  );
};

// date / time, title, description, and optional deep link
interface INotificationCardViewModel {
  id: string;
  date: Date;
  title: string;
  description: string;
  seen: boolean;
  actionText?: string;
  deepLink?: string;
  hovering: boolean;
}

interface INotificationCardActions {
  onMarkAsRead?: () => void;
  setHovering: (hover: boolean) => boolean;
}

type NotificationCardProps = INotificationCardViewModel & INotificationCardActions;

const StatelessNotificationCard: React.SFC<NotificationCardProps> = props => {
  if (typeof window == "undefined") return <span />

  return (
    <div
      className={'bb b--light-gray pt3 pb3'}
      onMouseEnter={() => props.setHovering(true)}
      onMouseLeave={() => props.setHovering(false)}
    >
      <div className={'flex justify-between'}>
        <span>
          <Text className="relative mv0 t-medium b di">
            {props.title}{' '}
            {!props.seen && (
              <div className="absolute" style={{ top: 5, right: -14 }}>
                <NotificationBadge />
              </div>
            )}
          </Text>
        </span>
        {!props.hovering || props.seen ? (
          <Text className="t-medium mb0 mt1" type={ETextType.Label}>
            {props.date.toLocaleDateString()}
          </Text>
        ) : (
            <TextLink className="mv0 fw7 t-medium f7" to={'#'} onClick={props.onMarkAsRead}>
              Mark as Read
          </TextLink>
          )}
      </div>
      <Text className={`mv0 t-medium ${props.deepLink ? 'di' : ''}`}>{props.description}</Text>
      {props.deepLink && (
        <span
          className="dib ml1 nowrap fw7 t-medium underline gray-dim hover-crimson pointer"
          onClick={() => {
            window.location.href = props.deepLink!;
          }}
        >
          {' '}
          {props.actionText || 'Check it out'}
        </span>
      )}

      {/*<span
        className="dib ml1 nowrap fw7 t-medium underline gray-dim hover-crimson pointer"
        onClick={props.onClick}
      >
              {props.actionText}.
            </span>*/}
    </div>
  );
};

const NotificationCard = withState('hovering', 'setHovering', false)(StatelessNotificationCard);

interface IDropdownNotificationsViewModel {
  staticNotifications: StaticNotificationCardProps[];
  notifications: Array<ExtractPropsFromComponent<typeof NotificationCard>>;
  isMobile?: boolean;
}

interface IDropdownNotificationsActions {
  onMarkNotificationsAsRead?: (ids: string[]) => void;
}

type DropdownNotificationsProps = IDropdownNotificationsViewModel & IDropdownNotificationsActions;

const DropdownNotifications: React.SFC<DropdownNotificationsProps> = props => {
  const anyUnseen = props.notifications.reduce(
    (acc, notification) => acc || !notification.seen,
    false
  );
  return (
    <DropdownWrapper
      className="inline-flex self-stretch items-center"
      trigger={
        <DropdownLinkWrapper className="inline-flex self-stretch items-center ph2 gray-dim hover-crimson pointer">
          <Icon name={EIconName.Notifications} className="icon-large" />
          {anyUnseen && (
            <div className="absolute" style={{ top: 12, right: 7 }}>
              <NotificationBadge />
            </div>
          )}
        </DropdownLinkWrapper>
      }
    >
      <DropdownMenuWrapper
        top={'36px'}
        right={props.isMobile ? '' : '0px'}
        style={
          props.isMobile && {
            left: 'calc(50% - 6px)',
            transform: 'translateX(-50%)'
          }
        }
        theme={EDropdownMenuTheme.Offwhite}
        caretPosition={props.isMobile ? ECaretPosition.Center : ECaretPosition.Right}
      >
        <DropdownHeaderWrapper>
          <div className={`flex ${anyUnseen ? 'justify-between' : 'justify-center'}`}>
            <Text className="mv0 fw7 t-medium">Notifications</Text>
            {anyUnseen && (
              <TextLink
                className="mv0 fw7 t-medium f7"
                to={'#'}
                onClick={() => {
                  if (props.onMarkNotificationsAsRead) {
                    props.onMarkNotificationsAsRead(
                      props.notifications.reduce<string[]>(
                        (acc, notification) =>
                          !notification.seen ? [...acc, notification.id] : acc,
                        []
                      )
                    );
                  }
                }}
              >
                Mark All as Read
              </TextLink>
            )}
          </div>
        </DropdownHeaderWrapper>
        <div
          className="bg-white ph2 bt b--gray-light"
          style={{ minWidth: '320px', maxHeight: '400px', overflowY: 'scroll' }}
        >
          {props.staticNotifications.map((notification, i) => (
            <StaticNotificationCard key={'static-' + i} {...notification} />
          ))}
          {props.notifications
            .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
            .map(notification => (
              <NotificationCard
                key={'dynamic-' + notification.id}
                {...notification}
                onMarkAsRead={() => {
                  if (props.onMarkNotificationsAsRead) {
                    props.onMarkNotificationsAsRead([notification.id]);
                  }
                }}
              />
            ))}
        </div>
      </DropdownMenuWrapper>
    </DropdownWrapper>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 960
});

export default withSizes(mapSizesToProps)(DropdownNotifications) as React.SFC<
  Subtract<DropdownNotificationsProps, { isMobile: any }>
>;
