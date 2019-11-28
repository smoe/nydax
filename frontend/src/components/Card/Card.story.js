import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import tileImage from '../../../public/logo/light.png';
import Card from './Card';

storiesOf('Card', module).add('demo', () => (
  <Card
    imageUrl={text('imageUrl', tileImage)}
    text={text('text', 'Salam')}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
  />
));
