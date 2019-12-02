import * as React from 'react';

export interface ITabbarViewModel {
  children?: any;
}

type TabbarProps = ITabbarViewModel;

const Tabbar: React.SFC<TabbarProps> = props => (
  <div className="flex flex-row items-center justify-center" style={{ height: 48 }}>
    {props.children}
  </div>
);

export default Tabbar;
