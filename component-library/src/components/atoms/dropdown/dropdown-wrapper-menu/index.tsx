import * as React from 'react';
import { ECaretPosition } from '../../../../shared';

export enum EDropdownMenuTheme {
  White = 'White',
  Offwhite = 'Offwhite',
  Crimson = 'Crimson'
}

export interface IDropdownWrapperMenuViewModel {
  children: any;
  top: string;
  right?: string;
  left?: string;
  style?: any;
  theme: EDropdownMenuTheme;
  caretPosition: ECaretPosition;
  className?: string;
}

type DropdownWrapperMenuProps = IDropdownWrapperMenuViewModel;

const DropdownWrapperMenu: React.SFC<DropdownWrapperMenuProps> = props => (
  <div
    className={
      'dropdown-menu ' +
      (props.caretPosition === ECaretPosition.Right ? 'dropdown-caret-right ' : '') +
      (props.caretPosition === ECaretPosition.Left ? 'dropdown-caret-left ' : '') +
      (props.caretPosition === ECaretPosition.Center ? 'dropdown-caret-center ' : '') +
      (props.theme === EDropdownMenuTheme.White ? 'dropdown-caret-white ' : '') +
      (props.theme === EDropdownMenuTheme.Offwhite ? 'dropdown-caret-offwhite ' : '') +
      (props.theme === EDropdownMenuTheme.Crimson ? 'dropdown-caret-crimson ' : '')
    }
    style={{ top: props.top, right: props.right, left: props.left, ...props.style }}
  >
    <div
      className={
        'ba br1 tl shadow-dropdown mt2 ' +
        (props.theme === EDropdownMenuTheme.White ? 'bg-white b--gray-light ' : '') +
        (props.theme === EDropdownMenuTheme.Offwhite ? 'bg-offwhite b--gray-light ' : '') +
        (props.theme === EDropdownMenuTheme.Crimson ? 'bg-crimson b--crimson-dark ' : '') + (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </div>
  </div>
);

export default DropdownWrapperMenu;
