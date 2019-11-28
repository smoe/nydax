import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import OrderBook, { WithoutRedux } from './OrderBook';

const orders = [
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 90,
    sideId: 2,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 70,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 50,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 80,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 70,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 50,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 80,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000012,
    amount: 120,
    sideId: 1,
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 60,
    sideId: 1,
  },
];

const pairs = [
  {
    id: 1,
    name: 'INVO/BTC',
    lastPrice: 0.00012,
    lastUSDPrice: 0.04,
    change24Price: 0.00001,
    change24Percentage: 1.56,
    high24: 0.000123,
    low24: 0.000111,
    vol24: 1567.21,
    marketStatus: 'running',
    dailyChartData: [
      {
        price: 0.00012,
        timestamp: 1415100002124,
      },
    ],
  },
];

storiesOf('OrderBook', module)
  .add('without redux', () => (
    <WithoutRedux
      orders={orders}
      pairs={pairs}
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      selectedPairId={1}
      rowLimit={9}
    />
  ))
  .add('with redux', () => <OrderBook selectedPairId={1} />);
