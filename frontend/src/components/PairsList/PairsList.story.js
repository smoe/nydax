import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import PairsList from './PairsList';
import PairSearch from './PairSearch';

storiesOf('PairsList', module)
  .add('demo', () => (
    <PairsList
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      showSearchInHeader={select('showSearchInHeader', [true, false], false)}
    />
  ))
  .add('PairSearch', () => <PairSearch />);
