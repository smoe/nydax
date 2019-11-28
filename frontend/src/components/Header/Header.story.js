import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Header from './Header';

storiesOf('Header', module).add('demo', () => (
  <Header
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    showNav={select('showNav', [true, false], true)}
    showAdvancedHeader={select('showAdvancedHeader', [true, false], false)}
  />
));
