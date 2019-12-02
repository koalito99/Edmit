import * as React from 'react';
import { connect } from 'react-redux';
import { profilePageViewModel } from './selector';
import { bindActionCreators } from 'redux';
import actions from './actions';
import ConnectedProfilePage from '../../../connectors/pages/profile';
import { RouteComponentProps } from 'react-router';
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { ISearchHighSchoolOption } from '@edmit/component-library/src/components/molecules/search-high-schools';
import { ISearchZipCodesOption } from '@edmit/component-library/src/components/molecules/search-zip-codes';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { normalizeId, Nullable, StudentId } from '@edmit/component-library/src/lib/models';
import { usePaywall } from '../../../hooks/paywall';
import { doNothingFn } from '@edmit/component-library/src/shared';

export interface IProfilePageWithDataViewModel {
  searchHighSchoolQuery: string | null;
  searchZipCodeQuery: string | null;
  selectedHighSchool: ISearchHighSchoolOption | null;
  selectedZipCode: ISearchZipCodesOption | null;
}

export interface IProfilePageOwnProps {
  studentId: Nullable<StudentId>;
}

interface IProfilePageRouteProps {
  productId: string;
}

export type ProfilePageWithDataActions = typeof actions & {};

type ProfilePageWithDataProps = IProfilePageWithDataViewModel &
  ProfilePageWithDataActions &
  IProfilePageOwnProps &
  RouteComponentProps<IProfilePageRouteProps>;

const ProfilePageWithData: React.FC<ProfilePageWithDataProps> = props => {
  const paywall = usePaywall();

  React.useEffect(() => {
    if (props.match.path.includes('purchase')) {
      switch (normalizeId(props.match.params.productId)) {
        case normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID):
          paywall.setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
          paywall.openPlanSelectionModal('to Edmit Plus');
          break;
        default:
          break;
      }
    }
  }, []);

  return <ConnectedProfilePage {...props} onUpgrade={doNothingFn} />;
};

const ContainedConnectedProfilePage = connect(
  profilePageViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ProfilePageWithData);

const WiredProfilePage: React.FC<
  IProfilePageWithDataViewModel &
    ProfilePageWithDataActions &
    RouteComponentProps<IProfilePageRouteProps>
> = props => {
  const { studentId } = useStudentSwitcher();

  return <ContainedConnectedProfilePage {...props} studentId={studentId} />;
};

export default WiredProfilePage;
