import * as React from 'react';
import * as qs from 'query-string';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import MarketingTemplate from './containers/templates/marketing';
import RegistrationTemplate from './containers/templates/registration';
import AppTemplate from './containers/templates/app';
import WidgetTemplate from './components/templates/widget';
import ProfilePage from './containers/pages/profile';
import MyCollegesPage from './containers/pages/my-colleges';
import OnboardingFormPage from './containers/pages/onboarding-form';
import RegistrationPage from './containers/pages/registration';
import LoginPage from './connectors/pages/login';
import ErrorPage from './components/pages/error';
import OnboardingInvitedPage from './containers/pages/onboarding-invited';
import PasswordResetPage from './connectors/pages/password-reset';
import ContainedReportPage from './containers/pages/report';
import WidgetPage from './containers/pages/widget';
import { ScrollToTop } from './lib/react-router';
import HybridTemplate from './containers/templates/hybrid';
import HomeEquityCalculatorPage from './containers/pages/home-equity-calculator';
import ContainedAppealsPage from './containers/pages/appeals';
import OnboardingPage from './containers/pages/onboarding';
import { WiredPricingPage } from './containers/pages/pricing';
import { OnboardedPage } from './containers/pages/onboarded';
import { WiredPurchasePage } from './containers/pages/purchase';
import LoanReportPage from "./containers/pages/loan-report";
import ComparisonPage from './connectors/pages/comparison';
import EdstimatePage from './connectors/pages/edstimate';
import LoadingSpinner from '@edmit/component-library/src/components/atoms/loading/spinner';
import { useQuery } from 'react-apollo-hooks';
import { CrediblePrefillRequest, CrediblePrefillRequestVariables } from './graphql/generated';
import { CREDIBLE_PREFILL_REQUEST } from './graphql/queries';
import RecommendationsPage from './containers/pages/recommendations';
import LoansPage from './containers/pages/loans';
import { CookieService } from './lib/cookie';
import { ConnectedMarketingMenu } from './connectors/organisms/sidebar';

interface IAppRouteProps {
  exact?: boolean;
  component: any;
  layout: any;
  path: string;
}

const AppRoute = ({ component: Component, layout: Layout, ...rest }: IAppRouteProps) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export interface IAppViewModel {
  history?: any;
  location?: {
    pathname: string;
  };
}

const EDMIT_SESSION_ID_COOKIE_NAME = 'edmit_session_id_2';
const EDMIT_TOKEN_COOKIE_NAME = 'edmit_token_2';


const cookieDeleter = new CookieService()
const cookieNames = {
  sessionId: EDMIT_SESSION_ID_COOKIE_NAME,
  token: EDMIT_TOKEN_COOKIE_NAME
}

const cookieDomain = process.env.REACT_APP_COOKIE_DOMAIN;

type AppProps = IAppViewModel;

class App extends React.Component<AppProps> {
  componentWillMount() {
    window.analytics.page();

    (this as any).unlisten = this.props.history.listen(() => {
      /* Segment tracking for each "page" */
      window.analytics.page();
    });
  }

  componentWillUnmount() {
    (this as any).unlisten();
  }

  public render() {
    return (
      <ScrollToTop>
        <Switch>
          <AppRoute path={'/logout'} component={(props: any) => {
            cookieDeleter.deleteCookie(cookieNames.sessionId);
            cookieDeleter.deleteCookie(cookieNames.token);
            cookieDeleter.deleteCookie(cookieNames.sessionId, cookieDomain);
            cookieDeleter.deleteCookie(cookieNames.token, cookieDomain);

            window.location.href = '/login';
          }} layout={AppTemplate} />
          <AppRoute path={'/edstimate'} component={EdstimatePage} layout={AppTemplate} />
          <AppRoute path={'/appeals'} component={ContainedAppealsPage} layout={AppTemplate} />
          <AppRoute path={"/redirect/:id"} component={
            (props: RouteComponentProps<{ id: string }>) => {
              const crediblePrefill = useQuery<CrediblePrefillRequest, CrediblePrefillRequestVariables>(CREDIBLE_PREFILL_REQUEST, {
                variables: {
                  id: props.match.params.id
                }
              })

              if (crediblePrefill.loading) {

              } else {
                if (!crediblePrefill.data || !crediblePrefill.data.crediblePrefillRequest) {
                  window.location.href = "/my-colleges"
                } else {
                  window.location.href = crediblePrefill.data.crediblePrefillRequest.link
                }
              }

              return <LoadingSpinner />
            }
          } layout={AppTemplate} />
          <AppRoute path="/widget" component={WidgetPage} layout={WidgetTemplate} />
          <AppRoute path="/password-reset" component={PasswordResetPage} layout={HybridTemplate} />
          <AppRoute path="/login" component={LoginPage} layout={HybridTemplate} />
          <AppRoute
            path="/report"
            component={(props: RouteComponentProps<any>) => {
              const params: {
                onboardingComplete?: boolean;
              } = qs.parse(props.location.search, { ignoreQueryPrefix: true } as any);

              return (
                <ContainedReportPage onboardingComplete={params.onboardingComplete || false} />
              );
            }}
            layout={AppTemplate}
          />
          <AppRoute
            path="/home-equity-calculator"
            component={HomeEquityCalculatorPage}
            layout={WidgetTemplate}
          />
          <AppRoute
            path="/signup-quick"
            component={OnboardingFormPage}
            layout={RegistrationTemplate}
          />
          <AppRoute path="/signup" component={(props: RouteComponentProps<any>) => {
            const params: {
              redirectTo?: string;
              appCueID?: string;
              productId?: string | null;
              productApplicationToken?: string | null;
            } = qs.parse(props.location.search, { ignoreQueryPrefix: true } as any);

            return (
              <RegistrationPage
                redirectToUrlOnRegistrationCompletion={params.redirectTo}
                appCueId={params.appCueID}
                productId={params.productId || null}
                token={params.productApplicationToken || null}
              />
            );
          }} layout={RegistrationTemplate} />
          <AppRoute
            path="/get-started"
            component={(props: RouteComponentProps<any>) => {
              const params: {
                redirectTo?: string;
                appCueID?: string;
                productId?: string | null;
                productApplicationToken?: string | null;
              } = qs.parse(props.location.search, { ignoreQueryPrefix: true } as any);

              return (
                <RegistrationPage
                  redirectToUrlOnRegistrationCompletion={params.redirectTo}
                  appCueId={params.appCueID}
                  productId={params.productId || null}
                  token={params.productApplicationToken || null}
                />
              );
            }}
            layout={RegistrationTemplate}
          />
          <AppRoute
            path="/onboarding"
            component={OnboardingPage}
            layout={(props: any) => <AppTemplate {...props} isOnboarding={true} />}
          />
          <AppRoute
            path="/loan-report"
            component={LoanReportPage}
            layout={HybridTemplate}
          />
          <AppRoute
            path="/signup-invited"
            component={OnboardingInvitedPage}
            layout={RegistrationTemplate}
          />
          <AppRoute path="/profile/purchase/:productId" component={ProfilePage} layout={AppTemplate} />
          <AppRoute path="/profile" component={ProfilePage} layout={AppTemplate} />
          <AppRoute path="/my-colleges" component={MyCollegesPage} layout={AppTemplate} />
          <AppRoute path="/recommendations" component={RecommendationsPage} layout={AppTemplate} />
          <AppRoute path="/loans" component={LoansPage} layout={AppTemplate} />
          <AppRoute path="/pixel" component={() => (
            <div>
              <button onClick={async () => { await window.analytics.track("buy_premium_plan"); }}>Trigger Item Purchased</button>
              <button onClick={async () => { await window.analytics.track("Email Provided (2.5)") }}>Email Provided</button>
            </div>
          )} layout={AppTemplate} />
          <AppRoute path="/pricing" component={WiredPricingPage} layout={WidgetTemplate} />
          <AppRoute path="/marketing-nav" component={ConnectedMarketingMenu} layout={WidgetTemplate} />
          <AppRoute path="/onboarded" component={OnboardedPage} layout={AppTemplate} />
          <AppRoute
            path="/purchase/:productId"
            component={WiredPurchasePage}
            layout={HybridTemplate}
          />
          <AppRoute path={"/comparison"} component={ComparisonPage} layout={MarketingTemplate} />
          <Redirect from={'/purchase'} to={'/purchase/24465f4d-d87b-494c-b5cb-64100b01bca6'} />
          <Redirect from="/" to="/my-colleges" />
          <AppRoute path="*" component={ErrorPage} layout={AppTemplate} />
        </Switch>
      </ScrollToTop>
    );
  }
}

export default App;