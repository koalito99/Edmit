import * as React from 'react';
import Logo, { ELogoColor } from '../../atoms/logo';
import Text, { ETextType } from '../../atoms/typography/text';
import TextLink from '../../atoms/link-text';
import PageContainer from '../../atoms/page-container';

const MarketingFooter: React.SFC = () => (
  <div className="bg-offwhite shadow-footer">
    <PageContainer>
      <footer className="pt4 pb4">
        <div className="flex flex-column flex-row-ns justify-between flex-wrap flex-nowrap-l mb5">
          <div className="flex-auto-l pr5-l mb4 mb0-l">
            <div className="dib mb4 flex-shrink-0">
              <Logo color={ELogoColor.Crimson} width={72} />
            </div>
            <Text className="mv0 t-medium measure-wide-l">
              Edmit provides personalized, transparent pricing and earnings data on colleges,
              helping families better evaluate their options and make well-informed decisions about
              their college investment. Edmit’s proprietary software calculates tuition estimates
              that are personalized to each student, and a financial fit score that takes into
              account a college’s affordability, value, and post-graduation earnings.
            </Text>
          </div>
          <div className="w-100 w-50-m w-25-l pr5-ns">
            <ul className="list pa0 pb3 pb0-ns ma0">
              <li className="t-label fw4 gray-muted ttu tracked mt0 mb3">
                <Text type={ETextType.Label} className="mt0 mb3">
                  Links
                </Text>
              </li>
              <li className="mb3">
                <a
                  className="no-underline fw7 gray-dim hover-crimson pointer"
                  href={'https://www.edmit.me/blog'}
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="mb3">
                <a
                  className="no-underline fw7 gray-dim hover-crimson pointer"
                  href={'https://www.edmit.me/about'}
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="mb3">
                <a
                  className="no-underline fw7 gray-dim hover-crimson pointer"
                  href={'https://www.edmit.me/pricing'}
                  target="_blank"
                >
                  Pricing
                </a>
              </li>
              <li className="mb3">
                <a
                  className="no-underline fw7 gray-dim hover-crimson pointer"
                  href={'https://www.edmit.me/data'}
                  target="_blank"
                >
                  Our Data
                </a>
              </li>
            </ul>
          </div>
          <div className="w-100 w-50-m w-25-l">
            <ul className="list pa0 ma0 mb4 pb3">
              <li className="t-label fw4 gray-muted ttu tracked mt0 mb3">Follow us</li>
              <li className="dib mr3">
                <a
                  className="f5 fw4 gray-dim hover-crimson no-underline"
                  href="https://twitter.com/edmitedu"
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-lg" />
                </a>
              </li>
              <li className="dib mh3">
                <a
                  className="f5 fw4 gray-dim hover-crimson no-underline"
                  href="https://www.facebook.com/EdmitEDU/"
                  target="_blank"
                >
                  <i className="fab fa-facebook fa-lg" />
                </a>
              </li>
              <li className="dib ml3">
                <a
                  className="f5 fw4 gray-dim hover-crimson no-underline"
                  href="https://www.linkedin.com/company/18275035/"
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Text className="t-small mv0">&copy; 2019 Edmit, Inc.</Text>
          <Text className="t-small gray-muted ph2 mv0">|</Text>
          <TextLink to="https://www.edmit.me/terms" className="t-small">
            Terms of Use
          </TextLink>
          <Text className="t-small gray-muted ph2 mv0">|</Text>
          <TextLink to="https://www.edmit.me/privacy" className="t-small">
            Privacy
          </TextLink>
        </div>
      </footer>
    </PageContainer>
  </div>
);

export default MarketingFooter;
