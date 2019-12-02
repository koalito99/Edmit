import * as React from 'react';
import { Query } from '../../../lib/graphql';
import { GET_SESSION } from '../../../graphql/queries';
import { GetSession } from '../../../graphql/generated';
import { connect } from 'react-redux';
import actions from './actions';
import { registrationTemplateViewModel } from './selector';
import { bindActionCreators } from 'redux';
import * as PropTypes from 'prop-types';
import ContainedModalController from '../../organisms/modal-controller';
import RegistrationTemplate from '../../../components/templates/registration';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { useAuthentication } from '../../../hooks/auth';

export interface IRegistrationTemplateWithDataViewModel { }

export type RegistrationTemplateWithDataActions = typeof actions & {};

type RegistrationTemplateWithDataProps = IRegistrationTemplateWithDataViewModel &
  RegistrationTemplateWithDataActions;

export const RegistrationTemplateWithData: React.SFC<RegistrationTemplateWithDataProps> = (
  props
) => {
  const { studentId, selectStudentId } = useStudentSwitcher();
  const authentication = useAuthentication()

  return (
    <Query<GetSession> query={GET_SESSION}>
      {accountQuery => {
        if (accountQuery.data && !accountQuery.loading && !accountQuery.data.session) {
          authentication.logout("/login")
        }

        const theStudentId =
          accountQuery.data &&
          accountQuery.data.session!.account.person &&
          accountQuery.data.session!.account.person!.student &&
          accountQuery.data.session!.account.person!.student!.id;

        if (!theStudentId) return null;

        selectStudentId(theStudentId);

        return (
          <RegistrationTemplate modalController={ContainedModalController}>
            {studentId && props.children}
          </RegistrationTemplate>
        );
      }}
    </Query>
  );
};

RegistrationTemplateWithData.contextTypes = {
  logout: PropTypes.func
};

export const RegistrationTemplateWithState = connect(
  registrationTemplateViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(RegistrationTemplateWithData);

export default RegistrationTemplateWithState;
