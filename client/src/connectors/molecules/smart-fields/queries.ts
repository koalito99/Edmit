import { Nullable, StudentId } from '@edmit/component-library/src/lib/models';
import {
  GetACTField,
  GetACTFieldVariables,
  GetEFCField,
  GetEFCFieldVariables,
  GetGPAField,
  GetGPAFieldVariables,
  GetHHIField,
  GetHHIFieldVariables, GetHighSchoolField, GetHighSchoolFieldVariables,
  GetMajorField,
  GetMajorFieldVariables,
  GetMajors,
  GetPSATField,
  GetPSATFieldVariables,
  GetSATField,
  GetSATFieldVariables, GetSavingsField, GetSavingsFieldVariables, GetWorkStudyField, GetWorkStudyFieldVariables,
  ProfileUpdateInput,
} from '../../../graphql/generated'
import {
  GET_ACT_FIELD,
  GET_EFC_FIELD,
  GET_GPA_FIELD,
  GET_HHI_FIELD, GET_HIGH_SCHOOL_FIELD,
  GET_MAJOR_FIELD,
  GET_MAJORS,
  GET_PSAT_FIELD,
  GET_SAT_FIELD, GET_SAVINGS_FIELD, GET_WORK_STUDY_FIELD,
} from '../../../graphql/queries'
import { studentQueryProperties, useArbitraryQuery } from '../../../lib/graphql';
import { ISmartFormFields } from './shared';
import { OperationVariables } from 'apollo-client';

const useEFCField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetEFCField, GetEFCFieldVariables>(GET_EFC_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student &&
        query.data.student.household &&
        query.data.student.household.efc.value
        : undefined
  };
};

const useGPAField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetGPAField, GetGPAFieldVariables>(GET_GPA_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student && query.data.student.gradePointAverage.value
        : undefined
  };
};

const useSATField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetSATField, GetSATFieldVariables>(GET_SAT_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data: query.data !== null ? query.data.student && query.data.student.satScore.value : undefined
  };
};

const usePSATField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetPSATField, GetPSATFieldVariables>(GET_PSAT_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data: query.data !== null ? query.data.student && query.data.student.psatScore.value : undefined
  };
};

const useACTField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetACTField, GetACTFieldVariables>(GET_ACT_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data: query.data !== null ? query.data.student && query.data.student.actScore.value : undefined
  };
};

const useHHIField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetHHIField, GetHHIFieldVariables>(GET_HHI_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student &&
        query.data.student.household &&
        query.data.student.household.income.value
        : undefined
  };
};

const useSavingsField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetSavingsField, GetSavingsFieldVariables>(GET_SAVINGS_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student &&
        query.data.student.collegeSavingsAmount.value
        : undefined
  };
};

const useWorkStudyField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetWorkStudyField, GetWorkStudyFieldVariables>(GET_WORK_STUDY_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student &&
        query.data.student.workStudyAmount.value
        : undefined
  };
};

const useMajorField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const majorsQuery = useArbitraryQuery<GetMajors>(GET_MAJORS, {
    skip,
    fetchPolicy: 'network-only'
  });

  const selectedMajorQuery = useArbitraryQuery<GetMajorField, GetMajorFieldVariables>(
    GET_MAJOR_FIELD,
    {
      ...studentQueryProperties(studentId)({}, skip),
      fetchPolicy: 'network-only'
    }
  );

  return {
    loading: selectedMajorQuery.loading || majorsQuery.loading,
    refetch: async () => {
      await Promise.all([selectedMajorQuery.refetch(), majorsQuery.refetch()]);
    },
    data:
      selectedMajorQuery.data !== null && majorsQuery.data !== null
        ? {
          selectedMajorId:
            selectedMajorQuery.data.student &&
            selectedMajorQuery.data.student.major &&
            selectedMajorQuery.data.student.major.id,
          majors: majorsQuery.data.majors
        }
        : undefined
  };
};

const useHighSchoolField = (studentId: Nullable<StudentId>, skip: boolean) => {
  const query = useArbitraryQuery<GetHighSchoolField, GetHighSchoolFieldVariables>(GET_HIGH_SCHOOL_FIELD, {
    ...studentQueryProperties(studentId)({}, skip),
    fetchPolicy: 'network-only'
  });

  return {
    ...query,
    data:
      query.data !== null
        ? query.data.student &&
        query.data.student.highSchool &&
        {
          id: query.data.student.highSchool.id,
          name: query.data.student.highSchool.name,
          zipCode: query.data.student.highSchool.postalCode.postalCode
        }
        : undefined
  };
};

export interface IUseFieldQueryReturn<TData> {
  data: TData | undefined;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useSmartFieldQuery<
  F extends keyof ISmartFormFields,
  TVariables = OperationVariables
>(
  field: F
): {
  profileUpdateData: (newValue: any) => ProfileUpdateInput; // FIXME: type any
  useFieldQuery: (
    studentId: Nullable<StudentId>,
    skip: boolean
  ) => IUseFieldQueryReturn<ISmartFormFields[F]>;
} {
  switch (field) {
    case 'efc':
      return {
        useFieldQuery: useEFCField,
        profileUpdateData: (newValue: ISmartFormFields['efc']) => ({
          efc: {
            value: newValue
          }
        })
      };
    case 'gpa':
      return {
        useFieldQuery: useGPAField,
        profileUpdateData: (newValue: ISmartFormFields['gpa']) => ({
          gradePointAverage: {
            value: newValue
          }
        })
      };
    case 'sat':
      return {
        useFieldQuery: useSATField,
        profileUpdateData: (newValue: ISmartFormFields['sat']) => ({
          satScore: {
            value: newValue
          }
        })
      };
    case 'psat':
      return {
        useFieldQuery: usePSATField,
        profileUpdateData: (newValue: ISmartFormFields['psat']) => ({
          psatScore: {
            value: newValue
          }
        })
      };
    case 'act':
      return {
        useFieldQuery: useACTField,
        profileUpdateData: (newValue: ISmartFormFields['act']) => ({
          actScore: {
            value: newValue
          }
        })
      };
    case 'hhi':
      return {
        useFieldQuery: useHHIField,
        profileUpdateData: (newValue: ISmartFormFields['hhi']) => ({
          householdIncome: {
            value: newValue
          }
        })
      };
    case 'savings':
      return {
        useFieldQuery: useSavingsField,
        profileUpdateData: (newValue: ISmartFormFields['savings']) => ({
          collegeSavingsPlanAmount: {
            value: newValue
          }
        })
      };
    case 'workstudy':
      return {
        useFieldQuery: useWorkStudyField,
        profileUpdateData: (newValue: ISmartFormFields['workstudy']) => ({
          workStudyAmount: {
            value: newValue
          }
        })
      };
    case 'major':
      return {
        useFieldQuery: useMajorField,
        profileUpdateData: (newValue: ISmartFormFields['major']) => ({
          majorId: newValue.selectedMajorId
        })
      };
    case 'highSchool':
      return {
        useFieldQuery: useHighSchoolField,
        profileUpdateData: (newValue: ISmartFormFields['highSchool']) => ({
          highSchoolId: newValue && newValue.id
        })
      };
  }

  return {
    useFieldQuery: () => ({
      data: null,
      loading: false,
      refetch: async () => { }
    }),
    profileUpdateData: () => ({})
  };
}
