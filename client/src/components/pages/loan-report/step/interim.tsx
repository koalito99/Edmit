import * as React from 'react';
import { ELoanReportWizardStep, LoanReportEmptyProps, LoanReportNonEmptyProps } from '..';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import {
  hexGreenDark,
  hexGreenMuted,
} from '@edmit/component-library/src/components/atoms/colors'
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import { InfoBarrier } from '../shared'
import Card from '@edmit/component-library/src/components/atoms/card'
import { edstimateCopy } from '@edmit/component-library/src/shared'

export const InterimStep: React.SFC<LoanReportNonEmptyProps | LoanReportEmptyProps> = props => {
  React.useEffect(() => {
    if (props.step === ELoanReportWizardStep.Interim) {
      props.setNextEnabled(
        Boolean(props.college)
      );
      props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.EfcAndHhi));
    }
  }, [
      props.step,
      Boolean(props.college)
    ]);

  const [collegeQuery, setCollegeQuery] = React.useState<string>('');
  const SearchColleges = props.searchCollegesComponent;

  const body = {
    [ELoanReportWizardStep.Interim]: (
      <>
        <InfoBarrier enabled={!Boolean(props.college)} dialog={
          <Card className={'pa4 w-80 w-50-l'}>
            <div className={'flex justify-center'}>
              <div className={'w-100'}>
                <Text className={'tc mt0 mb3'}>
                  <span>
                    Headed to college? Congratulations! Now it is time to plan for how you will pay for it. Use this calculator to estimate your monthly payments for your student loans. We’ll help you look across your federal (subsidized or unsubsidized) and private student loans for all four years.
                  </span>
                </Text>
                <span data-testid="loan-interim-college-field">
                  <SearchColleges
                    inputValue={collegeQuery}
                    onSearch={setCollegeQuery}
                    onSelected={async selected => {
                      await props.addToHand(props.student.id, selected.id);
                      props.refetch();
                    }}
                  />
                </span>
                <Text className={'tc mt3 mb0'}>
                  <span>
                    PS - It’s ok if you are not sure where you are going yet. We can use an estimate of the price you’ll pay for a specific college (we call it the {edstimateCopy}) and show you what the finances will look like for you there.
                  </span>
                </Text>
              </div>
            </div>
          </Card>
        }>
          <div className={'tc pv3'} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
            <Heading
              size={EHeadingSize.H4}
              text={`Let's see how you'll pay for ${
                props.college ? props.college.name : 'college'
                } and calculate your estimated loan payments.`}
              noColor
            />
            <Heading
              size={EHeadingSize.H5}
              text={`If you'd like to see your loan payments for a different college, go to your College List, select that college, and click 'view' for the full report.`}
              noColor
            />
          </div>
          <div className={'pv3 w-90 w-75-l ma-auto'}>
            <Text className="t-medium">
              <ul className={'flex flex-column items-start'}>
                <li className={'mv1'}>Review your Edstimate®</li>
                <li className={'mv1'}>
                  Make any changes to your contributions — which impact your loan amount
                </li>
                <li className={'mv1'}>Check your loan eligibility based on your EFC</li>
                <li className={'mv1'}>
                  We will show you what you will need to borrow in federal and/or private loans and
                  estimate your loan payments after graduation
                </li>
              </ul>
            </Text>
          </div>
        </InfoBarrier>
      </>
    )
  };

  return <>{body[props.step]}</>;
};
