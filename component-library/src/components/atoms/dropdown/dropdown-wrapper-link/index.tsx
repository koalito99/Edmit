import * as React from 'react';

export interface IDropdownWrapperLinkViewModel {
  children: any;
  className?: string;
}

type DropdownWrapperLinkProps = IDropdownWrapperLinkViewModel;

const DropdownWrapperLink: React.SFC<DropdownWrapperLinkProps> = props => (
  <span className={props.className}>{props.children}</span>
);

export default DropdownWrapperLink;
