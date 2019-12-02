import * as React from 'react';
import Truncate from 'react-truncate';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Text from '../../atoms/typography/text';
import { EIconName } from '../../atoms/icon';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';
import { ECompareStatus } from '../../../shared';
import LoadingText, { ELoadingTextSize, ELoadingTextTheme } from '../../atoms/loading/text';

export interface ISlideoutRecommendationsCollegeViewModel {
  college: {
    name: string;
    abbreviation: string;
    logoSrc: string | null;
    recommendedReason: string;
  };
  loading: boolean;
  compareStatus: ECompareStatus;
}

export interface ISlideoutRecommendationsCollegeActions {
  onAdd: () => any | void;
}

type SlideoutRecommendationsCollegeProps = ISlideoutRecommendationsCollegeViewModel &
  ISlideoutRecommendationsCollegeActions;

const SlideoutRecommendationsCollege: React.SFC<SlideoutRecommendationsCollegeProps> = props => (
  <div className="flex flex-row items-start mv3">
    <div className="pt2 flex-shrink-0">
      <Avatar
        type={EAvatarType.College}
        theme={props.loading ? EAvatarTheme.CrimsonDark : EAvatarTheme.Offwhite}
        size={EAvatarSize.Large}
        logoSrc={props.college.logoSrc || undefined}
        initials={
          props.college.logoSrc == null ? props.college.abbreviation.substring(0, 2) : undefined
        }
        loading={props.loading}
      />
    </div>
    {props.loading ? (
      <div className="ml3 flex-auto">
        <LoadingText theme={ELoadingTextTheme.Dark} width={60} />
        <LoadingText size={ELoadingTextSize.P} theme={ELoadingTextTheme.Dark} width={100} />
        <div className="nt2">
          <LoadingText size={ELoadingTextSize.P} theme={ELoadingTextTheme.Dark} width={80} />
        </div>
      </div>
    ) : (
      <div className="ml3 flex-auto">
        <Text className="mv0 fw7 white t-medium">
          <Truncate>{props.college.name}</Truncate>
        </Text>
        <Text className="mt0 mb2 white t-medium o-70">{props.college.recommendedReason}</Text>
        <Button
          size={EButtonSize.Small}
          type={EButtonType.Secondary}
          text={'Add'}
          icon={{
            name: EIconName.Add,
            position: EButtonIconPosition.Right
          }}
          disabled={props.compareStatus === ECompareStatus.Full}
          onClick={props.onAdd}
        />
      </div>
    )}
  </div>
);

export default SlideoutRecommendationsCollege;
