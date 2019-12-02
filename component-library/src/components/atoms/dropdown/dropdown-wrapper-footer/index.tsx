import * as React from 'react';

export interface IDropdownWrapperFooterViewModel {
  children: any;
}

type DropdownWrapperFooterProps = IDropdownWrapperFooterViewModel;

const DropdownWrapperFooter: React.SFC<DropdownWrapperFooterProps> = props => (
  <div className="w-100 bt b--gray-light bg-offwhite pa2 tr flex">{props.children}</div>
);

export default DropdownWrapperFooter;
