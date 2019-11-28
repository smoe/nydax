import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import DepositAddress from './DepositAddress';

storiesOf('DepositAddress', module).add('demo', () => (
  <DepositAddress
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
