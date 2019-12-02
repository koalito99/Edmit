import * as React from 'react';
import Logo, { ELogoColor } from '../../atoms/logo';
import Text from '../../atoms/typography/text';

const AppFooter: React.SFC = () => (
  <div className="bg-white shadow-footer overflow-hidden">
    <footer className="flex flex-column flex-row-ns justify-center justify-between-ns items-center ph3 ph4-l ph5-xl mw9 center h-app-footer">
      <div className="flex-shrink-0 mb2 mb0-ns">
        <Logo color={ELogoColor.Crimson} width={52} />
      </div>
      <div className="flex flex-row items-center justify-center">
        <Text className="t-small mv0">&copy; 2019 Edmit, Inc.</Text>
        <Text className="t-small gray-muted ph2 mv0">|</Text>
        <a
          href="https://www.edmit.me/terms"
          className="no-underline fw7 crimson hover-crimson-dark pointer t-small"
        >
          Terms of Use
        </a>
        <Text className="t-small gray-muted ph2 mv0">|</Text>
        <a
          href="https://www.edmit.me/privacy"
          className="no-underline fw7 crimson hover-crimson-dark pointer t-small"
        >
          Privacy
        </a>
      </div>
    </footer>
  </div>
);

export default AppFooter;
