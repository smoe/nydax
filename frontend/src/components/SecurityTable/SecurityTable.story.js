import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import SecurityTable from './SecurityTable';

const sessions = [
  {
    id: 1,
    lastSignIn: 'About 2 hours ago',
    browser: 'Safari',
    ipAddress: '192.95.47.197',
    location: 'Montreal-CA',
    isCurrentSession: true,
  },
  {
    id: 2,
    lastSignIn: 'About 2 hours ago',
    browser: 'Safari',
    ipAddress: '192.95.47.197',
    location: 'Montreal-CA',
    isCurrentSession: false,
  },
];

const accountActivity = [
  {
    id: 2,
    time: 'About 2 hours ago',
    browser: 'Safari',
    ipAddress: '192.95.47.197',
    location: 'Montreal-CA',
    action: 'Successfull login',
  },
];

storiesOf('SecurityTable', module)
  .add('sessions', () => (
    <SecurityTable
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      columns={[
        'lastSignIn',
        'browser',
        'ipAddress',
        'location',
        'isCurrentSession',
      ]}
      data={sessions}
      type="session"
    />
  ))
  .add('account activity', () => (
    <SecurityTable
      data={accountActivity}
      type="accountActivity"
      theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
      columns={['time', 'browser', 'ipAddress', 'location', 'action']}
    />
  ));
