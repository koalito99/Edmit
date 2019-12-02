import * as React from 'react';
import * as PropTypes from 'prop-types';
import { history } from '../../../store';

import { AppTemplate } from '../../../components/templates/app';
import { GET_CURRENT_STUDENT } from '../../../graphql/queries';
import { connect } from 'react-redux';
import actions from './actions';
import { appTemplateViewModel } from './selector';
// import { iconForRoute } from '../../../shared';
import { bindActionCreators } from 'redux';
import ContainedModalController from '../../organisms/modal-controller';
import ConnectedSearchStudents from '../../../connectors/molecules/search-students';
import ConnectedSabrinaBot from '../../molecules/sabrina-bot';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { studentQueryProperties } from '../../../lib/graphql'
import { useAuthentication, EAuthenticationAccountType } from '../../../hooks/auth';
import { useQuery } from 'react-apollo-hooks';

export interface IAppTemplateWithDataViewModel {
  mobileMenuShown: boolean;
  compareEditActive: boolean;
}

export type AppTemplateWithDataActions = typeof actions & {};

type AppTemplateWithDataProps = IAppTemplateWithDataViewModel &
  AppTemplateWithDataActions & {
    isOnboarding?: boolean;
  };

const AppTemplateWithData: React.SFC<AppTemplateWithDataProps> = (
  props
) => {
  const { studentId, selectStudentId } = useStudentSwitcher();
  const authentication = useAuthentication()

  const student = useQuery(
    GET_CURRENT_STUDENT,
    studentQueryProperties(studentId)({})
  )

  if (authentication.type === EAuthenticationAccountType.Anonymous) {
    authentication.logout(`/login?returnTo=${window.location.pathname}`)
    return <span />
  }

  const theStudentId = authentication.studentId

  if (!studentId && theStudentId) {
    selectStudentId(theStudentId);
  }

  return (
    <AppTemplate
      {...props}
      studentId={studentId || null}
      user={
        student.data &&
          student.data.session &&
          student.data!.session!.account &&
          student.data!.session!.account.person
          ? {
            notifications: [],
            outboundInvitationCount: 0,
            superUser: student.data.session.account.isSuperUser
          }
          : null
      }
      student={
        student.data &&
          student.data.session &&
          student.data!.session!.account &&
          student.data!.session!.account.person
          ? {
            firstName: student.data.session!.account.person!.firstName || '',
            lastName: student.data.session!.account.person!.lastName || '',
            profileProgress: 100 // TODO: Hook this up or remove completely
          }
          : null
      }
      loading={student.loading}
      switchStudent={(id: string) => selectStudentId(id)}
      onSignup={() => {
        history.push('/signup');
      }}
      onLogin={() => {
        history.push(`/login=${window.location.pathname}`);
      }}
      onClickLogo={() => {
        window.location.href = '/my-colleges';
      }}
      onConsult={() => {
        window.location.href =
          'https://calendly.com/edmit-advising/edmit-consultation';
      }}
      onMarkNotificationsAsRead={ids => { }}
      onAskQuestion={() => {
        window.location.hash = '#hotline-bot';
        setTimeout(() => {
          window.location.hash = '';
        }, 500);
      }}
      onLogout={() => {
        authentication.logout("/login")
      }}
      openPurchaseModal={reason =>
        props.showPurchaseModal({
          task: reason || 'compare more than two colleges'
        })
      }
      showInviteModal={() => {
        props.setInvitedToast(null);
        props.setInviteModalShown(true);
      }}
      showProfileCompletionModal={() => props.showProfileCompletionModal(true)}
      modalController={<ContainedModalController />}
      switchStudentSearchComponent={searchProps => (
        <ConnectedSearchStudents
          inputValue={''}
          onSearch={() => null}
          onSelected={selected => selectStudentId(selected.id)}
          {...searchProps}
        />
      )}
      sabrinaBot={<ConnectedSabrinaBot />}
      navLinkOnClickOverride={
        props.isOnboarding
          ? to => {
            props.setOnboardingNavAwayDialogShown(to);
          }
          : undefined
      }
    >
      {props.children}
    </AppTemplate>
  );
}

AppTemplateWithData.contextTypes = {
  logout: PropTypes.func
};

export const AppTemplateWithState = connect(
  appTemplateViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(AppTemplateWithData);

export default AppTemplateWithState;
