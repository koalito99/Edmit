import * as React from 'react';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';
import LoadingText from '../../atoms/loading/text';
import { EIconName } from '../../atoms/icon';

interface IMultiSelectButtonGroupViewModel {
  children: Array<{
    text: JSX.Element | string;
    disabled?: boolean;
    icon?: {
      name: EIconName;
      position?: EButtonIconPosition;
      className?: string;
    };
    className?:string;
    selectedClassName?: string;
    selected: boolean;
    onClick?: () => void;
  }>;
  size?: EButtonSize;
  loading?: boolean;
}

type MultiSelectButtonGroupProps = IMultiSelectButtonGroupViewModel;

const MultiSelectButtonGroup: React.SFC<MultiSelectButtonGroupProps> = props => {
  const size = props.size || EButtonSize.Medium;

  return (
    <div>
      {props.children.map(
        (child, i) =>
          !props.loading ? (
            <Button
              key={i}
              text={child.text}
              size={size}
              type={child.selected ? EButtonType.Primary : EButtonType.Secondary}
              onClick={child.onClick}
              disabled={child.disabled}
              icon={child.icon}
              className={child.selected ? child.selectedClassName : child.className}
            />
          ) : (
            <LoadingText width={20} />
          )
      )}
    </div>
  );
};

export default MultiSelectButtonGroup;
