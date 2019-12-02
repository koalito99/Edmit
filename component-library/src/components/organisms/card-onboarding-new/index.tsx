import * as React from 'react';
import ProgressBar, { ESquareCorners } from '../../atoms/progress-bar';
import { hexCrimson, hexGrayLight } from '../../atoms/colors';
import Card from '../../atoms/card';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import Text, { ETextType } from '../../atoms/typography/text';
import { ESteppedWizardStepVisibleState } from '../wrapper-stepped-wizard';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import withSizes from 'react-sizes';
import numeral from 'numeral';
import { edstimateCopy } from '../../../shared';

interface IOnboardingCardProps {
  visibleState?: ESteppedWizardStepVisibleState;
  progressAmount: number;
  heading?: string | ((headerSize: EHeadingSize) => JSX.Element);
  onboardingCardContent: (
    collegeList: (
      colleges: Array<{
        name?: string;
        abbreviation?: string;
        edstimate: number;
        loading: boolean;
      }>,
      mini?: boolean,
      hideEdstimate?: boolean
    ) => JSX.Element
  ) => JSX.Element;
  onBack?: () => void;
  onContinue?: () => void;
  continueText?: string;
  continueDisabled?: boolean;
  submitState: { isSubmitting: boolean; error: string | null; };
  backText?: string;
  isMobile?: boolean;
}

const OnboardingCard: React.SFC<IOnboardingCardProps> = props => {
  const { isSubmitting, error } = props.submitState;
  const headerSize = props.isMobile ? EHeadingSize.H4 : EHeadingSize.H3;

  const visibleState = props.visibleState || ESteppedWizardStepVisibleState.OPEN;

  return (
    <Card
      className="w-100 w-80-ns relative"
      style={{
        left: `${
          visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED
            ? '150%'
            : visibleState === ESteppedWizardStepVisibleState.OPENED
              ? '-150%'
              : '0'
          }`,
        transition: 'left 500ms cubic-bezier(.59, .01, .16, 1)',
        zIndex:
          visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED ||
            visibleState === ESteppedWizardStepVisibleState.OPENED
            ? 0
            : 1
      }}
    >
      <ProgressBar
        height={8}
        progressAmount={props.progressAmount}
        barColor={hexCrimson}
        backgroundBarColor={hexGrayLight}
        squareCorners={ESquareCorners.All}
      />
      <div className="pa3 pa4-ns">
        {props.heading && (
          <div className={'tc'}>
            {typeof props.heading === 'string' ? (
              <Heading
                size={headerSize}
                text={props.heading}
                className="lh-copy mt0 mb0"
              />
            ) : (
                props.heading(headerSize)
              )}
          </div>
        )}
        {props.onboardingCardContent(
          (colleges, mini, hideEdstimate) =>
            colleges.length > 0 ? (
              <div className="ph1 ph4-ns">
                <div
                  className={`w-100 flex ${
                    mini ? 'flex-column' : ''
                    } justify-center mb1 mb4-ns`}
                >
                  {mini && (
                    <div className="flex flex-row items-center justify-between ph3 mb2 mt3 mt4-ns bb b--gray-light">
                      <Text type={ETextType.Label} className="mv0">
                        College
                      </Text>
                      {!hideEdstimate && (
                        <Text type={ETextType.Label} className="mv0">
                          {edstimateCopy}
                        </Text>
                      )}
                    </div>
                  )}
                  {colleges.map(
                    (college, i) =>
                      !mini ? (
                        <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 1 }}>
                          {college.loading ? (
                            <div className="w4 center ma0 pa0">
                              <LoadingText size={ELoadingTextSize.H4} width={100} />
                            </div>
                          ) : (
                              college.name && (
                                <Text type={ETextType.Label} className="tc">
                                  {college.name}
                                </Text>
                              )
                            )}
                        </div>
                      ) : (
                          <div
                            key={i}
                            className="mb1 ml3 mr4 pv1 flex flex-row items-center justify-between"
                          >
                            {college.loading ? (
                              <LoadingText size={ELoadingTextSize.H4} width={50} />
                            ) : (
                                <div className="flex flex-row items-center">
                                  <Text type={ETextType.Label} className="mr1 mv0">
                                    {college.name}
                                  </Text>
                                </div>
                              )}
                            <div>
                              {!hideEdstimate && (
                                <Text type={ETextType.Label} className="mr1 mv0">
                                  {numeral(college.edstimate).format('$0[,]0')}
                                </Text>
                              )}
                            </div>
                          </div>
                        )
                  )}
                </div>
              </div>
            ) : (
                <div />
              )
        )}
      </div>
      <div className="pa3 ph4-ns flex flex-row items-center justify-between bt b--gray-light">
        <div>
          {props.onBack ? (
            <Button
              size={EButtonSize.Medium}
              type={EButtonType.Secondary}
              text={props.backText || 'Back'}
              onClick={props.onBack}
            />
          ) : null}
        </div>
        <div>
          {props.onContinue ? (
            <FormSubmit
              buttonSize={EButtonSize.Medium}
              disabled={
                props.continueDisabled
              }
              defaultText={props.continueText || 'Continue'}
              submittedText={'Saving'}
              succeededText={'Saved'}
              failedText={'Saving Failed'}
              submitState={
                isSubmitting
                  ? ESubmitState.Submitted
                  : error
                    ? ESubmitState.Failed
                    : ESubmitState.Default
              }
              onClick={props.onContinue}
            />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(OnboardingCard) as typeof OnboardingCard;
