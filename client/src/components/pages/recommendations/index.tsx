import * as React from 'react';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import RecommendationGridWithData, {
    RecommendationCollege
} from '../../organisms/recommendation-grid';
import { Nullable, StudentId } from '@edmit/component-library/src/lib/models';
import { EPersonType } from '@edmit/component-library/src/shared';
import Dialog from '@edmit/component-library/src/components/molecules/dialog';


export interface IRecommendationsPageViewModel {
    studentId: Nullable<StudentId>;
    personType: EPersonType;
    edmitPlusUser: boolean;

    student: {
        normalizedGPA: number | null;
        satScore: number | null;
        bestPublicCollege: RecommendationCollege | null;
    };

    loading: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
}

export interface IRecommendationsPageActions {
    addToMyColleges: (collegeId: string) => void;
    refetch: () => Promise<void>;
    dismissRecommendation: (id: string) => void | Promise<void>;
    showPurchaseModal: any;
    showEdstimateModal: (modal: { collegeId: string }) => any;
    onOpenPreferenceModal: () => void;
    onConsult: () => void;
}
type Props = IRecommendationsPageViewModel & IRecommendationsPageActions;

const RecommendationsPage: React.SFC<Props> = props => {
    const [collegeToRemove, setCollegeToRemove] = React.useState<{ id: string, name: string } | null>(null);
    const [removed, setRemoved] = React.useState<string[]>([])

    return (
        <>
            <Dialog
                isOpen={!!collegeToRemove}
                header={"Remove Recommendation"}
                text={"Are you sure you want to remove this college? You can always add it to your list in College List, but you won't see it again in College Recommendations."}
                onCancel={() => setCollegeToRemove(null)}
                cancelButtonText={"Cancel"}
                confirmButtonText={"Remove"}
                onConfirm={async () => {
                    if (!!collegeToRemove) {
                        const college = collegeToRemove.id
                        setCollegeToRemove(null)
                        setRemoved([...removed, college])
                        await props.dismissRecommendation(college)
                    }
                }}
            />
            <PageContainer>
                <div className="mt2">
                    <RecommendationGridWithData
                        studentId={props.studentId}
                        removedColleges={removed}
                        primaryCta={'Add'}
                        showEdstimateModal={props.showEdstimateModal}
                        primaryCtaOnClick={async id => {
                            await props.addToMyColleges(id);
                            await props.refetch();
                            window.scrollTo(0, 0);
                        }}
                        secondaryCta={'Dismiss'}
                        secondaryCtaOnClick={(id: string) => setCollegeToRemove({ id, name: 'this college' })}
                        onOpenPreferenceModal={props.onOpenPreferenceModal}
                        isEdmitPlus={props.edmitPlusUser}
                        updatePreferences={newPrefernces => {
                            console.log('NEW PREFERENCES');
                            console.log(newPrefernces);
                        }}
                    />
                </div>
            </PageContainer>
        </>
    );
};

export default (RecommendationsPage) as typeof RecommendationsPage;