import * as React from 'react';
import { GET_MY_COLLEGES } from '../../../graphql/queries';
import { useMutation } from 'react-apollo-hooks';
import {
    AddToMyColleges,
    AddToMyCollegesVariables,
    DismissRecommendation,
    DismissRecommendationVariables,
    GetMyColleges,
    GetMyCollegesVariables
} from '../../../graphql/generated'
import {
    EPersonType
} from '@edmit/component-library/src/shared';
import RecommendationsPage, {
    IRecommendationsPageActions,
    IRecommendationsPageViewModel
} from '../../../components/pages/recommendations';
import {
    ADD_TO_MY_COLLEGES,
    DISMISS_RECOMMENDATION
} from '../../../graphql/mutations'
import { Subtract } from '@edmit/component-library/src/lib/typescript';
// import { personTypeFromGraphQL } from '../../../lib/auth';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { usePaywall } from '../../../hooks/paywall';
import { Nullable, StudentId, normalizeId } from '@edmit/component-library/src/lib/models';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { studentQueryProperties, useArbitraryQuery } from '../../../lib/graphql'
import { useUpdateSmartValueRefetcher } from '../../molecules/smart-values/shared';
import { transformRecommendation } from '../../../components/organisms/recommendation-grid'

export interface IRecommendationsOwnProps {
    edmitPlusUser: any;
    myCollegesList: any;
    recommendations: any;
    isMobile: any;
    loading: any;
    personType: any;
    student: any;
    affinities: any;
    stage: any;
    studentId: string;

    components: any;
}

export type ConnectedRecommendationsPageViewModel = Subtract<
    IRecommendationsPageViewModel,
    IRecommendationsOwnProps
>;

export type ConnectedRecommendationsPageActions = IRecommendationsPageActions & {
    setSearchCollegesString: (index: number, query: string) => void;
    showRemoveCollegeDialog: (colleges: Array<{ id: string; name: string }> | null) => void;
    onOpenPreferenceModal: () => void;
};

type ConnectedRecommendationsPageProps = ConnectedRecommendationsPageViewModel &
    ConnectedRecommendationsPageActions;

const useStudentColleges = (studentId: Nullable<StudentId>) => {
    const { data, loading, refetch, refetching } = useArbitraryQuery<GetMyColleges, GetMyCollegesVariables>(
        GET_MY_COLLEGES,
        {
            ...studentQueryProperties(studentId)({}),
            fetchPolicy: 'no-cache'
        }
    );

    useUpdateSmartValueRefetcher('my-colleges', async () => void (await refetch()), [
        Boolean(studentId)
    ]);

    return {
        data,
        loading: loading || refetching || (!data ||
            !data.student ||
            !data.student.colleges),
        refetch
    };
};

const useMutations = () => {
    const addToMyColleges = useMutation<AddToMyColleges, AddToMyCollegesVariables>(
        ADD_TO_MY_COLLEGES
    );
    const dismissRecommendation = useMutation<DismissRecommendation, DismissRecommendationVariables>(
        DISMISS_RECOMMENDATION
    );

    return {
        addToMyColleges,
        dismissRecommendation
    };
};

export const ConnectedRecommendationsPage: React.SFC<ConnectedRecommendationsPageProps> = props => {
    const { studentId } = useStudentSwitcher();

    const {
        data: studentColleges,
        loading: studentCollegesLoading
    } = useStudentColleges(studentId);

    const {
        addToMyColleges,
        dismissRecommendation
    } = useMutations();

    const { hasEdmitPlus, openPlanSelectionModal, setSelectedProductId } = usePaywall();

    return (
        <RecommendationsPage
            {...props}
            studentId={studentId}
            addToMyColleges={async (collegeId: string) => {
                await addToMyColleges(
                    studentQueryProperties(studentId)({
                        collegesWhere: [{ id: collegeId }]
                    })
                );
                props.addToMyColleges(collegeId);
            }}
            student={{
                normalizedGPA:
                    studentColleges && studentColleges.student
                        ? studentColleges.student.normalizedGPA.value
                        : null,
                satScore:
                    studentColleges && studentColleges.student
                        ? studentColleges.student.satScore.value
                        : null,
                bestPublicCollege:
                    studentColleges && studentColleges.student && studentColleges.student.bestPublicCollege ? transformRecommendation(studentColleges.student, studentColleges.student.bestPublicCollege) : null
            }}
            onOpenPreferenceModal={() => {
                if (!hasEdmitPlus) {
                    setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
                    return openPlanSelectionModal('to set your recommendation preferences');
                }

                props.onOpenPreferenceModal();
            }}
            dismissRecommendation={async id => {
                await dismissRecommendation({
                    variables: { collegeId: id, studentId: studentId!, reason: 'NO REASON' }
                });
                props.dismissRecommendation(id);
            }}

            personType={studentColleges && studentColleges.student &&
                studentColleges.student.person ? EPersonType.PARENT : EPersonType.STUDENT}
            edmitPlusUser={hasEdmitPlus}
            loading={studentCollegesLoading}
        />
    );
};

export default ConnectedRecommendationsPage;
