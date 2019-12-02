import * as React from 'react'
import classNames from 'classnames'
import ToggleButton from '../../atoms/toggle-button'
import EdmitTooltip, { ETooltipType } from '../tooltip'
import Icon, { EIconName } from '../../atoms/icon'
import Button, { EButtonSize, EButtonType } from '../../atoms/button'
import Text from '../../atoms/typography/text'

interface IFilterMenuViewModel {
  feature: string;
  active: boolean;
  locked?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IFilterMenuActions {
  onApply(): void;
  onUpgradeToEdmitPlus(): void;
}

type FilterMenuProps = IFilterMenuViewModel & IFilterMenuActions;

const FilterMenu: React.FC<FilterMenuProps> = props => {
  return (
    <div style={props.style} className={classNames('ma1', props.className)}>
      {props.locked ? (
        <EdmitTooltip
          type={ETooltipType.Custom}
          content={
            <div className={'pa3'} style={{ minWidth: 325 }}>
              <Text>Unlock this preference by upgrading to Edmit Plus.</Text>
              <Button text={"Upgrade"} size={EButtonSize.Medium} type={EButtonType.Primary} onClick={props.onUpgradeToEdmitPlus} />
            </div>
          }
          animation={'scale'}
          backgroundColor={'white'}
        >
          <ToggleButton selected={props.active}>
            <div className={'relative dib'}>
              <div className={'dib'} style={{ opacity: 0.15 }}>
                {props.feature}
              </div>
              <div
                className={
                  'absolute flex justify-center items-center left-0 top-0 right-0 bottom-0'
                }
              >
                <Icon name={EIconName.Lock} />
              </div>
            </div>
          </ToggleButton>
        </EdmitTooltip>
      ) : (
        <EdmitTooltip
          type={ETooltipType.Custom}
          content={
            <div className={'pa3'} style={{ minWidth: 325 }}>
              {props.children}
            </div>
          }
          animation={'scale'}
          backgroundColor={'white'}
        >
          <ToggleButton selected={props.active}>{props.feature}</ToggleButton>
        </EdmitTooltip>
      )}
    </div>
  );
};

export default FilterMenu;
