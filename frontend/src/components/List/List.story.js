import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import List from './List';

storiesOf('List', module).add('demo', () => (
  <List
    listType="liveOrder"
    list={[
      {
        id: 1,
        name: 'INVO/BTC',
        lastPrice: 0.00022,
        change24Perc: 2.56,
        vol24: 2567.21,
        logoUrl: 'https://via.placeholder.com/300.png',
      },
      {
        id: 2,
        name: 'ETH/BTC',
        lastPrice: 0.00012,
        change24Perc: -1.56,
        vol24: 1567.21,
        logoUrl: 'https://via.placeholder.com/300.png',
      },
    ]}
    actions={['remove']}
    columns={['price', 'amount', 'filledAmount', 'type', 'side', 'favourites']}
    columnNames={[
      'price',
      'amount',
      'filledAmount',
      'type',
      'side',
      'favourites',
    ]}
    columnPostfixes={['', '', '', '%', '', '']}
    colors={[
      {},
      {
        attribute: 'change24Perc',
        operator: '>',
        value: '0',
        True: '#47af00',
        False: '#ff4e6d',
      },
      {},
      {},
      {},
      {},
    ]}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    selectedItemId={1}
  />
));
