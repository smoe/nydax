import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OrderBookAndTradeHistory from './OrderBookAndTradeHistory';

storiesOf('OrderBookAndTradeHistory', module).add('with redux', () => (
  <OrderBookAndTradeHistory
    height="500px"
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
