import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import ChangePasswordModal, { WithoutRedux } from './ChangePasswordModal';

storiesOf('ChangePasswordModal', module)
  .add('without redux', () => (
    <WithoutRedux
      show={boolean('show', true)}
      email="sajad@gmail.com"
      showToggle={() => {}}
      onSendEmail={email => email}
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    />
  ))
  .add('with redux', () => <ChangePasswordModal />);
