import * as React from 'react'
import { hexGreen } from '@edmit/component-library/src/components/atoms/colors'

interface IToggleButtonViewModel {
  selected: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

interface IToggleButtonActions {
  onToggle?: (selected: boolean) => void;
}

type ToggleButtonProps = IToggleButtonViewModel & IToggleButtonActions;

const ToggleButton: React.FC<ToggleButtonProps> = props => {
  return (
    <div
      className={
        'lato fw7 no-underline outline-0 dib ba br1 pv0 nowrap b--gray-light t-button-m ph3 pointer ' + props.className
      }
      style={{
        backgroundColor: props.selected ? hexGreen : 'white',
        transition: 'background-color 200ms, color 200ms',
        color: props.selected ? 'white' : 'black',
        borderColor: props.selected ? hexGreen : undefined,
        cursor: props.disabled ? "not-allowed" : undefined,
        ...props.style
      }}
      onClick={() => props.onToggle && props.onToggle(!props.selected)}
    >
      {props.children}
    </div>
  )
}

export default ToggleButton;