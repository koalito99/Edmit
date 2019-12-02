import * as React from 'react';
import { LoanReportNonEmptyProps, ELoanReportWizardStep } from '..';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import {
  hexGreenMuted,
  hexGreenDark,
  hexGreen,
  hexWhite
} from '@edmit/component-library/src/components/atoms/colors';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';
import numeral from 'numeral';

import Button, {
  EButtonSize,
  EButtonType
} from '@edmit/component-library/src/components/atoms/button';
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import FormFieldCheckbox from '@edmit/component-library/src/components/atoms/form/form-field-checkbox';
import { effectivePriceCopyInline } from '@edmit/component-library/src/lib/price'
import { LoanEFCCheckbox, LoanUploadAidLetterButton } from '../../../../testIds/ids';

export const CostAttendanceSteps: React.SFC<LoanReportNonEmptyProps> = props => {
  React.useEffect(() => {
    if (props.step === ELoanReportWizardStep.EfcAndHhi) {
      props.setNextEnabled(Boolean(props.student.efc || props.student.householdIncome));
      props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.CostAttendance));
    }
    if (props.step === ELoanReportWizardStep.CostAttendance) {
      props.setNextEnabled(true);
      props.setNextCallback(() => () =>
        props.setStep(ELoanReportWizardStep.SavingsAndContributions)
      );
    }
  }, [props.step, props.student.efc, props.student.householdIncome]);

  const [dontKnowEfc, setDontKnowEfc] = React.useState(false);

  const EFCField = props.efcFieldComponent;
  const HHIField = props.hhiFieldComponent;

  const body = {
    [ELoanReportWizardStep.EfcAndHhi]: (
      <>
        <div className={'tc pv3'} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
          <Heading
            size={EHeadingSize.H4}
            text={
              <span>
                Before we begin, we need your EFC to estimate your cost of attendance
                <br /> and determine if you are eligible for subsidized loans.
              </span>
            }
            noColor
          />
          <div className={'ba b--dotted bw2 mh4 pb4 mb3'} style={{ borderColor: hexWhite }}>
            <Heading size={EHeadingSize.H4} text={'EFC'} noColor />
            <Text className="t-medium w-50 tc ma-auto">
              <span style={{ color: hexGreenDark }}>
                Your Expected Family Contribution (EFC) is an index number that colleges use to
                determine how much financial aid you're eligible to receive. Your EFC is calculated
                according to a formula established by law and the information from your Free
                Application for Federal Student Aid (FAFSA).
              </span>
            </Text>
          </div>
        </div>
        <div className={'mt4 flex flex-column items-center'}>
          <div className={'w5'}>
            <EFCField />
          </div>
          <div className={'mt4 mb3'}>
            <span data-testid={LoanEFCCheckbox}>
              <FormFieldCheckbox
                label={"I don't know my EFC"}
                checked={dontKnowEfc}
                onChange={setDontKnowEfc}
                required={false}
              />
            </span>
          </div>
          {dontKnowEfc && (
            <>
              <Text className={'tc mt0'}>
                Please enter your household income so we can estimate your EFC
              </Text>
              <div className={'w5'}>
                <HHIField />
              </div>
            </>
          )}
        </div>
      </>
    ),
    [ELoanReportWizardStep.CostAttendance]: (
      <>
        <div className={'tc pv3'} style={{ backgroundColor: hexGreenMuted, color: hexGreenDark }}>
          <Heading
            size={EHeadingSize.H4}
            text={`Let's begin by reviewing your ${effectivePriceCopyInline(props.college)} for your first year.`}
            noColor
          />

          {!props.college.financialAidAward && (
            <>
              <Text className="t-medium w-50 tc ma-auto">
                <span style={{ color: hexGreenDark }}>
                  Your financial aid letter will include your total cost of attendance. Please
                  upload it if you have received it so we can update your total cost to reflect your
                  actual cost of attendance.
                </span>
              </Text>

              <span data-testid={LoanUploadAidLetterButton}>
                <Button
                  className={'mt4'}
                  type={EButtonType.Secondary}
                  size={EButtonSize.Small}
                  text={'Upload Aid Letter'}
                  onClick={() =>
                    props.uploadAidLetter({
                      id: props.college.id,
                      name: props.college.name,
                      edstimate: props.college.edstimate
                    })
                  }
                />
              </span>
            </>
          )}
        </div>
        <div className={'mt4'}>
          <MetricCard
            title={`Your ${effectivePriceCopyInline(props.college)} for your first year at ${props.college.name} is`}
            value={numeral(props.college.effectiveCost).format('$0[.0]a')}
            yearValue={'per year'}
            textColor={hexGreen}
          />
        </div>
      </>
    )
  };

  return <>{body[props.step]}</>;
};
