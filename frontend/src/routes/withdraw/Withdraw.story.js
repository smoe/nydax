import React from 'react';
import { storiesOf } from '@storybook/react';
import Withdraw from './Withdraw';
import Layout from '../../components/Layout/Layout';

storiesOf('Pages', module).add('Withdraw', () => (
  <Layout>
    <Withdraw />
  </Layout>
));
