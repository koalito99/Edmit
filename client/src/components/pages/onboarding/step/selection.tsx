import * as React from "react";
import { OnboardingProps, EOnboardingWizardStep } from "..";
import Heading, { EHeadingSize } from "@edmit/component-library/src/components/atoms/typography/heading";
import { hexGreenMuted, hexGreenDark } from "@edmit/component-library/src/components/atoms/colors";
import { OnboardingStatus } from "../../../../graphql/generated";

export const CollegeSelectionSteps: React.SFC<OnboardingProps> = (props) => {
  React.useEffect(
    () => {
      props.setNextEnabled(true)
      if (props.step === EOnboardingWizardStep.CollegeSelection) {
        props.setNextCallback(() => () => props.setStep(EOnboardingWizardStep.HouseholdIncome))
      }
    },
    [props.step]
  )

  window.analytics.track('onboarding_start', {
    college: props.college.name,
    studentId: props.student.id
  });

  const introduceNewOnboarding = props.student.onboardingStatus === OnboardingStatus.IntroduceNewOnboarding

  const body = {
    [EOnboardingWizardStep.CollegeSelection]: (
      <>
        <div className={"tc pv3"} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
          <Heading
            size={EHeadingSize.H4}
            text={(introduceNewOnboarding && <p>Welcome back, we’ve updated our reports and want to take you through a quick tour with one of your colleges.</p>)
              || (!introduceNewOnboarding && <p>Click continue to get a personalized report for {props.college.name}.</p>)}
            noColor
          />
          <Heading
            size={EHeadingSize.H5}
            text={(introduceNewOnboarding && <span />)
              || (!introduceNewOnboarding && <span>If you'd like to see your report for a different college, go to your College List, select that college, and click 'view'.</span>)}
            noColor
          />

        </div>
      </>
    )
  }

  return (
    <>
      {body[props.step]}
    </>
  )
}