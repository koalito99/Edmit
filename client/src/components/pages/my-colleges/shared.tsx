import * as React from 'react';
import Card from '@edmit/component-library/src/components/atoms/card';
import classNames from 'classnames';
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import DetailedIcon, {
  EDetailedIconName
} from '@edmit/component-library/src/components/atoms/icon-detailed';
import LoadingText, {
  ELoadingTextSize
} from '@edmit/component-library/src/components/atoms/loading/text';

interface IMyCollegesCardViewModel {
  iconName?: EDetailedIconName;
  heading?: React.ReactChild;

  loading: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface IMyCollegesCardActions {}

type MyCollegesCardProps = IMyCollegesCardViewModel & IMyCollegesCardActions;

export const MyCollegesCard: React.FC<MyCollegesCardProps> = props => {
  return (
    <Card style={props.style} className={classNames('pa3 flex flex-column h-100', props.className)}>
      {(props.iconName || props.heading) && (
        <div className={'bb b--gray-light'}>
          {props.iconName && (
            <div
              className={'flex justify-center mt2'}
              style={{
                opacity: props.loading ? 0 : 1,
                pointerEvents: props.loading ? 'none' : undefined
              }}
            >
              <DetailedIcon name={props.iconName} width={40} />
            </div>
          )}
          {props.heading &&
            (!props.loading ? (
              <Heading size={EHeadingSize.H4} text={props.heading} className={'tc mt2'} />
            ) : (
              <div className={'flex justify-center'}>
                <LoadingText size={ELoadingTextSize.H3} width={75} />
              </div>
            ))}
        </div>
      )}
      <div
        style={{
          opacity: props.loading ? 0 : 1,
          pointerEvents: props.loading ? 'none' : undefined
        }}
        className={'flex-grow-1'}
      >
        {props.children}
      </div>
    </Card>
  );
};
