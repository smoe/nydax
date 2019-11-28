import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import WalletInfo from './WalletInfo';

storiesOf('WalletInfo', module).add('demo', () => (
  <WalletInfo
    messages={['message1', 'message2']}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    height={select('height', ['300px', '500px', 'auto'], 'auto')}
  >
    <div>test</div>
  </WalletInfo>
));
