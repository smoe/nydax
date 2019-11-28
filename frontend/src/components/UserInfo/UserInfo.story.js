import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import UserInfo, { WithoutRedux } from './UserInfo';

const wallets = [
  {
    tokenId: 1,
    address: '0xB5b64f4c655F485F7660c649f94EC33534B8E8eB',
    balance: 230,
  },
  {
    tokenId: 2,
    address: '0xB5b64f4c655F485F7660c649f94EC33534B8E8eB',
    balance: 320,
  },
];

const tradeHistory = [
  {
    pair: 'INVO/USDT',
    type: 'buy',
    price: 0.41,
    filled: 56,
    fee: 0.056,
    total: 55.944,
    timestamp: 1544851583393,
  },
];

const orderHistory = [
  {
    pair: 'INVO/USDT',
    pairId: 1,
    type: 'limit',
    side: 'buy',
    average: 0.41,
    price: 0.4,
    filled: 140,
    amount: 140,
    total: 56,
    status: 'pending',
  },
];

const tokens = [
  {
    id: 1,
    name: 'INVO',
    symbol: 'invo',
    logoUrl: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png',
    decimalPrecision: '',
    minimumTradeAmount: 100,
    minimumWithdrawalAmount: 0.01,
    withdrawalFee: 0.2,
    tradeFeeThresholds: [
      10000,
      50000,
      100000,
      250000,
      500000,
      1000000,
      5000000,
      10000000,
    ],
    tradeFees: [
      { taker: 0.26, maker: 0.16 },
      { taker: 0.24, maker: 0.14 },
      { taker: 0.22, maker: 0.12 },
      { taker: 0.2, maker: 0.1 },
      { taker: 0.18, maker: 0.08 },
      { taker: 0.16, maker: 0.06 },
      { taker: 0.14, maker: 0.04 },
      { taker: 0.12, maker: 0.02 },
      { taker: 0.1, maker: 0 },
    ],
  },
  {
    id: 2,
    name: 'USDT',
    symbol: 'usdt',
    logoUrl: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png',
    decimalPrecision: 6,
    minimumTradeAmount: 0.01,
    minimumWithdrawalAmount: 0.01,
    withdrawalFee: 0.2,
    tradeFeeThresholds: [
      10000,
      50000,
      100000,
      250000,
      500000,
      1000000,
      5000000,
      10000000,
    ],
    tradeFees: [
      { taker: 0.26, maker: 0.16 },
      { taker: 0.24, maker: 0.14 },
      { taker: 0.22, maker: 0.12 },
      { taker: 0.2, maker: 0.1 },
      { taker: 0.18, maker: 0.08 },
      { taker: 0.16, maker: 0.06 },
      { taker: 0.14, maker: 0.04 },
      { taker: 0.12, maker: 0.02 },
      { taker: 0.1, maker: 0 },
    ],
  },
];

const openOrders = [
  {
    pair: 'INVO/USDT',
    pairId: 1,
    type: 'limit',
    side: 'buy',
    average: 0.41,
    price: 0.4,
    filled: 140,
    amount: 140,
    total: 56,
    status: 'pending',
  },
];

const pairs = [
  {
    id: 1,
    name: 'INVO/USDT',
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
  {
    id: 2,
    name: 'ETH/USDT',
    lastPrice: 0.0032,
    lastUSDPrice: 100,
    change24Price: 2,
    change24Percentage: 3.16,
    high24: 110,
    low24: 95,
    vol24: 33567.21,
    marketStatus: 'running',
    dailyChartData: [
      {
        price: 0.00012,
        timestamp: 1415100002124,
      },
    ],
  },
];

const currencies = [
  {
    id: 1,
    usdRatio: 1.3,
  },
];

storiesOf('UserInfo', module)
  .add('without redux', () => (
    <WithoutRedux
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      orderHistory={orderHistory}
      tradeHistory={tradeHistory}
      wallets={wallets}
      tokens={tokens}
      pairs={pairs}
      openOrders={openOrders}
      currencies={currencies}
      baseCurrencyId={1}
    />
  ))
  .add('with redux', () => <UserInfo />);
