import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import PrivacyPolicyModal from './PrivacyPolicyModal';

storiesOf('PrivacyPolicyModal', module).add('demo', () => (
  <PrivacyPolicyModal show={boolean('show', true)} />
));
