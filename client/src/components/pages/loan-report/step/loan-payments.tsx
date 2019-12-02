import * as React from 'react';
import { ELoanReportWizardStep, LoanReportNonEmptyProps } from '..';
import {
  hexBlack,
  hexGrayLight,
  hexOffwhite,
  hexRed,
  hexRedLight,
  hexRedMuted,
  hexWhite
} from '@edmit/component-library/src/components/atoms/colors';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import Icon, { EIconName } from '@edmit/component-library/src/components/atoms/icon';
import Heading, {
  EHeadingSize
} from '@edmit/component-library/src/components/atoms/typography/heading';
import MetricCard from '@edmit/component-library/src/components/organisms/card-metric';
import LoanInterestAnnualGraph, {
  ILoanInterestAnnualGraphViewModel
} from '@edmit/component-library/src/components/molecules/graph/loan-interest-annual';
import numeral from 'numeral';
import { IReportCollege } from '../../report/shared';

export const LoanPaymentsReportStep: React.SFC<LoanReportNonEmptyProps> = props => {
  const federalSubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Subsidized Loan'
  );
  const federalUnsubsidizedLoan = props.college.loans.find(
    loan => loan.provider === 'Federal Unsubsidized Loan'
  );
  const privateLoan = props.college.loans.find(loan => loan.provider === 'Private Loan');

  React.useEffect(() => {
    if (props.step === ELoanReportWizardStep.LoanPayments) {
      props.setNextEnabled(true);
      props.setNextCallback(() => () => props.setStep(ELoanReportWizardStep.NextSteps));
    }
  }, [props.step]);

  const body = {
    [ELoanReportWizardStep.LoanPayments]: (
      <>
        <div
          className={'pv3 ph4 tc mb3'}
          style={{ backgroundColor: hexGrayLight, color: hexBlack }}
        >
          <Heading
            size={EHeadingSize.H4}
            text={`To sum up, your estimated loan amount with interest is ${numeral(
              (federalSubsidizedLoan ? federalSubsidizedLoan.initialTotalLoanAmount : 0) +
              (federalUnsubsidizedLoan ? federalUnsubsidizedLoan.initialTotalLoanAmount : 0) +
              (privateLoan ? privateLoan.initialTotalLoanAmount : 0)
            ).format('$0,0')}`}
            noColor
          />
        </div>
        <LoanPaymentDetails
          title={
            'To cover your 4 years of college, here are your estimated loan payments post graduation.'
          }
          federalSubsidizedLoan={federalSubsidizedLoan}
          federalUnsubsidizedLoan={federalUnsubsidizedLoan}
          privateLoan={privateLoan}
        />
      </>
    )
  };

  return <>{body[props.step]}</>;
};

type Loan = IReportCollege['loans'][0];

interface ILoanPaymentDetailsViewModel {
  federalSubsidizedLoan?: Loan;
  federalUnsubsidizedLoan?: Loan;
  privateLoan?: Loan;

  title: React.ReactNode;
  cta?: React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

interface ILoanPaymentDetailsActions { }

type LoanPaymentDetailsProps = ILoanPaymentDetailsViewModel & ILoanPaymentDetailsActions;

export const LoanPaymentDetails: React.FC<LoanPaymentDetailsProps> = props => {
  const [calcOpened, setCalcOpened] = React.useState(false);

  const getLoanPaymentValues = (month: number) => {
    const federalSubsidizedLoanPayment =
      props.federalSubsidizedLoan &&
      props.federalSubsidizedLoan.payments.find(p => p.month === month);
    const federalUnsubsidizedLoanPayment =
      props.federalUnsubsidizedLoan &&
      props.federalUnsubsidizedLoan.payments.find(p => p.month === month);
    const privateLoanPayment =
      props.privateLoan && props.privateLoan.payments.find(p => p.month === month);

    const loanProperty = (
      getValue: (payment: NonNullable<typeof federalSubsidizedLoanPayment>) => number
    ) => {
      return (
        (federalSubsidizedLoanPayment ? getValue(federalSubsidizedLoanPayment) : 0) +
        (federalUnsubsidizedLoanPayment ? getValue(federalUnsubsidizedLoanPayment) : 0) +
        (privateLoanPayment ? getValue(privateLoanPayment) : 0)
      );
    };

    return {
      paymentAmount: loanProperty(p => p.paymentAmount),
      principal: loanProperty(p => p.remainingPrincipal),
      totalInterest: loanProperty(p => p.remainingInterest)
    };
  };

  const payments = ((props.federalSubsidizedLoan ||
    props.federalUnsubsidizedLoan ||
    props.privateLoan ||
    ({ payments: [] } as any)) as Loan).payments;

  const annualMonthlyPayment =
    payments.reduce((acc, curr) => {
      return acc + getLoanPaymentValues(curr.month).paymentAmount;
    }, 0) / payments.length;

  return (
    <div style={props.style} className={props.className}>
      <div className={'tc pv2'} style={{ backgroundColor: hexOffwhite }}>
        <Text>{props.title}</Text>
        <MetricCard
          value={numeral(annualMonthlyPayment).format('$0,0')}
          yearValue={'per month'}
          textColor={hexRed}
        />
        {props.cta}
        <div>
          <div className={'flex justify-center'}>
            <span
              className={'pointer'}
              onClick={() => setCalcOpened(currentlyOpen => !currentlyOpen)}
            >
              <Text className="tr">
                <span>Show how we calculated this</span>
                <Icon name={calcOpened ? EIconName.ChevronDown : EIconName.ChevronRight} />
              </Text>
            </span>
          </div>
          {calcOpened && (
            <div className={'mb3'}>
              <div className={'flex justify-center flex-wrap mh4'}>
                {props.federalSubsidizedLoan && (
                  <div className={'w-third-ns w-100-m bg-white'}>
                    <div
                      className={' ph3-ns pv3'}
                      style={{ backgroundColor: hexRedLight, color: hexWhite }}
                    >
                      <Text className={'tc mv0'}>
                        <span className={'white t-large b'}>Federal Subsidized</span>
                      </Text>
                      <MetricCard
                        value={numeral(props.federalSubsidizedLoan.strictPrincipal).format('$0,0')}
                        textColor={hexWhite}
                        yearValue={'for 4 years'}
                      />
                    </div>
                    <div className={'mh2'}>
                      <div className={'mv4'}>
                        <MetricCard
                          value={numeral(props.federalSubsidizedLoan.initialTotalLoanAmount).format(
                            '$0,0'
                          )}
                          textColor={'black'}
                          valueStyle={{ marginBottom: 0 }}
                        />
                        <Text className={'tc i mv0'}>loan amount with interest</Text>
                        <Text className={'tc i mv0'}>
                          <span className={'gray-muted'}>
                            {numeral(props.federalSubsidizedLoan.interestRate).format('0.00%')}{' '}
                            Interest Rate
                          </span>
                        </Text>
                        <MetricCard
                          value={numeral(
                            props.federalSubsidizedLoan.payments.reduce(
                              (acc, curr) => acc + curr.paymentAmount,
                              0
                            ) / props.federalSubsidizedLoan.payments.length
                          ).format('$0')}
                          textColor={'black'}
                          className={'mt4'}
                          valueStyle={{ marginBottom: 0 }}
                        />
                        <Text className={'tc i mv0'}>estimated monthly payment</Text>
                      </div>
                    </div>
                  </div>
                )}
                {props.federalUnsubsidizedLoan && (
                  <div className={'w-third-ns w-100-m bg-white'}>
                    <div
                      className={'ph3-ns pv3'}
                      style={{ backgroundColor: hexRedMuted, color: hexWhite }}
                    >
                      <Text className={'tc mv0'}>
                        <span className={'white t-large b'}>Federal Unsubsidized</span>
                      </Text>
                      <MetricCard
                        value={numeral(props.federalUnsubsidizedLoan.strictPrincipal).format(
                          '$0,0'
                        )}
                        textColor={hexWhite}
                        yearValue={'for 4 years'}
                      />
                    </div>
                    <div className={'mv4'}>
                      <MetricCard
                        value={numeral(props.federalUnsubsidizedLoan.initialTotalLoanAmount).format(
                          '$0,0'
                        )}
                        textColor={'black'}
                        valueStyle={{ marginBottom: 0 }}
                      />
                      <Text className={'tc i mv0'}>loan amount with interest</Text>
                      <Text className={'tc i mv0'}>
                        <span className={'gray-muted'}>
                          {numeral(props.federalUnsubsidizedLoan.interestRate).format('0.00%')}{' '}
                          Interest Rate
                        </span>
                      </Text>
                      <MetricCard
                        value={numeral(
                          props.federalUnsubsidizedLoan.payments.reduce(
                            (acc, curr) => acc + curr.paymentAmount,
                            0
                          ) / props.federalUnsubsidizedLoan.payments.length
                        ).format('$0')}
                        textColor={'black'}
                        className={'mt4'}
                        valueStyle={{ marginBottom: 0 }}
                      />
                      <Text className={'tc i mv0'}>estimated monthly payment</Text>
                    </div>
                  </div>
                )}
                {props.privateLoan && (
                  <div className={'w-third-ns w-100-m bg-white'}>
                    <div
                      className={'ph3-ns pv3'}
                      style={{ backgroundColor: hexRed, color: hexWhite }}
                    >
                      <Text className={'tc mv0'}>
                        <span className={'white t-large b'}>Private Student Loan</span>
                      </Text>
                      <MetricCard
                        value={numeral(props.privateLoan.strictPrincipal).format('$0,0')}
                        textColor={hexWhite}
                        yearValue={'for 4 years'}
                      />
                    </div>
                    <div className={'mv4'}>
                      <MetricCard
                        value={numeral(props.privateLoan.initialTotalLoanAmount).format('$0,0')}
                        textColor={'black'}
                        valueStyle={{ marginBottom: 0 }}
                      />
                      <Text className={'tc i mv0'}>loan amount with interest</Text>
                      <Text className={'tc i mv0'}>
                        <span className={'gray-muted'}>
                          {numeral(props.privateLoan.interestRate).format('0.00%')} Interest Rate
                        </span>
                      </Text>
                      <MetricCard
                        value={numeral(
                          props.privateLoan.payments.reduce(
                            (acc, curr) => acc + curr.paymentAmount,
                            0
                          ) / props.privateLoan.payments.length
                        ).format('$0')}
                        textColor={'black'}
                        className={'mt4'}
                        valueStyle={{ marginBottom: 0 }}
                      />
                      <Text className={'tc i mv0'}>estimated monthly payment</Text>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={'flex justify-center flex-wrap flex-nowrap-l mv3 pa3'}>
        <MetricCard
          title={`Your estimated total principal is`}
          value={numeral(
            (props.federalSubsidizedLoan ? props.federalSubsidizedLoan.strictPrincipal : 0) +
            (props.federalUnsubsidizedLoan ? props.federalUnsubsidizedLoan.strictPrincipal : 0) +
            (props.privateLoan ? props.privateLoan.strictPrincipal : 0)
          ).format('$0,0')}
          className={'ph4'}
        />
        <MetricCard
          title={`Your estimated total interest is`}
          value={numeral(
            (props.federalSubsidizedLoan
              ? props.federalSubsidizedLoan.initialTotalLoanAmount -
              props.federalSubsidizedLoan.strictPrincipal
              : 0) +
            (props.federalUnsubsidizedLoan
              ? props.federalUnsubsidizedLoan.initialTotalLoanAmount -
              props.federalUnsubsidizedLoan.strictPrincipal
              : 0) +
            (props.privateLoan
              ? props.privateLoan.initialTotalLoanAmount - props.privateLoan.strictPrincipal
              : 0)
          ).format('$0,0')}
          className={'ph4 bl br b--gray-light'}
        />
        <MetricCard
          title={`Your estimated total payment is`}
          value={numeral(
            (props.federalSubsidizedLoan ? props.federalSubsidizedLoan.initialTotalLoanAmount : 0) +
            (props.federalUnsubsidizedLoan
              ? props.federalUnsubsidizedLoan.initialTotalLoanAmount
              : 0) +
            (props.privateLoan ? props.privateLoan.initialTotalLoanAmount : 0)
          ).format('$0,0')}
          className={'ph4'}
        />
      </div>
      <div>
        <div className={'mh3'}>
          <LoanInterestAnnualGraph
            years={payments.reduce<ILoanInterestAnnualGraphViewModel['years']>(
              (acc, payment) => {
                return payment.month % 12 === 0
                  ? [
                    ...acc,
                    {
                      year: (payment.month / 12) + 2024,
                      ...getLoanPaymentValues(payment.month)
                    }
                  ]
                  : acc;
              },
              [
                {
                  year: 2024,
                  ...getLoanPaymentValues(1)
                }
              ]
            )}
            principalColor={hexRed}
            interestColor={hexRedLight}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};
