import * as React from 'react';
import { connect } from 'react-redux';
import { RecommendationsPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import ConnectedRecommendationsPage from '../../../connectors/pages/recommendations';

export interface IContainedRecommendationsPageViewModel {
  searchColleges: { [key: number]: string };
  removeCollegeDialogShownForColleges: Array<{ id: string; name: string }> | null;
}

export type ContainedRecommendationsPageActions = typeof actions & {};

type ContainedRecommendationsPageProps = IContainedRecommendationsPageViewModel &
  ContainedRecommendationsPageActions;

class ContainedRecommendationsPage extends React.Component<ContainedRecommendationsPageProps> {
  componentWillMount() {
    (window as any).drift.page('/my-colleges');
  }

  render() {
    return (
      <ConnectedRecommendationsPage
        {...this.props}
        refetch={() => Promise.resolve()}
        showEdstimateModal={this.props.showEdstimateModal}
        showRemoveCollegeDialog={(colleges: Array<{ name: string; id: string }> | null) =>
          this.props.showRemoveCollegeDialog(colleges)
        }
        addToMyColleges={id => {
          this.props.setAddedToMyCollegesToastShown(true);

          setTimeout(() => {
            this.props.setAddedToMyCollegesToastShown(false);
          }, 3000);
        }}
        showPurchaseModal={async () => { }}
        onOpenPreferenceModal={() => this.props.setPreferenceActive(true)}
        setSearchCollegesString={async () => { }}
        dismissRecommendation={id => {
          this.props.setDismissedRecommendationToastShown(true);

          setTimeout(() => {
            this.props.setDismissedRecommendationToastShown(false);
          }, 3000);
        }}
        onConsult={() => {
          window.location.href =
            'https://calendly.com/sabrina-manville/edmit-consultation';
        }}
      />
    );
  }
}

export default connect(
  RecommendationsPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedRecommendationsPage);
