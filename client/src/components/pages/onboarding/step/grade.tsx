import * as React from 'react';
import { OnboardingProps, EOnboardingWizardStep } from '..';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import {
  hexGreenMuted,
  hexGreenDark,
  hexGreen,
  hexOffwhite,
  hexRed
} from '@edmit/component-library/src/components/atoms/colors';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import {
  OnboardingStatus
} from '../../../../graphql/generated';
import { FitChip } from '@edmit/component-library/src/components/molecules/graph/fit';
import FinancialGradeScatterplot from '@edmit/component-library/src/components/molecules/graph/financial-grade-scatterplot';
import { CenterNarrow } from '../../report/shared';
import { history } from '../../../../store';
import { EAffordabilityDetermination, EValueDetermination } from '@edmit/component-library/src/shared'
import { useFeaturesContext } from '../../../../hooks/features';

export const FinancialGradeOnboardingSteps: React.SFC<OnboardingProps> = props => {
  const featuresContext = useFeaturesContext()

  async function setOnboarded() {
    if (props.step === EOnboardingWizardStep.FinancialGrade) {
      await props.updateProfile({
        onboardingStatus: OnboardingStatus.Onboarded
      });
      featuresContext.refresh();
    }
    return undefined
  }

  React.useEffect(() => {
    if (props.step === EOnboardingWizardStep.FinancialGrade) {
      setOnboarded();

      props.setNextEnabled(true);

      props.setNextCallback(() => async () => {


        history.push('/report?onboardingComplete=true');

        window.analytics.track('onboarding_financial_grade_completed', {
          college: props.college.name,
          studentId: props.student.id
        });
      });
    }
  }, [props.step]);

  const body = {
    [EOnboardingWizardStep.FinancialGrade]: (
      <>
        <div>
          <div
            className={'pv3 ph4 tc'}
            style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}
          >
            <Heading
              size={EHeadingSize.H4}
              text={
                <p>
                  Now let’s put it all together!
                  <br />A college’s Financial Grade is a letter grade (A, B or C) which is
                  personalized for you based on a college’s affordability and value.
                </p>
              }
              noColor
            />
          </div>
        </div>
        <div>
          <div className={'tc mt3 pv2'} style={{ backgroundColor: hexOffwhite }}>
            <Text className={'mb1'}>{props.college.name} is</Text>
            <div className={'mb3'}>
              <Heading
                size={EHeadingSize.H4}
                text={
                  <span>
                    <span
                      style={{
                        color:
                          props.college.affordabilityDetermination ===
                            EAffordabilityDetermination.Affordable
                            ? hexGreen
                            : hexRed
                      }}
                    >
                      {props.college.affordabilityDetermination ===
                        EAffordabilityDetermination.Affordable
                        ? 'more affordable'
                        : 'less affordable'}
                    </span>
                    ,&nbsp;
                    <span
                      style={{
                        color:
                          props.college.valueDetermination === EValueDetermination.GoodValue
                            ? hexGreen
                            : hexRed
                      }}
                    >
                      {props.college.valueDetermination === EValueDetermination.GoodValue
                        ? 'a better value'
                        : 'a worse value'}
                    </span>
                    , and has a Financial Grade of{' '}
                    <FitChip
                      admissionUnlikely={false}
                      financialGrade={props.college.financialGrade}
                      loading={false}
                      size={40}
                      className={'dib ml1'}
                      style={{ transform: 'translateY(12.5px)' }}
                    />
                  </span>
                }
                className={'mt0 mb0 dib mr2'}
              />
            </div>
          </div>
          <div>
            <CenterNarrow>
              <FinancialGradeScatterplot
                collegeGroups={[
                  {
                    colleges: [{ abbreviation: props.college.abbreviation }],
                    isAGoodValue: props.college.valueDetermination === EValueDetermination.GoodValue,
                    isAffordable:
                      props.college.affordabilityDetermination ===
                      EAffordabilityDetermination.Affordable
                  }
                ]}
                className={'db center'}
              />
            </CenterNarrow>
          </div>
        </div>
      </>
    )
  };

  return <>{body[props.step]}</>;
};
