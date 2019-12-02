import * as React from 'react';
import ComparisonPage, { IComparisonPageProps } from '../../../components/pages/comparison'
import { MetricRange } from '../../../components/pages/comparison/shared';
import ConnectedSearchColleges from '../../molecules/search-colleges'
import { CollegeId, Nullable, StudentId, useNullableState } from '@edmit/component-library/src/lib/models'
import {
  GetComparisonCollege, GetComparisonCollege_college,
  GetComparisonCollegeVariables, GetComparisonStudent, GetComparisonStudentVariables,
  GetMajors, ProfileUpdateInput,
} from '../../../graphql/generated'
import { useQuery } from 'react-apollo-hooks'
import { GET_COMPARISON_COLLEGE, GET_COMPARISON_STUDENT, GET_MAJORS } from '../../../graphql/queries'
import { extractValue } from '../../../graphql/helpers'
import { isNumber } from 'lodash-es'
import { labelForCostType } from '../../lib'
import { useUpdateProfile, useProfile } from '../../../components/pages/report/shared'
import { Subtract } from '@edmit/component-library/src/lib/typescript'
import { useStudentSwitcher } from '../../../hooks/student-switcher'
import Modal from '@edmit/component-library/src/components/molecules/modal';
import FormFieldEmail from '@edmit/component-library/src/components/atoms/form/form-field-email';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Button, { EButtonSize, EButtonType } from '@edmit/component-library/src/components/atoms/button';
import { studentQueryProperties } from '../../../lib/graphql';


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


const useComparisonStudent = (studentId: Nullable<StudentId>) => {
  const q = useQuery<GetComparisonStudent, GetComparisonStudentVariables>(
    GET_COMPARISON_STUDENT,
    studentQueryProperties(studentId)({})
  );

  const [data, setData] = React.useState<GetComparisonStudent | null>(null);
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

const useComparisonCollege = (studentId: Nullable<StudentId>, collegeId: Nullable<CollegeId>) => {

  const q = useQuery<GetComparisonCollege, GetComparisonCollegeVariables>(
    GET_COMPARISON_COLLEGE,
    {
      skip: !studentId || !collegeId,
      variables: {
        collegeId: collegeId!,
        studentId: studentId!
      }
    }
  );

  const [data, setData] = React.useState<GetComparisonCollege | null>(null);
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

const getComparisonCollege = (college: GetComparisonCollege_college): IComparisonPageProps["colleges"][0] => {
  // FIXME: handle null values
  return {
    id: college.id,
    name: college.name,
    city: college.postalCode.city.name,
    state: college.postalCode.city.state.abbreviation,
    totalCostOfAttendance: college.costOfAttendance.value,
    averageNetPrice: college.averageCostOfAttendance,
    percentageOfFreshmenReceivingFinancialAid: college.percentOfFreshmenReceivingAid,
    costs: college.costOfAttendance.from.reduce<IComparisonPageProps["colleges"][0]["costs"]>((acc, cost) => {
      const value = extractValue(cost);
      if (isNumber(value)) {
        return [...acc, {
          type: labelForCostType(cost.name) || cost.name,
          amount: value,
        }];
      }
      return acc;
    }, []),
    salaries: college.medianEarnings.map(earnings => ({
      year: earnings.year,
      salary: earnings.value
    })),
    averageLoanAmount: college.averageTotalLoanAmount,
    loanRepaymentPercentage: college.repaymentRate * 100,
    averageStartingSalary: college.medianEarnings.find(earnings => earnings.year === 0)!.value,
    sat: { average: college.averageSATScore.value, range: (college.satScoreIQR && [college.satScoreIQR.low, college.satScoreIQR.high] as MetricRange) },
    act: { average: college.averageACTScore.value, range: (college.actScoreIQR && [college.actScoreIQR.low, college.actScoreIQR.high] as MetricRange) },
    gpa: { average: college.averageGPA.value, range: null }, // FIXME
    acceptancePercentage: college.admissionRate * 100,
    applicationFee: college.applicationFee,
    applicationDeadline: null // FIXME
  };
};

export const useComparisonPage = (
  studentId: Nullable<StudentId>,
  firstCollegeId: Nullable<CollegeId>,
  secondCollegeId: Nullable<CollegeId>
): Subtract<IComparisonPageProps, { leftSearchCollegesComponent: any; rightSearchCollegesComponent: any }> => {
  const [saving, setSaving] = React.useState(false);
  const [refetching, setRefetching] = React.useState(false);

  const { loading: majorsLoading, data: majorsData } = useMajors();
  const { loading: studentLoading, data: studentData, refetch: refetchStudent } = useComparisonStudent(studentId);
  const { loading: firstCollegeLoading, data: firstCollegeData, refetch: refetchFirstCollege } = useComparisonCollege(studentId, firstCollegeId);
  const { loading: secondCollegeLoading, data: secondCollegeData, refetch: refetchSecondCollege } = useComparisonCollege(studentId, secondCollegeId);

  const loading = majorsLoading || studentLoading || firstCollegeLoading || secondCollegeLoading;

  const majors =
    majorsData && majorsData.majors && majorsData.majors.map(m => ({ id: m.id, name: m.name }));
  const student = studentData && studentData.student;
  const firstCollege =
    firstCollegeData && firstCollegeData.college && getComparisonCollege(firstCollegeData.college);
  const secondCollege =
    secondCollegeData && secondCollegeData.college && getComparisonCollege(secondCollegeData.college);

  const { mutate } = useUpdateProfile();

  const refetch = async () => {
    setRefetching(true);
    await Promise.all([refetchStudent(), refetchFirstCollege(), refetchSecondCollege()].map(p => p.catch(err => ({ error: err }))))
    await refetchFirstCollege();
    await refetchSecondCollege();
    setRefetching(false);
  };

  const updateProfile = async (data: ProfileUpdateInput) => {
    setSaving(true);
    await mutate({ data });
    await refetch();
    setSaving(false);
  };

  if (loading || saving || refetching || !student || !majors) {
    return {
      colleges: [],
      majors: [],
      loading: true,
      currentMajorId: null, // FIXME
      onSelectedMajor: () => null
    };
  } else {
    if (firstCollege) {
      return {
        colleges: [firstCollege, ...(secondCollege ? [secondCollege] : [])],
        loading: false,
        majors: majors.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }),
        currentMajorId: student.major && student.major.id,
        onSelectedMajor: majorId => updateProfile({
          majorId
        })
      };
    } else {
      return {
        colleges: [],
        loading: false,
        majors: majors.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }),
        currentMajorId: student.major && student.major.id,
        onSelectedMajor: majorId => updateProfile({
          majorId
        })
      };
    }
  }
};

interface IConnectedComparisonPageViewModel { }

interface IConnectedComparisonPageActions { }

type ConnectedComparisonPageProps = IConnectedComparisonPageViewModel &
  IConnectedComparisonPageActions;

const ConnectedComparisonPage: React.FC<ConnectedComparisonPageProps> = props => {
  const [leftCollegeId, setLeftCollegeId] = useNullableState<string>();
  const [rightCollegeId, setRightCollegeId] = useNullableState<string>();
  const [emailModalOpen, setEmailModalOpen] = React.useState(false)
  const [emailAddress, setEmailAddress] = React.useState("")

  const { studentId } = useStudentSwitcher()
  const profileMutation = useUpdateProfile()
  const profile = useProfile(studentId || "")

  const existingEmailAddress = (
    profile.data &&
    profile.data.session &&
    profile.data.session.account &&
    profile.data.session.account.emailAddress &&
    profile.data.session.account.emailAddress.emailAddress
  )

  const [hasExistingEmail, setHasExistingEmail] = React.useState(false)

  const selectSecondCollege = async () => {
    if (!hasExistingEmail && !existingEmailAddress) {
      setEmailModalOpen(true);
    }
  }

  const submitEmail = async () => {
    setHasExistingEmail(true)
    setEmailModalOpen(false)
    await profileMutation.mutate(
      {
        data: {
          emailAddress
        }
      }
    )
  }

  const comparison = useComparisonPage(studentId, leftCollegeId, rightCollegeId);

  return (
    <>
      <ComparisonPage
        {...comparison}
        leftSearchCollegesComponent={searchProps => (
          <ConnectedSearchColleges
            onSearch={() => null}
            myColleges={[]}
            inputValue={""}
            {...searchProps}
            onSelected={selected => {
              setLeftCollegeId(selected.id);
              if (searchProps.onSelected) searchProps.onSelected(selected);
            }}
          />
        )}
        rightSearchCollegesComponent={searchProps => (
          <span
            onClick={() => selectSecondCollege()}
          >
            <ConnectedSearchColleges
              onSearch={() => null}
              myColleges={[]}
              inputValue={""}
              disabled={!leftCollegeId}
              {...searchProps}
              onSelected={selected => {
                setRightCollegeId(selected.id);
                if (searchProps.onSelected) searchProps.onSelected(selected);
              }}
            />
          </span>)
        }
      />
      <Modal
        isOpen={emailModalOpen}
        maxWidth={600}
        onClickOut={() => setEmailModalOpen(false)}
        onClose={() => setEmailModalOpen(false)}
      >
        <div className="bg-white br2">
          <div className="pa3 mb1">
            <Heading size={EHeadingSize.H4} text={"Enter your email address to continue"} className="mt0 mb2" />
          </div>
          <div className="pa2 bg-offwhite bt b--gray-light br2 br--bottom pa3">
            <div className="mb2 nl2 nr2">
              <FormFieldEmail required label="Email Address" value={emailAddress} onChange={v => setEmailAddress(v)} />
            </div>
            <div className="nl2 nr2 tr">
              <Button
                size={EButtonSize.Medium}
                type={EButtonType.Primary}
                text={"Continue"}
                spacing={true}
                onClick={() => submitEmail()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConnectedComparisonPage;
