import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import WithdrawForm from './WithdrawForm';

storiesOf('WithdrawForm', module).add('demo', () => (
  <WithdrawForm
    tokenFeeThreshold={1}
    wallet={{
      id: 1,
      logoUrl: 'http://www.innovation.net/img/logo6.png',
      balance: 150,
      tokenName: 'btc',
      publicAddress: '0x654dfgkjsdkf45sdfg54df5g',
    }}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
