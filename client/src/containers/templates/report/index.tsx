import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReportTemplate from '../../../components/templates/report';
import { Query } from '../../../lib/graphql';
import { GET_SESSION } from '../../../graphql/queries';
import { GetSession } from '../../../graphql/generated';
import { connect } from 'react-redux';
import actions from './actions';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { reportTemplateViewModel } from './selector';
import { useAuthentication } from '../../../hooks/auth';

export interface IReportTemplateWithDataViewModel { }

export type ReportTemplateWithDataActions = typeof actions & {};

type ReportTemplateWithDataProps = IReportTemplateWithDataViewModel & ReportTemplateWithDataActions;

const ReportTemplateWithData: React.SFC<ReportTemplateWithDataProps & RouteComponentProps<any>> = (
  props
) => {
  const authentication = useAuthentication()

  return (
    <Query<GetSession, {}> {...props} query={GET_SESSION} variables={{}}>
      {accountQuery => {
        if (accountQuery.data && !accountQuery.loading && !accountQuery.data.session) {
          authentication.logout("/login")
        }

        return <ReportTemplate loading={accountQuery.loading}>{props.children}</ReportTemplate>;
      }}
    </Query>
  );
};

ReportTemplateWithData.contextTypes = {
  logout: PropTypes.func
};

export const ReportTemplateWithState = connect(
  reportTemplateViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(withRouter(ReportTemplateWithData as any));

export default ReportTemplateWithState;
