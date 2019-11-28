import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Footer from './Footer';

storiesOf('Footer', module).add('demo', () => (
  <Footer theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')} />
));
