import React from 'react';
import { storiesOf } from '@storybook/react';
import TradingView, { WithoutRedux } from './TradingView';

const pairs = [
  {
    id: 1,
    name: 'INVO/BTC',
    lastPrice: '',
    lastUSDPrice: '',
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

storiesOf('TradingView', module)
  .add('simple chart', () => (
    <WithoutRedux
      theme="dark"
      pairs={pairs}
      selectedPairId={1}
      containerId="tv_chart_simple"
    />
  ))
  .add('advanced chart', () => (
    <WithoutRedux
      theme="dark"
      pairs={pairs}
      selectedPairId={1}
      containerId="tv_chart_advanced"
      isAdvanced
    />
  ))
  .add('light theme', () => (
    <WithoutRedux
      theme="light"
      pairs={pairs}
      selectedPairId={1}
      containerId="tv_chart_light"
    />
  ))
  .add('with redux state', () => <TradingView containerId="tv_chart_simple" />);
