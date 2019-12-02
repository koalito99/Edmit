import * as React from 'react'
import { EReportType, IEmptyReportData, IReportActions, SingleReportProps, useReportPage } from '../report/shared'
import { OnboardingArea } from '../onboarding-wizard/onboardingArea'
import Card from '@edmit/component-library/src/components/atoms/card'
import PageContainer from '@edmit/component-library/src/components/atoms/page-container'
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button'
import FormSubmit, { ESubmitState } from '@edmit/component-library/src/components/atoms/form/form-submit'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import ProgressNav from '@edmit/component-library/src/components/molecules/progress-nav'
import { CostAttendanceSteps } from './step/cost-attendance'
import { LoanAmountSteps } from './step/loan-amount'
import { LoanPaymentsReportStep } from './step/loan-payments'
import { useStudentSwitcher } from '../../../hooks/student-switcher'
import { InterimStep } from './step/interim'
import { SavingsAndContributionsStep } from './step/savings-and-contributions'
import { NextStepsStep } from './step/next-steps'
import { ConnectedSearchCollegesProps } from '@edmit/component-library/src/components/molecules/search-colleges'
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner'
import { SmartEFCFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-efc'
import { SmartHHIFieldProps } from '@edmit/component-library/src/components/molecules/smart-fields/field-hhi'
import AskEdmit from '@edmit/component-library/src/components/organisms/quick-faqs'
import Modal from '@edmit/component-library/src/components/molecules/modal';
import { PersonLoanApplicantParty, CreateCrediblePrefillRequest, CreateCrediblePrefillRequestVariables } from '../../../graphql/generated';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_CREDIBLE_PREFILL_REQUEST } from '../../../graphql/mutations';
import { LoanNextButton } from '../../../testIds/ids';

interface ILoanReportComponents {
  searchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
  efcFieldComponent: React.ComponentType<Partial<SmartEFCFieldProps>>;
  hhiFieldComponent: React.ComponentType<Partial<SmartHHIFieldProps>>;
}

interface ILoanReportProps extends ILoanReportComponents {
  step: ELoanReportWizardStep;
  nextShown: boolean;
  nextCopy: string;
  nextEnabled: boolean;
  crediblePrefillLoading: boolean;
  nextCallback: () => void;
  setNextShown: (v: boolean) => void;
  setNextCopy: (v: string) => void;
  setNextCallback: (v: () => void) => void;
  setNextEnabled: (v: boolean) => void;
  setStep: (v: ELoanReportWizardStep) => void;
  setCredibleModalOpen: (open: boolean) => void;
  credibleModalOpen: boolean;
  createCrediblePrefillAndRedirect: (
    studentId: string,
    collegeId: string,
    lap: PersonLoanApplicantParty
  ) => Promise<void>;
}

export enum ELoanReportWizardStep {
  Interim = "Interim",
  EfcAndHhi = "EfcAndHhi",
  CostAttendance = "CostAttendance",
  SavingsAndContributions = "SavingsAndContributions",
  LoanAmount = "LoanAmount",
  LoanBreakdownFederal = "LoanBreakdownFederal",
  LoanBreakdownPrivate = "LoanBreakdownPrivate",
  LoanPayments = "LoanPayments",
  NextSteps = "NextSteps"
}

export type LoanReportNonEmptyProps = ILoanReportProps & SingleReportProps;
export type LoanReportEmptyProps = ILoanReportProps & IReportActions & IEmptyReportData;

export interface ILoanReportOwnProps extends ILoanReportComponents {
  children: (props: LoanReportNonEmptyProps | LoanReportEmptyProps) => React.ReactNode;
  onUploadAidLetter: (
    college: {
      id: string;
      name: string;
      edstimate: number;
    } | null
  ) => void;
}

export type LoanReportOwnProps = ILoanReportOwnProps;

const defaultNextCallback = () => console.log('Next');

const useLoanReportState = () => {
  const hash = window.location.hash && window.location.hash.slice(1);

  const initialStep = hash ? ELoanReportWizardStep[hash] : ELoanReportWizardStep.Interim;

  const [step, setStep] = React.useState<ELoanReportWizardStep>(initialStep);
  const [nextShown, setNextShown] = React.useState(true);
  const [nextCopy, setNextCopy] = React.useState('Next');
  const [nextEnabled, setNextEnabled] = React.useState(false);
  const [nextCallback, setNextCallback] = React.useState<() => void>(() => defaultNextCallback);

  React.useEffect(() => {
    window.location.hash = '#' + step;
  }, [step])

  return {
    nextCallback,
    nextCopy,
    nextEnabled,
    nextShown,
    setNextCallback,
    setNextCopy,
    setNextEnabled,
    setNextShown,
    setStep,
    step
  };
};

export const LoanReportWithData: React.SFC<LoanReportOwnProps> = props => {
  const { studentId } = useStudentSwitcher();
  const [crediblePrefillLoading, setCrediblePrefillLoading] = React.useState(false)
  const [credibleModalOpen, setCredibleModalOpen] = React.useState(false)

  const createCrediblePrefillMutation = useMutation<CreateCrediblePrefillRequest, CreateCrediblePrefillRequestVariables>(CREATE_CREDIBLE_PREFILL_REQUEST)

  const { nextCallback: originalNextCallback, ...state } = useLoanReportState();

  const nextCallback = () => {
    var mainDiv = document.getElementById('mainDiv');
    if (mainDiv != null) {
      mainDiv.scrollTop = 0;
    }

    const timeoutFunc = () => originalNextCallback();

    setTimeout(timeoutFunc, 300);
  }

  const report = useReportPage(
    studentId,
    {
      uploadAidLetter: props.onUploadAidLetter
    },
    true
  );

  const createCrediblePrefillAndRedirect = async (
    studentId: string,
    collegeId: string,
    loanApplicantParty: PersonLoanApplicantParty
  ) => {
    setCrediblePrefillLoading(true)

    const response = await (createCrediblePrefillMutation(
      {
        variables: {
          studentId,
          collegeId,
          loanApplicantParty
        }
      }
    ) as Promise<{ data: CreateCrediblePrefillRequest }>)

    if (response && response.data && response.data.createCrediblePrefillRequest.id) {
      setCrediblePrefillLoading(false)
      window.location.href = `/redirect/${response.data.createCrediblePrefillRequest.id}`
    }
  }

  const { children, ...restProps } = props;

  if (report.loading) {
    return (
      <div className={'mt7'}>
        <LoadingSpinner />
      </div>
    );
  }

  const shared = {
    setCredibleModalOpen,
    credibleModalOpen
  }

  if (report.type === EReportType.Single) {
    return children({
      ...shared,
      ...restProps,
      ...report,
      ...state,
      nextCallback,
      crediblePrefillLoading,
      createCrediblePrefillAndRedirect
    }) as any;
  } else if (report.type === EReportType.Multi) {
    return children({
      ...shared,
      ...restProps,
      ...{
        ...report,
        college: report.colleges[0],
        type: EReportType.Single,
      },
      crediblePrefillLoading,
      createCrediblePrefillAndRedirect,
      ...state,
      nextCallback
    });
  } else if (report.type === EReportType.Empty) {
    return children({
      ...shared,
      ...restProps,
      ...{
        ...report,
        college: null
      },
      crediblePrefillLoading,
      createCrediblePrefillAndRedirect,
      ...state,
      nextCallback,
    });
  }

  return <span />;
};

const LoanReportNavigation: React.SFC<LoanReportNonEmptyProps | LoanReportEmptyProps> = props => {
  return (
    <div className="tr mt3 pa3" /* bt b--moon-gray */>
      <div className={'flex justify-end items-center'}>
        {props.step !== ELoanReportWizardStep.NextSteps && (
          <span data-testid={LoanNextButton}>
            <FormSubmit
              buttonSize={EButtonSize.Medium}
              disabled={!props.nextEnabled || props.refetching}
              defaultText={props.nextCopy}
              submittedText={'Saving'}
              succeededText={'Saved'}
              submitState={!props.refetching ? ESubmitState.Default : ESubmitState.Submitted}
              failedText={'Saving Failed'}
              onClick={() => props.nextCallback()}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export const LoanReport: React.SFC<LoanReportNonEmptyProps | LoanReportEmptyProps> = props => {
  return (
    <PageContainer>
      <>
        <div id="loanDiv">
          <Heading
            size={EHeadingSize.H3}
            text={"Student Loan Calculator"}
            className={"tc mb0"}
          />
          <Heading
            size={EHeadingSize.H4}
            text={props.college ? `for ${props.college.name}` : ''}
            className={'tc mt2 mb5'}
          />
          {![ELoanReportWizardStep.Interim].includes(props.step) && (
            <span className="dn db-ns">
              <ProgressNav<ELoanReportWizardStep>
                steps={[
                  {
                    label: (
                      <span>
                        Cost of attendance
                      {/*{props.step !== ELoanReportWizardStep.CostAttendance ? (
                        <span>
                          <br />
                          {numeral(props.college.edstimate).format('$0a')}
                        </span>
                      ) : (
                        ''
                      )}*/}
                      </span>
                    ),
                    step: [ELoanReportWizardStep.EfcAndHhi, ELoanReportWizardStep.CostAttendance]
                  },
                  {
                    label: (
                      <span>
                        Savings and Contributions
                      {/*{props.step !== ELoanReportWizardStep.SavingsAndContributions ? (
                        <span>
                          <br />
                          {numeral(-1).format('$0a')}
                        </span>
                      ) : (
                        ''
                      )}*/}
                      </span>
                    ),
                    step: [ELoanReportWizardStep.SavingsAndContributions]
                  },
                  {
                    label: (
                      <span>
                        Loan Amount
                      {/*{props.step !== ELoanReportWizardStep.LoanAmount ? (
                        <span>
                          <br />
                          {numeral(-1).format('$0a')}
                        </span>
                      ) : (
                        ''
                      )}*/}
                      </span>
                    ),
                    step: [
                      ELoanReportWizardStep.LoanAmount,
                      ELoanReportWizardStep.LoanBreakdownFederal,
                      ELoanReportWizardStep.LoanBreakdownPrivate
                    ]
                  },
                  {
                    label: (
                      <span>
                        Loan Payments
                      {/*{props.step !== ELoanReportWizardStep.LoanPayments ? (
                        <span>
                          <br />
                          {numeral(-1).format('$0a')}
                        </span>
                      ) : (
                        ''
                      )}*/}
                      </span>
                    ),
                    step: [ELoanReportWizardStep.LoanPayments]
                  },
                  {
                    label: 'Next Steps',
                    step: [ELoanReportWizardStep.NextSteps]
                  }
                ]}
                activeStep={props.step}
              />
            </span>
          )}
          {
            <Card key="card" style={{ overflowX: 'hidden' }}>
              <OnboardingArea
                content={
                  <>
                    <div>
                      <Modal
                        isOpen={props.credibleModalOpen}
                        maxWidth={800}
                        onClose={() => props.setCredibleModalOpen(false)}
                      >
                        <div className="pa3 pb4 w-100">
                          <span className="pa5">
                            <h3>Who is starting the form?</h3>
                          </span>
                          <div className="flex flex-wrap-ns">
                            <div className="w-50-ns w-100 pa2">
                              <Button
                                className="w-100"
                                text={"I'm the co-signer"}
                                onClick={() => props.college && props.createCrediblePrefillAndRedirect(props.student.id, props.college.id, PersonLoanApplicantParty.Cosigner)}
                                size={EButtonSize.Large}
                                type={EButtonType.Primary}
                              />
                            </div>
                            <div className="w-50-ns w-100 pa2">
                              <Button
                                className="w-100"
                                text={"I'm the student"}
                                onClick={() => props.college && props.createCrediblePrefillAndRedirect(props.student.id, props.college.id, PersonLoanApplicantParty.Student)}
                                size={EButtonSize.Large}
                                type={EButtonType.Primary}
                              />
                            </div>
                          </div>
                        </div>

                      </Modal>
                      <InterimStep {...props} />
                      {props.type !== EReportType.Empty && (
                        <>
                          <CostAttendanceSteps {...props} />
                          <SavingsAndContributionsStep {...props} />
                          <LoanAmountSteps {...props} />
                          <LoanPaymentsReportStep {...props} />
                          <NextStepsStep {...props} />
                        </>
                      )}
                    </div>
                  </>
                }
              />
              <LoanReportNavigation {...props} />
            </Card>
          }
          <div className={'mt4'}>
            <AskEdmit loading={props.loading} hiddenFastAnswers={[]} disabledFastAnswers={[]} content={
              [
                {
                  answer: "The average student loan debt depends upon the college, the student, the type of loans taken out (student, parent, federal, or private) and the length of time that the student is in school. 62% of students graduate with less than $25,000 in total debt. Only 7% graduate with more than $50,000 in loans.",
                  link: "https://www.edmit.me/blog/filtering-out-the-noise-around-student-loan-debt",
                  question: "What is the average student loan debt?"
                },
                {
                  answer: "College is an investment in your future. To make an informed decision, you need to understand two key areas: your expected income alongside the terms of your student loans. When you know both, you’ll be able to determine affordability.",
                  link: "https://learn.edmit.me/how-much-student-loan-debt-is-too-much/",
                  question: "How much student loan debt is too much?"
                },
                {
                  answer: "Student loans can be issued to parents or students, by the U.S. Department of Education (called \"federal loans\") or private lenders. Federal loans can be subsidized, meaning interest does not accrue during the student's time in college.",
                  link: "https://www.edmit.me/blog/what-types-of-student-loans-are-there",
                  question: "What types of student loans are there?"
                },
                {
                  answer: "Student loans can and should be spent on education-related expenses, which include tuition, room and board, student activity fees, books and supplies, transportation, and other related costs.",
                  link: "https://www.edmit.me/blog/what-do-student-loans-cover",
                  question: "What do student loans cover?"
                }
              ]
            } />
          </div>
          {props.step === ELoanReportWizardStep.NextSteps && (
            <div className="pt3 pb3">
              <p className="t-small gray-dim">Edmit may be compensated by the third party lenders and others who place ads on the website. Edmit is not a lender and does not endorse the products of these advertisers. Fees that Edmit receives for ads do not affect the terms you may be offered by the lender you choose. There are many additional borrowing options available.</p>
            </div>
          )}
        </div>
      </>
    </PageContainer>
  );
};
