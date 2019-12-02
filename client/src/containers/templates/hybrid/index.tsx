import * as React from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import { hybridTemplateViewModel } from './selector';
import { bindActionCreators } from 'redux';
import * as PropTypes from 'prop-types';
import { HybridTemplate } from '../../../components/templates/hybrid';
import ContainedModalController from '../../organisms/modal-controller';
import { useStudentSwitcher } from "../../../hooks/student-switcher";
import { useAuthentication, EAuthenticationAccountType } from '../../../hooks/auth';
import AppTemplate from '../app';

export interface IHybridTemplateWithDataViewModel { }

export type HybridTemplateWithDataActions = typeof actions & {};

type HybridTemplateWithDataProps = IHybridTemplateWithDataViewModel & HybridTemplateWithDataActions;

export const HybridTemplateWithData: React.SFC<HybridTemplateWithDataProps> = (
  props
) => {
  const { selectStudentId } = useStudentSwitcher()
  const authentication = useAuthentication()

  if (authentication.studentId) {
    selectStudentId(authentication.studentId);
  }

  if (authentication.type === EAuthenticationAccountType.Known) {
    return <AppTemplate {...props} />
  } else {
    return (
      <HybridTemplate known={false} modalController={ContainedModalController}>
        {props.children}
      </HybridTemplate>
    );
  }
};

HybridTemplateWithData.contextTypes = {
  logout: PropTypes.func
};

export const HybridTemplateWithState = connect(
  hybridTemplateViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(HybridTemplateWithData);

export default HybridTemplateWithState;
