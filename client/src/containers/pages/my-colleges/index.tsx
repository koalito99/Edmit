import * as React from 'react';
import { connect } from 'react-redux';
import { myCollegesPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import ConnectedMyCollegesPage from '../../../connectors/pages/my-colleges';

export interface IContainedMyCollegesPageViewModel {
  searchColleges: { [key: number]: string };
  removeCollegeDialogShownForColleges: Array<{ id: string; name: string }> | null;
}

export type ContainedMyCollegesPageActions = typeof actions;

type ContainedMyCollegesPageProps = IContainedMyCollegesPageViewModel &
  ContainedMyCollegesPageActions;

class ContainedMyCollegesPage extends React.Component<ContainedMyCollegesPageProps> {
  componentWillMount() {
    (window as any).drift.page('/my-colleges');
  }

  render() {
    return (
      <ConnectedMyCollegesPage
        {...this.props}
        refetch={() => Promise.resolve()}
        colleges={[]}
        addToMyColleges={() => this.props.setCollegeAddedToastShown(true)}
        showRemoveCollegeDialog={(colleges: Array<{ name: string; id: string }> | null) =>
          this.props.showRemoveCollegeDialog(colleges)
        }
        removeFromMyColleges={async () => {
          return;
        }}
        changeCollegeApplicationStatus={() => null}
        setHand={() => Promise.resolve()}
        handCount={0}
        onOpenPreferenceModal={() => this.props.setPreferenceActive(true)}
        dismissRecommendation={id => {
          this.props.setDismissedRecommendationToastShown(true);

          setTimeout(() => {
            this.props.setDismissedRecommendationToastShown(false);
          }, 3000);
        }}
        checkTip={() => { }}
        dismissTip={() => { }}
        showEdstimateModal={this.props.showEdstimateModal}
        onConsult={() => {
          window.location.href =
            'https://calendly.com/edmit-advising/edmit-consultation';
        }}
      />
    );
  }
}

export default connect(
  myCollegesPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedMyCollegesPage);
