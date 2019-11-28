import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import PairCard from './PairCard';

const labels = [
  'january',
  'february',
  'march',
  'april',
  'june',
  'july',
  'august',
];

storiesOf('PairCard', module).add('demo', () => (
  <PairCard
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    labels={labels}
    pairId={4}
  />
));
