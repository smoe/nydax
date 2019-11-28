import React from 'react';
import { storiesOf } from '@storybook/react';
import DepthChart from './DepthChart';
import DepthChart2 from './DepthChart2';

const lastOrders = [
  {
    pairId: 1,
    price: 0.000012,
    amount: 20,
    side: 'buy',
  },
  {
    pairId: 1,
    price: 0.000015,
    amount: 50,
    side: 'buy',
  },
  {
    pairId: 1,
    price: 0.000016,
    amount: 100,
    side: 'buy',
  },
  {
    pairId: 1,
    price: 0.000017,
    amount: 110,
    side: 'buy',
  },
  {
    pairId: 1,
    price: 0.000011,
    amount: 80,
    side: 'sell',
  },
  {
    pairId: 1,
    price: 0.000014,
    amount: 40,
    side: 'sell',
  },
  {
    pairId: 1,
    price: 0.000016,
    amount: 90,
    side: 'sell',
  },
  {
    pairId: 1,
    price: 0.000019,
    amount: 80,
    side: 'sell',
  },
];

storiesOf('DepthChart', module)
  .add('DepthChart', () => <DepthChart orders={lastOrders} />)
  .add('DepthChart2', () => <DepthChart2 orders={lastOrders} />);
