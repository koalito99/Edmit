import * as React from 'react';
import Button, {ButtonProps, EButtonIconPosition, EButtonSize, EButtonType} from '../../atoms/button';
import LoadingText from '../../atoms/loading/text';
import { EIconName } from '../../atoms/icon';
import {Subtract} from "../../../lib/typescript";

interface IButtonGroupViewModel {
  children: Array<Subtract<ButtonProps, { loading: any; size: any; type: any; }> & {
    loading?: boolean;
    type?: EButtonType;
  }>;
  activeIndex: number;
  size?: EButtonSize;
  loading?: boolean;
}

type ButtonGroupProps = IButtonGroupViewModel;

const ButtonGroup: React.SFC<ButtonGroupProps> = props => {
  const size = props.size || EButtonSize.Medium;

  return (
    <div>
      {props.children.map(
        (child, i) => {
          const { loading, ...childProps } = child;

          return !props.loading ? (
            <Button
              {...childProps}
              key={i}
              size={size}
              type={props.activeIndex === i ? EButtonType.Primary : EButtonType.Secondary}
              icon={child.loading ? (
                {
                  className: 'icon-animated-loading',
                  name: EIconName.Loading,
                  position: EButtonIconPosition.Right
                }
              ) : child.icon}
            />
          ) : (
            <LoadingText width={20}/>
          );
        }
      )}
    </div>
  );
};

export default ButtonGroup;
