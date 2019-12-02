import * as React from 'react';
import { Query } from '../../../lib/graphql';
import { MarketingTemplate } from '../../../components/templates/marketing';
import { GET_SESSION } from '../../../graphql/queries';
import { GetSession } from '../../../graphql/generated';
import { connect } from 'react-redux';
import actions from './actions';
import { marketingTemplateViewModel } from './selector';
import { history } from '../../../store';
import { bindActionCreators } from 'redux';
import * as PropTypes from 'prop-types';
import { useStudentSwitcher } from "../../../hooks/student-switcher";
import ContainedModalController from '../../organisms/modal-controller'
import { useAuthentication } from '../../../hooks/auth';

export interface IMarketingTemplateWithDataViewModel {
  mobileMenuShown: boolean;
}

export type MarketingTemplateWithDataActions = typeof actions & {};

type MarketingTemplateWithDataProps =
  IMarketingTemplateWithDataViewModel &
  MarketingTemplateWithDataActions;

export const MarketingTemplateWithData: React.SFC<MarketingTemplateWithDataProps> = (
  props
) => {
  const { studentId, selectStudentId } = useStudentSwitcher();
  const authentication = useAuthentication()

  return (
    <Query<GetSession> query={GET_SESSION} variables={{}}>
      {accountQuery => {
        if (accountQuery.data && !accountQuery.loading && !accountQuery.data.session) {
          authentication.logout("/login")
        }

        const theStudentId =
          accountQuery.data &&
          accountQuery.data.session!.account.person &&
          accountQuery.data.session!.account.person!.student &&
          accountQuery.data.session!.account.person!.student!.id;

        // const emailAddress = accountQuery.data && accountQuery.data.session!.account.emailAddress;

        if (!studentId && theStudentId) {
          selectStudentId(theStudentId);
        }

        return (
          <MarketingTemplate
            user={null}
            switchStudent={(id: string) => selectStudentId(id)}
            onLogin={() => {
              history.push('/login');
            }}
            onSignup={() => {
              history.push('/signup');
            }}
            onClickLogo={() => {
              window.location.href = 'http://www.edmit.me';
            }}
            mobileMenuShown={props.mobileMenuShown}
            setMobileMenuShown={props.setMobileMenuShown}
            modalController={ContainedModalController}
          >
            {studentId && props.children}
          </MarketingTemplate>
        );
      }}
    </Query>
  );
};

MarketingTemplateWithData.contextTypes = {
  logout: PropTypes.func
};

export const MarketingTemplateWithState = connect(
  marketingTemplateViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(MarketingTemplateWithData);

export default MarketingTemplateWithState;
