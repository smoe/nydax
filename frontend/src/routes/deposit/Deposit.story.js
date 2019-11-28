import React from 'react';
import { storiesOf } from '@storybook/react';
import Deposit from './Deposit';
import Layout from '../../components/Layout';

storiesOf('Pages', module).add('Deposit', () => (
  <Layout>
    <Deposit />
  </Layout>
));
