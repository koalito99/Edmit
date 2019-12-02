import * as React from "react";
import { studentQueryProperties, useArbitraryQuery } from '../../../../lib/graphql'
import {
  GetSmartEdstimate,
  GetSmartEdstimateVariables,
} from '../../../../graphql/generated'
import { GET_SMART_EDSTIMATE } from '../../../../graphql/queries'
import { CollegeId, Nullable, StudentId } from '@edmit/component-library/src/lib/models'
import { useStudentSwitcher } from '../../../../hooks/student-switcher'
import { useUpdateSmartValueRefetcher } from '../shared'

function useEdstimateQuery(studentId: Nullable<StudentId>, collegeId: Nullable<CollegeId>) {
  return useArbitraryQuery<GetSmartEdstimate, GetSmartEdstimateVariables>(GET_SMART_EDSTIMATE, {
    ...studentQueryProperties(studentId)({
      collegeId: collegeId!
    }, !collegeId),
    fetchPolicy: 'network-only'
  })
}

export function useSmartEdstimate(collegeId: Nullable<CollegeId>) {
  const { studentId } = useStudentSwitcher()
  const { data, loading, refetch } = useEdstimateQuery(studentId, collegeId);

  useUpdateSmartValueRefetcher("edstimate", refetch)

  return {
    loading,
    edstimate: data && data.college && data.college.edstimate.value
  }
}

export const SmartEdstimate: React.FC<{ collegeId: Nullable<CollegeId>; children: (data: { edstimate: number | null; loading: boolean }) => React.ReactElement<any> | null }> = props => {
  const smartEdstimate = useSmartEdstimate(props.collegeId);

  return props.children(smartEdstimate)
}