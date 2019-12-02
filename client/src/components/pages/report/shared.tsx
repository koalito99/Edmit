import * as React from 'react';
import {
  AddToHand,
  AddToHandVariables,
  DismissRecommendation,
  DismissRecommendationVariables,
  GetMajors,
  GetProfile,
  GetProfileVariables,
  GetReportPage,
  GetReportPage_student,
  GetReportPage_student_appliedProducts,
  GetReportPage_student_hand_current,
  GetReportPageVariables,
  OnboardingStatus,
  ProfileUpdateInput,
  SetHand,
  SetHandVariables,
  Signup,
  SignupVariables,
  UpdateProfile,
  UpdateProfileVariables,
  CreateCrediblePrefillRequest,
  CreateCrediblePrefillRequestVariables,
  CrediblePrefillRequest,
  CrediblePrefillRequestVariables
} from '../../../graphql/generated'
import { GET_MAJORS, GET_PROFILE, GET_REPORT_PAGE, CREDIBLE_PREFILL_REQUEST } from '../../../graphql/queries';
import {
  ADD_TO_HAND,
  DISMISS_RECOMMENDATION,
  SET_HAND,
  SIGNUP,
  UPDATE_PROFILE
} from '../../../graphql/mutations';
import { history } from '../../../store';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  CollegeId,
  EAtomicBoolean,
  Nullable,
  StudentId,
  useAtomicBoolean
} from '@edmit/component-library/src/lib/models';
import { studentQueryProperties } from '../../../lib/graphql'
import { useUpdateSmartValueRefetcher } from '../../../connectors/molecules/smart-values/shared'
import { EAffordabilityDetermination, EFinancialGrade, EValueDetermination } from '@edmit/component-library/src/shared'
import {
  fromGQLAffordabilityDetermination,
  fromGQLFinancialGrade,
  fromGQLValueDetermination,
} from '../../../graphql/helpers'

export interface IReportMajor {
  name: string;
  id: string;
}

export interface IReportCollege {
  id: string;
  abbreviation: string;
  annualLoanPaymentAmount: number;
  averageAnnualEarningsAmount: number;
  averageCostOfAttendance: number;
  calculationsUseAidAward: boolean;
  financialAidAward: number | null;
  ipedsId: string;
  name: string;
  logoSrc: string | null;
  edstimate: number;
  effectiveCost: number;
  annualEarnings: Array<{
    debtRemaining: number;
    medianEarnings: number;
    year: number;
    netEarnings: number;
  }>;
  loans: Array<{
    provider: string;
    interestRate: number;
    strictPrincipal: number;
    // initialPrincipalAmount: number;
    initialInterestAmount: number;
    initialTotalLoanAmount: number;
    payments: Array<{
      month: number;
      paymentAmount: number;
      remainingPrincipal: number;
      remainingInterest: number;
      remainingTotal: number;
    }>
  }>
  loansAmount: number;
  loanInterestRate: number;
  loanPaymentMonths: number;
  loanPrincipalAmount: number;
  financialGrade: EFinancialGrade;
  fourYearEdstimate: number;
  fourYearLoanAmount: number;
  affordabilityDelta: number;
  affordabilityDetermination: EAffordabilityDetermination;
  valueBenchmark: number;
  valueDelta: number;
  valueDetermination: EValueDetermination;
  costOfAttendance: number;
  affordabilityBenchmark: number;
}

export interface IReportStudent {
  id: string;
  firstName: string;
  lastName: string;
  savings: number;
  annualCash: number;
  annualWorkStudy: number;
  otherScholarships: number | null;
  imputedHouseholdIncome: number;
  householdIncome: number | null;
  majorId: string | null;
  appliedProducts: GetReportPage_student_appliedProducts[];
  efc: number | null;
  onboardingStatus: OnboardingStatus | null;
  postalCode: { id: string; code: string; } | null
  creditScore: number | null;
}

export enum EReportType {
  Empty,
  Single,
  Multi
}

export interface ISingleCollegeReportProps {
  college: IReportCollege;
}

export interface IMultiCollegeReportProps {
  colleges: IReportCollege[];
}

export interface IReportStudentProps {
  student: IReportStudent;
}

interface ILoadingReportData {
  loading: true;
}

interface IReportData {
  loading: boolean;
  refetching: boolean;
}

interface ILoadingReportData extends IReportData {
  loading: true;
}

interface ILoadedReportData extends IReportData {
  type: EReportType;
  loading: false;
  student: IReportStudent;
  majors: IReportMajor[];
  account: {
    emailAddress: string | null;
    userIsLoggedIn: boolean;
  }
}

export interface IEmptyReportData extends ILoadedReportData {
  type: EReportType.Empty;
  college: null;
}

export interface INonEmptyReportData extends ILoadedReportData, IReportStudentProps {
  type: EReportType.Single | EReportType.Multi;
}

export interface ISingleReportData extends ILoadedReportData {
  type: EReportType.Single;
  college: IReportCollege;
}

export interface IMultiReportData extends INonEmptyReportData {
  type: EReportType.Multi;
  colleges: IReportCollege[];
}

type LoadingReport = ILoadingReportData;
type SingleReport = ISingleReportData;
type MultiReport = IMultiReportData;
type LoadedReport = IEmptyReportData | ISingleReportData | IMultiReportData;

type ReportData = LoadingReport | LoadedReport;

export interface IReportActions {
  refetch: () => void;
  updateProfile: (data: ProfileUpdateInput) => void;
  addToHand: (studentId: string, college: string) => void;
  setHand: (studentId: StudentId, colleges: CollegeId[]) => void;
  dismissRecommendation: (studentId: StudentId, collegeId: string) => void;
  uploadAidLetter: (college: {
    id: string;
    name: string;
    edstimate: number;
  } | null) => void;
}

export type ReportProps = IReportActions & ReportData;
export type LoadedReportProps = IReportActions & LoadedReport;
export type SingleReportProps = IReportActions & SingleReport;
export type MultiReportProps = IReportActions & MultiReport;

const getReportStudent = (student?: GetReportPage_student): IReportStudent | null => {
  if (!student) {
    return null;
  }

  const income = student.household && student.household.income;

  return {
    annualCash: student.cashContributionAmount.value,
    annualWorkStudy: student.workStudyAmount.value,
    appliedProducts: student.appliedProducts,
    firstName: (student.person && student.person.firstName) || '',
    efc: student.household && student.household.efc && student.household.efc.value,
    householdIncome: income && income.value,
    id: student.id,
    imputedHouseholdIncome: (student.household && student.household.imputedIncome) || 50000,
    lastName: (student.person && student.person.lastName) || '',
    majorId: student.major && student.major.id,
    onboardingStatus: student.onboardingStatus,
    otherScholarships: student.otherScholarshipsAmount.value,
    postalCode: student.household && student.household.postalCode && {
      id: student.household.postalCode.id,
      code: student.household.postalCode.postalCode
    },
    savings: student.collegeSavingsAmount.value,
    creditScore: student.creditScore.value
  };
};

const getReportCollege = (college: GetReportPage_student_hand_current): IReportCollege => {
  return {
    abbreviation: college.abbreviation,
    affordabilityBenchmark: college.affordabilityBenchmark.value,
    affordabilityDelta: college.affordabilityDelta.value,
    affordabilityDetermination: fromGQLAffordabilityDetermination(college.affordabilityDetermination),
    annualEarnings: college.medianEarnings.reduce<IReportCollege["annualEarnings"]>(
      (acc, yearlyMedianEarnings) => [
        ...acc,
        {
          debtRemaining: college.debtRemaining.find(
            record => record.year === yearlyMedianEarnings.year
          )!.value,
          medianEarnings: (() => {
            const currentYearMedianEarnings = college.medianEarnings.find(
              record => record.year === yearlyMedianEarnings.year
            )!.value;

            const prevYear = acc.length !== 0 ? acc[acc.length - 1] : null;
            const prevYearMedianEarnings = prevYear ? (prevYear as any).medianEarnings : null;

            return prevYearMedianEarnings && currentYearMedianEarnings < prevYearMedianEarnings
              ? prevYearMedianEarnings
              : currentYearMedianEarnings;
          })(),
          netEarnings: college.netEarnings.find(
            record => record.year === yearlyMedianEarnings.year
          )!.value,
          year: yearlyMedianEarnings.year
        }
      ],
      []
    ),
    annualLoanPaymentAmount: college.annualLoanPaymentAmount.value,
    averageAnnualEarningsAmount: college.averageAnnualEarningsAmount.value,
    averageCostOfAttendance: college.averageCostOfAttendance || college.costOfAttendance.value,
    calculationsUseAidAward: college.calculationsUseAidAward,
    costOfAttendance: college.costOfAttendance.value,
    edstimate: college.edstimate.value,
    effectiveCost: college.effectiveCost.value,
    financialAidAward: college.financialAidAward,
    financialGrade: fromGQLFinancialGrade(college.financialGrade),
    fourYearEdstimate: college.edstimate.value * 4,
    fourYearLoanAmount: college.totalLoanAmount.value,
    id: college.id,
    ipedsId: '',
    loans: college.loans,
    loanInterestRate: college.loanInterestRate.value,
    loanPaymentMonths: college.loanPaymentMonths.value,
    loanPrincipalAmount: college.loanPrincipalAmount.value,
    loansAmount: college.totalLoanAmount.value,
    logoSrc: college.logo && college.logo.url,
    name: college.name,
    valueBenchmark: college.valueBenchmark.value,
    valueDelta: college.valueDelta.value,
    valueDetermination: fromGQLValueDetermination(college.valueDetermination)
  };
};

export const useMajors = () => {
  const [data, setData] = React.useState<GetMajors | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const q = useQuery<GetMajors>(GET_MAJORS);

  React.useEffect(() => {
    if (q.data) {
      setData(q.data);
    }

    if (!loaded) {
      setLoading(q.loading);
    }

    if (!q.loading && data) {
      setLoaded(true);
      setLoading(false);
    }
  }, [q]);

  return {
    data,
    loading,
    refetch: q.refetch
  };
};

export const useProfile = (studentId: string) => {
  const q = useQuery<GetProfile, GetProfileVariables>(GET_PROFILE, {
    ...studentQueryProperties(studentId)({}),
    fetchPolicy: 'network-only'
  });

  const [data, setData] = React.useState<GetProfile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (q.data) {
      setData(q.data);
    }

    if (!loaded) {
      setLoading(q.loading);
    }

    if (!q.loading && data) {
      setLoaded(true);
      setLoading(false);
    }
  }, [q]);

  return {
    data,
    loading,
    refetch: q.refetch
  };
};

const useReport = (studentId: Nullable<StudentId>) => {
  const q = useQuery<GetReportPage, GetReportPageVariables>(
    GET_REPORT_PAGE,
    {
      ...studentQueryProperties(studentId)({}),
      fetchPolicy: 'network-only'
    }
  );

  const [data, setData] = React.useState<GetReportPage | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (q.data) {
      setData(q.data);
    }

    if (!loaded) {
      setLoading(q.loading);
    }

    if (!q.loading && data) {
      setLoaded(true);
      setLoading(false);
    }
  }, [q]);

  return {
    data,
    loading,
    refetch: q.refetch
  };
};

export const useSignup = () => {
  const { value: saving, setTrue: setSaving, setFalse: setNotSaving } = useAtomicBoolean(
    EAtomicBoolean.False
  );
  const { value: done, setTrue: setDone } = useAtomicBoolean(EAtomicBoolean.False);
  const m = useMutation<Signup, SignupVariables>(SIGNUP);

  const mutate = async (v: SignupVariables): Promise<Signup> => {
    setSaving();
    const response = await await m({ variables: v });
    setNotSaving();
    setDone();
    return response;
  };

  return {
    mutate,
    saving: saving === EAtomicBoolean.True,
    done
  };
};

export const useUpdateProfile = () => {
  const { value: saving, setTrue: setSaving, setFalse: setNotSaving } = useAtomicBoolean(
    EAtomicBoolean.False
  );
  const { value: done, setTrue: setDone } = useAtomicBoolean(EAtomicBoolean.False);
  const m = useMutation<UpdateProfile, UpdateProfileVariables>(UPDATE_PROFILE);

  const mutate = async (v: UpdateProfileVariables) => {
    setSaving();
    await m({ variables: v });
    setNotSaving();
    setDone();
  };

  return {
    mutate,
    saving: saving === EAtomicBoolean.True,
    done
  };
};

const useAddToHand = () => {
  return useMutation<AddToHand, AddToHandVariables>(ADD_TO_HAND);
};

const useSetHand = () => {
  return useMutation<SetHand, SetHandVariables>(SET_HAND);
};

const useDismissRecommendation = () => {
  return useMutation<DismissRecommendation, DismissRecommendationVariables>(DISMISS_RECOMMENDATION);
};

export const useCreateCrediblePrefillRequest = () => {
  return useMutation<CreateCrediblePrefillRequest, CreateCrediblePrefillRequestVariables>(CREDIBLE_PREFILL_REQUEST)
}

export const useCrediblePrefillRequest = () => {
  return useQuery<CrediblePrefillRequest, CrediblePrefillRequestVariables>(CREDIBLE_PREFILL_REQUEST)
}

export const useReportPage = (studentId: Nullable<StudentId>, actions: {
  uploadAidLetter: (college: {
    id: string;
    name: string;
    edstimate: number;
  } | null) => void
}, disableOnboardingPush?: boolean): ReportProps => {
  const [householdIncome, setHouseholdIncome] = React.useState<number | null>(null);
  const [refetching, setRefetching] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const { loading: majorsLoading, data: majorsData } = useMajors();
  const { loading: reportLoading, data: reportData, refetch: refetchReport } = useReport(studentId);

  const { mutate } = useUpdateProfile();

  const addToHandMutation = useAddToHand();
  const setHandMutation = useSetHand();
  const dismissRecommendationMutation = useDismissRecommendation();

  const loading = majorsLoading || reportLoading;

  const notOnboarded =
    reportData &&
    reportData.student &&
    reportData.student.onboardingStatus === OnboardingStatus.NotOnboarded;

  const refetch = async () => {
    setRefetching(true);
    await refetchReport();
    setRefetching(false);
  };

  const updateProfile = async (data: ProfileUpdateInput) => {
    setSaving(true);
    await mutate({ data });
    await refetch();
    setSaving(false);
  };

  const addToHand = async (sid: string, collegeId: string) => {
    await addToHandMutation({ variables: { studentId: sid, collegesWhere: [{ id: collegeId }] } });
  };

  const setHand = async (sid: StudentId, cids: CollegeId[]) => {
    await setHandMutation({ variables: { studentId: sid, colleges: cids } });
  };

  const dismissRecommendation = async (sid: StudentId, collegeId: string) => {
    await dismissRecommendationMutation({
      variables: { studentId: sid, collegeId, reason: 'NO REASON' }
    });
  };

  if (notOnboarded && !disableOnboardingPush && window.location.pathname.indexOf('onboarding') === -1) {
    history.push('/onboarding');
  }

  const majors =
    majorsData && majorsData.majors && majorsData.majors.map(m => ({ id: m.id, name: m.name }));
  const colleges =
    reportData &&
    reportData.student &&
    reportData.student.hand.current.map(c => getReportCollege(c));
  const student = reportData && getReportStudent(reportData.student);

  useUpdateSmartValueRefetcher("report", refetch, [Boolean(studentId)]);

  const shared = {
    addToHand,
    setHand,
    householdIncome,
    refetch,
    refetching,
    saving,
    setHouseholdIncome,
    updateProfile,
    dismissRecommendation,
    uploadAidLetter: actions.uploadAidLetter,
    account: {
      emailAddress: reportData && reportData.session && reportData.session.account && reportData.session.account.emailAddress && reportData.session.account.emailAddress.emailAddress,
      userIsLoggedIn: Boolean(reportData && reportData.session && reportData.session.account && reportData.session.account.emailAddress && reportData.session.account.hasPassword)
    }
  };

  if (loading || !student || !colleges || !majors) {
    return {
      ...shared,
      loading: true
    };
  } else {
    if (colleges.length === 1) {
      return {
        ...shared,
        college: colleges[0],
        loading: false,
        majors,
        student,
        type: EReportType.Single
      };
    } else if (colleges.length > 1) {
      return {
        ...shared,
        colleges,
        loading: false,
        majors,
        student,
        type: EReportType.Multi
      };
    } else if (colleges.length === 0) {
      return {
        ...shared,
        loading: false,
        majors,
        student,
        type: EReportType.Empty,
        college: null
      };
    }
  }

  throw Error('unexpected - report is loaded but missing data');
};

export interface IOffWhiteSectionProps {
  className?: string;
}

export const OffWhiteSection: React.SFC<IOffWhiteSectionProps> = props => {
  return (
    <div
      className={'flex flex-wrap ' + (props.className ? props.className : 'bg-offwhite mt4 w-100')}
    >
      {props.children}
    </div>
  );
};

export const Single: React.SFC = props => {
  return <div className={'center pa3 w-100 w-50-m'}>{props.children}</div>;
};

export const OneHalf: React.SFC = props => {
  return <div className="center pa3 w-100 mt0-ns mt3 w-50-ns">{props.children}</div>;
};

export const OneThird: React.SFC = props => {
  return <div className="center pa3 w-100 mt0-ns mt3 w-third-ns">{props.children}</div>;
};

export const OneFourth: React.SFC = props => {
  return <div className="center pa3 w-100 mt0-ns mt3 w-25-ns">{props.children}</div>;
};

export const CenterNarrow: React.SFC = props => {
  return <div className="center mt4 w-50-ns">{props.children}</div>;
};

export const ThreeFourthsCenterNarrow: React.SFC = props => {
  return <div className="center mt4 w-75-ns">{props.children}</div>;
};

export const PageSection: React.SFC<{ top?: boolean }> = props => {
  return <div className={props.top ? 'mt5' : 'mt4'}>{props.children}</div>;
};
