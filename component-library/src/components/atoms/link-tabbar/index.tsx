import * as React from 'react';
import Icon, { EIconName } from '../icon';
import LoadingText from '../loading/text';

export interface ITabbarLinkViewModel {
  iconName?: EIconName;
  label: string;
  onClick: any;
  active: boolean;
  loading?: boolean;
}

type TabbarLinkProps = ITabbarLinkViewModel;

const TabbarLink: React.SFC<TabbarLinkProps> = props => (
  <span
    onClick={props.onClick}
    className={
      'flex-auto inline-flex self-stretch items-center justify-center ph2 fw7 t-medium relative ' +
      (!props.loading && props.active
        ? 'crimson border-tab-active '
        : 'gray-dim hover-gray-muted ') +
      (props.loading ? '' : 'pointer ')
    }
  >
    {props.loading ? (
      <LoadingText width={50} />
    ) : (
      <span>
        {props.iconName && <Icon name={props.iconName} className="gray-muted mr1" />}
        {props.label}
      </span>
    )}
  </span>
);

export default TabbarLink;
