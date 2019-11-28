import React from 'react';
import { storiesOf } from '@storybook/react';
import TwoFactorAuthenticationModal, {
  WithoutRedux,
} from './TwoFactorAuthenticationModal';

storiesOf('TwoFactorAuthenticationModal', module)
  .add('without redux', () => (
    <WithoutRedux
      authenticatorSecret="123456"
      show
      showToggle={() => {}}
      disableAuthenticator={() => {}}
      validateToken={token => token}
    />
  ))
  .add('with redux', () => <TwoFactorAuthenticationModal />);
