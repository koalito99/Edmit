import * as React from 'react';

import MarketingNav from '../../organisms/nav-marketing';
import MarketingMenuNav from '../../organisms/nav-menu-marketing';
import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Footer from '@edmit/component-library/src/components/molecules/footer'

export interface IMarketingTemplateViewModel {
  user: {
    firstName: string;
    lastName: string;
    profileProgress: number;
  } | null;
  mobileMenuShown: boolean;
}

export interface IMarketingTemplateActions {
  switchStudent: (studentId: string) => void;
  setMobileMenuShown: (shown: boolean) => void;
  onLogin: () => void;
  onSignup: () => void;
  onClickLogo: () => void;
}

type MarketingTemplateProps = IMarketingTemplateViewModel & IMarketingTemplateActions;

export const MarketingTemplate: React.SFC<MarketingTemplateProps> = props => {
  return (
    <div className="lato bg-offwhite" style={{ paddingTop: '48px' }}>
      <MarketingNav
        user={props.user}
        switchStudent={props.switchStudent}
        onLogin={props.onLogin}
        onSignup={props.onSignup}
        onToggleMobileMenu={() => props.setMobileMenuShown(!props.mobileMenuShown)}
        onClickLogo={props.onClickLogo}
      />
      <div className="dn-l">
        <MarketingMenuNav user={props.user} active={props.mobileMenuShown} />
      </div>
      <div className="marketing-nav-footer-offset">
        <PageContainer>
          { props.children }
        </PageContainer>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingTemplate;
