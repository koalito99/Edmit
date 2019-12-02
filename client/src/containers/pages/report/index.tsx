import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';
import { reportPageViewModel } from './selector';
import ConnectedReportPage from '../../../connectors/pages/report';

export interface IContainedReportPageViewModel {
  onboardingCompleteModalShown: boolean;
}

export type ContainedReportPageActions = typeof actions & {};

type ContainedReportPageProps = IContainedReportPageViewModel & ContainedReportPageActions & { onboardingComplete: boolean; };

class ContainedReportPage extends React.Component<
  ContainedReportPageProps
> {
  componentWillMount() {
    (window as any).drift.page('/report');

    if (this.props.onboardingComplete && !this.props.onboardingCompleteModalShown) {
      this.props.setOnboardingCompleteModalShown(true);
    }
  }

  render() {
    return (
      <ConnectedReportPage
        onOpenSearchOverlay={() => this.props.setEditActive(true)}
        onOpenPreferenceModal={() => this.props.setPreferenceActive(true)}
        dismissRecommendation={collegeId => {
          this.props.setDismissedRecommendationToastShown(true);

          setTimeout(() => {
            this.props.setDismissedRecommendationToastShown(false);
          }, 3000);
        }}
        onUploadAidLetter={() => this.props.showUploadAidLetterModal({
          id: "some id",
          name: "Some name",
          edstimate: 45000
        })}
      />
    );
  }
}

export default connect(
  reportPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedReportPage);
