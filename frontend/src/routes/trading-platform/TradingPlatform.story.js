import React from 'react';
import { storiesOf } from '@storybook/react';
import TradingPlatform from './TradingPlatform';
import Layout from '../../components/Layout';

storiesOf('Pages', module).add('TradingPlatform', () => (
  <Layout>
    <TradingPlatform />
  </Layout>
));
