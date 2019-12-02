import * as React from 'react';
import { connect } from 'react-redux';
import { appealsPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import ConnectedAppealsPage from '../../../connectors/pages/appeals';

export interface IContainedAppealsPageViewModel {
  upgradeModalOpen: boolean;
}

export type ContainedAppealsPageActions = typeof actions & {};

type ContainedAppealsPageProps = IContainedAppealsPageViewModel & ContainedAppealsPageActions;

const ContainedAppealsPage: React.SFC<ContainedAppealsPageProps> = props => {
  return (
    <ConnectedAppealsPage
      {...props}
      onConsult={() => {
        window.location.href = 'https://calendly.com/edmit-advising/edmit-consultation';
      }}
      onUploadFinAidLetter={props.showUploadAidLetterModal}
    />
  );
};

export default connect(
  appealsPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedAppealsPage);
