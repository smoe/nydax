import React from 'react';
import { storiesOf } from '@storybook/react';
import StartupInfo from './StartupInfo';
import Layout from '../../components/Layout/Layout';

storiesOf('Pages', module).add('StartupInfo', () => (
  <Layout>
    <StartupInfo />
  </Layout>
));
