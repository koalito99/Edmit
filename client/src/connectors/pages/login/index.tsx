import * as React from 'react';
import { Mutation } from '../../../lib/graphql';
import LoginPage from '../../../components/pages/login';
import { LOGIN, CREATE_PASSWORD_RESET } from '../../../graphql/mutations';
import {
  Login,
  LoginVariables,
  CreatePasswordResetVariables,
  CreatePasswordReset
} from '../../../graphql/generated';
import * as PropTypes from 'prop-types';
import * as qs from 'query-string';
import { useAuthentication } from '../../../hooks/auth';

const ConnectedLoginPage: React.SFC<any> = (props) => {
  const authentication = useAuthentication()

  return (
    <Mutation<Login, LoginVariables> mutation={LOGIN}>
      {(login, { data }) => {
        if (data && data.login && data.login.createdSession) {

          authentication.persistCredentials(
            data.login.createdSession.session.id,
            data.login.createdSession.rawToken
          )

          const querystring = qs.parse(window.location.search);
          const returnTo = querystring && querystring.returnTo;

          if (!!returnTo) {
            window.location.href = returnTo as string;
          } else {
            window.location.href = '/my-colleges';
          }
        }

        return (
          <Mutation<CreatePasswordReset, CreatePasswordResetVariables>
            mutation={CREATE_PASSWORD_RESET}
          >
            {createPasswordReset => (
              <LoginPage
                login={async (emailAddress, password) => {
                  await login({
                    variables: { emailAddress, password }
                  });
                }}
                requestPasswordReset={async emailAddress => {
                  await createPasswordReset({ variables: { emailAddress } });
                }}
                error={data ? ((data as any).login ? (data as any).login.error : null) : null}
              />
            )}
          </Mutation>
        );
      }}
    </Mutation>
  );
};

ConnectedLoginPage.contextTypes = {
  setAuthentication: PropTypes.func
};

export default ConnectedLoginPage;
