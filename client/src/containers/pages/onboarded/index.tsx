import * as React from 'react';
import { useUpdateProfile } from '../../../components/pages/report/shared';
import { OnboardingStatus } from '../../../graphql/generated';
import * as qs from 'query-string';
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';

export const OnboardedPage: React.FC = (props) => {
    const { mutate, done } = useUpdateProfile()
    React.useEffect(() => {
        mutate({
            data: {
                onboardingStatus: OnboardingStatus.Onboarded
            }
        })
    }, [])
    if (done) {
        const querystring = qs.parse(window.location.search);
        const returnTo = querystring && querystring.returnTo;
        if (!returnTo) {
            throw Error("unexpected query string")
        }
        if (Array.isArray(returnTo)) {
            if (returnTo.length === 1) {
                window.location.href = returnTo[0];
                window.analytics.track('User onboarding option selected', {
                    selectedOption: returnTo[0]
                });
            }
            else {
                throw Error("unexpected query string")
            }
        }
        else {
            window.location.href = returnTo;
            window.analytics.track('User onboarding option selected', {
                selectedOption: returnTo
            });
        }
    }
    return <LoadingSpinner />
}

