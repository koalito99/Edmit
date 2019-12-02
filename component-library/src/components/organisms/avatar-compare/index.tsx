import * as React from 'react';
import Text from '../../atoms/typography/text';
import DropdownWrapper from '../../atoms/dropdown/dropdown-wrapper';
import DropdownLinkWrapper from '../../atoms/dropdown/dropdown-wrapper-link';
import DropdownMenuWrapper, {
  EDropdownMenuTheme
} from '../../atoms/dropdown/dropdown-wrapper-menu';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Icon, { EIconName } from '../../atoms/icon';
import { ECaretPosition, ECollegeStatusCompare } from '../../../shared';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';

export interface ICompareAvatarViewModel {
  name: string;
  abbreviation: string;
  logoSrc: string | null;
  compareStatus: ECollegeStatusCompare;
  recommendedReason?: string;
  loading: boolean;
}

export interface ICompareAvatarActions {
  onRemove: () => void;
  onAdd: () => void;
}

type CompareAvatarProps = ICompareAvatarViewModel & ICompareAvatarActions;

const CompareCollegeAvatar: React.SFC<CompareAvatarProps> = props =>
  props.loading ? (
    <div className="dib mh1">
      <Avatar
        type={EAvatarType.College}
        theme={EAvatarTheme.Offwhite}
        size={EAvatarSize.Large}
        logoSrc={props.logoSrc || undefined}
        topRightIcon={undefined}
        initials={props.logoSrc == null ? props.abbreviation.substring(0, 2) : undefined}
      />
    </div>
  ) : (
    <DropdownWrapper
      className="dib mh1"
      trigger={
        <DropdownLinkWrapper>
          <Avatar
            type={EAvatarType.College}
            theme={
              props.compareStatus === ECollegeStatusCompare.Added
                ? EAvatarTheme.White
                : EAvatarTheme.Offwhite
            }
            size={EAvatarSize.Large}
            logoSrc={props.logoSrc || undefined}
            initials={props.logoSrc === null ? props.abbreviation.substring(0, 2) : undefined}
            topRightIcon={
              props.compareStatus === ECollegeStatusCompare.Added ? undefined : EIconName.Add
            }
          />
        </DropdownLinkWrapper>
      }
    >
      <DropdownMenuWrapper
        top={'64px'}
        left={'16px'}
        theme={EDropdownMenuTheme.Crimson}
        caretPosition={ECaretPosition.Left}
      >
        {props.compareStatus === ECollegeStatusCompare.Added ? (
          <div className="pv1 ph2 hover-bg-crimson-dark pointer" onClick={props.onRemove}>
            <Text className="nowrap t-small white fw7 mv0">
              Remove from Comparison <Icon name={EIconName.Remove} />
            </Text>
          </div>
        ) : props.recommendedReason == null ? (
          <div className="pv1 ph2 hover-bg-crimson-dark pointer" onClick={props.onAdd}>
            <Text className="nowrap t-small white fw7 mv0">
              Add to Comparison <Icon name={EIconName.Add} />
            </Text>
          </div>
        ) : (
          <div className="pt1 pb2 ph2" style={{ minWidth: '280px', maxWidth: '360px' }}>
            <Text className="t-small white fw7 mv0">{props.name}</Text>
            <Text className="t-small offwhite mt0 mb2">{props.recommendedReason}</Text>
            <Button
              size={EButtonSize.Small}
              type={EButtonType.Secondary}
              text="Add to comparison"
              icon={{
                name: EIconName.Add,
                position: EButtonIconPosition.Right
              }}
              onClick={props.onAdd}
            />
          </div>
        )}
      </DropdownMenuWrapper>
    </DropdownWrapper>
  );

export default CompareCollegeAvatar;
