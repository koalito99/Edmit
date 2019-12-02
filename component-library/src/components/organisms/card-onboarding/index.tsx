import * as React from 'react';
import { Formik, FormikActions, FormikProps } from 'formik';
import { FormikErrors } from '../../../lib/forms';
import ProgressBar, { ESquareCorners } from '../../atoms/progress-bar';
import { hexCrimson, hexGrayLight } from '../../atoms/colors';
import Card from '../../atoms/card';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import FitGraph, { FitChip } from '../../molecules/graph/fit';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import Text, { ETextType } from '../../atoms/typography/text';
import { ESteppedWizardStepVisibleState } from '../wrapper-stepped-wizard';
import { Subtract } from '../../../lib/typescript';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import withSizes from 'react-sizes';
import { EFinancialGrade } from '../../../shared'

interface IOnboardingCardProps<FormFields> {
  visibleState: ESteppedWizardStepVisibleState;
  progressAmount: number;
  heading?: string | ((headerSize: EHeadingSize) => JSX.Element);
  onboardingCardContent: (
    props: FormikProps<FormFields>,
    fitScores: (
      colleges: Array<{
        name?: string;
        abbreviation?: string;
        financialGrade: EFinancialGrade | null;
      }>,
      mini?: boolean
    ) => JSX.Element
  ) => JSX.Element;
  onBack?: (formikProps: FormikProps<FormFields>) => void | null;
  onContinue?: (formikProps: FormikProps<FormFields>) => void | null;
  continueText?: string;
  continueDisabled?: (formikProps: FormikProps<FormFields>) => boolean;
  backText?: string;
  initialValues: FormFields;
  validateForm?: (values: FormFields) => FormikErrors<FormFields>;
  onSubmit?: (
    values: FormFields,
    bag: Subtract<FormikActions<FormFields>, { setSubmitting: any }>
  ) => Promise<void>;
  isMobile?: boolean;
}

class OnboardingCard<FormFields> extends React.Component<IOnboardingCardProps<FormFields>, {}> {
  render() {
    const { onBack, onContinue } = this.props;

    return (
      <Formik<FormFields>
        initialValues={this.props.initialValues}
        onSubmit={async (values, { setSubmitting, ...actions }) => {
          if (this.props.onSubmit) {
            setSubmitting(true);
            await this.props.onSubmit(values, actions);
            setSubmitting(false);
          }
        }}
        validate={values => (this.props.validateForm ? this.props.validateForm(values) : {})}
        render={formikProps => {
          const { isSubmitting, error } = formikProps;
          const headerSize = this.props.isMobile ? EHeadingSize.H4 : EHeadingSize.H3;

          return (
            <Card
              className="w-100 w-80-ns relative"
              style={{
                left: `${
                  this.props.visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED
                    ? '150%'
                    : this.props.visibleState === ESteppedWizardStepVisibleState.OPENED
                      ? '-150%'
                      : '0'
                }`,
                transition: 'left 500ms cubic-bezier(.59, .01, .16, 1)',
                zIndex:
                  this.props.visibleState === ESteppedWizardStepVisibleState.NOT_YET_OPENED ||
                  this.props.visibleState === ESteppedWizardStepVisibleState.OPENED
                    ? 0
                    : 1
              }}
            >
              <ProgressBar
                height={8}
                progressAmount={this.props.progressAmount}
                barColor={hexCrimson}
                backgroundBarColor={hexGrayLight}
                squareCorners={ESquareCorners.All}
              />
              <div className="pa3 pa4-ns">
                {this.props.heading && (
                  <div className={'tc'}>
                    {typeof this.props.heading === 'string' ? (
                      <Heading
                        size={headerSize}
                        text={this.props.heading}
                        className="lh-copy mt0 mb0"
                      />
                    ) : (
                      this.props.heading(headerSize)
                    )}
                  </div>
                )}
                {this.props.onboardingCardContent(
                  formikProps,
                  (colleges, mini) =>
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
                              <Text type={ETextType.Label} className="mv0">
                                Fit Score
                              </Text>
                            </div>
                          )}
                          {colleges.map(
                            (college, i) =>
                              !mini ? (
                                <div className="flex-grow-1" style={{ minWidth: 0, flexBasis: 1 }}>
                                  {college.financialGrade === null ? (
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
                                  <FitGraph
                                    admissionUnlikely={false}
                                    data={[]}
                                    financialGrade={college.financialGrade!}
                                    loading={college.financialGrade === null}
                                  />
                                </div>
                              ) : (
                                <div
                                  key={i}
                                  className="mb1 ml3 mr4 pv1 flex flex-row items-center justify-between"
                                >
                                  {college.financialGrade === null ? (
                                    <LoadingText size={ELoadingTextSize.H4} width={50} />
                                  ) : (
                                    <div className="flex flex-row items-center">
                                      <Text type={ETextType.Label} className="mr1 mv0">
                                        {college.name}
                                      </Text>
                                    </div>
                                  )}
                                  <div>
                                    <FitChip
                                      admissionUnlikely={false}
                                      financialGrade={college.financialGrade!}
                                      loading={college.financialGrade === null}
                                      size={30}
                                    />
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
                  {onBack ? (
                    <Button
                      size={EButtonSize.Medium}
                      type={EButtonType.Secondary}
                      text={this.props.backText || 'Back'}
                      onClick={() => onBack(formikProps)}
                    />
                  ) : null}
                </div>
                <div>
                  {onContinue ? (
                    <FormSubmit
                      buttonSize={EButtonSize.Medium}
                      disabled={
                        this.props.continueDisabled && this.props.continueDisabled(formikProps)
                      }
                      defaultText={this.props.continueText || 'Continue'}
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
                      onClick={() => onContinue(formikProps)}
                    />
                  ) : null}
                </div>
              </div>
            </Card>
          );
        }}
      />
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width <= 640
});

export default withSizes(mapSizesToProps)(OnboardingCard) as typeof OnboardingCard;
