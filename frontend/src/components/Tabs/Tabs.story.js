import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Tab } from 'react-bootstrap';
import Tabs from './Tabs';

storiesOf('Custom Tab', module).add('demo', () => (
  <Tabs
    align={select('align', ['right', 'left', ''], 'right')}
    defaultActiveKey={1}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  >
    <Tab eventKey={1} title="tab1">
      <div>sajad</div>
    </Tab>
    <Tab eventKey={2} title="tab2">
      <div>reza</div>
    </Tab>
  </Tabs>
));
