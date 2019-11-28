import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from './Dashboard';
import Layout from '../../components/Layout';

storiesOf('Pages', module).add('Dashboard', () => (
  <Layout>
    <Dashboard />
  </Layout>
));
