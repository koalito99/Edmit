import * as React from 'react';
import ConnectedWidgetPage from '../../../connectors/pages/widget';
import { connect } from 'react-redux';
import { widgetPageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import { ISearchCollegeOption } from '@edmit/component-library/src/components/molecules/search-colleges';

export interface IContainedWidgetPageViewModel {
  searchCollege: string;
  selectedCollege: ISearchCollegeOption | null;
}

export type ContainedWidgetPageActions = typeof actions & {};

type ContainedWidgetPageProps = IContainedWidgetPageViewModel & ContainedWidgetPageActions;

const ContainedWidgetPage: React.SFC<ContainedWidgetPageProps> = props => {
  return (
    <ConnectedWidgetPage
      {...props}
      onGetStarted={() => {
        window.location.href = '/signup';
      }}
    />
  );
};

export default connect(
  widgetPageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedWidgetPage);
