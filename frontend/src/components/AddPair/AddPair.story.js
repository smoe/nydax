import React from 'react';
import { storiesOf } from '@storybook/react';
import AddPair, { WithoutRedux } from './AddPair';

const pairs = [
  {
    id: 1,
    name: 'btc/eth',
  },
  {
    id: 2,
    name: 'invo/usdt',
  },
];

storiesOf('AddPair', module)
  .add('without redux', () => (
    <WithoutRedux
      pairs={pairs}
      favouriteCharts={[1]}
      onPairAdd={pairId => pairId}
    />
  ))
  .add('with redux', () => <AddPair />);
