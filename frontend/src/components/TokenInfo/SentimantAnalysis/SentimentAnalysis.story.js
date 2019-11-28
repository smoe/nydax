import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import SentimentAnalysis, { WithoutRedux } from './SentimentAnalysis';

const tokenSentimentInfo = {
  soldPercent: 10,
  boughtPercent: 90,
  boughtTodayChange: 0,
  sellPercent: 5,
  buyPercent: 95,
  todayBuyPercent: 3,
};

storiesOf('SentimentAnalysis', module)
  .add('Without Redux', () => (
    <WithoutRedux
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      tokenSentimentInfo={tokenSentimentInfo}
    />
  ))
  .add('redux', () => <SentimentAnalysis />);
