import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Drawer from './Drawer';

storiesOf('Drawer', module).add('demo', () => (
  <Drawer
    show={select('show', [true, false], false)}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
