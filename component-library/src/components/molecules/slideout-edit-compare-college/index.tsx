import * as React from 'react';
import Truncate from 'react-truncate';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Text from '../../atoms/typography/text';
import Icon, { EIconName } from '../../atoms/icon';
import { ECollegeStatusCompare, ECompareStatus } from '../../../shared';
import LoadingText from '../../atoms/loading/text';

export interface ICollegeRowEditCompareViewModel {
  college: {
    id: string;
    name: string;
    abbreviation: string;
    logoSrc: string | null;
    statusCompare: ECollegeStatusCompare;
  };
  compareStatus: ECompareStatus;
  loading: boolean;
}

export interface ICollegeRowEditCompareActions {
  addToHand?: () => any | void;
  removeFromHand?: () => any | void;
}

type CollegeRowEditCompareProps = ICollegeRowEditCompareViewModel & ICollegeRowEditCompareActions;

const CollegeRowEditCompare: React.SFC<CollegeRowEditCompareProps> = props => (
  <div className="w-100 flex flex-row items-center justify-between mv3">
    <div className="flex-auto flex flex-row items-center">
      <div className="flex-shrink-0 mr2">
        <Avatar
          type={EAvatarType.College}
          theme={EAvatarTheme.Offwhite}
          size={EAvatarSize.Small}
          logoSrc={props.college.logoSrc || undefined}
          initials={props.college.abbreviation.substring(0, 2)}
          loading={props.loading}
        />
      </div>
      <div className="flex-auto">
        {props.loading ? (
          <LoadingText width={100} />
        ) : (
          <Text className="mv0 fw7 black t-medium">
            <Truncate>{props.college.name}</Truncate>
          </Text>
        )}
      </div>
    </div>
    {!props.loading && (
      <div className="flex-shrink-0">
        {props.college.statusCompare === ECollegeStatusCompare.Added && (
          <Icon
            name={EIconName.Remove}
            className={
              'icon-large lh-solid ' +
              (props.compareStatus === ECompareStatus.NotFull
                ? 'gray-muted'
                : 'crimson hover-crimson-dark')
            }
            disabled={false}
            onClick={props.removeFromHand}
          />
        )}
        {props.college.statusCompare === ECollegeStatusCompare.NotAdded && (
          <Icon
            name={EIconName.Add}
            className={
              'icon-large lh-solid ' +
              (props.compareStatus === ECompareStatus.Full
                ? 'gray-muted'
                : 'crimson hover-crimson-dark')
            }
            disabled={props.compareStatus === ECompareStatus.Full}
            onClick={props.addToHand}
          />
        )}
      </div>
    )}
  </div>
);

export default CollegeRowEditCompare;
