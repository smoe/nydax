import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Register from './Register';

storiesOf('Register', module).add('demo', () => (
  <Register theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')} />
));
