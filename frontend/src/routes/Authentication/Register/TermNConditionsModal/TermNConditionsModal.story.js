import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import TermNConditionsModal from './TermNConditionsModal';

storiesOf('TermNConditionsModal', module).add('demo', () => (
  <TermNConditionsModal show={boolean('show', true)} />
));
