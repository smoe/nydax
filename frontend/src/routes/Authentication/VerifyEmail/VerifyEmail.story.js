import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import VerifyEmail from './VerifyEmail';

storiesOf('VerifyEmail', module).add('demo', () => (
  <VerifyEmail
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    resendEmail={() => {}}
  />
));
