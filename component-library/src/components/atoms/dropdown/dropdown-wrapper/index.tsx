import * as React from 'react';

export interface IDropdownWrapperViewModel {
  trigger: any;
  children: any;
  className?: string;
}

type DropdownWrapperProps = IDropdownWrapperViewModel;

const DropdownWrapper: React.SFC<DropdownWrapperProps> = props => (
  <div className={'relative dropdown-menu-wrap ' + props.className}>
    {props.trigger}
    {props.children}
  </div>
);

export default DropdownWrapper;
