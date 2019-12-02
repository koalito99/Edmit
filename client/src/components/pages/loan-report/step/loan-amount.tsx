import * as React from 'react';
import { ELoanReportWizardStep, LoanReportNonEmptyProps } from '..';
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import {
  hexBlack,
  hexCrimson,
  hexGrayLight,
  hexGreenDark,
  hexGreenMuted,
  hexRed,
  hexRedDark,
  hexRedLight,
  hexRedMuted,
  hexWhite
} from '@edmit/component-library/src/components/atoms/colors';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';
import { PageSection } from '../../report/shared';
import Header from '@edmit/component-library/src/components/molecules/header';
import FinancialPlannerGraph, {
  EVoidMode
} from '@edmit/component-library/src/components/molecules/graph/financial-planner';
import numeral from 'numeral';
import FormFieldCheckbox from '@edmit/component-library/src/components/atoms/form/form-field-checkbox';
import { useContributionAmounts } from '../../report/affordability/shared';
import FormFieldSlider from '@edmit/component-library/src/components/atoms/form/form-field-slider';

interface ILoanAmount { }

type LoanAmountProp = LoanReportNonEmptyProps & ILoanAmount;

export const LoanAmountSteps: React.SFC<LoanAmountProp> = props => {
  const contributionState = useContributionAmounts(props);

  const federalSubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Subsidized Loan'
  );
  const federalUnsubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Unsubsidized Loan'
  );
  const privateLoan = props.college.loans.find(loan => loan.provider === 'Private Loan');

  const needsLoans = federalSubsidizedLoan || federalUnsubsidizedLoan || privateLoan;

  const [selectedCreditScore, setSelectedCreditScore] = React.useState<number | null>(
    props.student.creditScore
  );
  const [notSharingCreditScore, setNotSharingCreditScore] = React.useState(false);

  React.useEffect(() => {
    if (props.step === ELoanReportWizardStep.LoanAmount) {
      if (needsLoans) {
        props.setNextEnabled(true);
        props.setNextCallback(() => () =>
          props.setStep(
            federalSubsidizedLoan || federalUnsubsidizedLoan
              ? ELoanReportWizardStep.LoanBreakdownFederal
              : privateLoan
                ? ELoanReportWizardStep.LoanBreakdownPrivate
                : ELoanReportWizardStep.NextSteps
          )
        );
      } else {
        props.setNextEnabled(true);
        props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.NextSteps));
      }
    }
    if (props.step === ELoanReportWizardStep.LoanBreakdownFederal) {
      props.setNextEnabled(true);
      props.setNextCallback(() => () =>
        props.setStep(
          privateLoan
            ? ELoanReportWizardStep.LoanBreakdownPrivate
            : ELoanReportWizardStep.LoanPayments
        )
      );
    }
    if (props.step === ELoanReportWizardStep.LoanBreakdownPrivate) {
      props.setNextEnabled(Boolean(selectedCreditScore || notSharingCreditScore));
      props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.LoanPayments));
    }
  }, [props.step, selectedCreditScore, notSharingCreditScore]);

  const loanAmountBody = (
    <>
      <div
        className={'pv3 ph4 tc'}
        style={
          needsLoans
            ? { backgroundColor: hexRedMuted, color: hexRedDark }
            : { backgroundColor: hexGreenMuted, color: hexGreenDark }
        }
      >
        <Heading
          size={EHeadingSize.H4}
          text={
            needsLoans
              ? `Based on your savings and contributions, we've estimated what you need to borrow.`
              : `Good news! Based on your savings and contributions, you don't need a loan for ${
              props.college.name
              }.`
          }
          noColor
        />
        {needsLoans && <><MetricCard title={`You will need to take out`}
          value={numeral(
            contributionState.gaps[props.college.id] / 4
          ).format('$0,0')}
          textColor={hexRed}
          className={'mh4'}
        />
          <Text className={'mv0 t-medium gray-dim'}>of loans for 1 year at {props.college.name}</Text>
        </>}
      </div>
      <div className={'pa3'}>
        <PageSection>
          <Header
            size={EHeadingSize.H4}
            text={`How you will afford to pay for 1 year at ${props.college.name}`}
          />
          <FinancialPlannerGraph
            voidMode={needsLoans ? EVoidMode.Negative : EVoidMode.Positive}
            data={{
              abbreviation: props.college.abbreviation,
              cash: contributionState.cash,
              collegeNameFull: props.college.name,
              edstimate: props.college.effectiveCost / 4,
              loans: contributionState.gaps[props.college.id] / 4,
              otherScholarships: contributionState.otherScholarships / 4,
              savings: contributionState.savings / 4,
              workStudy: contributionState.studentWages
            }}
            sectionLabels={{
              cash: null,
              savings: 'Savings X 1 year',
              workStudy: null,
              otherScholarships: 'Other Scholarships X 1 year'
            }}
            loading={false}
          />
        </PageSection>
      </div>
    </>
  );

  const body = {
    [ELoanReportWizardStep.LoanAmount]: loanAmountBody,
    [ELoanReportWizardStep.LoanBreakdownFederal]: needsLoans &&
      (federalSubsidizedLoan || federalUnsubsidizedLoan) && (
        <LoanBreakdownTemplate
          title={
            federalSubsidizedLoan && federalUnsubsidizedLoan
              ? `It looks like you will be eligible for both subsidized and unsubsidized federal loans.`
              : federalSubsidizedLoan
                ? `It looks like you will be eligible for subsidized federal loans.`
                : `It looks like you will be eligible for unsubsidized federal loans.`
          }
          subtitle={"Click next to see how you'll cover the remainder of your loan."}
          disclaimer={
            <div className={'ph3 pb3'} style={{ color: hexWhite }}>
              <Text className={'tc'}>
                <span className={'t-large b'}>FEDERAL LOANS</span>
              </Text>
              <Text className={'tc pr3'}>
                <span className={'t-medium'}>
                  Federal student loans are made by the government, with terms and conditions that
                  are set by law, and includes many benefits (such as fixed interest rates and
                  income-driven repayment plans) not typically offered with private loans.
                </span>
              </Text>
            </div>
          }
          metricSections={
            <div className={'flex justify-center bg-offwhite mv3 pa3'}>
              <MetricCard
                title={`Your estimated total federal loan amount for ${props.college.name} is`}
                value={numeral(
                  (federalSubsidizedLoan ? federalSubsidizedLoan.strictPrincipal : 0) +
                  (federalUnsubsidizedLoan
                    ? federalUnsubsidizedLoan.strictPrincipal
                    : 0)
                ).format('$0,0')}
                yearValue={'for 4 years'}
                textColor={hexRed}
                className={'mh4'}
              />
            </div>
          }
          cards={
            <>
              {federalSubsidizedLoan && (
                <div className={'w-100-m ' + (federalSubsidizedLoan ? 'w-third-ns' : 'w-50-ns')}>
                  <div
                    className={' ph3-ns pv4'}
                    style={{ backgroundColor: hexRedLight, color: hexWhite }}
                  >
                    <Text className={'tc'}>
                      <span className={'white t-large b'}>Federal Subsidized</span>
                    </Text>
                    <MetricCard
                      value={numeral(federalSubsidizedLoan.strictPrincipal).format(
                        '$0,0'
                      )}
                      textColor={hexWhite}
                      yearValue={'for 4 years'}
                    />
                  </div>
                  <div className={'mh2'}>
                    <div className={'mt4'}>
                      <MetricCard
                        value={numeral(federalSubsidizedLoan.interestRate).format('0[.0]%')}
                        textColor={'black'}
                        valueStyle={{ marginBottom: 0 }}
                      />
                      <Text className={'tc i mt0'}>interest rate</Text>
                    </div>
                    <Text className="t-medium">
                      <ul className={'flex flex-column items-left'}>
                        <li className={'mv1'}>Interest does not accrue while enrolled in school</li>
                        <li className={'mv1'}>Maximum allowed is:</li>
                        <ul>
                          <li className={'mv1'}>{numeral(3500).format('$0,0')} in  Year 1</li>
                          <li className={'mv1'}>{numeral(4500).format('$0,0')} in  Year 2</li>
                          <li className={'mv1'}>{numeral(5500).format('$0,0')} in  Years 3 and 4</li>
                        </ul>
                        <li className={'mv1'}>
                          You qualify for this since your cost of attendance is greater than your
                          EFC
                        </li>
                      </ul>
                    </Text>
                  </div>
                </div>
              )}
              {federalUnsubsidizedLoan && (
                <div className={'w-100-m ' + +(federalUnsubsidizedLoan ? 'w-third-ns' : 'w-50-ns')}>
                  <div
                    className={'ph3-ns pv4'}
                    style={{ backgroundColor: hexRedMuted, color: hexWhite }}
                  >
                    <Text className={'tc'}>
                      <span className={'white t-large b'}>Federal Unsubsidized</span>
                    </Text>
                    <MetricCard
                      value={numeral(federalUnsubsidizedLoan.strictPrincipal).format(
                        '$0,0'
                      )}
                      textColor={hexWhite}
                      yearValue={'for 4 years'}
                    />
                  </div>
                  <div className={'mt4'}>
                    <MetricCard
                      value={numeral(federalUnsubsidizedLoan.interestRate).format('0[.0]%')}
                      textColor={'black'}
                      valueStyle={{ marginBottom: 0 }}
                    />
                    <Text className={'tc i mt0'}>interest rate</Text>
                  </div>
                  <div className={'mh2'}>
                    <Text className="t-medium ma-auto">
                      <ul className={'flex flex-column items-left'}>
                        <li className={'mv1'}>Interest does accrue while enrolled in school</li>
                        <li className={'mv1'}>Maximum allowed is {numeral(2000).format('$0,0')} per year</li>
                      </ul>
                    </Text>
                  </div>
                </div>
              )}
            </>
          }
        />
      ),
    [ELoanReportWizardStep.LoanBreakdownPrivate]: needsLoans && privateLoan && (
      <LoanBreakdownTemplate
        title={`It looks like you might need a private student loan.`} /* `Once you've maxed out your federal loans, you can cover the remainder with a private student loan.` */
        subtitle={
          'We can give you a better estimate on your private student loan if you know your credit score.'
        }
        disclaimer={
          <div className={'ph3 pb3'} style={{ color: hexWhite }}>
            <Text className={'tc'}>
              <span className={'t-large b'}>PRIVATE LOANS</span>
            </Text>
            <Text className={'tc pl3'}>
              <span className={'t-medium'}>
                Private loans are made by private organizations such banks, credit unions, and state
                based or state affiliated organizations, and have terms and conditions that are set
                by the lender. Private student loans are generally more expensive than federal
                student loans.
              </span>
            </Text>
          </div>
        }
        cards={
          <>
            <div className={'w-50-ns w-100-m'}>
              <div className={'ph3-ns pv4'} style={{ backgroundColor: hexRed, color: hexWhite }}>
                <Text className={'tc'}>
                  <span className={'white t-large b'}>Private Student Loan</span>
                </Text>
                <MetricCard
                  value={numeral(privateLoan!.strictPrincipal).format('$0,0')}
                  textColor={hexWhite}
                  yearValue={'for 4 years'}
                />
              </div>
              <div className={'mt4'}>
                <MetricCard
                  value={numeral(privateLoan!.interestRate).format('0[.0]%')}
                  textColor={hexRed}
                  valueStyle={{ marginBottom: 0 }}
                />
                <Text className={'tc i mt0'}>interest rate</Text>
              </div>
              <div>
                <Text className={'tc mb1'}>
                  Credit Score{' '}
                  <Text className={'mv0 fw7 t-medium gray-dim'}>
                    {selectedCreditScore &&
                      (selectedCreditScore <= 600 ? '<600' : selectedCreditScore)}
                  </Text>
                </Text>
                <div>
                  <FormFieldSlider
                    value={selectedCreditScore ? Math.max(selectedCreditScore, 600) : 600}
                    min={600}
                    max={850}
                    marks={{
                      600: '600',
                      650: '650',
                      700: '700',
                      750: '750',
                      800: '800',
                      850: '850'
                    }}
                    disabled={!selectedCreditScore}
                    color={hexCrimson}
                    onChange={value => {
                      setSelectedCreditScore(value);
                      setNotSharingCreditScore(false);
                    }}
                    onBlur={() => {
                      props.updateProfile({
                        creditScore: {
                          value: selectedCreditScore
                        }
                      });
                    }}
                    className={'mb5'}
                  />
                </div>
                <div className={'mt3 flex flex-column items-center'}>
                  <FormFieldCheckbox
                    checked={notSharingCreditScore}
                    onChange={value => {
                      setNotSharingCreditScore(value);
                      setSelectedCreditScore(null);

                      props.updateProfile({
                        creditScore: {
                          value: null
                        }
                      });
                    }}
                    required={true}
                    label={"I don't know my credit score or don't want to share it"}
                  />
                </div>
              </div>
            </div>
          </>
        }
      />
    )
  };

  return <>{body[props.step]}</>;
};

interface ILoanBreakdownTemplateViewModel {
  title: string;
  subtitle?: string;

  disclaimer: React.ReactNode;
  metricSections?: React.ReactNode;
  cards: React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

interface ILoanBreakdownTemplateActions { }

type LoanBreakdownTemplateProps = ILoanBreakdownTemplateViewModel & ILoanBreakdownTemplateActions;

const LoanBreakdownTemplate: React.FC<LoanBreakdownTemplateProps> = props => {
  return (
    <>
      <div className={'pv3 ph4 tc'} style={{ backgroundColor: hexGrayLight, color: hexBlack }}>
        <Heading size={EHeadingSize.H4} text={props.title} noColor />
        <Text>{props.subtitle}</Text>
        <div className={'ba b--dotted bw2 mb3'} style={{ borderColor: hexRedLight }}>
          <div className={'flex justify-center flex-wrap'}>{props.disclaimer}</div>
        </div>
      </div>
      {props.metricSections}
      <div className={'pa3'}>
        <div className={'flex justify-center flex-wrap'}>{props.cards}</div>
      </div>
    </>
  );
};

export default LoanBreakdownTemplate;
