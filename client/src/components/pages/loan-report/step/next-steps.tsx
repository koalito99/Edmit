import * as React from 'react'
import { ELoanReportWizardStep, LoanReportNonEmptyProps } from '..'
import { hexBlack, hexGrayLight } from '@edmit/component-library/src/components/atoms/colors'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import { usePaywall } from "../../../../hooks/paywall";
import { LoanStatus } from '../../../../graphql/generated';
import { useFeaturesContext } from '../../../../hooks/features';
import { LoanNextStepReport, LoanNextStepConsult, LoanNextStepBudget, LoanNextStepLoans, LoanNextStepSimpleTuition, LoanNextStepCredible } from '../../../../testIds/ids';

interface ICTABlockViewModel {
  ctaText: string;
  ctaTo: string;
  onClick?: () => void;

  openInNewTab?: boolean;

  style?: React.CSSProperties;
  className?: string;

  testId?: string;
}

type CTABlockProps = ICTABlockViewModel;

export const CTABlock: React.FC<CTABlockProps> = props => {
  return (
    <a href={props.ctaTo} onClick={props.onClick} target={props.openInNewTab ? "_blank" : undefined} className={"pl4 pr4 inline-flex items-center justify-center dim w-40 no-underline bg-green-success " + props.className} style={props.style}>
      <Heading testId={props.testId} size={EHeadingSize.H4} className={'white mv4 tc'} text={<span className={"lato b"}>{props.ctaText}</span>} />
    </a>
  )
}

export const NextStepsStep: React.SFC<LoanReportNonEmptyProps> = (props) => {
  const featuresContext = useFeaturesContext()

  async function nextSteps() {
    if (props.step === ELoanReportWizardStep.NextSteps) {
      await props.updateProfile({
        loanStatus: LoanStatus.FlowCompleted
      });
      featuresContext.refresh();
    }
    return undefined
  }

  React.useEffect(() => {
    nextSteps()
  }, [props.step]);

  const paywall = usePaywall()
  const { hasEdmitPlus } = paywall;



  const redirectPrefix = !props.account.userIsLoggedIn ? "/signup?redirectTo=" : ""

  const body = {
    [ELoanReportWizardStep.NextSteps]: (
      <>
        <div>
          <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexGrayLight, color: hexBlack }}>
            <Heading
              size={EHeadingSize.H4}
              text={`Now that we've estimated your loan payments post graduation, what's next?`}
              noColor
            />
          </div>
          <div className={"flex flex-wrap justify-center mt3"}>
            <CTABlock testId={LoanNextStepReport} ctaText={"View personalized college report"} ctaTo={redirectPrefix + '/report'} className={"ma2"} />
            <CTABlock testId={LoanNextStepConsult} ctaText={"Discuss your loan options with an Edmit advisor"} ctaTo={redirectPrefix + (hasEdmitPlus ? "https://calendly.com/edmit-advising/edmit-consultation" : "https://app.edmit.me/purchase/")} className={"ma2"} openInNewTab />
            {
              paywall.organizationLogoUrl ? (
                <>
                  <CTABlock testId={LoanNextStepBudget} ctaText={"Download our budget planner"} ctaTo={redirectPrefix + 'https://www.edmit.me/college-student-budget-template'} className={"ma2"} />
                  <CTABlock testId={LoanNextStepLoans} ctaText={"Learn more about federal and private loans"} ctaTo={redirectPrefix + "https://www.edmit.me/student-loans"} className={"ma2"} />
                </>
              ) : (
                  <>
                    <CTABlock testId={LoanNextStepSimpleTuition} ctaText={"Compare private loan rates with SimpleTuition"} ctaTo={"https://www.simpletuition.com/landing/20160914_c.html?brnd=edmit&trackingId=inapp"} className={"ma2"} />
                    <CTABlock testId={LoanNextStepCredible} onClick={() => props.setCredibleModalOpen(true)} ctaText={"Compare private loan rates with Credible"} ctaTo={"#"} className={"ma2"} />
                  </>
                )
            }
          </div>
        </div >
      </>
    )
  }

  return (
    <>
      {body[props.step]}
    </>
  )
}
