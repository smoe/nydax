import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import tileImage from '../../../public/logo/light.png';
import Select from './Select';

storiesOf('Select', module).add('demo', () => (
  <Select
    options={[{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }]}
    imageUrl={text('imageUrl', tileImage)}
    text={text('text', 'Salam')}
    theme={select('theme', ['light', 'dark', 'darkCmc'], 'dark')}
    onChange={() => {}}
    selectedValue={1}
  />
));
