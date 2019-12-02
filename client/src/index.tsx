import '@babel/polyfill';

import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { BatchHttpLink } from "apollo-link-batch-http";
import { HttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { ConnectedRouter } from 'connected-react-router';
import { hydrate } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import store, { history } from './store';
import { loggerLink } from './lib/graphql';
import introspectionQueryResultData from './graphql/fragmentTypes.json';
import { Helmet } from 'react-helmet';
import { StripeProvider } from 'react-stripe-elements';
import { PaywallProvider } from './hooks/paywall';
import { StudentSwitcherProvider } from './hooks/student-switcher';
import * as LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { SmartValueProvider } from "./connectors/molecules/smart-values/shared"

import "iframe-resizer/js/iframeResizer.contentWindow";
import { SmartFieldCacheProvider } from './connectors/molecules/smart-fields/shared'
import { AuthenticationProvider, useAuthentication } from './hooks/auth';
import { FeaturesProvider } from './hooks/features';

// FIXME: move analytics to context?
declare global {
  interface Window { analytics: any; profitwell: any; }
}

if (process.env.NODE_ENV === "production") {
  LogRocket.init('drlael/edmit-app');
  setupLogRocketReact(LogRocket);
}

const graphQLEndpoint = process.env.REACT_APP_API_GRAPHQL_PATH;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (apiBaseUrl === null || apiBaseUrl === undefined) {
  throw Error("unexpected - api base url missing")
}

if (graphQLEndpoint === null || graphQLEndpoint === undefined) {
  throw Error('unexpected - missing graphql endpoint');
}

const cookieDomain = process.env.REACT_APP_COOKIE_DOMAIN;

if (cookieDomain === null || cookieDomain === undefined) {
  throw Error('unexpected - missing graphql endpoint configuration');
}

export const EDMIT_SESSION_ID_COOKIE_NAME = 'edmit_session_id_2';
export const EDMIT_TOKEN_COOKIE_NAME = 'edmit_token_2';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const stripeToken = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (stripeToken === null || stripeToken === undefined) {
  throw Error('unexpected - missing stripe token');
}

const ApolloProviders: React.SFC = props => {
  const authentication = useAuthentication()


  const authLink = setContext(async () => {
    return {
      headers: {
        'X-Edmit-Session-Id': authentication.sessionId,
        'X-Edmit-Token': authentication.token
      }
    };
  });

  const client = new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only'
      }
    },
    cache: new InMemoryCache({ fragmentMatcher }),
    link: ApolloLink.from([
      loggerLink,
      authLink,
      ApolloLink.split(
        (op) => op.operationName.indexOf("Validate") > -1 || op.operationName.indexOf("Recommendations") > -1 || op.operationName.indexOf("SabrinaBot") > -1,
        new HttpLink({ uri: graphQLEndpoint }),
        new BatchHttpLink({ uri: graphQLEndpoint })
      )
    ])
  });

  return (
    <>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          {props.children}
        </ApolloHooksProvider>
      </ApolloProvider>
    </>
  );
};

const AppProviders: React.SFC = props => (
  <StripeProvider apiKey={stripeToken}>
    <AuthenticationProvider>
      <StudentSwitcherProvider>
        <ReduxProvider store={store}>
          <ApolloProviders>
            <FeaturesProvider>
              <PaywallProvider>
                <SmartValueProvider>
                  <SmartFieldCacheProvider>
                    <ConnectedRouter history={history}>
                      <>{props.children}</>
                    </ConnectedRouter>
                  </SmartFieldCacheProvider>
                </SmartValueProvider>
              </PaywallProvider>
            </FeaturesProvider>
          </ApolloProviders>
        </ReduxProvider>
      </StudentSwitcherProvider>
    </AuthenticationProvider>
  </StripeProvider>
);

hydrate(
  <AppProviders>
    <>
      <Helmet title={'Edmit'} />
      <App history={history} />
    </>
  </AppProviders>,
  window.document.getElementById('root') as HTMLElement
);
