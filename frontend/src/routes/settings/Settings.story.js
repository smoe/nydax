import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings from './Settings';
import Layout from '../../components/Layout';

storiesOf('Pages', module).add('Settings', () => (
  <Layout>
    <Settings />
  </Layout>
));
