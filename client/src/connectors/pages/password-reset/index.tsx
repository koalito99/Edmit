import * as React from 'react';
import { Mutation } from '../../../lib/graphql';
import PasswordResetPage from '../../../components/pages/password-reset';
import { UPDATE_PROFILE } from '../../../graphql/mutations';
import { UpdateProfile, UpdateProfileVariables } from '../../../graphql/generated';

const ConnectedPasswordResetPage: React.SFC = () => {
  return (
    <Mutation<UpdateProfile, UpdateProfileVariables> mutation={UPDATE_PROFILE}>
      {(updateProfile, { error, data }) => {
        if (data) {
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }

        return (
          <PasswordResetPage
            resetPassword={async newPassword => {
              await updateProfile({
                variables: { data: { password: newPassword } }
              });
            }}
            resetPasswordError={error}
          />
        );
      }}
    </Mutation>
  );
};

export default ConnectedPasswordResetPage;
