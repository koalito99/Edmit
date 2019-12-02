import * as React from 'react';
import Card from '../../atoms/card';
import Text, { ETextType } from '../../atoms/typography/text';
import Button, { EButtonIconPosition, EButtonSize, EButtonType } from '../../atoms/button';
import Icon, { EIconName } from '../../atoms/icon';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';

export interface IRecommendedContentCardViewModel {
  typeIconName: EIconName;
  typeIconColor: string;
  typeName: string;
  recommendedContent: {
    buttonText: string;
    description: string;
    title: string;
  };
  loading: boolean;
}

export interface IRecommendedContentCardActions {
  onClick: () => void;
  // onHide: () => void;
}

type RecommendedContentCardProps = IRecommendedContentCardViewModel &
  IRecommendedContentCardActions;

const RecommendedContentCard = (props: RecommendedContentCardProps) => (
  <Card className="pa3">
    {props.loading ? (
      <span>
        <div className="flex flex-row items-center">
          <LoadingText width={30} />
          <span className="flex-auto" />
          <div className="flex flex-row items-center">
            <Button
              size={EButtonSize.Small}
              type={EButtonType.Secondary}
              text={''}
              icon={{
                name: EIconName.ChevronLeft,
                position: EButtonIconPosition.Right
              }}
              disabled={true}
            />
            <Button
              size={EButtonSize.Small}
              type={EButtonType.Secondary}
              text={''}
              icon={{
                name: EIconName.ChevronRight,
                position: EButtonIconPosition.Right
              }}
            />
          </div>
        </div>
        <LoadingText size={ELoadingTextSize.H3} width={50} />
        <LoadingText size={ELoadingTextSize.P} width={90} />
        <LoadingText size={ELoadingTextSize.P} width={60} />
        <div className="nt3 nb4">
          <LoadingText size={ELoadingTextSize.Button} width={30} />
        </div>
      </span>
    ) : (
      <span>
        <div className="flex flex-row items-center">
          <Icon
            name={props.typeIconName}
            className="mr1 icon-large"
            style={{ color: props.typeIconColor }}
          />
          <Text type={ETextType.Label} className="mv0 mr1">
            {props.typeName}
          </Text>
          <span className="flex-auto" />
          {/* <Button size={EButtonSize.Small} type={EButtonType.Secondary} text={'Hide'} onClick={props.onHide} /> */}
        </div>
        <Text className="mt2 mb0 fw7">{props.recommendedContent.title}</Text>
        <Text className="t-medium mt0 mb2">{props.recommendedContent.description}</Text>
        <div className="flex flex-row items-center justify-between">
          <Button
            size={EButtonSize.Medium}
            type={EButtonType.Primary}
            text={props.recommendedContent.buttonText}
            onClick={props.onClick}
          />
        </div>
      </span>
    )}
  </Card>
);

export default RecommendedContentCard;
