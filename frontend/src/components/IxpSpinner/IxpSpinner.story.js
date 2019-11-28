import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import IxpSpinner from './IxpSpinner';

storiesOf('IxpSpinner', module).add('demo', () => (
  <IxpSpinner theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')} />
));
