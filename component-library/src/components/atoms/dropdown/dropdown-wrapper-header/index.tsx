import * as React from 'react';

export interface IDropdownWrapperHeaderViewModel {
  children: any;
}

type DropdownWrapperHeaderProps = IDropdownWrapperHeaderViewModel;

const DropdownWrapperHeader: React.SFC<DropdownWrapperHeaderProps> = props => (
  <div className="w-100 bb b--gray-light bg-offwhite pa2 tc">{props.children}</div>
);

export default DropdownWrapperHeader;
