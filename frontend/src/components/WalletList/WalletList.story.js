import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import WalletList from './WalletList';

storiesOf('WalletList', module).add('demo', () => (
  <WalletList
    headerTitle="withdraw"
    height={select('height', [100, 300, 'auto'], 'auto')}
  />
));
