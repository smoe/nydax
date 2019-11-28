import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import TokenSummaryCard from './TokenSummaryCard';
import tokenLogo from '../../../../public/invo-logo.png';

const sampleProps = {
  theme: 'dark',
  tokenId: 1,
  tokenLogo,
  tokenSymbol: 'INVO',
  companyName: 'Nydax',
  companyDescription: 'Innovation exchange platform',
  price: '$0.08',
  soldTokens: 45920,
  totalTokenAmount: 15902450,
};

storiesOf('Startup info', module).add('TokenSummaryCard', () => (
  <TokenSummaryCard
    theme={text('theme', sampleProps.theme)}
    tokenId={number('tokenId', sampleProps.tokenId)}
    tokenLogo={text('tokenLogo', sampleProps.tokenLogo)}
    tokenSymbol={text('tokenSymbol', sampleProps.tokenSymbol)}
    companyName={text('companyName', sampleProps.companyName)}
    companyDescription={text(
      'companyDescription',
      sampleProps.companyDescription,
    )}
    price={number('price', sampleProps.price)}
    soldTokens={number('soldTokens', sampleProps.soldTokens)}
    totalTokenAmount={number('totalTokenAmount', sampleProps.totalTokenAmount)}
  />
));
