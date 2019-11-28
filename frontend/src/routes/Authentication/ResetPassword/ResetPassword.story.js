import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import ResetPassword from './ResetPassword';

storiesOf('ResetPassword', module).add('demo', () => (
  <ResetPassword
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    token="token"
  />
));
