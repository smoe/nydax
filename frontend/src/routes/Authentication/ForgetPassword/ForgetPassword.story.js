import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import ForgetPassword from './ForgetPassword';

storiesOf('ForgetPassword', module).add('demo', () => (
  <ForgetPassword
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
