import * as React from 'react';
import {
  GetEdstimatePresentation,
  GetEdstimatePresentationVariables
} from '../../../graphql/generated';
import { CollegeId, Nullable, StudentId } from '@edmit/component-library/src/lib/models';
import { useQuery } from 'react-apollo-hooks';
import { GET_EDSTIMATE_PRESENTATION } from '../../../graphql/queries'
import { studentQueryProperties } from '../../../lib/graphql';
import { IEdstimatePresentationData } from '@edmit/component-library/src/components/organisms/edstimate-presentation'
import { fromGQLAidGenerosity, fromGQLAidMeasurement } from '../../../graphql/helpers'

const useEdstimatePresentationQuery = (
  studentId: Nullable<StudentId>,
  collegeId: Nullable<CollegeId>
) => {
  const q = useQuery<GetEdstimatePresentation, GetEdstimatePresentationVariables>(
    GET_EDSTIMATE_PRESENTATION,
    studentQueryProperties(studentId)(
      {
        collegeId: collegeId!
      },
      !collegeId
    )
  );

  const [data, setData] = React.useState<GetEdstimatePresentation | null>(null);
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

export const useEdstimatePresentation = (
  studentId: Nullable<string>,
  collegeId: Nullable<string>
): IEdstimatePresentationData & {
  refetch: () => Promise<void>
} => {
  const { loading, data, refetch: refetchEdstimate } = useEdstimatePresentationQuery(studentId, collegeId);

  const refetch = async () => {
    await refetchEdstimate()
  }

  if (loading || !data || !data.college || !data.student) {
    return {
      loading: true,
      refetch
    }
  } else {
    return {
      college: {
        edstimate: data.college.edstimate.value,
        name: data.college.name,
        meritAidGenerosity: data.college.meritAidGenerosity && fromGQLAidGenerosity(data.college.meritAidGenerosity),
        needBasedAidGenerosity: data.college.needBasedAidGenerosity && fromGQLAidGenerosity(data.college.needBasedAidGenerosity),
        studentMerit: fromGQLAidMeasurement(data.college.studentMerit),
        studentNeed: fromGQLAidMeasurement(data.college.studentNeed)
      },
      trends: data.college.edstimateComponents.trends ? {
        value: data.college.edstimateComponents.trends.value.value
      } : null,
      otherStudents: data.college.edstimateComponents.otherStudents ? {
        value: data.college.edstimateComponents.otherStudents.value.value,
        data: data.college.edstimateComponents.otherStudents.students.map(student => ({
          efc: student.efc.value,
          actScore: student.actScore.value || undefined,
          satScore: student.satScore.value || undefined,
          gpa: student.gradePointAverage.value || undefined,
          edstimate: student.edstimate.value
        }))
      } : null,
      publishedScholarships: data.college.edstimateComponents.publishedScholarships ? {
        value: data.college.edstimateComponents.publishedScholarships.value.value,
        scholarships: data.college.edstimateComponents.publishedScholarships.scholarships
      } : null,
      student: {
        efc: data.student.household ? (data.student.household.efc.value || data.student.household.imputedEfc.value) : 0,
        actScore: data.student.actScore.value || undefined,
        satScore: data.student.satScore.value || undefined,
        gpa: data.student.gradePointAverage.value || undefined,
      },
      loading: false,
      refetch
    };
  }
};
