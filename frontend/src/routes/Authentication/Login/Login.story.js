import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Login from './Login';

storiesOf('Login', module).add('demo', () => (
  <Login
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    handleLogin={(email, pass) => email + pass}
    handleTwoFAToken={(email, pass) => email + pass}
    handleSmsValidation={(email, pass) => email + pass}
  />
));
